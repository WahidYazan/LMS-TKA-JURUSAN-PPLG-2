import { supabase } from "./supabase";
import { quizQuestionsPPLG } from "../data/quiz";
import { modulesList } from "../data/modules";
import { cheatsheetData } from "../data/cheatsheet";
import { landingStats, landingFeatures } from "../data/landing";
import type { CheatSheetSection, ModuleContent, QuizQuestion } from "../types";
import type {
  CheatsheetItemRow,
  CheatsheetSectionRow,
  LandingFeatureRow,
  LandingStatRow,
  ModuleRow,
  ModuleSectionRow,
  QuizQuestionRow,
} from "./dbTypes";

export interface LandingStat {
  value: string;
  label: string;
  color: string;
}

export interface LandingFeature {
  id: string;
  title: string;
  description: string;
  tone: string;
}

export type ContentEntity =
  | "quiz"
  | "modules"
  | "cheatsheet"
  | "landingStats"
  | "landingFeatures";

const cache = new Map<ContentEntity, Promise<unknown>>();

export function invalidateContent(entity?: ContentEntity) {
  if (entity) cache.delete(entity);
  else cache.clear();
}

function cached<T>(key: ContentEntity, fn: () => Promise<T>): Promise<T> {
  const existing = cache.get(key);
  if (existing) return existing as Promise<T>;
  const promise = fn();
  cache.set(key, promise);
  return promise;
}

function withTimeout<T>(query: PromiseLike<T>, ms = 6000): Promise<T> {
  return Promise.race([
    Promise.resolve(query),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Supabase timeout")), ms),
    ),
  ]);
}

export function loadQuizQuestions(): Promise<QuizQuestion[]> {
  return cached("quiz", async () => {
    const fallback = quizQuestionsPPLG.map((q) => ({ ...q, id: String(q.id) }));
    if (!supabase) return fallback;
    try {
      const { data, error } = await withTimeout(
        supabase
          .from("quiz_questions")
          .select("*")
          .order("module_num", { ascending: true })
          .order("sort_order", { ascending: true }),
      );
      if (error || !data || data.length === 0) return fallback;
      return (data as QuizQuestionRow[]).map((row) => ({
        id: row.id,
        moduleNum: row.module_num,
        caseText: row.case_text,
        options: row.options,
        correctIndex: row.correct_index,
        explanation: row.explanation,
      }));
    } catch {
      return fallback;
    }
  });
}

export function loadModules(): Promise<ModuleContent[]> {
  return cached("modules", async () => {
    if (!supabase) return modulesList;
    try {
      const { data: moduleRows, error } = await withTimeout(
        supabase.from("modules").select("*").order("sort_order"),
      );
      if (error || !moduleRows || moduleRows.length === 0) return modulesList;
      const rows = moduleRows as ModuleRow[];
      const { data: sectionRows } = await withTimeout(
        supabase
          .from("module_sections")
          .select("*")
          .in(
            "module_id",
            rows.map((r) => r.id),
          )
          .order("sort_order"),
      );
      const sections = (sectionRows ?? []) as ModuleSectionRow[];
      return rows.map((m) => ({
        id: m.slug,
        number: m.number,
        moduleBadge: m.module_badge,
        title: m.title,
        cardTitle: m.card_title,
        shortDesc: m.short_desc,
        heroImage: m.hero_image,
        tableOfContents: m.table_of_contents ?? [],
        sections: sections
          .filter((s) => s.module_id === m.id)
          .map((s) => ({
            id: s.section_key,
            numberPrefix: s.number_prefix ?? undefined,
            title: s.title,
            paragraphs: s.paragraphs ?? [],
            bulletPoints: s.bullet_points?.length ? s.bullet_points : undefined,
            codeSnippet: s.code_snippet ?? undefined,
            media: s.media?.length ? s.media : undefined,
          })),
      }));
    } catch {
      return modulesList;
    }
  });
}

export function loadCheatsheet(): Promise<CheatSheetSection[]> {
  return cached("cheatsheet", async () => {
    if (!supabase) return cheatsheetData;
    try {
      const { data: sectionRows, error } = await withTimeout(
        supabase.from("cheatsheet_sections").select("*").order("sort_order"),
      );
      if (error || !sectionRows || sectionRows.length === 0)
        return cheatsheetData;
      const sections = sectionRows as CheatsheetSectionRow[];
      const { data: itemRows } = await withTimeout(
        supabase
          .from("cheatsheet_items")
          .select("*")
          .in(
            "section_id",
            sections.map((s) => s.id),
          )
          .order("sort_order"),
      );
      const items = (itemRows ?? []) as CheatsheetItemRow[];
      return sections.map((s) => ({
        id: s.key,
        category: s.category,
        items: items
          .filter((i) => i.section_id === s.id)
          .map((i) => ({
            commandOrConcept: i.command_or_concept,
            description: i.description,
            example: i.example ?? undefined,
          })),
      }));
    } catch {
      return cheatsheetData;
    }
  });
}

export function loadLandingStats(): Promise<LandingStat[]> {
  return cached("landingStats", async () => {
    if (!supabase) return landingStats;
    try {
      const { data, error } = await withTimeout(
        supabase.from("landing_stats").select("*").order("sort_order"),
      );
      if (error || !data || data.length === 0) return landingStats;
      return (data as LandingStatRow[]).map((r) => ({
        value: r.value,
        label: r.label,
        color: r.color,
      }));
    } catch {
      return landingStats;
    }
  });
}

export function loadLandingFeatures(): Promise<LandingFeature[]> {
  return cached("landingFeatures", async () => {
    if (!supabase) return landingFeatures;
    try {
      const { data, error } = await withTimeout(
        supabase.from("landing_features").select("*").order("sort_order"),
      );
      if (error || !data || data.length === 0) return landingFeatures;
      return (data as LandingFeatureRow[]).map((r) => ({
        id: r.key,
        title: r.title,
        description: r.description,
        tone: r.tone,
      }));
    } catch {
      return landingFeatures;
    }
  });
}
