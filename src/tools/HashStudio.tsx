import React, { useState, useEffect } from 'react';
import { ShieldCheck, Copy, Check } from 'lucide-react';

export const HashStudio: React.FC = () => {
  const [text, setText] = useState('OmniTools SaaS 2026');
  const [sha256, setSha256] = useState('');
  const [sha512, setSha512] = useState('');
  const [sha1, setSha1] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function calculateHashes(input: string) {
    if (!input) {
      setSha256('');
      setSha512('');
      setSha1('');
      return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    // SHA-256
    const hash256 = await crypto.subtle.digest('SHA-256', data);
    setSha256(Array.from(new Uint8Array(hash256)).map(b => b.toString(16).padStart(2, '0')).join(''));

    // SHA-512
    const hash512 = await crypto.subtle.digest('SHA-512', data);
    setSha512(Array.from(new Uint8Array(hash512)).map(b => b.toString(16).padStart(2, '0')).join(''));

    // SHA-1
    const hash1 = await crypto.subtle.digest('SHA-1', data);
    setSha1(Array.from(new Uint8Array(hash1)).map(b => b.toString(16).padStart(2, '0')).join(''));
  }

  useEffect(() => {
    calculateHashes(text);
  }, [text]);

  function copy(val: string, key: string) {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-pink-50 border border-pink-200 text-pink-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Hash & Checksum Studio</h3>
            <p className="text-xs text-slate-500">Real-time SHA cryptographic hashing engine</p>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Input String</label>
          <textarea
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type text to generate cryptographic hash..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          />
        </div>

        <div className="space-y-3 pt-1">
          {/* SHA-256 */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>SHA-256 (Standard)</span>
              <button onClick={() => copy(sha256, '256')} className="text-pink-600 flex items-center gap-1 font-semibold text-[11px]">
                {copiedKey === '256' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === '256' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono break-all text-slate-800">
              {sha256}
            </div>
          </div>

          {/* SHA-1 */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>SHA-1</span>
              <button onClick={() => copy(sha1, '1')} className="text-pink-600 flex items-center gap-1 font-semibold text-[11px]">
                {copiedKey === '1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === '1' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono break-all text-slate-800">
              {sha1}
            </div>
          </div>

          {/* SHA-512 */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>SHA-512 (Ultra High Security)</span>
              <button onClick={() => copy(sha512, '512')} className="text-pink-600 flex items-center gap-1 font-semibold text-[11px]">
                {copiedKey === '512' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === '512' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono break-all text-slate-800 max-h-24 overflow-y-auto">
              {sha512}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
