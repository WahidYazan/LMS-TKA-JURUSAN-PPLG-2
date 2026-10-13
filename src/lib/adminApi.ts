import { supabase } from "./supabase";
import { invalidateContent, type ContentEntity } from "./content";
import { NON_COPYABLE_COLUMNS, type ContentTableName } from "./dbTypes";

const entityByTable: Partial<Record<ContentTableName, ContentEntity>> = {
  quiz_questions: "quiz",
  modules: "modules",
  module_sections: "modules",
  cheatsheet_sections: "cheatsheet",
  cheatsheet_items: "cheatsheet",
  landing_stats: "landingStats",
  landing_features: "landingFeatures",
};

function requireClient() {
  if (!supabase) throw new Error("Supabase belum dikonfigurasi (.env.local)");
  return supabase;
}

export async function listRows<T>(table: ContentTableName): Promise<T[]> {
  const client = requireClient();
  const { data, error } = await client
    .from(table)
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as T[];
}

export async function countRows(table: ContentTableName): Promise<number> {
  const client = requireClient();
  const { count, error } = await client
    .from(table)
    .select("*", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
}

async function nextSortOrder(table: ContentTableName): Promise<number> {
  const client = requireClient();
  const { data } = await client
    .from(table)
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  return ((data?.[0] as { sort_order?: number } | undefined)?.sort_order ?? 0) +
    1;
}

export async function createRow(
  table: ContentTableName,
  values: Record<string, unknown>,
): Promise<string> {
  const client = requireClient();
  const sortOrder =
    "sort_order" in values
      ? undefined
      : await nextSortOrder(table);
  const { data, error } = await client
    .from(table)
    .insert({ ...values, ...(sortOrder !== undefined ? { sort_order: sortOrder } : {}) })
    .select("id")
    .single();
  if (error) throw error;
  invalidateContent(entityByTable[table]);
  return (data as { id: string }).id;
}

export async function updateRow(
  table: ContentTableName,
  id: string,
  values: Record<string, unknown>,
): Promise<void> {
  const client = requireClient();
  const { error } = await client.from(table).update(values).eq("id", id);
  if (error) throw error;
  invalidateContent(entityByTable[table]);
}

export async function deleteRow(
  table: ContentTableName,
  id: string,
): Promise<void> {
  const client = requireClient();
  const { error } = await client.from(table).delete().eq("id", id);
  if (error) throw error;
  invalidateContent(entityByTable[table]);
}

export async function moveRow(
  table: ContentTableName,
  id: string,
  direction: "up" | "down",
): Promise<void> {
  const client = requireClient();
  const { data: current, error } = await client
    .from(table)
    .select("sort_order")
    .eq("id", id)
    .single();
  if (error || !current) throw error ?? new Error("Baris tidak ditemukan");
  const order = (current as { sort_order: number }).sort_order;

  const { data: neighbor } = await client
    .from(table)
    .select("id, sort_order")
    [direction === "up" ? "lt" : "gt"]("sort_order", order)
    .order("sort_order", { ascending: direction === "up" ? false : true })
    .limit(1);
  const neighborRow = neighbor?.[0] as
    | { id: string; sort_order: number }
    | undefined;
  if (!neighborRow) return;

  const { error: err1 } = await client
    .from(table)
    .update({ sort_order: neighborRow.sort_order })
    .eq("id", id);
  const { error: err2 } = await client
    .from(table)
    .update({ sort_order: order })
    .eq("id", neighborRow.id);
  if (err1 || err2) throw err1 ?? err2;
  invalidateContent(entityByTable[table]);
}

// Kolom unik (slug/key) yang harus diberi sufiks saat duplikat agar tidak
// bentrok, plus kolom label yang diberi sufiks "(Salinan)" agar mudah dikenali.
const duplicateMeta: Record<
  ContentTableName,
  { unique: string[]; label?: string }
> = {
  quiz_questions: { unique: [], label: "case_text" },
  modules: { unique: ["slug"], label: "title" },
  module_sections: { unique: [], label: "title" },
  cheatsheet_sections: { unique: ["key"], label: "category" },
  cheatsheet_items: { unique: [], label: "command_or_concept" },
  landing_stats: { unique: [], label: "label" },
  landing_features: { unique: ["key"], label: "title" },
};

/**
 * Menyalin sebuah baris menjadi baris baru di akhir urutan.
 * Kolom id/sort_order/timestamp dibuang; kolom unik diberi sufiks acak.
 */
export async function duplicateRow(
  table: ContentTableName,
  id: string,
): Promise<string> {
  const client = requireClient();
  const { data: row, error } = await client
    .from(table)
    .select("*")
    .eq("id", id)
    .single();
  if (error || !row) throw error ?? new Error("Baris tidak ditemukan");

  const copy: Record<string, unknown> = { ...(row as Record<string, unknown>) };
  for (const col of NON_COPYABLE_COLUMNS) delete copy[col];
  delete copy["created_at"];
  delete copy["updated_at"];

  const suffix = Math.random().toString(36).slice(2, 7);
  const meta = duplicateMeta[table];
  for (const col of meta.unique) {
    if (typeof copy[col] === "string") copy[col] = `${copy[col]}-copy-${suffix}`;
  }
  if (meta.label && typeof copy[meta.label] === "string") {
    copy[meta.label] = `${copy[meta.label]} (Salinan)`;
  }

  return createRow(table, copy);
}
