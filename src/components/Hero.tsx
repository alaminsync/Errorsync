import React from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface HeroProps {
  onOpenProposal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProposal }) => {
  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center pt-36 sm:pt-44 pb-24 sm:pb-32 overflow-hidden bg-slate-50 dark:bg-[#0B0716] transition-colors duration-500"
    >
      {/* Ambient Violet-Magenta Radial Glows (Lightweight CSS) */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[520px] bg-gradient-to-tr from-purple-500/15 via-fuchsia-500/12 to-indigo-500/10 dark:from-purple-700/25 dark:via-fuchsia-600/20 dark:to-indigo-800/20 rounded-full blur-[170px] pointer-events-none -z-10"
      />
      <div className="absolute top-2/3 right-10 w-[420px] h-[420px] bg-purple-600/10 dark:bg-fuchsia-900/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none -z-10" />

      {/* Centered Full-Width Display Container with Minimal Side Space */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full text-center flex flex-col items-center">
        {/* Tagline kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/90 dark:bg-purple-950/60 border border-purple-300/50 dark:border-purple-500/30 text-purple-800 dark:text-purple-300 text-xs font-semibold tracking-wider uppercase shadow-xs mb-6">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-600 dark:text-fuchsia-400" />
          <span>{AGENCY_INFO.tagline}</span>
        </div>

        {/* Display Headline - Expanded to fill screen width with decreased margins */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14] max-w-6xl w-full mb-6 text-balance">
          Websites, software & marketing{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 dark:from-purple-400 dark:via-fuchsia-400 dark:to-pink-400">
            built to grow
          </span>{' '}
          your business
        </h1>

        {/* Subtitle with Golden Ratio Line Height (1.618) and wider fill */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-4xl font-normal leading-[1.618] text-balance mb-10">
          {AGENCY_INFO.subheadline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenProposal}
            className="glow-pill-btn px-8 py-4 rounded-full text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2.5 group cursor-pointer shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span>GET A CUSTOM PROPOSAL</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={scrollToServices}
            className="px-7 py-4 rounded-full border border-purple-300 dark:border-purple-500/30 bg-purple-50/70 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-purple-900 dark:text-purple-200 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:border-purple-400 hover:scale-105 flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>EXPLORE SERVICES</span>
            <ChevronDown className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </button>
        </div>
      </div>
    </section>
  );
};

