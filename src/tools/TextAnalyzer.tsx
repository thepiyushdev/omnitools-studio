import React, { useState } from 'react';
import { AlignLeft, Copy, Check } from 'lucide-react';

export const TextAnalyzer: React.FC = () => {
  const [text, setText] = useState('OmniTools SaaS features a dynamic Bento grid with pink, white and amber yellow aesthetic design.');
  const [copied, setCopied] = useState(false);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const readTime = Math.ceil(words / 200);

  function copyText() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-bold">
              <AlignLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Text & Content Metrics</h3>
              <p className="text-xs text-slate-500">Live statistics & string transformation</p>
            </div>
          </div>
          <button 
            onClick={copyText} 
            className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 text-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
            <span className="text-[10px] font-bold text-slate-400 block">WORDS</span>
            <span className="text-2xl font-black text-slate-900">{words}</span>
          </div>
          <div className="bg-pink-50 p-3.5 rounded-2xl border border-pink-100 text-center">
            <span className="text-[10px] font-bold text-pink-500 block">CHARS</span>
            <span className="text-2xl font-black text-pink-600">{chars}</span>
          </div>
          <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-100 text-center">
            <span className="text-[10px] font-bold text-amber-600 block">READ TIME</span>
            <span className="text-2xl font-black text-amber-600">{readTime}m</span>
          </div>
        </div>

        {/* Quick Format Transformers */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button onClick={() => setText(text.toUpperCase())} className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg font-bold text-slate-700">
            UPPERCASE
          </button>
          <button onClick={() => setText(text.toLowerCase())} className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg font-bold text-slate-700">
            lowercase
          </button>
          <button onClick={() => setText(text.replace(/\b\w/g, l => l.toUpperCase()))} className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg font-bold text-slate-700">
            Title Case
          </button>
          <button onClick={() => setText(text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-'))} className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg font-bold text-slate-700">
            slug-url
          </button>
        </div>

        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs leading-relaxed text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
        />
      </div>
    </div>
  );
};
