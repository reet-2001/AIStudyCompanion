import { studyGuides, type StudyGuide, type InsertStudyGuide } from "@shared/schema";

export interface IStorage {
  createStudyGuide(studyGuide: InsertStudyGuide): Promise<StudyGuide>;
  getStudyGuide(id: number): Promise<StudyGuide | undefined>;
}

export class MemStorage implements IStorage {
  private studyGuides: Map<number, StudyGuide>;
  private currentId: number;

  constructor() {
    this.studyGuides = new Map();
    this.currentId = 1;
  }

  async createStudyGuide(insertStudyGuide: InsertStudyGuide): Promise<StudyGuide> {
    const id = this.currentId++;
    const studyGuide: StudyGuide = { 
      id,
      filename: insertStudyGuide.filename,
      summary: insertStudyGuide.summary,
      questions: insertStudyGuide.questions as any,
      selectedQuestionTypes: insertStudyGuide.selectedQuestionTypes as any,
      pdfPath: insertStudyGuide.pdfPath || null,
      createdAt: insertStudyGuide.createdAt
    };
    this.studyGuides.set(id, studyGuide);
    return studyGuide;
  }

  async getStudyGuide(id: number): Promise<StudyGuide | undefined> {
    return this.studyGuides.get(id);
  }
}

export const storage = new MemStorage();
