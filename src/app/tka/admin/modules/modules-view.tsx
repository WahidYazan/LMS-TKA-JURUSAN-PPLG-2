"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, Layers, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { describeError } from "@/lib/adminError";
import {
  createRow,
  deleteRow,
  duplicateRow,
  moveRow,
  updateRow,
} from "@/lib/adminApi";
import type { ModuleRow } from "@/lib/dbTypes";
import {
  AdminCard,
  AdminListRow,
  AdminPageHeader,
  FormModalActions,
  ImageUrlField,
  NumberField,
  TextAreaField,
  TextField,
} from "@/components/admin/AdminPrimitives";
import { AdminModal, ConfirmDeleteDialog } from "@/components/admin/AdminModal";
import { AdminListSkeleton } from "@/components/admin/AdminLoading";
import type { TableOfContentItem } from "@/types";

interface ModuleFormValues {
  slug: string;
  number: number;
  module_badge: string;
  title: string;
  card_title: string;
  short_desc: string;
  hero_image: string;
  table_of_contents: TableOfContentItem[];
}

const emptyForm: ModuleFormValues = {
  slug: "",
  number: 1,
  module_badge: "Modul 1",
  title: "",
  card_title: "",
  short_desc: "",
  hero_image: "",
  table_of_contents: [],
};

export default function AdminModulesPage() {
  const [rows, setRows] = useState<ModuleRow[]>([]);
  // Konfigurasi Supabase bersifat tetap, jadi cukup dinilai sekali di initial state.
  const [loading, setLoading] = useState(() => !!supabase);
  const [error, setError] = useState<string | null>(() =>
    supabase ? null : "Supabase belum dikonfigurasi (.env.local)",
  );
  const [editing, setEditing] = useState<ModuleRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<ModuleRow | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error: err } = await supabase
        .from("modules")
        .select("*")
        .order("sort_order", { ascending: true });
      if (err) throw err;
      setRows((data ?? []) as ModuleRow[]);
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

  const handleSubmit = async (values: ModuleFormValues) => {
    setBusy(true);
    try {
      if (editing) {
        await updateRow("modules", editing.id, { ...values });
      } else {
        await createRow("modules", { ...values });
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
      await deleteRow("modules", deleting.id);
      setDeleting(null);
      await load();
    } catch (err: unknown) {
      alert(describeError("Gagal menghapus", err));
    } finally {
      setConfirming(false);
    }
  };

  const handleMove = async (id: string, dir: "up" | "down") => {
    setBusy(true);
    try {
      await moveRow("modules", id, dir);
      await load();
    } catch (err: unknown) {
      alert(describeError("Gagal mengubah urutan", err));
    } finally {
      setBusy(false);
    }
  };

  const handleToggleVisible = async (row: ModuleRow) => {
    setBusy(true);
    try {
      await updateRow("modules", row.id, {
        is_visible: row.is_visible === false,
      });
      await load();
    } catch (err: unknown) {
      alert(describeError("Gagal mengubah visibilitas", err));
    } finally {
      setBusy(false);
    }
  };

  const handleDuplicate = async (id: string) => {
    setBusy(true);
    try {
      await duplicateRow("modules", id);
      await load();
    } catch (err: unknown) {
      alert(describeError("Gagal menduplikat", err));
    } finally {
      setBusy(false);
    }
  };

  const formValues: ModuleFormValues = editing
    ? {
        slug: editing.slug,
        number: editing.number,
        module_badge: editing.module_badge,
        title: editing.title,
        card_title: editing.card_title,
        short_desc: editing.short_desc,
        hero_image: editing.hero_image,
        table_of_contents: editing.table_of_contents ?? [],
      }
    : emptyForm;

  return (
    <div>
      <AdminPageHeader
        title="Materi Modul"
        description="Data modul (samping). Isi tiap section diedit di halaman detail modul."
        action={{ label: "Tambah Modul", onClick: () => setCreating(true) }}
      />

      {loading && <AdminListSkeleton rows={4} />}

      {error && !loading && (
        <AdminCard className="mb-4 border-rose-200 bg-rose-50">
          <p className="text-sm font-semibold text-rose-700">{error}</p>
        </AdminCard>
      )}

      {!loading && !error && rows.length === 0 && (
        <AdminCard className="text-center py-12">
          <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-600">
            Database belum berisi modul
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Gunakan <strong>Import Sekarang</strong> di Dashboard untuk menyalin
            5 modul bawaan, atau tambah manual.
          </p>
        </AdminCard>
      )}

      {!loading && rows.length > 0 && (
        <div className="space-y-3">
          {rows.map((r) => (
            <AdminListRow
              key={r.id}
              title={`${r.number}. ${r.title}`}
              meta={
                <>
                  slug <span className="font-mono">{r.slug}</span> —{" "}
                  {r.module_badge} — {r.short_desc.slice(0, 60)}
                </>
              }
              busy={busy}
              visible={r.is_visible !== false}
              onToggleVisible={() => void handleToggleVisible(r)}
              onDuplicate={() => void handleDuplicate(r.id)}
              onMoveUp={
                r !== rows[0] ? () => void handleMove(r.id, "up") : undefined
              }
              onMoveDown={
                r !== rows[rows.length - 1]
                  ? () => void handleMove(r.id, "down")
                  : undefined
              }
              onEdit={() => setEditing(r)}
              onDelete={() => setDeleting(r)}
            />
          ))}
        </div>
      )}

      {!loading && rows.length > 0 && (
        <AdminCard className="mt-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                Edit isi per modul
              </p>
              <p className="text-xs text-slate-500">
                Pilih modul di bawah untuk menambah / mengubah paragraf, poin,
                kode, dan media.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {rows.map((r) => (
              <Link
                key={r.id}
                href={`/tka/admin/modules/${r.id}`}
                className="px-3 py-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition-colors min-h-[36px] inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                {r.module_badge}
              </Link>
            ))}
          </div>
        </AdminCard>
      )}

      {(editing || creating) && (
        <ModuleFormModal
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
          label={`modul "${deleting.title}"`}
          detail="Semua section modul ini juga akan terhapus."
          confirming={confirming}
          onCancel={() => setDeleting(null)}
          onConfirm={() => void handleDelete()}
        />
      )}
    </div>
  );
}

const TocEditor: React.FC<{
  value: TableOfContentItem[];
  onChange: (v: TableOfContentItem[]) => void;
}> = ({ value, onChange }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <label className="text-xs font-bold text-slate-600">
        Daftar Isi (Daftar judul section)
      </label>
      <button
        type="button"
        onClick={() =>
          onChange([
            ...value,
            { id: `toc-${Date.now()}-${value.length}`, title: "" },
          ])
        }
        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-dashed border-slate-300 hover:border-sky-400 hover:bg-sky-50/50 text-[11px] font-bold text-slate-600 cursor-pointer transition-colors"
      >
        <Plus className="w-3 h-3" aria-hidden="true" />
        Tambah judul
      </button>
    </div>
    {value.map((item, i) => (
      <div key={item.id} className="flex items-center gap-2">
        <span className="text-[11px] font-bold text-slate-400 w-5 shrink-0">
          {i + 1}.
        </span>
        <input
          type="text"
          value={item.title}
          onChange={(e) =>
            onChange(
              value.map((old, idx) =>
                idx === i ? { ...old, title: e.target.value } : old,
              ),
            )
          }
          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
          placeholder="Judul section"
        />
        <button
          type="button"
          onClick={() => onChange(value.filter((_, idx) => idx !== i))}
          className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer shrink-0"
          aria-label={`Hapus judul ${i + 1}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ))}
    {value.length === 0 && (
      <p className="text-[11px] text-slate-400">
        Kosongkan jika modul tidak menampilkan daftar isi.
      </p>
    )}
  </div>
);

const ModuleFormModal: React.FC<{
  values: ModuleFormValues;
  isEdit: boolean;
  submitting: boolean;
  onCancel: () => void;
  onSubmit: (v: ModuleFormValues) => void;
}> = ({ values, isEdit, submitting, onCancel, onSubmit }) => {
  const [form, setForm] = useState<ModuleFormValues>(values);

  return (
    <AdminModal
      title={isEdit ? "Edit Modul" : "Tambah Modul"}
      onClose={onCancel}
      wide
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      >
        <div className="p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Slug URL"
              required
              mono
              value={form.slug}
              onChange={(v) => setForm({ ...form, slug: v })}
              placeholder="modul6"
            />
            <NumberField
              label="Nomor"
              value={form.number}
              min={1}
              onChange={(v) => setForm({ ...form, number: v })}
            />
            <TextField
              label="Badge Modul"
              required
              value={form.module_badge}
              onChange={(v) => setForm({ ...form, module_badge: v })}
              placeholder="Modul 1"
            />
            <TextField
              label="Judul Kartu"
              value={form.card_title}
              onChange={(v) => setForm({ ...form, card_title: v })}
              placeholder="Kosongkan bila sama dengan judul"
            />
          </div>
          <TextField
            label="Judul Lengkap"
            required
            value={form.title}
            onChange={(v) => setForm({ ...form, title: v })}
          />
          <TextAreaField
            label="Deskripsi Singkat"
            required
            rows={2}
            value={form.short_desc}
            onChange={(v) => setForm({ ...form, short_desc: v })}
          />
          <ImageUrlField
            label="URL Gambar Hero"
            value={form.hero_image}
            onChange={(v) => setForm({ ...form, hero_image: v })}
          />
          <TocEditor
            value={form.table_of_contents}
            onChange={(v) => setForm({ ...form, table_of_contents: v })}
          />
          <p className="text-[11px] text-slate-400">
            Slug menentukan alamat publik{" "}
            <code className="font-mono">/module/{form.slug || "slug"}</code> —
            jangan diubah bila URL lama harus tetap hidup.
          </p>
        </div>
        <FormModalActions submitting={submitting} onCancel={onCancel} />
      </form>
    </AdminModal>
  );
};
