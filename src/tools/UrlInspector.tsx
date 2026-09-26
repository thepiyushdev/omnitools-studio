import React, { useState } from 'react';
import { Link2, Sparkles, Copy, Check } from 'lucide-react';

export const UrlInspector: React.FC = () => {
  const [url, setUrl] = useState('https://store.apple.com/us/shop/buy-iphone?model=pro&storage=256gb&color=natural_titanium&ref=omnitools');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const samples = [
    { name: "E-Commerce Query", url: "https://amazon.in/dp/B0CX23?tag=affiliate_99&ref=deals_hub&sort=low_to_high" },
    { name: "YouTube Video Timestamp", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s&list=PL12345" },
    { name: "Google Search Query", url: "https://www.google.com/search?q=omnitools+saas+2026&hl=en&gl=in" }
  ];

  let parsed: any = null;
  let params: [string, string][] = [];

  try {
    const u = new URL(url);
    parsed = u;
    params = Array.from(u.searchParams.entries());
  } catch (e) {}

  function copy(val: string, key: string) {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-bold">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">URL Inspector & Query Studio</h3>
              <p className="text-xs text-slate-500">Deconstruct endpoints & analyze parameters</p>
            </div>
          </div>
        </div>

        {/* Quick Sample Chips */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase tracking-wide">Test with Samples</span>
          <div className="flex flex-wrap gap-2">
            {samples.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setUrl(s.url)}
                className="text-[11px] bg-slate-100 hover:bg-pink-50 hover:text-pink-600 border border-slate-200 px-3 py-1.5 rounded-full font-semibold text-slate-600 transition"
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Target URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
          />
        </div>

        {parsed ? (
          <div className="space-y-3 pt-1">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-slate-400 font-bold text-[10px] block">PROTOCOL</span>
                <span className="text-slate-800 font-mono font-bold">{parsed.protocol}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-slate-400 font-bold text-[10px] block">HOSTNAME</span>
                <span className="text-pink-600 font-mono font-bold">{parsed.hostname}</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100/80 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-700 flex justify-between">
                <span>Extracted Query Params ({params.length})</span>
                <span className="text-slate-400 font-normal">Key &rarr; Value</span>
              </div>
              {params.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400 font-medium">
                  No query parameters found in this URL. Try clicking a sample above!
                </div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {params.map(([k, v], i) => (
                    <div key={i} className="p-3 px-4 flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-slate-800">{k}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 bg-pink-50 px-2 py-0.5 rounded border border-pink-100">{v}</span>
                        <button onClick={() => copy(v, k)} className="text-slate-400 hover:text-slate-800">
                          {copiedKey === k ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-xs text-rose-500 font-bold bg-rose-50 p-3 rounded-xl">Invalid URL format. Include http:// or https://</div>
        )}
      </div>
    </div>
  );
};
