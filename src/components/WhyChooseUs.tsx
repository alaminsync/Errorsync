import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  FileCheck2,
  LineChart,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { WHY_US_POINTS } from '../data/agencyData';

export const WhyChooseUs: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Four core pillars (step 5 removed as requested)
  const POINTS = WHY_US_POINTS.slice(0, 4);

  const cardIcons = [
    <Layers className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    <Sparkles className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />,
    <FileCheck2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    <LineChart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
  ];

  const cardHighlights = [
    'Zero finger-pointing: 1 cross-functional technical team',
    'AI-accelerated audits + human creative judgment',
    'Fixed itemized scope & milestones before kickoff',
    'Tracking conversions, pipeline & revenue outcomes',
  ];

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="why-us"
      className="pt-16 sm:pt-20 pb-28 sm:pb-36 relative bg-slate-50 dark:bg-[#0B0716] overflow-visible transition-colors duration-500"
    >
      {/* Ambient Violet-Magenta Radial Glow */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-purple-600/8 dark:bg-purple-900/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-fuchsia-600/8 dark:bg-fuchsia-900/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT SIDE: Sticky Pinned Column with Main Title & Subtitle */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start space-y-6">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/70 border border-purple-300/50 dark:border-purple-500/30 text-purple-800 dark:text-purple-300 text-xs font-semibold tracking-wider uppercase shadow-xs">
              <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
              <span>WHY ERROR SYNC</span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.18]">
              Why businesses choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 dark:from-purple-400 dark:via-fuchsia-400 dark:to-pink-400">
                Error Sync
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-[1.618]">
              Clear communication, honest guidance, and measurable technical execution without agency fluff or hidden packages.
            </p>

            {/* Dynamic Step Progress Indicators */}
            <div className="space-y-2.5 pt-4 hidden sm:block">
              {POINTS.map((point, idx) => (
                <div
                  key={point.number}
                  className={`flex items-center gap-3.5 p-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
                    activeCardIndex === idx
                      ? 'bg-purple-100/80 dark:bg-purple-950/60 border border-purple-300/60 dark:border-purple-500/40 text-purple-900 dark:text-white font-semibold shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  onClick={() => {
                    const cardEl = document.getElementById(`stack-card-${idx}`);
                    if (cardEl) {
                      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                >
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded-md ${
                      activeCardIndex === idx
                        ? 'bg-purple-600 text-white font-bold'
                        : 'bg-slate-200/70 dark:bg-purple-950/40 text-slate-600 dark:text-purple-300'
                    }`}
                  >
                    {point.number}
                  </span>
                  <span className="text-sm tracking-tight truncate">{point.title}</span>
                </div>
              ))}
            </div>

            {/* Call to action */}
            <div className="pt-2">
              <button
                onClick={scrollToContact}
                className="glow-pill-btn px-7 py-3.5 rounded-full text-white text-xs font-bold tracking-widest uppercase inline-flex items-center gap-2 group cursor-pointer shadow-lg hover:scale-105 transition-all duration-300"
              >
                <span>GET A CUSTOM PROPOSAL</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Stacking Cards Stream */}
          <div className="lg:col-span-7 space-y-16 sm:space-y-24 pt-4 pb-20">
            {POINTS.map((point, index) => {
              // Incremental sticky top offset with generous breathing room
              const stickyTopOffset = `${5.5 + index * 1.5}rem`;

              return (
                <div
                  id={`stack-card-${index}`}
                  key={point.number}
                  className="sticky"
                  style={{
                    top: stickyTopOffset,
                    zIndex: index + 10,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0.15, y: 55, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{
                      duration: 0.75,
                      ease: [0.16, 1, 0.3, 1], // Ultra-smooth ease-out
                    }}
                    onViewportEnter={() => setActiveCardIndex(index)}
                    className="group relative rounded-3xl p-8 sm:p-10 border transition-all duration-500 backdrop-blur-2xl bg-white/95 dark:bg-[#120B24]/95 border-purple-200 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-400/60 shadow-[0_20px_50px_rgba(124,58,237,0.14)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.65)] overflow-hidden"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    {/* Top Accent Gradient Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500" />

                    {/* Card Inner Content */}
                    <div className="space-y-6">
                      {/* Header Row: Icon and Clean Number Badge */}
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
                          {cardIcons[index % cardIcons.length]}
                        </div>

                        {/* Number Only (no 'STEP' prefix) */}
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-extrabold px-3.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 tracking-wider shadow-2xs">
                            {point.number}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300">
                        {point.title}
                      </h3>

                      {/* Description with Golden Ratio Line Height */}
                      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-[1.618] font-normal">
                        {point.description}
                      </p>

                      {/* Highlighted Outcome Pill */}
                      <div className="pt-2 border-t border-purple-100 dark:border-purple-900/40">
                        <div className="flex items-start gap-2 text-xs sm:text-sm text-purple-800 dark:text-purple-200 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{cardHighlights[index % cardHighlights.length]}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
