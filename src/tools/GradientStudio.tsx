import React, { useState } from 'react';
import { Palette, Copy } from 'lucide-react';

export const GradientStudio: React.FC = () => {
  const [c1, setC1] = useState('#f43f5e');
  const [c2, setC2] = useState('#fbbf24');
  const [deg, setDeg] = useState(135);

  const style = `linear-gradient(${deg}deg, ${c1}, ${c2})`;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-pink-50 border border-pink-200 text-pink-600 flex items-center justify-center font-bold">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">CSS Gradient Studio</h3>
            <p className="text-xs text-slate-500">Design dynamic modern UI background gradients</p>
          </div>
        </div>

        <div style={{ background: style }} className="w-full h-36 rounded-2xl shadow-inner flex items-center justify-center font-bold text-white text-xs drop-shadow">
          {style}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">Color 1</label>
            <input type="color" value={c1} onChange={(e) => setC1(e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl p-1 cursor-pointer" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">Color 2</label>
            <input type="color" value={c2} onChange={(e) => setC2(e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl p-1 cursor-pointer" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">Angle ({deg}°)</label>
            <input type="range" min="0" max="360" value={deg} onChange={(e) => setDeg(Number(e.target.value))} className="w-full mt-2 cursor-pointer" />
          </div>
        </div>

        <button onClick={() => navigator.clipboard.writeText(`background: ${style};`)} className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 transition">
          <Copy className="w-3.5 h-3.5" /> Copy CSS Code
        </button>
      </div>
    </div>
  );
};
