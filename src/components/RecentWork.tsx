import React from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { CASE_STUDIES, CaseStudy } from '../data/agencyData';

interface RecentWorkProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
  onViewAll: () => void;
}

export const RecentWork: React.FC<RecentWorkProps> = ({ onSelectCaseStudy, onViewAll }) => {
  return (
    <section id="cases" className="pt-12 sm:pt-16 pb-24 sm:pb-32 relative bg-slate-50 dark:bg-[#0B0716] overflow-hidden transition-colors duration-500">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-700/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Slide-Up on Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-14"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Recent work
            </h2>
          </div>

          <button
            onClick={onViewAll}
            className="self-start sm:self-auto px-6 py-3 rounded-full border border-purple-300 dark:border-purple-500/30 bg-purple-50/80 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-xs font-semibold text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-white transition-all duration-300 flex items-center gap-2 group cursor-pointer hover:scale-105 shadow-xs"
          >
            <span>VIEW ALL CASE STUDIES</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* 3 Case Study Cards Grid with Staggered Slide-Up on Scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {CASE_STUDIES.map((study, index) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              index={index}
              onClick={() => onSelectCaseStudy(study)}
            />
          ))}
        </div>

        {/* Bottom CTA Button with Slide-Up on Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-20 text-center"
        >
          <button
            onClick={onViewAll}
            className="glow-pill-btn px-9 py-4 rounded-full text-white text-xs font-bold tracking-widest uppercase inline-flex items-center gap-2.5 group cursor-pointer shadow-lg hover:scale-105 transition-all duration-300"
          >
            <span>VIEW ALL CASE STUDIES</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

interface CaseCardProps {
  study: CaseStudy;
  index: number;
  onClick: () => void;
}

const CaseStudyCard: React.FC<CaseCardProps> = ({ study, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.65,
        delay: index * 0.14,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      className="group relative rounded-3xl glass-panel p-7 sm:p-8 border border-purple-200/80 dark:border-purple-500/20 hover:border-purple-400 dark:hover:border-purple-400/50 hover:shadow-[0_16px_40px_rgba(168,85,247,0.14)] hover:-translate-y-1.5 cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Golden Ratio 1.618:1 Image Container */}
      <div className="relative overflow-hidden rounded-2xl aspect-[1.618/1] bg-slate-200 dark:bg-purple-950/40 mb-6 border border-purple-200/50 dark:border-purple-500/15">
        <img
          src={study.image}
          alt={study.alt}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-[#0B0716]/90 via-transparent to-transparent opacity-75" />

        {/* Location Tag */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-[#0B0716]/80 backdrop-blur-md border border-purple-200 dark:border-purple-500/30 text-[11px] font-medium text-slate-800 dark:text-purple-200 shadow-sm">
          <MapPin className="w-3 h-3 text-purple-600 dark:text-purple-400" />
          <span>{study.location}</span>
        </div>

        {/* Arrow Reveal */}
        <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 shadow-md">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Content with Golden Ratio Vertical Rhythm */}
      <div className="space-y-3 pt-1">
        <div className="text-xs text-purple-700 dark:text-purple-300 font-medium">
          {study.category}, {study.location}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors tracking-tight">
          {study.title}
        </h3>
        <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          {study.metricLabel}
        </div>
      </div>
    </motion.div>
  );
};
