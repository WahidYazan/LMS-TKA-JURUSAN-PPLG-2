"use client";

import React from "react";
import { Pencil, Trash2, ArrowUp, ArrowDown, Plus } from "lucide-react";

export const AdminPageHeader: React.FC<{
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}> = ({ title, description, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
    <div>
      <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900">
        {title}
      </h1>
      {description && (
        <p className="text-xs sm:text-sm text-slate-500 mt-1">{description}</p>
      )}
    </div>
    {action && (
      <button
        onClick={action.onClick}
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold shadow-lg shadow-sky-500/25 transition-all cursor-pointer min-h-[44px] w-fit active:scale-[0.98]"
      >
        <Plus className="w-4 h-4" aria-hidden="true" />
        {action.label}
      </button>
    )}
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
  busy?: boolean;
}> = ({ title, meta, onEdit, onDelete, onMoveUp, onMoveDown, busy }) => (
  <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-sky-300 transition-colors">
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold text-slate-800 truncate">{title}</p>
      {meta && (
        <p className="text-[11px] text-slate-400 mt-0.5 truncate">{meta}</p>
      )}
    </div>
    <div className="flex items-center gap-1 shrink-0">
      {onMoveUp && (
        <button
          onClick={onMoveUp}
          disabled={busy}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors disabled:opacity-40"
          aria-label="Naikkan urutan"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
      {onMoveDown && (
        <button
          onClick={onMoveDown}
          disabled={busy}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors disabled:opacity-40"
          aria-label="Turunkan urutan"
        >
          <ArrowDown className="w-4 h-4" />
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

export const TextField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  mono?: boolean;
}> = ({ label, value, onChange, placeholder, required, mono }) => (
  <div>
    <label className="block text-xs font-bold text-slate-600 mb-1.5">
      {label}
      {required && <span className="text-rose-500"> *</span>}
    </label>
    <input
      type="text"
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 ${
        mono ? "font-mono" : ""
      }`}
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
    <label className="block text-xs font-bold text-slate-600 mb-1.5">
      {label}
    </label>
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(parseInt(e.target.value || "0", 10))}
      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
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
    <label className="block text-xs font-bold text-slate-600 mb-1.5">
      {label}
      {required && <span className="text-rose-500"> *</span>}
    </label>
    <textarea
      required={required}
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 resize-y ${
        mono ? "font-mono text-xs" : ""
      }`}
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
    <label className="block text-xs font-bold text-slate-600 mb-1.5">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
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
  <div className="px-5 sm:px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex gap-3 shrink-0 sticky bottom-0">
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
      className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm cursor-pointer min-h-[44px] shadow-md shadow-sky-500/20 transition-all disabled:opacity-60"
    >
      {submitting ? "Menyimpan..." : submitLabel}
    </button>
  </div>
);
