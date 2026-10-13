export interface QuizQuestionRow {
  id: string;
  module_num: number;
  case_text: string;
  options: string[];
  correct_index: number;
  explanation: string;
  sort_order: number;
  is_visible?: boolean;
}

export interface ModuleRow {
  id: string;
  slug: string;
  number: number;
  module_badge: string;
  title: string;
  card_title: string;
  short_desc: string;
  hero_image: string;
  table_of_contents: { id: string; title: string }[];
  sort_order: number;
  is_visible?: boolean;
}

export interface ModuleSectionRow {
  id: string;
  module_id: string;
  section_key: string;
  number_prefix: string | null;
  title: string;
  paragraphs: string[];
  bullet_points: { label: string; description: string }[];
  code_snippet: {
    language: string;
    code: string;
    explanation?: string;
  } | null;
  media: {
    type: "image" | "video";
    src: string;
    alt?: string;
    caption?: string;
    width?: number;
    height?: number;
  }[];
  sort_order: number;
  is_visible?: boolean;
}

export interface CheatsheetSectionRow {
  id: string;
  key: string;
  category: string;
  sort_order: number;
  is_visible?: boolean;
}

export interface CheatsheetItemRow {
  id: string;
  section_id: string;
  command_or_concept: string;
  description: string;
  example: string | null;
  sort_order: number;
  is_visible?: boolean;
}

export interface LandingStatRow {
  id: string;
  value: string;
  label: string;
  color: string;
  sort_order: number;
  is_visible?: boolean;
}

export interface LandingFeatureRow {
  id: string;
  key: string;
  title: string;
  description: string;
  tone: string;
  sort_order: number;
  is_visible?: boolean;
}

export type ContentTableName =
  | "quiz_questions"
  | "modules"
  | "module_sections"
  | "cheatsheet_sections"
  | "cheatsheet_items"
  | "landing_stats"
  | "landing_features";

// Kolom yang tidak boleh ikut disalin saat menduplikat baris.
export const NON_COPYABLE_COLUMNS = ["id", "sort_order"] as const;
