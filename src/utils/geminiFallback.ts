import { jsPDF } from 'jspdf';

export interface AIResponse {
  text: string;
  usedKeyIndex: number;
}

export async function askGeminiWithFallback(prompt: string): Promise<AIResponse> {
  // Read keys strictly from Vercel / Vite Environment Variables
  const envKeys = [
    import.meta.env.VITE_GEMINI_KEY_1,
    import.meta.env.VITE_GEMINI_KEY_2,
    import.meta.env.VITE_GEMINI_KEY_3,
    import.meta.env.VITE_GEMINI_KEY_4,
  ].filter(k => typeof k === 'string' && k.trim().length > 10) as string[];

  if (envKeys.length === 0) {
    throw new Error("API Key setup pending in Vercel Environment (VITE_GEMINI_KEY_1).");
  }

  let lastError: any = null;

  for (let i = 0; i < envKeys.length; i++) {
    const key = envKeys[i].trim();
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
      
      const payload = {
        contents: [
          {
            role: "user",
            parts: [{ text: `You are an elite product architect & strategist. Provide crisp, high-value, structured output.\n\nTask:\n${prompt}` }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2500,
        }
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(`Key #${i + 1} rejected:${errJson.error?.message || res.statusText}`);
      }

      const data = await res.json();
      const output = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!output) throw new Error("Empty candidate received");

      return { text: output, usedKeyIndex: i + 1 };
    } catch (err: any) {
      console.warn(`[Fallback Engine] Key #${i + 1} failed:${err.message}`);
      lastError = err;
      // Failover to next key
    }
  }

  throw new Error(`All ${envKeys.length} failover keys failed. Last error: ${lastError?.message}`);
}

// Crisp White/Pink Accent PDF Exporter
export function exportTextToPDF(title: string, textContent: string) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Gradient-like Top Header Accent Bar (Pink to Yellow tone)
  doc.setFillColor(244, 63, 94); // Rose Pink
  doc.rect(0, 0, 105, 5, 'F');
  doc.setFillColor(245, 158, 11); // Amber Yellow
  doc.rect(105, 0, 105, 5, 'F');

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text(title.replace(/_/g, ' ').toUpperCase(), 14, 20);

  // Subtitle
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text(`OmniTools SaaS Export · Generated on ${new Date().toLocaleDateString()}`, 14, 26);
  doc.setDrawColor(241, 245, 249);
  doc.line(14, 30, 196, 30);

  // Content
  doc.setFontSize(10.5);
  doc.setTextColor(51, 65, 85);
  const clean = textContent.replace(/[*#_`]/g, '');
  const lines = doc.splitTextToSize(clean, 182);
  let y = 38;
  const pageHeight = doc.internal.pageSize.height;

  for (let i = 0; i < lines.length; i++) {
    if (y > pageHeight - 16) {
      doc.addPage();
      doc.setFillColor(244, 63, 94);
      doc.rect(0, 0, 210, 4, 'F');
      y = 20;
    }
    doc.text(lines[i], 14, y);
    y += 5.8;
  }

  doc.save(`${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`);
}
