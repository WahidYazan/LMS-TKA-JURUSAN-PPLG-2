export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  provider: 'manual' | 'google';
  nisn?: string;
  class?: string;
  school: string;
  major: string;
  completedModules: string[];
  lastExamScore?: number;
}

export interface StudentProfile {
  name: string;
  nisn: string;
  class: string;
  school: string;
  major: string;
  completedModules: string[];
  lastExamScore?: number;
}

export interface ScoreRecord {
  id: string;
  studentId: string;
  studentName: string;
  nisn: string;
  class: string;
  avatarUrl?: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  durationSeconds: number;
  passed: boolean;
  completedAt: string;
}

export interface TableOfContentItem {
  id: string;
  title: string;
}

export interface ModuleBulletPoint {
  label: string;
  description: string;
}

export interface ModuleSection {
  id: string;
  numberPrefix?: string;
  title: string;
  paragraphs: string[];
  bulletPoints?: ModuleBulletPoint[];
  codeSnippet?: {
    language: string;
    code: string;
    explanation?: string;
  };
}

export interface ModuleContent {
  id: string;
  number: number;
  moduleBadge: string;
  title: string;
  cardTitle: string;
  shortDesc: string;
  heroImage: string;
  tableOfContents: TableOfContentItem[];
  sections: ModuleSection[];
}

export interface HOTSQuestion {
  id: number;
  moduleNum: number;
  caseText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExamQuestion {
  id: number;
  category: string;
  pusmendikElement: string;
  competency: string;
  scenario?: string;
  question: string;
  codeSnippet?: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
}

export interface CheatSheetSection {
  id: string;
  category: string;
  items: {
    commandOrConcept: string;
    description: string;
    example?: string;
  }[];
}
