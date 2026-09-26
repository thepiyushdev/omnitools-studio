import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download } from 'lucide-react';

export const QRGenerator: React.FC = () => {
  const [text, setText] = useState('https://omnitools.vercel.app');
  const [darkColor, setDarkColor] = useState('#0f172a');
  const [lightColor, setLightColor] = useState('#ffffff');
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    if (!text.trim()) return;
    QRCode.toDataURL(text, {
      width: 400,
      margin: 2,
      color: { dark: darkColor, light: lightColor }
    }).then(setQrUrl).catch(console.error);
  }, [text, darkColor, lightColor]);

  function downloadQR() {
    const a = document.createElement('a');
    a.href = qrUrl;
    a.download = 'omnitools_qr.png';
    a.click();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 border border-pink-200 text-pink-600 flex items-center justify-center font-bold">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">QR Code Studio</h3>
              <p className="text-xs text-slate-500">Customized high-resolution vector QR builder</p>
            </div>
          </div>
          
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Target URL or Plain Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Foreground</label>
              <input type="color" value={darkColor} onChange={(e) => setDarkColor(e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl p-1 cursor-pointer" />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Background</label>
              <input type="color" value={lightColor} onChange={(e) => setLightColor(e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl p-1 cursor-pointer" />
            </div>
          </div>

          <button
            onClick={downloadQR}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-pink-500/20 hover:opacity-95 transition"
          >
            <Download className="w-4 h-4" /> Download PNG
          </button>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
          {qrUrl ? (
            <img src={qrUrl} alt="QR Code" className="w-48 h-48 rounded-xl shadow-md border border-white" />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-xs text-slate-400">Rendering...</div>
          )}
          <span className="text-[11px] font-medium text-slate-400 mt-3">Scan with any smartphone camera</span>
        </div>
      </div>
    </div>
  );
};
