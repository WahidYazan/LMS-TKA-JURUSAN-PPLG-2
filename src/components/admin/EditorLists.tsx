"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { TextAreaField, TextField, SelectField } from "./AdminPrimitives";
import type { ModuleBulletPoint, ModuleMedia } from "../../types";

const AddButton: React.FC<{ onClick: () => void; label: string }> = ({
  onClick,
  label,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-slate-300 hover:border-sky-400 hover:bg-sky-50/50 text-xs font-bold text-slate-600 cursor-pointer transition-colors min-h-[40px]"
  >
    <Plus className="w-3.5 h-3.5" aria-hidden="true" />
    {label}
  </button>
);

export const ParagraphListEditor: React.FC<{
  value: string[];
  onChange: (v: string[]) => void;
}> = ({ value, onChange }) => (
  <div className="space-y-3">
    {value.map((p, i) => (
      <div key={i} className="flex items-start gap-2">
        <div className="flex-1">
          <TextAreaField
            label={`Paragraf ${i + 1}`}
            value={p}
            rows={3}
            onChange={(v) =>
              onChange(value.map((old, idx) => (idx === i ? v : old)))
            }
          />
        </div>
        <button
          type="button"
          onClick={() => onChange(value.filter((_, idx) => idx !== i))}
          className="mt-6 p-2 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer shrink-0"
          aria-label={`Hapus paragraf ${i + 1}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ))}
    <AddButton
      onClick={() => onChange([...value, ""])}
      label="Tambah paragraf"
    />
  </div>
);

export const BulletListEditor: React.FC<{
  value: ModuleBulletPoint[];
  onChange: (v: ModuleBulletPoint[]) => void;
}> = ({ value, onChange }) => (
  <div className="space-y-3">
    {value.map((b, i) => (
      <div key={i} className="p-3 rounded-xl border border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase">
            Poin {i + 1}
          </span>
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer"
            aria-label={`Hapus poin ${i + 1}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <TextField
          label="Label"
          value={b.label}
          onChange={(v) =>
            onChange(value.map((old, idx) => (idx === i ? { ...old, label: v } : old)))
          }
        />
        <TextAreaField
          label="Deskripsi"
          value={b.description}
          rows={2}
          onChange={(v) =>
            onChange(
              value.map((old, idx) =>
                idx === i ? { ...old, description: v } : old,
              ),
            )
          }
        />
      </div>
    ))}
    <AddButton
      onClick={() => onChange([...value, { label: "", description: "" }])}
      label="Tambah poin"
    />
  </div>
);

export const CodeSnippetEditor: React.FC<{
  value: { language: string; code: string; explanation?: string } | undefined;
  onChange: (
    v: { language: string; code: string; explanation?: string } | undefined,
  ) => void;
}> = ({ value, onChange }) => {
  if (!value) {
    return (
      <AddButton
        onClick={() => onChange({ language: "text", code: "" })}
        label="Tambah code snippet"
      />
    );
  }
  return (
    <div className="p-3 rounded-xl border border-slate-200 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-400 uppercase">
          Code Snippet
        </span>
        <button
          type="button"
          onClick={() => onChange(undefined)}
          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer"
          aria-label="Hapus code snippet"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <SelectField
        label="Bahasa"
        value={value.language}
        onChange={(v) => onChange({ ...value, language: v })}
        options={[
          { value: "text", label: "Text" },
          { value: "javascript", label: "JavaScript" },
          { value: "typescript", label: "TypeScript" },
          { value: "sql", label: "SQL" },
          { value: "bash", label: "Bash" },
          { value: "html", label: "HTML" },
          { value: "json", label: "JSON" },
        ]}
      />
      <TextAreaField
        label="Kode"
        mono
        rows={5}
        value={value.code}
        onChange={(v) => onChange({ ...value, code: v })}
      />
      <TextField
        label="Penjelasan (opsional)"
        value={value.explanation ?? ""}
        onChange={(v) => onChange({ ...value, explanation: v || undefined })}
      />
    </div>
  );
};

export const MediaListEditor: React.FC<{
  value: ModuleMedia[];
  onChange: (v: ModuleMedia[]) => void;
}> = ({ value, onChange }) => (
  <div className="space-y-3">
    {value.map((m, i) => (
      <div key={i} className="p-3 rounded-xl border border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase">
            Media {i + 1}
          </span>
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer"
            aria-label={`Hapus media ${i + 1}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <SelectField
          label="Tipe"
          value={m.type}
          onChange={(v) =>
            onChange(
              value.map((old, idx) =>
                idx === i ? { ...old, type: v as "image" | "video" } : old,
              ),
            )
          }
          options={[
            { value: "image", label: "Gambar" },
            { value: "video", label: "Video" },
          ]}
        />
        <TextField
          label="URL (src)"
          value={m.src}
          onChange={(v) =>
            onChange(value.map((old, idx) => (idx === i ? { ...old, src: v } : old)))
          }
          placeholder="https://..."
        />
        {m.type === "image" && /^https?:\/\//.test(m.src) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={m.src}
            alt={m.alt || "Preview"}
            className="w-full h-24 object-cover rounded-lg border border-slate-200"
          />
        )}
        <TextField
          label="Alt (opsional)"
          value={m.alt ?? ""}
          onChange={(v) =>
            onChange(
              value.map((old, idx) =>
                idx === i ? { ...old, alt: v || undefined } : old,
              ),
            )
          }
        />
        <TextField
          label="Caption (opsional)"
          value={m.caption ?? ""}
          onChange={(v) =>
            onChange(
              value.map((old, idx) =>
                idx === i ? { ...old, caption: v || undefined } : old,
              ),
            )
          }
        />
      </div>
    ))}
    <AddButton
      onClick={() => onChange([...value, { type: "image", src: "" }])}
      label="Tambah media"
    />
  </div>
);
