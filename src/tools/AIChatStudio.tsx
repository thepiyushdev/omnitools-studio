import React, { useState } from 'react';
import { Bot, Send, FileDown, Sparkles, Copy, Check, RotateCw, Lightbulb } from 'lucide-react';
import { askGeminiWithFallback, exportTextToPDF } from '../utils/geminiFallback';

export const AIChatStudio: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; text: string; keyUsed?: number }>>([
    {
      role: 'ai',
      text: "Hello! I am your OmniAI Copilot with automatic 4-Key Failover. Ask me to formulate a startup architecture, draft documentation, or convert any business idea into a downloadable PDF."
    }
  ]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const quickPrompts = [
    "Draft a SaaS Product Requirements Document (PRD)",
    "Generate a 30-day content strategy for developers",
    "Analyze micro-service architecture tradeoffs"
  ];

  async function handleSend(customText?: string) {
    const textToSend = customText || prompt;
    if (!textToSend.trim() || loading) return;

    setPrompt('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setLoading(true);

    try {
      const res = await askGeminiWithFallback(textToSend);
      setMessages(prev => [...prev, { role: 'ai', text: res.text, keyUsed: res.usedKeyIndex }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `Notice: ${err.message}` 
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-pink-50 via-amber-50 to-rose-50 border border-pink-200/70 p-4 sm:p-5 rounded-3xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-md shadow-pink-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-slate-900 text-base sm:text-lg">OmniAI Intelligence Studio</h2>
              <span className="bg-amber-400/20 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                4x Multi-Key Fallback
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Automated failover model & 1-click formatted PDF generator</p>
          </div>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {quickPrompts.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            className="text-[11px] font-semibold bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full shrink-0 flex items-center gap-1.5 shadow-xs transition hover:border-pink-300"
          >
            <Lightbulb className="w-3 h-3 text-amber-500" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Chat Viewport */}
      <div className="bg-white border border-slate-200/90 rounded-3xl flex flex-col h-[520px] shadow-sm overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-3xl max-w-[92%] sm:max-w-[80%] text-xs sm:text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-tr-xs shadow-md shadow-pink-500/10'
                  : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-xs space-y-3'
              }`}>
                <div className="whitespace-pre-wrap">{m.text}</div>

                {m.role === 'ai' && idx > 0 && (
                  <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between gap-3 text-[11px]">
                    <span className="text-slate-400 font-medium">
                      {m.keyUsed ? `⚡ Gemini Cluster Node #${m.keyUsed}` : 'OmniAI Engine'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(m.text, idx)}
                        className="text-slate-500 hover:text-slate-800 flex items-center gap-1 transition"
                      >
                        {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={() => exportTextToPDF("AI_Strategic_Plan", m.text)}
                        className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs transition"
                      >
                        <FileDown className="w-3 h-3" />
                        <span>Export PDF</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-200 w-fit animate-pulse">
              <RotateCw className="w-3.5 h-3.5 animate-spin text-pink-600" />
              <span>OmniAI generating response (Fallback monitor active)...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-50/80 border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question or request a system concept..."
            className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !prompt.trim()}
            className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-50 text-white px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-pink-600/20 transition active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
