import { supabase } from "./supabase";
import { quizQuestionsPPLG } from "../data/quiz";
import { modulesList } from "../data/modules";
import { cheatsheetData } from "../data/cheatsheet";
import { landingStats, landingFeatures } from "../data/landing";
import { countRows } from "./adminApi";
import { invalidateContent } from "./content";

export interface SeedReport {
  inserted: string[];
  skipped: string[];
}

export async function importBundledDefaults(): Promise<SeedReport> {
  if (!supabase) throw new Error("Supabase belum dikonfigurasi (.env.local)");
  const client = supabase;
  const report: SeedReport = { inserted: [], skipped: [] };

  if ((await countRows("quiz_questions")) > 0) {
    report.skipped.push("Soal quiz (sudah ada di database)");
  } else {
    const rows = quizQuestionsPPLG.map((q, i) => ({
      module_num: q.moduleNum,
      case_text: q.caseText,
      options: q.options,
      correct_index: q.correctIndex,
      explanation: q.explanation,
      sort_order: i + 1,
    }));
    const { error } = await client.from("quiz_questions").insert(rows);
    if (error) throw error;
    report.inserted.push(`${rows.length} soal quiz`);
  }

  if ((await countRows("modules")) > 0) {
    report.skipped.push("Modul (sudah ada di database)");
  } else {
    for (let mi = 0; mi < modulesList.length; mi++) {
      const m = modulesList[mi];
      const { data: created, error } = await client
        .from("modules")
        .insert({
          slug: m.id,
          number: m.number,
          module_badge: m.moduleBadge,
          title: m.title,
          card_title: m.cardTitle,
          short_desc: m.shortDesc,
          hero_image: m.heroImage,
          table_of_contents: m.tableOfContents,
          sort_order: mi + 1,
        })
        .select("id")
        .single();
      if (error) throw error;
      const moduleId = (created as { id: string }).id;
      const sectionRows = m.sections.map((s, si) => ({
        module_id: moduleId,
        section_key: s.id,
        number_prefix: s.numberPrefix ?? null,
        title: s.title,
        paragraphs: s.paragraphs,
        bullet_points: s.bulletPoints ?? [],
        code_snippet: s.codeSnippet ?? null,
        media: s.media ?? [],
        sort_order: si + 1,
      }));
      const { error: secErr } = await client
        .from("module_sections")
        .insert(sectionRows);
      if (secErr) throw secErr;
    }
    report.inserted.push(
      `${modulesList.length} modul + ${modulesList.reduce(
        (n, m) => n + m.sections.length,
        0,
      )} section`,
    );
  }

  if ((await countRows("cheatsheet_sections")) > 0) {
    report.skipped.push("Cheatsheet (sudah ada di database)");
  } else {
    for (let si = 0; si < cheatsheetData.length; si++) {
      const sec = cheatsheetData[si];
      const { data: created, error } = await client
        .from("cheatsheet_sections")
        .insert({
          key: sec.id,
          category: sec.category,
          sort_order: si + 1,
        })
        .select("id")
        .single();
      if (error) throw error;
      const sectionId = (created as { id: string }).id;
      const itemRows = sec.items.map((item, ii) => ({
        section_id: sectionId,
        command_or_concept: item.commandOrConcept,
        description: item.description,
        example: item.example ?? null,
        sort_order: ii + 1,
      }));
      const { error: itemErr } = await client
        .from("cheatsheet_items")
        .insert(itemRows);
      if (itemErr) throw itemErr;
    }
    report.inserted.push(`${cheatsheetData.length} kategori cheatsheet`);
  }

  if ((await countRows("landing_stats")) > 0) {
    report.skipped.push("Landing stats (sudah ada di database)");
  } else {
    const { error } = await client
      .from("landing_stats")
      .insert(
        landingStats.map((s, i) => ({
          value: s.value,
          label: s.label,
          color: s.color,
          sort_order: i + 1,
        })),
      );
    if (error) throw error;
    report.inserted.push(`${landingStats.length} landing stats`);
  }

  if ((await countRows("landing_features")) > 0) {
    report.skipped.push("Landing features (sudah ada di database)");
  } else {
    const { error } = await client
      .from("landing_features")
      .insert(
        landingFeatures.map((f, i) => ({
          key: f.id,
          title: f.title,
          description: f.description,
          tone: f.tone,
          sort_order: i + 1,
        })),
      );
    if (error) throw error;
    report.inserted.push(`${landingFeatures.length} landing features`);
  }

  invalidateContent();
  return report;
}
