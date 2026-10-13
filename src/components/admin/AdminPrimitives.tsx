"use client";

import React from "react";
import { Pencil, Trash2, ArrowUp, ArrowDown, Plus, Eye, EyeOff, Copy } from "lucide-react";

/**
 * Header halaman admin: kicker mono + judul tebal + deskripsi + aksi.
 * `kicker` opsional (cth: "Konten / 02") untuk memberi identitas tiap halaman
 * tanpa mengubah API lama title/description/action.
 */
export const AdminPageHeader: React.FC<{
  title: string;
  description?: string;
  kicker?: string;
  action?: { label: string; onClick: () => void };
}> = ({ title, description, kicker, action }) => (
  <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-xs mb-6">
    {/* pita aksen + pola blueprint samar di sisi kanan */}
    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-sky-400 via-sky-500 to-blue-600" aria-hidden="true" />
    <div
      className="absolute -right-8 -top-10 w-48 h-48 bg-blueprint opacity-60 pointer-events-none"
      aria-hidden="true"
    />
    <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 pl-6 pr-5 py-5 sm:pr-6 sm:py-6">
      <div className="min-w-0">
        {kicker && (
          <p className="font-mono text-[10.5px] font-semibold tracking-[0.2em] uppercase text-sky-600 mb-1.5">
            {kicker}
          </p>
        )}
        <h1 className="text-xl sm:text-[26px] font-extrabold tracking-[-0.02em] leading-tight text-slate-900 text-balance">
          {title}
        </h1>
        {description && (
          <p className="text-[13px] sm:text-sm text-slate-500 mt-1.5 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white text-sm font-bold shadow-lg shadow-sky-500/25 transition-all cursor-pointer min-h-[44px] w-fit active:scale-[0.98] shrink-0"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          {action.label}
        </button>
      )}
    </div>
  </div>
);

export const AdminCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 ${className}`}
  >
    {children}
  </div>
);

export const AdminListRow: React.FC<{
  title: string;
  meta?: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onToggleVisible?: () => void;
  onDuplicate?: () => void;
  visible?: boolean;
  busy?: boolean;
}> = ({
  title,
  meta,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  onToggleVisible,
  onDuplicate,
  visible = true,
  busy,
}) => (
  <div
    className={`group flex items-center gap-3 p-3 sm:p-4 rounded-xl border bg-white transition-all ${
      visible
        ? "border-slate-200 hover:border-sky-300 hover:shadow-[0_2px_10px_-4px_rgba(2,132,199,0.25)]"
        : "border-slate-200 bg-slate-50/60 opacity-60"
    }`}
  >
    {/* indikator kiri: garis tipis yang muncul saat hover/aktif */}
    <span
      aria-hidden="true"
      className={`self-stretch w-0.5 rounded-full shrink-0 transition-colors ${
        visible ? "bg-slate-200 group-hover:bg-sky-500" : "bg-slate-200"
      }`}
    />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 min-w-0">
        <p className="text-sm font-bold text-slate-800 truncate">{title}</p>
        {!visible && (
          <span className="shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
            <EyeOff className="w-3 h-3" aria-hidden="true" />
            Tersembunyi
          </span>
        )}
      </div>
      {meta && (
        <p className="text-[11px] text-slate-400 mt-0.5 truncate">{meta}</p>
      )}
    </div>
    <div className="flex items-center gap-1 shrink-0">
      {onMoveUp && (
        <button
          onClick={onMoveUp}
          disabled={busy}
          className="p-2 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 cursor-pointer transition-colors disabled:opacity-40"
          aria-label="Naikkan urutan"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
      {onMoveDown && (
        <button
          onClick={onMoveDown}
          disabled={busy}
          className="p-2 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 cursor-pointer transition-colors disabled:opacity-40"
          aria-label="Turunkan urutan"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      )}
      {onToggleVisible && (
        <button
          onClick={onToggleVisible}
          disabled={busy}
          className="p-2 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 cursor-pointer transition-colors disabled:opacity-40"
          aria-label={
            visible ? "Sembunyikan dari publik" : "Tampilkan ke publik"
          }
          title={visible ? "Sembunyikan dari publik" : "Tampilkan ke publik"}
        >
          {visible ? (
            <Eye className="w-4 h-4" />
          ) : (
            <EyeOff className="w-4 h-4" />
          )}
        </button>
      )}
      {onDuplicate && (
        <button
          onClick={onDuplicate}
          disabled={busy}
          className="p-2 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 cursor-pointer transition-colors disabled:opacity-40"
          aria-label="Duplikat"
          title="Duplikat"
        >
          <Copy className="w-4 h-4" />
        </button>
      )}
      {onEdit && (
        <button
          onClick={onEdit}
          disabled={busy}
          className="p-2 rounded-lg text-sky-600 hover:bg-sky-50 cursor-pointer transition-colors disabled:opacity-40"
          aria-label="Edit"
        >
          <Pencil className="w-4 h-4" />
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          disabled={busy}
          className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors disabled:opacity-40"
          aria-label="Hapus"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  </div>
);

const inputBase =
  "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-shadow";

const labelBase =
  "block text-xs font-bold text-slate-700 mb-1.5 tracking-tight";

export const TextField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  mono?: boolean;
}> = ({ label, value, onChange, placeholder, required, mono }) => (
  <div>
    <label className={labelBase}>
      {label}
      {required && <span className="text-rose-500"> *</span>}
    </label>
    <input
      type="text"
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${inputBase} ${mono ? "font-mono" : ""}`}
    />
  </div>
);

export const NumberField: React.FC<{
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}> = ({ label, value, onChange, min, max }) => (
  <div>
    <label className={labelBase}>{label}</label>
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(parseInt(e.target.value || "0", 10))}
      className={inputBase}
    />
  </div>
);

export const TextAreaField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  mono?: boolean;
}> = ({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
  required,
  mono,
}) => (
  <div>
    <label className={labelBase}>
      {label}
      {required && <span className="text-rose-500"> *</span>}
    </label>
    <textarea
      required={required}
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputBase} resize-y ${mono ? "font-mono text-xs" : ""}`}
    />
  </div>
);

export const SelectField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}> = ({ label, value, onChange, options }) => (
  <div>
    <label className={labelBase}>{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputBase} cursor-pointer`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

export const ImageUrlField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
}> = ({ label, value, onChange }) => {
  const looksLikeUrl = /^https?:\/\//.test(value);
  return (
    <div>
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        placeholder="https://..."
      />
      {looksLikeUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="Preview"
          className="mt-2 w-full h-24 object-cover rounded-xl border border-slate-200"
        />
      )}
    </div>
  );
};

export const FormModalActions: React.FC<{
  submitting: boolean;
  onCancel: () => void;
  submitLabel?: string;
}> = ({ submitting, onCancel, submitLabel = "Simpan" }) => (
  <div className="px-5 sm:px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex gap-3 shrink-0 sticky bottom-0 backdrop-blur-sm">
    <button
      type="button"
      onClick={onCancel}
      className="flex-1 sm:flex-none sm:w-32 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm cursor-pointer min-h-[44px] transition-colors"
    >
      Batal
    </button>
    <button
      type="submit"
      disabled={submitting}
      className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-bold text-sm cursor-pointer min-h-[44px] shadow-md shadow-sky-500/25 transition-all disabled:opacity-60"
    >
      {submitting ? "Menyimpan..." : submitLabel}
    </button>
  </div>
);
