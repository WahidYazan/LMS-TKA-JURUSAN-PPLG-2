"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Search, Inbox } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { describeError } from "@/lib/adminError";
import {
  createRow,
  deleteRow,
  duplicateRow,
  updateRow,
} from "@/lib/adminApi";
import type { QuizQuestionRow } from "@/lib/dbTypes";
import { getLocalStats } from "@/lib/stats";
import {
  AdminCard,
  AdminListRow,
  AdminPageHeader,
  FormModalActions,
  NumberField,
  TextAreaField,
} from "@/components/admin/AdminPrimitives";
import { AdminModal, ConfirmDeleteDialog } from "@/components/admin/AdminModal";
import { AdminListSkeleton } from "@/components/admin/AdminLoading";

interface QuestionFormValues {
  module_num: number;
  case_text: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

const emptyForm = (moduleNum: number): QuestionFormValues => ({
  module_num: moduleNum,
  case_text: "",
  options: ["", "", "", ""],
  correct_index: 0,
  explanation: "",
});

export default function AdminQuizPage() {
  const [rows, setRows] = useState<QuizQuestionRow[]>([]);
  // Konfigurasi Supabase bersifat tetap, jadi cukup dinilai sekali di initial state.
  const [loading, setLoading] = useState(() => !!supabase);
  const [error, setError] = useState<string | null>(() =>
    supabase ? null : "Supabase belum dikonfigurasi (.env.local)",
  );
  const [search, setSearch] = useState("");
  const [openModule, setOpenModule] = useState<number | null>(1);
  const [editing, setEditing] = useState<QuizQuestionRow | null>(null);
  const [creatingModule, setCreatingModule] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<QuizQuestionRow | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error: err } = await supabase
        .from("quiz_questions")
        .select("*")
        .order("module_num")
        .order("sort_order");
      if (err) throw err;
      setRows((data ?? []) as QuizQuestionRow[]);
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

  const filtered = rows.filter(
    (r) =>
      search.trim() === "" ||
      r.case_text.toLowerCase().includes(search.toLowerCase()) ||
      r.options.some((o) => o.toLowerCase().includes(search.toLowerCase())),
  );

  const handleSubmit = async (values: QuestionFormValues) => {
    setBusy(true);
    try {
      if (editing) {
        await updateRow("quiz_questions", editing.id, {
          ...values,
          options: values.options,
        });
      } else {
        await createRow("quiz_questions", { ...values });
      }
      setEditing(null);
      setCreatingModule(null);
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
      await deleteRow("quiz_questions", deleting.id);
      setDeleting(null);
      await load();
    } catch (err: unknown) {
      alert(describeError("Gagal menghapus", err));
    } finally {
      setConfirming(false);
    }
  };

  const handleToggleVisible = async (row: QuizQuestionRow) => {
    setBusy(true);
    try {
      await updateRow("quiz_questions", row.id, {
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
      await duplicateRow("quiz_questions", id);
      await load();
    } catch (err: unknown) {
      alert(describeError("Gagal menduplikat", err));
    } finally {
      setBusy(false);
    }
  };

  const formOpen = editing !== null || creatingModule !== null;
  const formValues = editing
    ? {
        module_num: editing.module_num,
        case_text: editing.case_text,
        options: editing.options,
        correct_index: editing.correct_index,
        explanation: editing.explanation,
      }
    : emptyForm(creatingModule ?? 1);

  return (
    <div>
      <AdminPageHeader
        title="Soal Quiz"
        kicker="Konten · Simulasi Ujian"
        description={`${rows.length} soal dalam database. Urutan tampil di quiz diacak untuk setiap pengunjung.`}
      />

      <div className="relative mb-5">
        <Search
          className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari soal / opsi..."
          className="w-full pl-10 pr-3 py-2.5 min-h-[44px] rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-shadow"
        />
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
          <p className="text-sm font-bold text-slate-600">
            Database belum berisi soal
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Gunakan tombol <strong>Import Sekarang</strong> di Dashboard untuk
            menyalin {getLocalStats().totalQuestions} soal bawaan, atau tambah
            manual lewat tombol modul di bawah.
          </p>
        </AdminCard>
      )}

      {!loading && rows.length > 0 && (
        <div className="space-y-3">
          {[...new Set(rows.map((r) => r.module_num))].sort((a, b) => a - b).map((num) => {
            const moduleRows = filtered.filter((r) => r.module_num === num);
            const isOpen = openModule === num;
            return (
              <div
                key={num}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
              >
                <div className="flex items-center gap-2 p-3 sm:p-4">
                  <button
                    onClick={() => setOpenModule(isOpen ? null : num)}
                    className="flex-1 flex items-center gap-2.5 cursor-pointer min-h-[40px] text-left"
                    aria-expanded={isOpen}
                  >
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-xs font-extrabold shrink-0">
                      {num}
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      Modul {num}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      {moduleRows.length} soal
                    </span>
                  </button>
                  <button
                    onClick={() => setCreatingModule(num)}
                    className="px-3 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-sm cursor-pointer min-h-[36px] transition-colors shrink-0"
                  >
                    + Tambah
                  </button>
                </div>
                {isOpen && (
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2">
                    {moduleRows.length === 0 && (
                      <p className="text-xs text-slate-400 py-2">
                        Tidak ada soal yang cocok dengan pencarian.
                      </p>
                    )}
                    {moduleRows.map((r, i) => (
                      <AdminListRow
                        key={r.id}
                        title={`${i + 1}. ${r.case_text.slice(0, 90)}${r.case_text.length > 90 ? "..." : ""}`}
                        meta={`Jawaban benar: ${String.fromCharCode(65 + r.correct_index)} — ${r.options[r.correct_index]?.slice(0, 60)}`}
                        busy={busy}
                        visible={r.is_visible !== false}
                        onToggleVisible={() => void handleToggleVisible(r)}
                        onDuplicate={() => void handleDuplicate(r.id)}
                        onEdit={() => setEditing(r)}
                        onDelete={() => setDeleting(r)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {formOpen && (
        <QuestionFormModal
          values={formValues}
          submitting={busy}
          onCancel={() => {
            setEditing(null);
            setCreatingModule(null);
          }}
          onSubmit={(v) => void handleSubmit(v)}
        />
      )}

      {deleting && (
        <ConfirmDeleteDialog
          label={`soal "${deleting.case_text.slice(0, 50)}..."`}
          confirming={confirming}
          onCancel={() => setDeleting(null)}
          onConfirm={() => void handleDelete()}
        />
      )}
    </div>
  );
}

const QuestionFormModal: React.FC<{
  values: QuestionFormValues;
  submitting: boolean;
  onCancel: () => void;
  onSubmit: (v: QuestionFormValues) => void;
}> = ({ values, submitting, onCancel, onSubmit }) => {
  const [form, setForm] = useState<QuestionFormValues>(values);

  return (
    <AdminModal
      title={values.case_text ? "Edit Soal" : "Tambah Soal"}
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
          <NumberField
            label="Nomor Modul"
            value={form.module_num}
            min={1}
            max={5}
            onChange={(v) => setForm({ ...form, module_num: v })}
          />
          <TextAreaField
            label="Kasus / Soal"
            required
            rows={4}
            value={form.case_text}
            onChange={(v) => setForm({ ...form, case_text: v })}
          />

          <div>
            <p className="text-xs font-bold text-slate-600 mb-2">
              Opsi Jawaban <span className="text-rose-500">*</span>
              <span className="font-normal text-slate-400 ml-1">
                (pilih radio = kunci benar)
              </span>
            </p>
            <div className="space-y-2">
              {form.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correct"
                    checked={form.correct_index === i}
                    onChange={() => setForm({ ...form, correct_index: i })}
                    className="w-4 h-4 accent-sky-600 shrink-0 cursor-pointer"
                    aria-label={`Tandai opsi ${String.fromCharCode(65 + i)} sebagai benar`}
                  />
                  <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-extrabold shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <input
                    type="text"
                    required
                    value={opt}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        options: form.options.map((old, idx) =>
                          idx === i ? e.target.value : old,
                        ),
                      })
                    }
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
                    placeholder={`Opsi ${String.fromCharCode(65 + i)}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <TextAreaField
            label="Penjelasan / Pembahasan"
            rows={3}
            value={form.explanation}
            onChange={(v) => setForm({ ...form, explanation: v })}
          />
        </div>
        <FormModalActions submitting={submitting} onCancel={onCancel} />
      </form>
    </AdminModal>
  );
};
