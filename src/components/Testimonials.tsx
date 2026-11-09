import React, { useState } from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/agencyData';

export const Testimonials: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Tripled list ensures seamless, continuous infinite loop on all screen widths
  const marqueeReviews = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="testimonials"
      className="pt-12 sm:pt-16 pb-24 sm:pb-32 relative bg-slate-50 dark:bg-[#0B0716] overflow-hidden transition-colors duration-500"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-purple-600/10 dark:bg-purple-900/15 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Slide-Up on Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/70 border border-purple-300/50 dark:border-purple-500/30 text-purple-800 dark:text-purple-300 text-xs font-semibold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-600 dark:text-fuchsia-400" />
            <span>VERIFIED CLIENT REVIEWS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.2]">
            What our clients say
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-[1.618]">
            Continuous feedback from founders, operators, and brands across 5+ countries.
          </p>
        </motion.div>
      </div>

      {/* Full-Width Smooth Continuous Slide Track */}
      <div className="relative w-full overflow-hidden select-none py-4 group">
        {/* Left & Right Edge Gradient Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-slate-50 dark:from-[#0B0716] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-slate-50 dark:from-[#0B0716] to-transparent z-10 pointer-events-none" />

        {/* Continuous Moving Track */}
        <div
          className="flex gap-6 sm:gap-8 items-stretch will-change-transform"
          style={{
            animation: 'continuous-reviews-slide 38s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {marqueeReviews.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[340px] sm:w-[420px] shrink-0 p-7 sm:p-8 rounded-3xl glass-panel border border-purple-200/80 dark:border-purple-500/25 hover:border-purple-400 dark:hover:border-purple-400/60 shadow-[0_16px_40px_rgba(168,85,247,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between backdrop-blur-2xl bg-white/95 dark:bg-[#120B24]/95 cursor-pointer relative overflow-hidden"
            >
              {/* Subtle Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500" />

              <div className="space-y-5">
                {/* Header: Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-500 fill-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]"
                      />
                    ))}
                    <span className="ml-2 font-mono text-xs font-bold text-slate-700 dark:text-purple-300">
                      5.0
                    </span>
                  </div>

                  <Quote className="w-7 h-7 text-purple-400/35" />
                </div>

                {/* Review Quote */}
                <blockquote className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-normal leading-[1.618] italic">
                  "{item.quote}"
                </blockquote>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-5 mt-6 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.avatarColor} p-0.5 shadow-md flex items-center justify-center text-white font-extrabold text-xs shrink-0`}
                  >
                    <div className="w-full h-full rounded-full bg-white dark:bg-[#0B0716] flex items-center justify-center">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-300 font-black">
                        {item.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="truncate">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight truncate">
                      {item.author}
                    </h4>
                    <p className="text-xs text-purple-700 dark:text-purple-300 font-medium truncate">
                      {item.role}, <span className="text-slate-600 dark:text-slate-300">{item.company}</span>
                    </p>
                  </div>
                </div>

                {item.platform && (
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/30 shrink-0 ml-2 font-semibold">
                    {item.platform}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes continuous-reviews-slide {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
      `}</style>
    </section>
  );
};
