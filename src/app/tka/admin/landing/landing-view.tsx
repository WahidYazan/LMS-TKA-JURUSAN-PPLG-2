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
import { AdminModal, ConfirmDeleteDialog } from "@/components/admin/AdminModal";
import ColorField from "@/components/admin/ColorField";
import { AdminListSkeleton } from "@/components/admin/AdminLoading";

type Tab = "stats" | "features" | "settings";

export default function AdminLandingPage() {
  const [tab, setTab] = useState<Tab>("stats");
  const [stats, setStats] = useState<LandingStatRow[]>([]);
  const [features, setFeatures] = useState<LandingFeatureRow[]>([]);
  const [sectionVisibility, setSectionVisibility] = useState<{
    landing_hero_visible: boolean;
    landing_stats_visible: boolean;
    landing_curriculum_visible: boolean;
    landing_features_visible: boolean;
    landing_official_visible: boolean;
    landing_cta_visible: boolean;
    landing_stats_width: "auto" | "full";
    landing_features_width: "auto" | "full";
  }>({
    landing_hero_visible: true,
    landing_stats_visible: true,
    landing_curriculum_visible: true,
    landing_features_visible: true,
    landing_official_visible: true,
    landing_cta_visible: true,
    landing_stats_width: "auto",
    landing_features_width: "auto",
  });
  // Konfigurasi Supabase bersifat tetap, jadi cukup dinilai sekali di initial state.
  const [loading, setLoading] = useState(() => !!supabase);
  const [settingsLoading, setSettingsLoading] = useState(!!supabase);
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
      const [{ data: st, error: stErr }, { data: ft, error: ftErr }] =
        await Promise.all([
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

  const loadSettings = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", [
          "landing_hero_visible",
          "landing_stats_visible",
          "landing_features_visible",
          "landing_curriculum_visible",
          "landing_official_visible",
          "landing_cta_visible",
          "landing_stats_width",
          "landing_features_width",
        ]);
      if (error) throw error;
      const map = new Map((data ?? []).map((r) => [r.key, r.value]));
      setSectionVisibility({
        landing_hero_visible: map.get("landing_hero_visible") !== "false",
        landing_stats_visible: map.get("landing_stats_visible") !== "false",
        landing_features_visible:
          map.get("landing_features_visible") !== "false",
        landing_curriculum_visible:
          map.get("landing_curriculum_visible") !== "false",
        landing_official_visible:
          map.get("landing_official_visible") !== "false",
        landing_cta_visible: map.get("landing_cta_visible") !== "false",
        landing_stats_width:
          (map.get("landing_stats_width") as "auto" | "full") || "auto",
        landing_features_width:
          (map.get("landing_features_width") as "auto" | "full") || "auto",
      });
    } catch (err: unknown) {
      console.error("Gagal memuat pengaturan visibilitas:", err);
    } finally {
      setSettingsLoading(false);
    }
  }, []);

  useEffect(() => {
    const run = async () => {
      await Promise.all([load(), loadSettings()]);
    };
    void run();
  }, [load, loadSettings]);

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
    subtitle?: string;
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

  const rows = tab === "stats" ? stats : tab === "features" ? features : null;

  const saveSectionVisibility = async (key: string, value: boolean) => {
    if (!supabase) return;
    await withBusy(async () => {
      try {
        await supabase!
          .from("site_settings")
          .upsert({ key, value: value ? "true" : "false" });
        setSectionVisibility((prev) => ({ ...prev, [key]: value }));
      } catch (err: unknown) {
        alert(describeError("Gagal menyimpan", err));
      }
    });
  };

  const saveSectionWidth = async (key: string, value: "auto" | "full") => {
    if (!supabase) return;
    await withBusy(async () => {
      try {
        await supabase!.from("site_settings").upsert({ key, value });
        setSectionVisibility((prev) => ({ ...prev, [key]: value }));
      } catch (err: unknown) {
        alert(describeError("Gagal menyimpan", err));
      }
    });
  };

  return (
    <div>
      <AdminPageHeader
        title="Landing Page"
        kicker="Konten · Halaman Depan"
        description="Statistik, kartu fitur, dan visibilitas section halaman depan."
        action={
          tab === "stats"
            ? {
                label: "Tambah Statistik",
                onClick: () => setStatForm({ mode: "create" }),
              }
            : tab === "features"
              ? {
                  label: "Tambah Fitur",
                  onClick: () => setFeatureForm({ mode: "create" }),
                }
              : undefined
        }
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
            { id: "settings", label: "Visibilitas Section" },
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

      {!loading && !error && rows && rows.length === 0 && (
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

      {!loading &&
        tab === "stats" &&
        stats.map((r, i) => (
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

      {!loading && !settingsLoading && tab === "settings" && (
        <AdminCard className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Visibilitas Section Landing Page
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Atur section mana yang ditampilkan di halaman depan. Section yang
            di-hide akan hilang sepenuhnya dari tampilan pengguna.
          </p>
          <div className="space-y-4">
            {[
              {
                key: "landing_hero_visible",
                label: "Hero / Banner Utama",
                desc: "Banner utama dengan judul, deskripsi, dan CTA utama",
              },
              {
                key: "landing_stats_visible",
                label: "Statistik",
                desc: "Kotak angka statistik (modul, soal, standar, akses)",
              },
              {
                key: "landing_curriculum_visible",
                label: "Kurikulum",
                desc: "Daftar modul dan materi pembelajaran",
              },
              {
                key: "landing_features_visible",
                label: "Kartu Fitur",
                desc: "Grid fitur unggulan (soal HOTS, cheatsheet, kurikulum, akses bebas)",
              },
              {
                key: "landing_official_visible",
                label: "Official / Resmi",
                desc: "Section kerjasama/akreditasi resmi",
              },
              {
                key: "landing_cta_visible",
                label: "Call to Action",
                desc: "Section ajakan bergabung/mulai belajar di bagian bawah",
              },
            ].map((section) => {
              const key = section.key as keyof typeof sectionVisibility;
              return (
                <div
                  key={section.key}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">
                      {section.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {section.desc}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sectionVisibility[key] as boolean}
                      onChange={(e) =>
                        saveSectionVisibility(section.key, e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                  </label>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Lebar Container (Width Mode)
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Mode &quot;Auto&quot;: Container menyesuaikan lebar berdasarkan jumlah item
              (semakin sedikit item, semakin sempit). Mode &quot;Full&quot;: Container
              memenuhi lebar layar penuh.
            </p>
            <div className="space-y-4">
              {[
                {
                  key: "landing_stats_width",
                  label: "Statistik",
                  options: ["auto", "full"] as const,
                },
                {
                  key: "landing_features_width",
                  label: "Kartu Fitur",
                  options: ["auto", "full"] as const,
                },
              ].map((section) => (
                <div
                  key={section.key}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">
                      {section.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {section.options[0] === "auto"
                        ? "Auto: menyesuaikan jumlah kartu"
                        : "Full: lebar penuh layar"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {section.options.map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={section.key}
                          value={opt}
                          checked={
                            sectionVisibility[
                              section.key as keyof typeof sectionVisibility
                            ] === opt
                          }
                          onChange={(e) =>
                            saveSectionWidth(
                              section.key,
                              e.target.value as "auto" | "full",
                            )
                          }
                          className="w-4 h-4 text-sky-600 border-slate-300 focus:ring-sky-500"
                        />
                        <span className="text-sm font-medium text-slate-700 capitalize">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminCard>
      )}

      {statForm && (
        <StatFormModal
          title={
            statForm.mode === "edit" ? "Edit Statistik" : "Tambah Statistik"
          }
          initial={
            statForm.mode === "edit"
              ? {
                  value: statForm.row.value,
                  label: statForm.row.label,
                  color: statForm.row.color,
                  subtitle: statForm.row.subtitle,
                }
              : { value: "", label: "", color: "#0284c7", subtitle: "" }
          }
          submitting={busy}
          onCancel={() => setStatForm(null)}
          onSubmit={(v) => void submitStat(v)}
        />
      )}

      {featureForm && (
        <FeatureFormModal
          title={featureForm.mode === "edit" ? "Edit Fitur" : "Tambah Fitur"}
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
  initial: { value: string; label: string; color: string; subtitle?: string };
  submitting: boolean;
  onCancel: () => void;
  onSubmit: (v: {
    value: string;
    label: string;
    color: string;
    subtitle?: string;
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
          <TextField
            label="Subtitle (opsional)"
            value={form.subtitle ?? ""}
            onChange={(v) => setForm({ ...form, subtitle: v })}
            placeholder="Materi Kejuruan PPLG"
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
