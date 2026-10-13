"use client";

import React, { useState, useEffect } from 'react';
import { X, Search, Check, Copy, Terminal } from 'lucide-react';
import { loadCheatsheet } from '../lib/content';
import { cheatsheetData as defaultCheatsheet } from '../data/cheatsheet';
import { useContent } from '../hooks/useContent';

interface CheatsheetModalProps {
  onClose: () => void;
}

export const CheatsheetModal: React.FC<CheatsheetModalProps> = ({ onClose }) => {
  const { data: cheatsheetData, loading } = useContent(loadCheatsheet, defaultCheatsheet);
  const activeCheatsheet = cheatsheetData && cheatsheetData.length > 0 ? cheatsheetData : defaultCheatsheet;
  const [activeTab, setActiveTab] = useState<string>('git');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const sections = activeCheatsheet;
  const currentSection =
    sections.find(s => s.id === activeTab) || sections[0];

  const filteredItems = currentSection
    ? currentSection.items.filter(item =>
        item.commandOrConcept.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.example && item.example.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Cheatsheet & Rangkuman TKA PPLG
              </h3>
              <p className="text-xs text-slate-500">
                Sintaks ringkas, status kode, dan prinsip inti Rekayasa Perangkat Lunak
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-slate-100 rounded-xl">
            {sections.map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === sec.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sec.category}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari konsep atau perintah..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-[#f8fafc]">
          {loading ? (
            <div className="text-center py-12 text-xs text-slate-400 animate-pulse">
              Memuat rangkuman materi...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-400">
              Tidak ada hasil yang sesuai dengan &ldquo;{searchQuery}&rdquo;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const uniqueKey = `${activeTab}-${idx}`;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 shadow-xs transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md inline-block border border-blue-100">
                      {item.commandOrConcept}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                    {item.example && (
                      <div className="mt-1 font-mono text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 inline-block overflow-x-auto max-w-full">
                        {item.example}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleCopy(item.example || item.commandOrConcept, uniqueKey)}
                    className="self-start sm:self-center flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-blue-50 cursor-pointer shrink-0 transition-colors"
                  >
                    {copiedKey === uniqueKey ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600">Disalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
