import React from 'react';
import { motion } from 'motion/react';
import { CLIENT_LOGOS } from '../data/agencyData';

export const TrustedMarquee: React.FC = () => {
  const marqueeItems = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="py-16 sm:py-20 relative border-y border-purple-200/60 dark:border-purple-900/30 bg-slate-100/70 dark:bg-[#0E091D]/60 overflow-hidden transition-colors duration-500">
      {/* Edge gradient fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-28 sm:w-48 bg-gradient-to-r from-slate-100 dark:from-[#0B0716] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 sm:w-48 bg-gradient-to-l from-slate-100 dark:from-[#0B0716] to-transparent z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-8 text-center"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-semibold">
          Trusted by growing businesses across four continents
        </p>
      </motion.div>

      {/* Marquee Track with Slide-Up */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full overflow-hidden select-none group py-2"
      >
        <div className="flex items-center gap-16 sm:gap-20 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
          {marqueeItems.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex items-center gap-3.5 px-5 py-2.5 rounded-2xl transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-105 cursor-pointer bg-white/70 dark:bg-purple-950/25 border border-purple-200/50 dark:border-purple-800/30 shadow-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center font-bold text-xs text-white shadow-xs">
                {logo.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="text-left">
                <span className="text-sm font-bold tracking-tight text-slate-800 dark:text-slate-200 block">
                  {logo.name}
                </span>
                <span className="text-[10px] text-purple-600 dark:text-purple-400/80 block -mt-0.5 font-medium">
                  {logo.sector}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 36s linear infinite;
        }
      `}</style>
    </section>
  );
};
