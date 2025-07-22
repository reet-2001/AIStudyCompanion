import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const studyGuides = pgTable("study_guides", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  summary: text("summary").notNull(),
  questions: json("questions").$type<QuestionType[]>().notNull(),
  selectedQuestionTypes: json("selected_question_types").$type<string[]>().notNull(),
  pdfPath: text("pdf_path"),
  createdAt: text("created_at").notNull(),
});

export interface QuestionType {
  type: string;
  questions: Question[];
}

export interface Question {
  question: string;
  answer: string;
  options?: string[]; // For MCQs
  explanation?: string;
}

export const generateRequestSchema = z.object({
  selectedTypes: z.array(z.string()).min(1, "Please select at least one question type"),
});

export const insertStudyGuideSchema = createInsertSchema(studyGuides).pick({
  filename: true,
  summary: true,
  questions: true,
  selectedQuestionTypes: true,
  pdfPath: true,
  createdAt: true,
});

export type InsertStudyGuide = z.infer<typeof insertStudyGuideSchema>;
export type StudyGuide = typeof studyGuides.$inferSelect;
export type GenerateRequest = z.infer<typeof generateRequestSchema>;
