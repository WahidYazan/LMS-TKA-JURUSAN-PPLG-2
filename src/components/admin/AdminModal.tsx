"use client";

import React, { useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";

export const AdminModal: React.FC<{
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}> = ({ title, onClose, children, wide }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`bg-white rounded-2xl w-full ${
          wide ? "max-w-3xl" : "max-w-xl"
        } max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 sm:px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <h3 className="text-base font-extrabold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export const ConfirmDeleteDialog: React.FC<{
  label: string;
  detail?: string;
  confirming: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}> = ({ label, detail, confirming, onCancel, onConfirm }) => (
  <AdminModal title="Konfirmasi Hapus" onClose={onCancel}>
    <div className="p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">
            Hapus {label}?
          </p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {detail ?? "Tindakan ini tidak bisa dibatalkan."}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm cursor-pointer min-h-[44px] transition-colors"
        >
          Batal
        </button>
        <button
          onClick={onConfirm}
          disabled={confirming}
          className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm cursor-pointer min-h-[44px] transition-colors disabled:opacity-60"
        >
          {confirming ? "Menghapus..." : "Ya, Hapus"}
        </button>
      </div>
    </div>
  </AdminModal>
);
