import React, { useState } from 'react';
import { 
  Bot, QrCode, ShieldCheck, FileText, Braces, KeyRound, 
  Binary, Palette, Link2, Regex, AlignLeft, Sparkles,
  ArrowLeft, ArrowUpRight, Zap
} from 'lucide-react';

import { AIChatStudio } from './tools/AIChatStudio';
import { QRGenerator } from './tools/QRGenerator';
import { HashStudio } from './tools/HashStudio';
import { MarkdownToPdf } from './tools/MarkdownToPdf';
import { JsonFormatter } from './tools/JsonFormatter';
import { KeyGenerator } from './tools/KeyGenerator';
import { Base64Tool } from './tools/Base64Tool';
import { GradientStudio } from './tools/GradientStudio';
import { UrlInspector } from './tools/UrlInspector';
import { RegexTester } from './tools/RegexTester';
import { TextAnalyzer } from './tools/TextAnalyzer';

export default function App() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'ai',
      name: 'OmniAI Studio',
      desc: 'Smart AI with 4-key fallback engine & 1-click Idea-to-PDF export.',
      icon: Bot,
      category: 'Flagship AI',
      color: 'from-pink-500 to-rose-600',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      id: 'qr',
      name: 'QR Code Generator',
      desc: 'Build customized high-resolution QR codes with PNG download.',
      icon: QrCode,
      category: 'Branding',
      color: 'from-amber-400 to-yellow-500',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      id: 'hash',
      name: 'Hash & Checksum Studio',
      desc: 'Instant SHA-256, SHA-512 & SHA-1 cryptographic string hasher.',
      icon: ShieldCheck,
      category: 'Security',
      color: 'from-rose-500 to-pink-500',
      badgeColor: 'bg-pink-50 text-pink-700 border-pink-200'
    },
    {
      id: 'pdf',
      name: 'Markdown to PDF',
      desc: 'Convert documentation & notes into formatted printable PDFs.',
      icon: FileText,
      category: 'Document',
      color: 'from-amber-500 to-orange-500',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      id: 'json',
      name: 'JSON Prettifier',
      desc: 'Format, validate and minify complex JSON payload trees.',
      icon: Braces,
      category: 'Data',
      color: 'from-purple-500 to-indigo-600',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'crypto',
      name: 'Crypto & UUID Studio',
      desc: 'Generate cryptographic password strings and RFC UUID v4 tokens.',
      icon: KeyRound,
      category: 'Security',
      color: 'from-amber-400 to-yellow-600',
      badgeColor: 'bg-yellow-50 text-yellow-800 border-yellow-200'
    },
    {
      id: 'base64',
      name: 'Base64 Codec',
      desc: 'Encode and decode strings directly in your browser with zero latency.',
      icon: Binary,
      category: 'Codec',
      color: 'from-pink-500 to-rose-600',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      id: 'gradient',
      name: 'CSS Gradient Studio',
      desc: 'Interactive dual-tone gradient maker with one-click CSS copy.',
      icon: Palette,
      category: 'Design',
      color: 'from-rose-400 to-amber-400',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      id: 'url',
      name: 'URL Query Inspector',
      desc: 'Break down complex URLs into parsed protocol, host and query params.',
      icon: Link2,
      category: 'Network',
      color: 'from-amber-500 to-yellow-500',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      id: 'regex',
      name: 'Regex Pattern Tester',
      desc: 'Test regex expressions live against text with dynamic match highlight.',
      icon: Regex,
      category: 'Logic',
      color: 'from-pink-600 to-rose-600',
      badgeColor: 'bg-pink-50 text-pink-700 border-pink-200'
    },
    {
      id: 'analyzer',
      name: 'Word & Text Metrics',
      desc: 'Analyze word count, character count, and average reading time.',
      icon: AlignLeft,
      category: 'Content',
      color: 'from-yellow-400 to-amber-500',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafc] text-slate-800 flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200/80 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTool(null)}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-pink-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-black text-slate-900 text-base sm:text-lg tracking-tight flex items-center gap-1.5">
              OmniTools <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full">STUDIO</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">11-in-1 Modern SaaS Suite</p>
          </div>
        </div>

        {activeTool ? (
          <button
            onClick={() => setActiveTool(null)}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-full transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Tools</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold bg-pink-50 text-pink-600 border border-pink-200 px-3 py-1 rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3 fill-pink-500" /> 100% Client-Side
            </span>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8">
        
        {/* VIEW 1: Bento Grid Dashboard */}
        {!activeTool && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-pink-100/60 via-amber-50 to-rose-100/50 border border-pink-200/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
              <div className="max-w-xl space-y-2">
                <span className="text-xs font-black tracking-wider uppercase text-pink-600 bg-pink-100 px-2.5 py-1 rounded-md">
                  Developer & Creator Toolkit
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  High-velocity utilities with zero server downtime.
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Select any tool below to launch instantly. Powered by Gemini failover clusters, client-side PDF compilers, and hardware crypto hashing.
                </p>
              </div>
            </div>

            {/* 11 Interactive Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {tools.map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.id}
                    onClick={() => setActiveTool(t.id)}
                    className="bg-white hover:bg-slate-50/50 border border-slate-200/90 hover:border-pink-300 rounded-3xl p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition duration-200 cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${t.color} text-white flex items-center justify-center shadow-md shadow-pink-500/10 group-hover:scale-105 transition`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${t.badgeColor}`}>
                          {t.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-pink-600 transition flex items-center justify-between">
                        <span>{t.name}</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-pink-500 transition" />
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {t.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center text-[11px] font-bold text-slate-400 group-hover:text-slate-700 transition">
                      <span>Launch tool &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: Selected Tool View */}
        {activeTool && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 pb-2">
              <button onClick={() => setActiveTool(null)} className="hover:underline font-semibold text-slate-600">
                Dashboard
              </button>
              <span>/</span>
              <span className="font-bold text-slate-900 capitalize">{activeTool}</span>
            </div>

            {activeTool === 'ai' && <AIChatStudio />}
            {activeTool === 'qr' && <QRGenerator />}
            {activeTool === 'hash' && <HashStudio />}
            {activeTool === 'pdf' && <MarkdownToPdf />}
            {activeTool === 'json' && <JsonFormatter />}
            {activeTool === 'crypto' && <KeyGenerator />}
            {activeTool === 'base64' && <Base64Tool />}
            {activeTool === 'gradient' && <GradientStudio />}
            {activeTool === 'url' && <UrlInspector />}
            {activeTool === 'regex' && <RegexTester />}
            {activeTool === 'analyzer' && <TextAnalyzer />}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400 font-medium">
        OmniTools Studio · Designed with Pink, Yellow & Crisp White · 2026
      </footer>
    </div>
  );
}
