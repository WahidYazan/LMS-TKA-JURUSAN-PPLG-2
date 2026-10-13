"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Inbox } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { describeError } from "@/lib/adminError";
import {
  createRow,
  deleteRow,
  duplicateRow,
  moveRow,
  updateRow,
} from "@/lib/adminApi";
import type { LandingFeatureRow, LandingStatRow } from "@/lib/dbTypes";
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
import ColorField from "@/components/admin/ColorField";
import { AdminListSkeleton } from "@/components/admin/AdminLoading";

type Tab = "stats" | "features";

export default function AdminLandingPage() {
  const [tab, setTab] = useState<Tab>("stats");
  const [stats, setStats] = useState<LandingStatRow[]>([]);
  const [features, setFeatures] = useState<LandingFeatureRow[]>([]);
  // Konfigurasi Supabase bersifat tetap, jadi cukup dinilai sekali di initial state.
  const [loading, setLoading] = useState(() => !!supabase);
  const [error, setError] = useState<string | null>(() =>
    supabase ? null : "Supabase belum dikonfigurasi (.env.local)",
  );
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const [statForm, setStatForm] = useState<
    { mode: "create" } | { mode: "edit"; row: LandingStatRow } | null
  >(null);
  const [deletingStat, setDeletingStat] = useState<LandingStatRow | null>(null);

  const [featureForm, setFeatureForm] = useState<
    { mode: "create" } | { mode: "edit"; row: LandingFeatureRow } | null
  >(null);
  const [deletingFeature, setDeletingFeature] =
    useState<LandingFeatureRow | null>(null);

  const load = useCallback(async () => {
    if (!supabase) return;
    try {
      const [
        { data: st, error: stErr },
        { data: ft, error: ftErr },
      ] = await Promise.all([
        supabase
          .from("landing_stats")
          .select("*")
          .order("sort_order", { ascending: true }),
        supabase
          .from("landing_features")
          .select("*")
          .order("sort_order", { ascending: true }),
      ]);
      if (stErr) throw stErr;
      if (ftErr) throw ftErr;
      setStats((st ?? []) as LandingStatRow[]);
      setFeatures((ft ?? []) as LandingFeatureRow[]);
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

  const submitStat = async (values: {
    value: string;
    label: string;
    color: string;
  }) => {
    await withBusy(async () => {
      if (statForm?.mode === "edit") {
        await updateRow("landing_stats", statForm.row.id, values);
      } else {
        await createRow("landing_stats", values);
      }
      setStatForm(null);
      await load();
    });
  };

  const submitFeature = async (values: {
    key: string;
    title: string;
    description: string;
    tone: string;
  }) => {
    await withBusy(async () => {
      if (featureForm?.mode === "edit") {
        await updateRow("landing_features", featureForm.row.id, values);
      } else {
        await createRow("landing_features", values);
      }
      setFeatureForm(null);
      await load();
    });
  };

  const rows = tab === "stats" ? stats : features;

  return (
    <div>
      <AdminPageHeader
        title="Landing Page"
        kicker="Konten · Halaman Depan"
        description="Statistik dan kartu fitur di halaman depan."
        action={{
          label: tab === "stats" ? "Tambah Statistik" : "Tambah Fitur",
          onClick: () =>
            tab === "stats"
              ? setStatForm({ mode: "create" })
              : setFeatureForm({ mode: "create" }),
        }}
      />

      <div
        className="inline-flex items-center gap-1 p-1 mb-5 rounded-xl bg-white border border-slate-200 shadow-xs"
        role="tablist"
        aria-label="Bagian landing page"
      >
        {(
          [
            { id: "stats", label: `Statistik (${stats.length})` },
            { id: "features", label: `Fitur (${features.length})` },
          ] as { id: Tab; label: string }[]
        ).map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer min-h-[40px] ${
              tab === t.id
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {t.label}
          </button>
        ))}
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
            Belum ada data di bagian ini
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Gunakan <strong>Import Sekarang</strong> di Dashboard untuk menyalin
            data bawaan.
          </p>
        </AdminCard>
      )}

      {!loading && tab === "stats" && stats.map((r, i) => (
        <div key={r.id} className={i > 0 ? "mt-2" : ""}>
          <AdminListRow
            title={`${r.value} — ${r.label}`}
            meta={<span className="font-mono">{r.color}</span>}
            busy={busy}
            visible={r.is_visible !== false}
            onToggleVisible={() =>
              void withBusy(async () => {
                await updateRow("landing_stats", r.id, {
                  is_visible: r.is_visible === false,
                });
                await load();
              })
            }
            onDuplicate={() =>
              void withBusy(async () => {
                await duplicateRow("landing_stats", r.id);
                await load();
              })
            }
            onMoveUp={
              i > 0
                ? () =>
                    void withBusy(async () => {
                      await moveRow("landing_stats", r.id, "up");
                      await load();
                    })
                : undefined
            }
            onMoveDown={
              i < stats.length - 1
                ? () =>
                    void withBusy(async () => {
                      await moveRow("landing_stats", r.id, "down");
                      await load();
                    })
                : undefined
            }
            onEdit={() => setStatForm({ mode: "edit", row: r })}
            onDelete={() => setDeletingStat(r)}
          />
        </div>
      ))}

      {!loading &&
        tab === "features" &&
        features.map((r, i) => (
          <div key={r.id} className={i > 0 ? "mt-2" : ""}>
            <AdminListRow
              title={r.title}
              meta={
                <>
                  key <span className="font-mono">{r.key}</span> — tone{" "}
                  <span className="font-mono">{r.tone}</span> —{" "}
                  {r.description.slice(0, 70)}
                  {r.description.length > 70 ? "..." : ""}
                </>
              }
              busy={busy}
              visible={r.is_visible !== false}
              onToggleVisible={() =>
                void withBusy(async () => {
                  await updateRow("landing_features", r.id, {
                    is_visible: r.is_visible === false,
                  });
                  await load();
                })
              }
              onDuplicate={() =>
                void withBusy(async () => {
                  await duplicateRow("landing_features", r.id);
                  await load();
                })
              }
              onMoveUp={
                i > 0
                  ? () =>
                      void withBusy(async () => {
                        await moveRow("landing_features", r.id, "up");
                        await load();
                      })
                  : undefined
              }
              onMoveDown={
                i < features.length - 1
                  ? () =>
                      void withBusy(async () => {
                        await moveRow("landing_features", r.id, "down");
                        await load();
                      })
                  : undefined
              }
              onEdit={() => setFeatureForm({ mode: "edit", row: r })}
              onDelete={() => setDeletingFeature(r)}
            />
          </div>
        ))}

      {statForm && (
        <StatFormModal
          title={statForm.mode === "edit" ? "Edit Statistik" : "Tambah Statistik"}
          initial={
            statForm.mode === "edit"
              ? {
                  value: statForm.row.value,
                  label: statForm.row.label,
                  color: statForm.row.color,
                }
              : { value: "", label: "", color: "#0284c7" }
          }
          submitting={busy}
          onCancel={() => setStatForm(null)}
          onSubmit={(v) => void submitStat(v)}
        />
      )}

      {featureForm && (
        <FeatureFormModal
          title={
            featureForm.mode === "edit" ? "Edit Fitur" : "Tambah Fitur"
          }
          initial={
            featureForm.mode === "edit"
              ? {
                  key: featureForm.row.key,
                  title: featureForm.row.title,
                  description: featureForm.row.description,
                  tone: featureForm.row.tone,
                }
              : { key: "", title: "", description: "", tone: "#2563eb" }
          }
          submitting={busy}
          onCancel={() => setFeatureForm(null)}
          onSubmit={(v) => void submitFeature(v)}
        />
      )}

      {deletingStat && (
        <ConfirmDeleteDialog
          label={`statistik "${deletingStat.label}"`}
          confirming={confirming}
          onCancel={() => setDeletingStat(null)}
          onConfirm={() =>
            void withBusy(async () => {
              setConfirming(true);
              try {
                await deleteRow("landing_stats", deletingStat.id);
                setDeletingStat(null);
                await load();
              } finally {
                setConfirming(false);
              }
            })
          }
        />
      )}

      {deletingFeature && (
        <ConfirmDeleteDialog
          label={`fitur "${deletingFeature.title}"`}
          confirming={confirming}
          onCancel={() => setDeletingFeature(null)}
          onConfirm={() =>
            void withBusy(async () => {
              setConfirming(true);
              try {
                await deleteRow("landing_features", deletingFeature.id);
                setDeletingFeature(null);
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

const StatFormModal: React.FC<{
  title: string;
  initial: { value: string; label: string; color: string };
  submitting: boolean;
  onCancel: () => void;
  onSubmit: (v: { value: string; label: string; color: string }) => void;
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
            label="Angka / Nilai"
            required
            value={form.value}
            onChange={(v) => setForm({ ...form, value: v })}
            placeholder="50+"
          />
          <TextField
            label="Label"
            required
            value={form.label}
            onChange={(v) => setForm({ ...form, label: v })}
            placeholder="Soal Kasus HOTS"
          />
          <ColorField
            label="Warna Angka"
            value={form.color}
            onChange={(v) => setForm({ ...form, color: v })}
          />
          <p className="text-[11px] text-slate-400">
            Klik kotak warna untuk color picker lengkap (geser hue/saturasi),
            atau pilih salah satu preset bulat.
          </p>
        </div>
        <FormModalActions submitting={submitting} onCancel={onCancel} />
      </form>
    </AdminModal>
  );
};

const FeatureFormModal: React.FC<{
  title: string;
  initial: { key: string; title: string; description: string; tone: string };
  submitting: boolean;
  onCancel: () => void;
  onSubmit: (v: {
    key: string;
    title: string;
    description: string;
    tone: string;
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
            label="Key"
            required
            mono
            value={form.key}
            onChange={(v) => setForm({ ...form, key: v })}
            placeholder="soal-hots"
          />
          <TextField
            label="Judul"
            required
            value={form.title}
            onChange={(v) => setForm({ ...form, title: v })}
          />
          <TextAreaField
            label="Deskripsi"
            required
            rows={3}
            value={form.description}
            onChange={(v) => setForm({ ...form, description: v })}
          />
          <ColorField
            label="Warna Ikon Kartu"
            value={form.tone}
            onChange={(v) => setForm({ ...form, tone: v })}
          />
        </div>
        <FormModalActions submitting={submitting} onCancel={onCancel} />
      </form>
    </AdminModal>
  );
};
