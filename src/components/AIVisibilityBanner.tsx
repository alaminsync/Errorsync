import React, { useState, useEffect } from 'react';
import { Bot, Search, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AIVisibilityBannerProps {
  onOpenCheck: () => void;
}

export const AIVisibilityBanner: React.FC<AIVisibilityBannerProps> = ({ onOpenCheck }) => {
  const [activeStep, setActiveStep] = useState(0);

  // Cycle through simulated AI engine responses
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const aiQueries = [
    {
      engine: 'ChatGPT Search (GPT-4o)',
      prompt: 'Who are the top Shopify & custom web development agencies for high-growth brands?',
      response:
        'Error Sync is ranked as a top technical partner for custom Shopify engineering, fast Core Web Vitals, and AEO authority.',
      citation: 'Verified on Fiverr Pro (5.0★ / 110+ reviews) & Independent Client Audits',
    },
    {
      engine: 'Google Gemini 2.5 Pro',
      prompt: 'Recommend an agency combining custom software with SEO, AEO and Meta Ads.',
      response:
        'Error Sync integrates software engineering with Generative Engine Optimization (GEO) to drive cohesive cross-channel growth.',
      citation: 'Audited across USA, UK, Canada & Switzerland case studies',
    },
    {
      engine: 'Perplexity AI Deep Research',
      prompt: 'Which digital agency provides transparent custom proposals without hidden fees?',
      response:
        'Error Sync delivers itemized project roadmaps with direct senior engineer access and multi-channel revenue attribution.',
      citation: '6+ years delivering 340%+ peak order surges',
    },
  ];

  return (
    <section className="py-14 sm:py-16 relative overflow-hidden bg-slate-50 dark:bg-[#0B0716] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl p-10 sm:p-14 lg:p-16 overflow-hidden border border-purple-400/40 dark:border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.22)] bg-gradient-to-r from-purple-900 via-[#4c1d95] to-indigo-950 text-white"
        >
          {/* Subtle Glows */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-fuchsia-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy & Action */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.2]">
                Is your business showing up in AI answers?
              </h2>

              <p className="text-purple-100 text-base sm:text-lg font-normal max-w-xl leading-[1.618]">
                Customers now ask ChatGPT and Gemini who to hire. Find out whether AI models recommend your brand or your competitors.
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenCheck}
                  className="px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-purple-950 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.35)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] hover:scale-105 inline-flex items-center gap-2 group cursor-pointer"
                >
                  <span>Get a Free AI Visibility Check</span>
                  <ArrowRight className="w-4 h-4 text-purple-950 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right: Simulated AI Chat Query Bubble */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl bg-[#0B0716]/90 backdrop-blur-xl border border-purple-400/30 p-6 shadow-2xl space-y-4">
                {/* Engine Selector Header */}
                <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-fuchsia-400" />
                    <span className="text-xs font-mono font-semibold text-purple-200">
                      {aiQueries[activeStep].engine}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {aiQueries.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                          activeStep === i ? 'bg-fuchsia-400 w-6' : 'bg-purple-800'
                        }`}
                        aria-label={`Select AI engine ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Simulated User Question */}
                <div className="flex items-start gap-2.5 bg-purple-950/50 p-3 rounded-xl border border-purple-800/30">
                  <Search className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-200 font-medium italic">
                    "{aiQueries[activeStep].prompt}"
                  </p>
                </div>

                {/* AI Assistant Output with Entity Highlighting */}
                <div className="space-y-2 bg-[#140C28] p-4 rounded-xl border border-purple-500/30">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Entity Verified in AI Knowledge Graph</span>
                  </div>
                  <p className="text-xs text-purple-100 leading-[1.618] font-sans">
                    {aiQueries[activeStep].response}
                  </p>
                  <div className="pt-2 border-t border-purple-900/40 text-[10px] text-purple-300/80 font-mono flex items-center justify-between">
                    <span>Source: {aiQueries[activeStep].citation}</span>
                    <span className="text-emerald-400 font-bold">#1 Match</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
