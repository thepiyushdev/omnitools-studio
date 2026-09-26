import React, { useState } from 'react';
import { Regex } from 'lucide-react';

export const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [text, setText] = useState('Send inquiries to contact@omnitools.io or dev@studio.com');

  let matches: string[] = [];
  try {
    matches = text.match(new RegExp(pattern, 'g')) || [];
  } catch (e) {}

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-bold">
            <Regex className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Regex Matcher</h3>
            <p className="text-xs text-slate-500">Live regular expression engine</p>
          </div>
        </div>

        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-pink-600 font-bold focus:outline-none"
        />

        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-800 focus:outline-none"
        />

        <div className="pt-2">
          <span className="text-xs font-bold text-slate-700 block mb-2">Matches ({matches.length})</span>
          <div className="flex flex-wrap gap-2">
            {matches.map((m, i) => (
              <span key={i} className="bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg text-xs font-mono font-bold">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
