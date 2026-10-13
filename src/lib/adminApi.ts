import { supabase } from "./supabase";
import { invalidateContent, type ContentEntity } from "./content";
import type { ContentTableName } from "./dbTypes";

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
