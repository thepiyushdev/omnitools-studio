import React, { useState } from 'react';
import { Braces, Copy, Minimize2, Check, RotateCcw } from 'lucide-react';

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState(`{
  "project": "OmniTools SaaS",
  "version": 2026,
  "theme": {
    "primary": "rose_pink",
    "secondary": "amber_yellow",
    "surface": "crisp_white"
  },
  "modules": ["AI-Cluster", "PDF-Engine", "Sandbox", "QR-Codec"]
}`);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function formatJson(spaces = 2) {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  }

  function minifyJson() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output || input);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Braces className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-sm text-slate-900">JSON Formatter & Validator</h3>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => formatJson(2)} 
            className="px-3.5 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold rounded-lg border border-pink-200 transition"
          >
            Prettify
          </button>
          <button 
            onClick={minifyJson} 
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 transition"
          >
            <Minimize2 className="w-3 h-3" /> Minify
          </button>
          <button 
            onClick={handleCopy} 
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg flex items-center gap-1 transition"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl font-bold">
          ⚠️ Syntax Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[420px]">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste raw or minified JSON here..."
          className="bg-white border border-slate-200 rounded-2xl p-4 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500/20 resize-none shadow-xs"
        />
        <div className="bg-slate-900 rounded-2xl p-4 flex flex-col shadow-xs overflow-hidden">
          <span className="text-[11px] font-mono text-slate-400 pb-2 border-b border-slate-800 mb-2">
            Output Window
          </span>
          <textarea
            readOnly
            value={output || input}
            className="flex-1 bg-transparent text-xs font-mono text-emerald-400 focus:outline-none resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
