import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from 'multer';
import { storage } from "./storage";
import { aiService } from "./services/aiService";
import { pdfService } from "./services/pdfService";
import { generateRequestSchema } from "@shared/schema";
import { z } from "zod";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate study guide endpoint
  app.post('/api/generate', upload.single('pdfFile'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No PDF file uploaded' });
      }

      const { selectedTypes } = generateRequestSchema.parse(JSON.parse(req.body.selectedTypes || '{}'));
      
      if (!selectedTypes || selectedTypes.length === 0) {
        return res.status(400).json({ message: 'Please select at least one question type' });
      }

      // Step 1: Extract text from PDF
      const extractedText = await pdfService.extractTextFromPDF(req.file.buffer);
      
      if (!extractedText || extractedText.trim().length < 100) {
        return res.status(400).json({ message: 'Unable to extract sufficient text from the PDF. Please ensure the PDF contains readable text.' });
      }

      // Step 2: Generate summary (500+ words)
      const summary = await aiService.generateSummary(extractedText);

      // Step 3: Generate questions for each selected type
      const questionPromises = selectedTypes.map(async (type) => {
        const questions = await aiService.generateQuestions(extractedText, type, 7);
        return {
          type,
          questions
        };
      });

      const allQuestions = await Promise.all(questionPromises);

      // Step 4: Create study guide record
      const studyGuide = await storage.createStudyGuide({
        filename: req.file.originalname,
        summary,
        questions: allQuestions,
        selectedQuestionTypes: selectedTypes,
        createdAt: new Date().toISOString(),
      });

      res.json({
        id: studyGuide.id,
        filename: studyGuide.filename,
        summary: studyGuide.summary,
        questions: studyGuide.questions,
        selectedTypes: studyGuide.selectedQuestionTypes,
        totalQuestions: allQuestions.reduce((sum, section) => sum + section.questions.length, 0)
      });

    } catch (error) {
      console.error('Error generating study guide:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid request data', errors: error.errors });
      }
      
      if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'File too large. Please upload a PDF smaller than 10MB.' });
        }
      }
      
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'An unexpected error occurred while generating the study guide. Please try again.' 
      });
    }
  });

  // Download PDF endpoint
  app.get('/api/download/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const studyGuide = await storage.getStudyGuide(id);
      
      if (!studyGuide) {
        return res.status(404).json({ message: 'Study guide not found' });
      }

      const pdfBuffer = await pdfService.generateStudyGuidePDF({
        filename: studyGuide.filename,
        summary: studyGuide.summary,
        questions: studyGuide.questions,
        selectedTypes: studyGuide.selectedQuestionTypes
      });

      // Clear any caching and set proper headers for text download
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="StudyGuide-${Date.now()}.txt"`);
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.send(pdfBuffer);

    } catch (error) {
      console.error('Error downloading study guide:', error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Failed to generate PDF download. Please try again.' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
