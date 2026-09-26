import React, { useState } from 'react';
import { Binary, Copy } from 'lucide-react';

export const Base64Tool: React.FC = () => {
  const [text, setText] = useState('OmniTools SaaS 2026');
  const [result, setResult] = useState('');

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center font-bold">
            <Binary className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Base64 Codec</h3>
            <p className="text-xs text-slate-500">Fast string encode and decode utility</p>
          </div>
        </div>

        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-800 focus:outline-none"
        />

        <div className="flex gap-2.5">
          <button onClick={() => setResult(btoa(text))} className="bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition">
            Encode
          </button>
          <button onClick={() => { try { setResult(atob(text)); } catch(e) { setResult('Invalid Base64'); } }} className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition">
            Decode
          </button>
        </div>

        {result && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center text-xs font-mono break-all text-slate-900">
            <span>{result}</span>
            <button onClick={() => navigator.clipboard.writeText(result)} className="text-pink-600 hover:underline shrink-0 ml-2">
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
