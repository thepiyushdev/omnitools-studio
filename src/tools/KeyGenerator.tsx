import React, { useState, useEffect } from 'react';
import { KeyRound, RefreshCw, Copy, Check, ShieldCheck } from 'lucide-react';

export const KeyGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [uuid, setUuid] = useState('');
  const [apiKeyToken, setApiKeyToken] = useState('');
  const [length, setLength] = useState(24);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  function generateAll(len = length) {
    // 1. Hardware Secure Password
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+~';
    const array = new Uint32Array(len);
    crypto.getRandomValues(array);
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += chars[array[i] % chars.length];
    }
    setPassword(pwd);

    // 2. UUID v4
    setUuid(crypto.randomUUID());

    // 3. Modern API Secret Token (sk_live_...)
    const hex = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0')).join('');
    setApiKeyToken(`sk_live_${hex}`);
  }

  // Khulte hi auto-generate hoga
  useEffect(() => {
    generateAll();
  }, []);

  function copy(val: string, type: string) {
    navigator.clipboard.writeText(val);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1500);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-bold">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Crypto & UUID Studio</h3>
              <p className="text-xs text-slate-500">Hardware-level entropy generator</p>
            </div>
          </div>
          <button 
            onClick={() => generateAll()} 
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Re-roll
          </button>
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
            <span>Strong Password ({length} chars)</span>
            <span className="text-amber-600 font-mono">Entropy: High</span>
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              readOnly 
              value={password} 
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-900 font-bold" 
            />
            <button 
              onClick={() => copy(password, 'pwd')} 
              className="bg-slate-100 hover:bg-slate-200 px-3.5 rounded-xl text-slate-700 transition"
            >
              {copiedType === 'pwd' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-[11px] text-slate-400 font-medium">Length: {length}</span>
            <input 
              type="range" 
              min="12" 
              max="48" 
              value={length} 
              onChange={(e) => {
                const val = Number(e.target.value);
                setLength(val);
                generateAll(val);
              }} 
              className="flex-1 accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* UUID */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">RFC UUID v4 Token</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              readOnly 
              value={uuid} 
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-pink-600 font-bold" 
            />
            <button 
              onClick={() => copy(uuid, 'uuid')} 
              className="bg-slate-100 hover:bg-slate-200 px-3.5 rounded-xl text-slate-700 transition"
            >
              {copiedType === 'uuid' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* API Secret Key */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">SaaS Live Secret Key</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              readOnly 
              value={apiKeyToken} 
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-indigo-600 font-bold" 
            />
            <button 
              onClick={() => copy(apiKeyToken, 'api')} 
              className="bg-slate-100 hover:bg-slate-200 px-3.5 rounded-xl text-slate-700 transition"
            >
              {copiedType === 'api' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
