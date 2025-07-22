# AI-Powered Study Guide Generator

## Overview

This is a full-stack web application that generates comprehensive study guides from PDF documents using AI. Users can upload a PDF file, select question types, and receive an AI-generated summary plus customized questions. The application uses React for the frontend, Express.js for the backend, and Hugging Face's AI models for content generation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: Custom components built with Radix UI primitives and styled with Tailwind CSS
- **Styling**: Tailwind CSS with shadcn/ui design system
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **File Upload**: Multer for handling PDF file uploads (10MB limit)
- **PDF Processing**: pdf-parse for text extraction
- **AI Integration**: Hugging Face Inference API for content generation
- **Session Management**: Memory-based storage (no persistent database currently)

### Data Storage Solutions
- **Current**: In-memory storage using Map data structure
- **Schema**: Defined with Drizzle ORM for PostgreSQL (ready for database migration)
- **File Storage**: PDF files processed in memory, not persisted to disk

## Key Components

### Frontend Components
- **FileUpload**: Handles PDF file selection with drag-and-drop support
- **QuestionTypeSelector**: Multi-select interface for choosing question types (theoretical, application, numerical, MCQ, fill-in-blanks, true/false)
- **ProcessingStatus**: Real-time progress indicator during AI generation
- **ResultsSection**: Displays generated summary and questions with download functionality

### Backend Services
- **AIService**: Integrates with Hugging Face models for summary and question generation
- **PDFService**: Handles PDF text extraction and study guide PDF generation using Puppeteer
- **Storage**: Memory-based data persistence with interface for future database integration

### Shared Schema
- **Type Safety**: Zod schemas for request/response validation
- **Data Models**: StudyGuide, Question, and QuestionType interfaces
- **Database Ready**: Drizzle ORM schema configured for PostgreSQL migration

## Data Flow

1. **File Upload**: User uploads PDF file (validated for type and size)
2. **Text Extraction**: PDF content is extracted using pdf-parse
3. **AI Processing**: 
   - Generate comprehensive summary (500+ words) using BART model
   - Create questions for each selected type using various AI models
4. **Results Display**: Summary and questions are presented to user
5. **PDF Generation**: Optional download of formatted study guide using Puppeteer

## External Dependencies

### AI Services
- **Hugging Face Inference API**: Primary AI service for content generation
- **Models Used**: 
  - facebook/bart-large-cnn (summarization)
  - t5-base (text generation and expansion)
  - Various models for different question types

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **shadcn/ui**: Pre-built component system

### Backend Libraries
- **Multer**: File upload handling
- **pdf-parse**: PDF text extraction
- **Puppeteer**: PDF generation for study guides
- **Drizzle ORM**: Database toolkit (configured but not actively used)

## Deployment Strategy

### Development
- **Hot Reload**: Vite development server with HMR
- **TypeScript**: Full type checking across frontend and backend
- **Path Aliases**: Configured for clean imports (@, @shared, @assets)

### Production Build
- **Frontend**: Vite builds optimized React bundle to dist/public
- **Backend**: esbuild compiles TypeScript server to dist/index.js
- **Serving**: Express serves static files in production mode

### Environment Variables
- **DATABASE_URL**: PostgreSQL connection (for future database integration)
- **HUGGINGFACE_API_TOKEN**: Required for AI functionality
- **NODE_ENV**: Environment detection for build optimization

### Current Limitations
- **Memory Storage**: All data is lost on server restart
- **File Persistence**: Uploaded PDFs are not saved permanently
- **Scalability**: Single-instance deployment without load balancing

### Recent Changes (January 22, 2025)
- **Enhanced AI Service**: Improved text chunking and error handling for Hugging Face API
- **Robust Question Generation**: Added fallback mechanisms for AI model failures
- **Better Text Processing**: Enhanced PDF text extraction and cleaning
- **Error Recovery**: Comprehensive error handling for API rate limits and model issues
- **MCQ Generation**: Improved multiple choice question creation with content-based options

### Migration Path
The application is architected for easy migration to persistent storage:
- Drizzle schema is already defined for PostgreSQL
- Storage interface allows switching from memory to database implementation
- File storage can be moved to cloud solutions (AWS S3, etc.)