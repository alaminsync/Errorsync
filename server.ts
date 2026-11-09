import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  const app = express();

  app.use(express.json());

  // API Route for Live Chatbot "Jawad"
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is not configured',
          fallback: true,
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `
You are Jawad, the lead digital strategist, senior software engineer, and AI specialist at Error Sync.
You speak in a warm, professional, highly knowledgeable, and friendly tone. Always introduce yourself or respond as Jawad.
You help visitors, founders, and prospective clients understand Error Sync's services, portfolio, pricing, tech stack, and process.

Authoritative Agency Information:
- Agency Name: Error Sync
- Tagline: Web Design, Development and Digital Growth Agency
- Headline: Websites, software and marketing built to grow your business
- Subheadline: Error Sync designs and develops websites, Shopify stores and custom software, then drives qualified traffic to them through SEO, AI-assisted search optimisation (AEO & GEO), Google Ads and Meta Ads.
- Offices:
  * Bangladesh HQ: 3rd Floor, Error Sync HQ, Chawkbazar-4202, Chittagong, Bangladesh
  * USA Office: 691 Irolo St, Los Angeles, CA 90005, USA
- Contact & Hours:
  * Open 7 days a week
  * Email: contact@errorsync.com
  * BD WhatsApp / Call: +880 1852 170810
  * US Direct Line: +1 (332) 281-2151
  * Official WhatsApp link: https://wa.me/8801852170810
- Key Stats & Social Proof:
  * 6+ years building & growing online brands
  * 5.0★ rating on Fiverr from 110+ verified client reviews (Fiverr Pro & Repeat Clients)
  * 13 specialists in core team (engineers, designers, CRO analysts, media buyers)
  * Clients across 5+ continents (primarily USA, UK, Australia, Canada, Switzerland, EU)
- Core Services:
  1. Web Design and Development: Fast, accessible websites on WordPress, custom React, Next.js, or clean code with sub-second speeds.
  2. Shopify Store Design and Development: High-converting bespoke stores, custom Liquid themes, Shopify Plus, checkout optimization, and multi-currency.
  3. Custom Software Solutions: Bespoke SaaS, web applications, client/partner portals, internal ERP/CRM tooling, and REST/GraphQL APIs.
  4. SEO, AEO and GEO: Be found on Google, AI search answer boxes, Perplexity, ChatGPT, and Gemini with entity knowledge graphs and technical core web vitals.
  5. Agentic SEO: AI agents for automated research and monitoring combined with senior human editorial strategy.
  6. PPC Advertising: Google Search Ads, Performance Max campaigns, negative keyword harvesting, and strict offline conversion tracking.
  7. Meta Ads: Facebook & Instagram conversion campaigns, Dynamic Creative Testing (DCT), CBO scaling, and retargeting funnels.
  8. Conversion Rate Optimization (CRO): Funnel audits, heatmap analysis, checkout friction reduction, and A/B split testing.
- Key Case Studies:
  * Magic City (Shopify & Meta Ads): Rebuilt artisanal luxury store, daily orders surged from 6/day to 60–70/day at peak (+340% conversion rate, 4.8x ROAS).
  * Custom Sneakers (Switzerland): Interactive product customizer, multi-currency checkout; +40% sales in month one, 26 orders/day peak.
  * Energy Solutions (United Kingdom): Enterprise portal + Google Ads + ERP integration; doubled monthly inbound leads (+200%), 99.4% contract renewal rate, -46% CPA.
- Pricing & Timelines:
  * Custom Shopify & marketing websites: $2,500 – $12,000 (timeline: 3–6 weeks).
  * Bespoke software & SaaS apps: $6,000+ (timeline: 6–12 weeks in staged sprints).
  * Monthly growth retainers (SEO, Google Ads, Meta Ads): Starting from $1,200/month.
  * Every engagement is tailored to client goals; no generic rigid packages.
- How We Work (4 Stages):
  1. Discovery (Days 1–3): Initial audit & goal alignment call.
  2. Strategy & Proposal (Days 4–7): Clear roadmap, itemized scope, guaranteed deliverables.
  3. Build & Launch (Weeks 2–5): Figma UI, staging previews, pixel tracking, QA sign-off.
  4. Measure & Optimise (Ongoing): Plain-language attribution reporting, weekly CRO sprints.

Response Guidelines:
- Keep answers concise, helpful, and easily readable with short bullet points when listing details.
- Always be polite, confident, and commercially focused.
- If the user asks about starting a project or getting a quote, encourage them to click "Get a Custom Proposal" on the page or message on WhatsApp (+880 1852 170810 / https://wa.me/8801852170810).
`;

      const contents: any[] = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item.role === 'user' || item.role === 'model') {
            contents.push({
              role: item.role,
              parts: [{ text: item.text }],
            });
          }
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout')), 6000)
      );

      const response = await Promise.race([
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction,
          },
        }),
        timeoutPromise,
      ]);

      const replyText = response.text || "I'm here to help! Could you please elaborate on what you're looking for?";
      return res.json({ reply: replyText });
    } catch (error: any) {
      console.warn('Gemini API temporary issue in /api/chat, serving authoritative agency answer:', error?.message || error);
      
      const q = (req.body?.message || '').toLowerCase();
      let fallbackText = `Hi! I'm Jawad from Error Sync. `;

      if (q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('rate')) {
        fallbackText += `Our custom website and Shopify builds range from $2,500 to $12,000 depending on complexity, and bespoke software/SaaS starts from $6,000+. Ongoing monthly growth retainers for SEO, PPC, and Meta Ads start at $1,200/month. We tailor every quote with an itemized fixed-price proposal before kickoff!`;
      } else if (q.includes('service') || q.includes('what do you do') || q.includes('offer')) {
        fallbackText += `We provide full-funnel digital engineering and marketing under one roof:\n\n• Custom Web Design & Development (sub-second speeds)\n• Bespoke Shopify Stores & Theme Engineering\n• Custom Software & SaaS Client Portals\n• SEO, AEO & GEO (Google, ChatGPT & Gemini discovery)\n• Agentic SEO & Competitor Monitoring\n• Google PPC & Meta Ads (Facebook/Instagram)\n• Conversion Rate Optimization (CRO)`;
      } else if (q.includes('magic city') || q.includes('sneaker') || q.includes('case') || q.includes('result')) {
        fallbackText += `Our verified results speak for themselves:\n\n• Magic City: Daily orders grew from 6 to 60–70/day at peak (+340% conversion, 4.8x ROAS).\n• Custom Sneakers (Switzerland): +40% sales in month one with a 3D product preview.\n• Energy Solutions (UK): Inbound commercial leads doubled (+200%) with 99.4% contract retention.`;
      } else if (q.includes('location') || q.includes('office') || q.includes('where') || q.includes('contact') || q.includes('whatsapp')) {
        fallbackText += `Our headquarters are in Chittagong, Bangladesh, with a US office in Los Angeles, CA. We work with clients across the USA, UK, Canada, Australia, and Europe. You can reach us directly on WhatsApp at +880 1852 170810 or US line at +1 (332) 281-2151!`;
      } else {
        fallbackText += `Error Sync designs and develops high-performance websites, Shopify stores, and custom software, and drives qualified revenue to them through SEO (including AEO/GEO), Google Ads, and Meta Ads. How can I help you grow your project today?`;
      }

      return res.json({ reply: fallbackText });
    }
  });

  // Mount Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
