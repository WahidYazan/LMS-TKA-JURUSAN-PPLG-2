"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Inbox, EyeOff, Eye, Copy } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { describeError } from "@/lib/adminError";
import {
  createRow,
  deleteRow,
  duplicateRow,
  moveRow,
  updateRow,
} from "@/lib/adminApi";
import type {
  CheatsheetItemRow,
  CheatsheetSectionRow,
} from "@/lib/dbTypes";
import {
  AdminCard,
  AdminListRow,
  AdminPageHeader,
  FormModalActions,
  TextAreaField,
  TextField,
} from "@/components/admin/AdminPrimitives";
import {
  AdminModal,
  ConfirmDeleteDialog,
} from "@/components/admin/AdminModal";
import { AdminListSkeleton } from "@/components/admin/AdminLoading";

export default function AdminCheatsheetPage() {
  const [sections, setSections] = useState<CheatsheetSectionRow[]>([]);
  const [items, setItems] = useState<CheatsheetItemRow[]>([]);
  // Konfigurasi Supabase bersifat tetap, jadi cukup dinilai sekali di initial state.
  const [loading, setLoading] = useState(() => !!supabase);
  const [error, setError] = useState<string | null>(() =>
    supabase ? null : "Supabase belum dikonfigurasi (.env.local)",
  );
  // undefined = otomatis buka section pertama, null = semua ditutup.
  const [pickedSection, setPickedSection] = useState<string | null | undefined>(
    undefined,
  );

  const [sectionForm, setSectionForm] = useState<
    { mode: "create" } | { mode: "edit"; row: CheatsheetSectionRow } | null
  >(null);
  const [deletingSection, setDeletingSection] =
    useState<CheatsheetSectionRow | null>(null);

  const [itemForm, setItemForm] = useState<
    { mode: "create"; sectionId: string } | { mode: "edit"; row: CheatsheetItemRow } | null
  >(null);
  const [deletingItem, setDeletingItem] = useState<CheatsheetItemRow | null>(null);

  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showNotice, setShowNotice] = useState(true);
  const pathname = usePathname();

  const load = useCallback(async () => {
    if (!supabase) return;
    try {
      const [{ data: secs, error: secErr }, { data: its, error: itErr }] =
        await Promise.all([
          supabase
            .from("cheatsheet_sections")
            .select("*")
            .order("sort_order", { ascending: true }),
          supabase
            .from("cheatsheet_items")
            .select("*")
            .order("sort_order", { ascending: true }),
        ]);
      if (secErr) throw secErr;
      if (itErr) throw itErr;
      setSections((secs ?? []) as CheatsheetSectionRow[]);
      setItems((its ?? []) as CheatsheetItemRow[]);
      setError(null);
    } catch (err: unknown) {
      setError(describeError("Gagal memuat data", err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const run = async () => {
      await load();
    };
    void run();
  }, [load]);

  // Munculkan lagi peringatan setiap kali route cheatsheet dibuka,
  // termasuk lewat navigasi client (klik sidebar) tanpa reload.
  useEffect(() => {
    const run = async () => {
      setShowNotice(true);
    };
    void run();
  }, [pathname]);

  const openSection =
    pickedSection === undefined
      ? (sections[0]?.id ?? null)
      : pickedSection && sections.some((s) => s.id === pickedSection)
        ? pickedSection
        : null;

  const withBusy = async (fn: () => Promise<void>) => {
    setBusy(true);
    try {
      await fn();
    } catch (err: unknown) {
      alert(describeError("Gagal menyimpan", err));
    } finally {
      setBusy(false);
    }
  };

  const submitSection = async (values: { key: string; category: string }) => {
    await withBusy(async () => {
      if (sectionForm?.mode === "edit") {
        await updateRow("cheatsheet_sections", sectionForm.row.id, values);
      } else {
        await createRow("cheatsheet_sections", values);
      }
      setSectionForm(null);
      await load();
    });
  };

  const submitItem = async (values: {
    command_or_concept: string;
    description: string;
    example: string | null;
  }) => {
    if (!itemForm) return;
    const target = itemForm;
    await withBusy(async () => {
      if (target.mode === "edit") {
        await updateRow("cheatsheet_items", target.row.id, values);
      } else {
        await createRow("cheatsheet_items", {
          ...values,
          section_id: target.sectionId,
        });
      }
      setItemForm(null);
      await load();
    });
  };

  return (
    <div>
      <AdminPageHeader
        title="Cheatsheet"
        kicker="Konten · Rangkuman TKA"
        description="Rangkuman TKA PPLG: section (Git, HTTP, SQL, OOP) beserta item per section."
        action={{
          label: "Tambah Section",
          onClick: () => setSectionForm({ mode: "create" }),
        }}
      />

      {loading && <AdminListSkeleton rows={4} />}

      {error && !loading && (
        <AdminCard className="mb-4 border-rose-200 bg-rose-50">
          <p className="text-sm font-semibold text-rose-700">{error}</p>
        </AdminCard>
      )}

      {!loading && !error && sections.length === 0 && (
        <AdminCard className="text-center py-12">
          <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-600">
            Database belum berisi cheatsheet
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Gunakan <strong>Import Sekarang</strong> di Dashboard, atau tambah
            section manual.
          </p>
        </AdminCard>
      )}

      {!loading && sections.length > 0 && (
        <div className="space-y-3">
          {sections.map((sec, secIdx) => {
            const secItems = items.filter((it) => it.section_id === sec.id);
            const isOpen = openSection === sec.id;
            return (
              <div
                key={sec.id}
                className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden ${
                  sec.is_visible === false ? "opacity-60" : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 p-3 sm:p-4">
                  <button
                    onClick={() => setPickedSection(isOpen ? null : sec.id)}
                    className="flex-1 flex items-center gap-2.5 cursor-pointer min-h-[40px] text-left"
                    aria-expanded={isOpen}
                  >
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="text-sm font-bold text-slate-800">
                      {sec.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {sec.key}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      {secItems.length} item
                    </span>
                    {sec.is_visible === false && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                        <EyeOff className="w-3 h-3" aria-hidden="true" />
                        Tersembunyi
                      </span>
                    )}
                  </button>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() =>
                        void withBusy(async () => {
                          await moveRow("cheatsheet_sections", sec.id, "up");
                          await load();
                        })
                      }
                      disabled={busy || secIdx === 0}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer disabled:opacity-40"
                      aria-label="Naikkan section"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() =>
                        void withBusy(async () => {
                          await moveRow("cheatsheet_sections", sec.id, "down");
                          await load();
                        })
                      }
                      disabled={busy || secIdx === sections.length - 1}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer disabled:opacity-40"
                      aria-label="Turunkan section"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() =>
                        void withBusy(async () => {
                          await updateRow("cheatsheet_sections", sec.id, {
                            is_visible: sec.is_visible === false,
                          });
                          await load();
                        })
                      }
                      disabled={busy}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer disabled:opacity-40"
                      aria-label={
                        sec.is_visible === false
                          ? "Tampilkan section ke publik"
                          : "Sembunyikan section dari publik"
                      }
                      title={
                        sec.is_visible === false
                          ? "Tampilkan section ke publik"
                          : "Sembunyikan section dari publik"
                      }
                    >
                      {sec.is_visible === false ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        void withBusy(async () => {
                          await duplicateRow("cheatsheet_sections", sec.id);
                          await load();
                        })
                      }
                      disabled={busy}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer disabled:opacity-40"
                      aria-label="Duplikat section"
                      title="Duplikat section"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSectionForm({ mode: "edit", row: sec })}
                      disabled={busy}
                      className="px-2.5 py-2 rounded-lg text-sky-600 hover:bg-sky-50 text-xs font-bold cursor-pointer disabled:opacity-40"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingSection(sec)}
                      disabled={busy}
                      className="px-2.5 py-2 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-bold cursor-pointer disabled:opacity-40"
                    >
                      Hapus
                    </button>
                    <button
                      onClick={() =>
                        setItemForm({ mode: "create", sectionId: sec.id })
                      }
                      disabled={busy}
                      className="px-3 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold cursor-pointer min-h-[36px] transition-colors disabled:opacity-60"
                    >
                      + Item
                    </button>
                  </div>
                </div>
                {isOpen && (
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2">
                    {secItems.length === 0 && (
                      <p className="text-xs text-slate-400 py-2">
                        Belum ada item di section ini.
                      </p>
                    )}
                    {secItems.map((it, i) => (
                      <AdminListRow
                        key={it.id}
                        title={`${i + 1}. ${it.command_or_concept}`}
                        meta={
                          <>
                            {it.description.slice(0, 80)}
                            {it.description.length > 80 ? "..." : ""}
                            {it.example ? (
                              <>
                                {" — "}
                                <span className="font-mono">
                                  {it.example.slice(0, 40)}
                                </span>
                              </>
                            ) : null}
                          </>
                        }
                        busy={busy}
                        visible={it.is_visible !== false}
                        onToggleVisible={() =>
                          void withBusy(async () => {
                            await updateRow("cheatsheet_items", it.id, {
                              is_visible: it.is_visible === false,
                            });
                            await load();
                          })
                        }
                        onDuplicate={() =>
                          void withBusy(async () => {
                            await duplicateRow("cheatsheet_items", it.id);
                            await load();
                          })
                        }
                        onMoveUp={
                          i > 0
                            ? () =>
                                void withBusy(async () => {
                                  await moveRow("cheatsheet_items", it.id, "up");
                                  await load();
                                })
                            : undefined
                        }
                        onMoveDown={
                          i < secItems.length - 1
                            ? () =>
                                void withBusy(async () => {
                                  await moveRow(
                                    "cheatsheet_items",
                                    it.id,
                                    "down",
                                  );
                                  await load();
                                })
                            : undefined
                        }
                        onEdit={() => setItemForm({ mode: "edit", row: it })}
                        onDelete={() => setDeletingItem(it)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showNotice && (
        <AdminModal
          title="Menu Disembunyikan dari Publik"
          onClose={() => setShowNotice(false)}
        >
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <EyeOff className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Cheatsheet sedang disembunyikan
                </p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Menu ini tidak ditampilkan ke pengunjung, jadi isinya{" "}
                  <strong className="text-slate-700">tidak wajib</strong> diubah.
                  Kelola hanya bila memang diperlukan.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowNotice(false)}
              className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm cursor-pointer min-h-[44px] transition-colors"
            >
              Mengerti
            </button>
          </div>
        </AdminModal>
      )}

      {sectionForm && (
        <SectionFormModal
          initial={
            sectionForm.mode === "edit"
              ? {
                  key: sectionForm.row.key,
                  category: sectionForm.row.category,
                }
              : { key: "", category: "" }
          }
          title={sectionForm.mode === "edit" ? "Edit Section" : "Tambah Section"}
          submitting={busy}
          onCancel={() => setSectionForm(null)}
          onSubmit={(v) => void submitSection(v)}
        />
      )}

      {itemForm && (
        <ItemFormModal
          initial={
            itemForm.mode === "edit"
              ? {
                  command_or_concept: itemForm.row.command_or_concept,
                  description: itemForm.row.description,
                  example: itemForm.row.example ?? "",
                }
              : { command_or_concept: "", description: "", example: "" }
          }
          title={itemForm.mode === "edit" ? "Edit Item" : "Tambah Item"}
          submitting={busy}
          onCancel={() => setItemForm(null)}
          onSubmit={(v) =>
            void submitItem({ ...v, example: v.example.trim() || null })
          }
        />
      )}

      {deletingSection && (
        <ConfirmDeleteDialog
          label={`section "${deletingSection.category}"`}
          detail="Semua item di section ini juga akan terhapus."
          confirming={confirming}
          onCancel={() => setDeletingSection(null)}
          onConfirm={() =>
            void withBusy(async () => {
              setConfirming(true);
              try {
                await deleteRow("cheatsheet_sections", deletingSection.id);
                setDeletingSection(null);
                await load();
              } finally {
                setConfirming(false);
              }
            })
          }
        />
      )}

      {deletingItem && (
        <ConfirmDeleteDialog
          label={`item "${deletingItem.command_or_concept}"`}
          confirming={confirming}
          onCancel={() => setDeletingItem(null)}
          onConfirm={() =>
            void withBusy(async () => {
              setConfirming(true);
              try {
                await deleteRow("cheatsheet_items", deletingItem.id);
                setDeletingItem(null);
                await load();
              } finally {
                setConfirming(false);
              }
            })
          }
        />
      )}
    </div>
  );
}

const SectionFormModal: React.FC<{
  title: string;
  initial: { key: string; category: string };
  submitting: boolean;
  onCancel: () => void;
  onSubmit: (v: { key: string; category: string }) => void;
}> = ({ title, initial, submitting, onCancel, onSubmit }) => {
  const [form, setForm] = useState(initial);

  return (
    <AdminModal title={title} onClose={onCancel}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      >
        <div className="p-5 sm:p-6 space-y-4">
          <TextField
            label="Key (id tab)"
            required
            mono
            value={form.key}
            onChange={(v) => setForm({ ...form, key: v })}
            placeholder="git"
          />
          <TextField
            label="Nama Tampilan"
            required
            value={form.category}
            onChange={(v) => setForm({ ...form, category: v })}
            placeholder="Git & Version Control"
          />
          <p className="text-[11px] text-slate-400">
            Key dipakai modal publik sebagai id tab — jangan diubah bila tidak
            perlu.
          </p>
        </div>
        <FormModalActions submitting={submitting} onCancel={onCancel} />
      </form>
    </AdminModal>
  );
};

const ItemFormModal: React.FC<{
  title: string;
  initial: { command_or_concept: string; description: string; example: string };
  submitting: boolean;
  onCancel: () => void;
  onSubmit: (v: {
    command_or_concept: string;
    description: string;
    example: string;
  }) => void;
}> = ({ title, initial, submitting, onCancel, onSubmit }) => {
  const [form, setForm] = useState(initial);

  return (
    <AdminModal title={title} onClose={onCancel}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      >
        <div className="p-5 sm:p-6 space-y-4">
          <TextField
            label="Perintah / Konsep"
            required
            mono
            value={form.command_or_concept}
            onChange={(v) => setForm({ ...form, command_or_concept: v })}
            placeholder="git rebase"
          />
          <TextAreaField
            label="Deskripsi"
            required
            rows={2}
            value={form.description}
            onChange={(v) => setForm({ ...form, description: v })}
          />
          <TextAreaField
            label="Contoh (opsional)"
            mono
            rows={2}
            value={form.example}
            onChange={(v) => setForm({ ...form, example: v })}
            placeholder="git rebase main"
          />
        </div>
        <FormModalActions submitting={submitting} onCancel={onCancel} />
      </form>
    </AdminModal>
  );
};
