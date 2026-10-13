"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Inbox } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { describeError } from "@/lib/adminError";
import {
  createRow,
  deleteRow,
  moveRow,
  updateRow,
} from "@/lib/adminApi";
import type { ModuleRow, ModuleSectionRow } from "@/lib/dbTypes";
import {
  AdminCard,
  AdminListRow,
  FormModalActions,
  TextField,
} from "@/components/admin/AdminPrimitives";
import {
  AdminModal,
  ConfirmDeleteDialog,
} from "@/components/admin/AdminModal";
import { AdminListSkeleton } from "@/components/admin/AdminLoading";
import {
  BulletListEditor,
  CodeSnippetEditor,
  MediaListEditor,
  ParagraphListEditor,
} from "@/components/admin/EditorLists";
import type { ModuleBulletPoint, ModuleMedia } from "@/types";

interface SectionFormValues {
  section_key: string;
  number_prefix: string;
  title: string;
  paragraphs: string[];
  bullet_points: ModuleBulletPoint[];
  code_snippet: { language: string; code: string; explanation?: string } | null;
  media: ModuleMedia[];
}

const emptySection: SectionFormValues = {
  section_key: "",
  number_prefix: "",
  title: "",
  paragraphs: [],
  bullet_points: [],
  code_snippet: null,
  media: [],
};

export default function SectionManager({ id }: { id: string }) {
  const [module, setModule] = useState<ModuleRow | null>(null);
  const [rows, setRows] = useState<ModuleSectionRow[]>([]);
  // Konfigurasi Supabase bersifat tetap, jadi cukup dinilai sekali di initial state.
  const [loading, setLoading] = useState(() => !!supabase);
  const [error, setError] = useState<string | null>(() =>
    supabase ? null : "Supabase belum dikonfigurasi (.env.local)",
  );
  const [editing, setEditing] = useState<ModuleSectionRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<ModuleSectionRow | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) return;
    try {
      const [{ data: mod, error: modErr }, { data: secs, error: secErr }] =
        await Promise.all([
          supabase.from("modules").select("*").eq("id", id).maybeSingle(),
          supabase
            .from("module_sections")
            .select("*")
            .eq("module_id", id)
            .order("sort_order", { ascending: true }),
        ]);
      if (modErr) throw modErr;
      if (secErr) throw secErr;
      if (!mod) {
        setError("Modul tidak ditemukan.");
      } else {
        setModule(mod as ModuleRow);
      }
      setRows((secs ?? []) as ModuleSectionRow[]);
    } catch (err: unknown) {
      setError(describeError("Gagal memuat data", err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const run = async () => {
      await load();
    };
    void run();
  }, [load]);

  const handleSubmit = async (values: SectionFormValues) => {
    setBusy(true);
    const payload = {
      ...values,
      number_prefix: values.number_prefix || null,
      code_snippet: values.code_snippet,
    };
    try {
      if (editing) {
        await updateRow("module_sections", editing.id, payload);
      } else {
        await createRow("module_sections", { ...payload, module_id: id });
      }
      setEditing(null);
      setCreating(false);
      await load();
    } catch (err: unknown) {
      alert(describeError("Gagal menyimpan", err));
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setConfirming(true);
    try {
      await deleteRow("module_sections", deleting.id);
      setDeleting(null);
      await load();
    } catch (err: unknown) {
      alert(describeError("Gagal menghapus", err));
    } finally {
      setConfirming(false);
    }
  };

  const handleMove = async (rowId: string, dir: "up" | "down") => {
    setBusy(true);
    try {
      await moveRow("module_sections", rowId, dir);
      await load();
    } catch (err: unknown) {
      alert(describeError("Gagal mengubah urutan", err));
    } finally {
      setBusy(false);
    }
  };

  const formValues: SectionFormValues = editing
    ? {
        section_key: editing.section_key,
        number_prefix: editing.number_prefix ?? "",
        title: editing.title,
        paragraphs: editing.paragraphs ?? [],
        bullet_points: editing.bullet_points ?? [],
        code_snippet: editing.code_snippet ?? null,
        media: editing.media ?? [],
      }
    : emptySection;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <Link
            href="/tka/admin/modules"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-sky-600 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Kembali ke Daftar Modul
          </Link>
          <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900">
            {module ? `Section — ${module.module_badge}` : "Section Modul"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {rows.length} section. Publik menampilkan urutan ini di{" "}
            <code className="font-mono">/module/{module?.slug ?? "..."}</code>
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          disabled={loading || !!error}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold shadow-lg shadow-sky-500/25 transition-all cursor-pointer min-h-[44px] w-fit disabled:opacity-50"
        >
          + Tambah Section
        </button>
      </div>

      {loading && <AdminListSkeleton rows={4} />}

      {error && !loading && (
        <AdminCard className="mb-4 border-rose-200 bg-rose-50">
          <p className="text-sm font-semibold text-rose-700">{error}</p>
        </AdminCard>
      )}

      {!loading && !error && rows.length === 0 && (
        <AdminCard className="text-center py-12">
          <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-600">Belum ada section</p>
          <p className="text-xs text-slate-400 mt-1">
            Tambah section manual, atau jalankan Import di Dashboard bila
            database masih kosong.
          </p>
        </AdminCard>
      )}

      {!loading && rows.length > 0 && (
        <div className="space-y-3">
          {rows.map((r, i) => (
            <AdminListRow
              key={r.id}
              title={`${i + 1}. ${r.number_prefix ? `${r.number_prefix} ` : ""}${r.title}`}
              meta={
                <>
                  key <span className="font-mono">{r.section_key}</span> —{" "}
                  {r.paragraphs?.length ?? 0} paragraf,{" "}
                  {r.bullet_points?.length ?? 0} poin,{" "}
                  {r.code_snippet ? "1 kode, " : ""}
                  {r.media?.length ?? 0} media
                </>
              }
              busy={busy}
              onMoveUp={i > 0 ? () => void handleMove(r.id, "up") : undefined}
              onMoveDown={
                i < rows.length - 1 ? () => void handleMove(r.id, "down") : undefined
              }
              onEdit={() => setEditing(r)}
              onDelete={() => setDeleting(r)}
            />
          ))}
        </div>
      )}

      {(editing || creating) && (
        <SectionFormModal
          values={formValues}
          isEdit={!!editing}
          submitting={busy}
          onCancel={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSubmit={(v) => void handleSubmit(v)}
        />
      )}

      {deleting && (
        <ConfirmDeleteDialog
          label={`section "${deleting.title}"`}
          confirming={confirming}
          onCancel={() => setDeleting(null)}
          onConfirm={() => void handleDelete()}
        />
      )}
    </div>
  );
}

const SectionFormModal: React.FC<{
  values: SectionFormValues;
  isEdit: boolean;
  submitting: boolean;
  onCancel: () => void;
  onSubmit: (v: SectionFormValues) => void;
}> = ({ values, isEdit, submitting, onCancel, onSubmit }) => {
  const [form, setForm] = useState<SectionFormValues>(values);

  return (
    <AdminModal
      title={isEdit ? "Edit Section" : "Tambah Section"}
      onClose={onCancel}
      wide
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      >
        <div className="p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Section Key"
              required
              mono
              value={form.section_key}
              onChange={(v) => setForm({ ...form, section_key: v })}
              placeholder="pengertian-api"
            />
            <TextField
              label="Prefiks Nomor (opsional)"
              mono
              value={form.number_prefix}
              onChange={(v) => setForm({ ...form, number_prefix: v })}
              placeholder="1.1"
            />
          </div>
          <TextField
            label="Judul Section"
            required
            value={form.title}
            onChange={(v) => setForm({ ...form, title: v })}
          />

          <div className="pt-1 border-t border-slate-100">
            <p className="text-xs font-extrabold text-slate-700 uppercase tracking-wide mb-3 mt-4">
              Paragraf
            </p>
            <ParagraphListEditor
              value={form.paragraphs}
              onChange={(v) => setForm({ ...form, paragraphs: v })}
            />
          </div>

          <div className="pt-1 border-t border-slate-100">
            <p className="text-xs font-extrabold text-slate-700 uppercase tracking-wide mb-3 mt-4">
              Poin-poin
            </p>
            <BulletListEditor
              value={form.bullet_points}
              onChange={(v) => setForm({ ...form, bullet_points: v })}
            />
          </div>

          <div className="pt-1 border-t border-slate-100">
            <p className="text-xs font-extrabold text-slate-700 uppercase tracking-wide mb-3 mt-4">
              Code Snippet
            </p>
            <CodeSnippetEditor
              value={form.code_snippet ?? undefined}
              onChange={(v) => setForm({ ...form, code_snippet: v ?? null })}
            />
          </div>

          <div className="pt-1 border-t border-slate-100">
            <p className="text-xs font-extrabold text-slate-700 uppercase tracking-wide mb-3 mt-4">
              Media
            </p>
            <MediaListEditor
              value={form.media}
              onChange={(v) => setForm({ ...form, media: v })}
            />
          </div>
        </div>
        <FormModalActions submitting={submitting} onCancel={onCancel} />
      </form>
    </AdminModal>
  );
};
