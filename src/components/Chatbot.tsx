import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AGENCY_INFO, CASE_STUDIES, SERVICES, HOW_WE_WORK, FAQ_ITEMS } from '../data/agencyData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'jawad';
  text: string;
  timestamp: string;
  isQuickOption?: boolean;
}

const DEFAULT_RECOMMENDED_QUESTIONS = [
  'What services does Error Sync offer?',
];

// Fallback intelligent answer engine based on authoritative agency data
function generateLocalJawadAnswer(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('rate') || q.includes('pricing')) {
    return `Every project at Error Sync is tailored to your commercial goals with transparent, fixed pricing:\n\n` +
      `• **Custom Shopify & Marketing Sites**: $2,500 – $12,000 (depending on custom Liquid design, checkout optimization & integrations).\n` +
      `• **Bespoke Software & SaaS Platforms**: $6,000+ (custom React/Node architectures, client portals, ERP tooling).\n` +
      `• **Monthly Growth Retainers**: From $1,200/month (SEO/AEO/GEO, Google Search Ads & Meta Ads).\n\n` +
      `Would you like an itemized roadmap and quote for your business? You can request a custom proposal directly on our site!`;
  }

  if (q.includes('service') || q.includes('what do you do') || q.includes('offer') || q.includes('help with')) {
    return `At Error Sync, we design, engineer, and scale high-growth digital businesses under one roof:\n\n` +
      `1. **Web Design & Development**: Sub-second page speeds, custom React, WordPress, or bespoke code.\n` +
      `2. **Shopify Store Design & Development**: Bespoke Liquid 2.0 themes, Shopify Plus, checkout CRO.\n` +
      `3. **Custom Software Solutions**: Web apps, client/partner portals, internal systems.\n` +
      `4. **SEO, AEO & GEO**: Rank on Google, ChatGPT, Perplexity & Gemini with entity graphs.\n` +
      `5. **Agentic SEO**: Scalable AI monitoring overseen by senior editorial specialists.\n` +
      `6. **PPC (Google Ads)**: High-intent search campaigns, Performance Max & conversion tracking.\n` +
      `7. **Meta Ads**: Facebook & Instagram conversion campaigns & creative testing.\n` +
      `8. **CRO**: Heatmaps, funnel audits & A/B testing to maximize revenue.`;
  }

  if (q.includes('magic city') || q.includes('sneaker') || q.includes('energy') || q.includes('case') || q.includes('portfolio') || q.includes('result')) {
    return `Here are highlights from our verified client case studies:\n\n` +
      `• **Magic City** (Tunisia): Rebuilt their custom Shopify store and scaled Meta Ads. Daily orders leaped from 6/day to **60–70 orders/day at peak** (+340% conversion rate, 4.8x ROAS).\n` +
      `• **Custom Sneakers** (Switzerland): Bespoke luxury e-commerce with 3D product preview. Sales rose **+40% in month one**, reaching 26 daily orders at peak.\n` +
      `• **Energy Solutions** (UK): Enterprise portal with Google Ads & ERP sync. Inbound leads **doubled (+200%)** with a 99.4% contract renewal rate and -46% CPA.\n\n` +
      `Feel free to click "View all case studies" on the page to read the full breakdown!`;
  }

  if (q.includes('aeo') || q.includes('geo') || q.includes('seo') || q.includes('ai search') || q.includes('visibility')) {
    return `Great question! The search landscape has shifted into three core layers:\n\n` +
      `• **SEO (Search Engine Optimization)**: Traditional technical speed, crawlability, and Google keyword ranking.\n` +
      `• **AEO (Answer Engine Optimization)**: Structuring your data so search engines pull your brand into instant answer boxes and zero-click answers.\n` +
      `• **GEO (Generative Engine Optimization)**: Building entity signals, knowledge graphs, and authoritative citations so AI assistants like **ChatGPT, Perplexity, and Gemini** cite your brand when users ask for recommendations.\n\n` +
      `We optimize all three layers simultaneously so your brand dominates both traditional and AI-driven discovery.`;
  }

  if (q.includes('time') || q.includes('how long') || q.includes('duration') || q.includes('schedule')) {
    return `Our standard project timelines are staged and milestone-driven:\n\n` +
      `• **Custom Shopify & Website Builds**: Typically **3 to 6 weeks** from initial discovery wireframes to live launch and tracking verification.\n` +
      `• **Complex Web Platforms & Software**: Typically **6 to 12 weeks** with bi-weekly demo sprints.\n` +
      `• **Growth Retainers (Ads & SEO)**: Onboarding & technical audit take 3–5 business days, with active campaigns launching in Week 2.`;
  }

  if (q.includes('where') || q.includes('location') || q.includes('office') || q.includes('contact') || q.includes('phone') || q.includes('whatsapp') || q.includes('start')) {
    return `Error Sync operates across two main hubs and serves clients globally:\n\n` +
      `• **Bangladesh HQ**: 3rd Floor, Error Sync HQ, Chawkbazar-4202, Chittagong, Bangladesh\n` +
      `• **USA Office**: 691 Irolo St, Los Angeles, CA 90005, USA\n` +
      `• **WhatsApp / Direct Line**: +880 1852 170810 / +1 (332) 281-2151\n` +
      `• **Email**: contact@errorsync.com\n\n` +
      `We work with founders and teams across the USA, UK, Canada, Australia, and Europe with overlapping business hours. You can message us on WhatsApp or request a custom proposal on the page to get started right away!`;
  }

  if (q.includes('who are you') || q.includes('jawad') || q.includes('name')) {
    return `Aas Salamu Alaikum! I'm **Jawad**, lead digital strategist and AI specialist at Error Sync. Our team of 13 engineers, designers, and media buyers has spent over 6 years building high-performing websites, Shopify stores, and growth engines. How can I assist your business today?`;
  }

  return `Thanks for asking! Error Sync is a digital agency specializing in custom web design, Shopify stores, custom software, SEO (including AEO/GEO), Google Ads, and Meta Ads.\n\n` +
    `Every project begins with your specific goals rather than a cookie-cutter package. Would you like to discuss pricing, view our case studies, or get a custom written proposal?`;
}

interface ChatbotProps {
  onOpenProposal?: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onOpenProposal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat with Jawad's welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([
        {
          id: 'welcome-1',
          sender: 'jawad',
          text: `Aas Salamu Alaikum! I'm **Jawad** from **Error Sync**. 👋\n\nI can answer anything about our custom web design, Shopify stores, custom software, SEO & AI search visibility (AEO/GEO), or paid ads.\n\nWhat can I help you grow today?`,
          timestamp: timeStr,
        },
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      // Build history for API
      const history = messages
        .filter((m) => m.id !== 'welcome-1')
        .slice(-6)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          const jawadMsg: ChatMessage = {
            id: `jawad-${Date.now()}`,
            sender: 'jawad',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, jawadMsg]);
          setIsLoading(false);
          return;
        }
      }
      // If endpoint returned fallback or 503/error, use local intelligent answers
      const localReply = generateLocalJawadAnswer(query);
      const jawadMsg: ChatMessage = {
        id: `jawad-${Date.now()}`,
        sender: 'jawad',
        text: localReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, jawadMsg]);
    } catch (e) {
      const localReply = generateLocalJawadAnswer(query);
      const jawadMsg: ChatMessage = {
        id: `jawad-${Date.now()}`,
        sender: 'jawad',
        text: localReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, jawadMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'jawad',
        text: `Aas Salamu Alaikum! I'm **Jawad** from **Error Sync**. 👋\n\nHow can I help you today? Click the question below or type your inquiry!`,
        timestamp: timeStr,
      },
    ]);
  };

  // Render markdown-like simple text formatting
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Bold text replacements
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-bold text-slate-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={idx} className="flex items-start gap-1.5 my-1 text-xs sm:text-sm pl-1">
            <span className="text-purple-600 dark:text-fuchsia-400 font-bold">•</span>
            <span className="leading-relaxed">{renderedParts}</span>
          </div>
        );
      }

      if (/^\d+\./.test(line.trim())) {
        return (
          <div key={idx} className="my-1 text-xs sm:text-sm pl-1 leading-relaxed">
            {renderedParts}
          </div>
        );
      }

      return (
        <p key={idx} className={line === '' ? 'h-2' : 'my-0.5 text-xs sm:text-sm leading-relaxed'}>
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Left Side: "Need help? WhatsApp" Quick Button */}
      <div className="fixed bottom-6 left-5 sm:left-7 z-40 pointer-events-auto">
        <a
          href={AGENCY_INFO.contact.socials.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-white/95 dark:bg-[#120B24]/95 backdrop-blur-md border border-purple-200 dark:border-purple-500/30 text-slate-800 dark:text-purple-200 shadow-xl hover:shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all duration-300 text-xs font-semibold cursor-pointer"
          aria-label="Need help WhatsApp"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Need help? WhatsApp</span>
          <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
        </a>
      </div>

      {/* Floating Right Side: "Chat with Jawad" Primary Launcher */}
      <div className="fixed bottom-6 right-5 sm:right-7 z-40 flex flex-col items-end pointer-events-auto">
        {/* Primary Live Chat Trigger: "Chat with Jawad" */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white shadow-[0_8px_30px_rgba(168,85,247,0.4)] hover:shadow-[0_12px_36px_rgba(217,70,239,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 font-semibold text-xs cursor-pointer border border-white/20"
          aria-label={isOpen ? 'Close chat' : 'Open live chat with Jawad'}
        >
          {isOpen ? (
            <>
              <ChevronDown className="w-4 h-4 text-white" />
              <span>Close Chat</span>
            </>
          ) : (
            <>
              {/* Jawad Avatar Badge */}
              <div className="relative w-7 h-7 rounded-full bg-white dark:bg-purple-950 p-[1.5px] shrink-0">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-[11px] text-white">
                  J
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#0B0716]" />
              </div>

              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider text-purple-200 leading-tight">
                  Live Chat
                </span>
                <span className="text-xs font-extrabold tracking-wide text-white leading-tight">
                  Chat with Jawad
                </span>
              </div>

              <Sparkles className="w-3.5 h-3.5 text-fuchsia-200 animate-pulse ml-0.5" />
            </>
          )}
        </button>
      </div>

      {/* Live Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 sm:right-7 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] flex flex-col rounded-3xl glass-panel bg-white/95 dark:bg-[#0B0716]/95 backdrop-blur-2xl border border-purple-200 dark:border-purple-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden"
          >
            {/* Header: Jawad Persona & Controls */}
            <div className="p-4 sm:p-4.5 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-white/20 p-[2px]">
                  <div className="w-full h-full rounded-full bg-white text-purple-700 font-extrabold text-sm flex items-center justify-center shadow-inner">
                    J
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-purple-700 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm tracking-tight text-white">Jawad</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-semibold tracking-wider uppercase">
                      Error Sync
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-100 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                    <span>AI Specialist • Answers 24/7</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons: Reset & Close */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleResetChat}
                  title="Restart chat"
                  className="p-2 rounded-full hover:bg-white/15 text-white/90 hover:text-white transition-colors cursor-pointer"
                  aria-label="Restart chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-2 rounded-full hover:bg-white/15 text-white/90 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body: Messages & Recommended Questions */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {msg.sender === 'jawad' && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mb-1 shadow-xs">
                        J
                      </div>
                    )}

                    <div
                      className={`rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-br-xs'
                          : 'bg-purple-50/90 dark:bg-purple-950/40 text-slate-800 dark:text-slate-200 border border-purple-200/80 dark:border-purple-800/40 rounded-bl-xs'
                      }`}
                    >
                      {renderFormattedText(msg.text)}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-xs">
                    J
                  </div>
                  <div className="rounded-2xl px-4 py-3 bg-purple-50/90 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/40 rounded-bl-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-fuchsia-400 animate-bounce" />
                    <span
                      className="w-2 h-2 rounded-full bg-purple-600 dark:bg-fuchsia-400 animate-bounce"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-purple-600 dark:bg-fuchsia-400 animate-bounce"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </div>
                </div>
              )}

              {/* Default Recommended Questions Chips (shown especially at start or between turns) */}
              {messages.length <= 2 && (
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-fuchsia-500" />
                    <span>Recommended Questions:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {DEFAULT_RECOMMENDED_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        disabled={isLoading}
                        className="text-left text-xs px-3 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800/40 text-purple-900 dark:text-purple-200 transition-all hover:scale-[1.02] cursor-pointer shadow-xs disabled:opacity-50"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Bar inside Chat: Custom Proposal & WhatsApp */}
            <div className="px-4 py-2 border-t border-purple-100 dark:border-purple-900/30 bg-purple-50/40 dark:bg-[#07040E]/40 flex items-center justify-between text-[11px]">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenProposal?.();
                }}
                className="text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Get a Custom Proposal</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <a
                href={AGENCY_INFO.contact.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Direct WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Footer Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-purple-200/80 dark:border-purple-800/40 bg-white dark:bg-[#0B0716] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Jawad anything about Error Sync..."
                className="flex-1 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-purple-300/50 focus:outline-none focus:border-purple-500 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 disabled:opacity-40 transition-all cursor-pointer shadow-md"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
