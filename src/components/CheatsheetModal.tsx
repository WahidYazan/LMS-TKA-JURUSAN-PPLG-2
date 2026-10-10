import React, { useState } from 'react';
import { X, Search, FileText, Check, Copy } from 'lucide-react';
import { cheatsheetData } from '../data/cheatsheet';

interface CheatsheetModalProps {
  onClose: () => void;
}

export const CheatsheetModal: React.FC<CheatsheetModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('git');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const currentSection = cheatsheetData.find(s => s.id === activeTab) || cheatsheetData[0];

  const filteredItems = currentSection.items.filter(item => 
    item.commandOrConcept.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.example && item.example.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Rangkuman TKA PPLG
              </h3>
              <p className="text-xs text-slate-500">
                Bank formula, sintaks ringkas, dan standar kompetensi Rekayasa Perangkat Lunak
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {cheatsheetData.map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === sec.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sec.category}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari konsep / perintah..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[#f8fafc]">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-400">
              Tidak ada hasil yang sesuai dengan kata kunci "{searchQuery}"
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const uniqueKey = `${activeTab}-${idx}`;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 shadow-xs transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded inline-block">
                      {item.commandOrConcept}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                    {item.example && (
                      <div className="mt-1 font-mono text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200/60 inline-block">
                        {item.example}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleCopy(item.example || item.commandOrConcept, uniqueKey)}
                    className="self-start sm:self-center flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-blue-600 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-blue-50 cursor-pointer shrink-0 transition-colors"
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
