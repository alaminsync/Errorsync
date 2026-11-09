import React from 'react';
import { X, CheckCircle2, TrendingUp, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { CaseStudy } from '../data/agencyData';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onRequestProposal: (studyTitle: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  study,
  onClose,
  onRequestProposal,
}) => {
  if (!study) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 dark:bg-[#06040C]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-3xl glass-panel border border-purple-200 dark:border-purple-500/30 bg-white dark:bg-[#0E091E] p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-purple-950/80 border border-slate-200 dark:border-purple-800/60 text-slate-700 dark:text-purple-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-600 dark:text-fuchsia-400" />
              <span>{study.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-300">
                <MapPin className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                {study.location}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {study.title} Case Study
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {study.summary}
            </p>
          </div>

          {/* Large Image Showcase */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-purple-200 dark:border-purple-500/20 bg-slate-100 dark:bg-purple-950/40">
            <img
              src={study.image}
              alt={study.alt}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 dark:from-[#0B0716] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-purple-950/90 backdrop-blur-md border border-purple-200 dark:border-purple-500/40 text-sm font-bold text-emerald-700 dark:text-emerald-400 shadow-md">
                <TrendingUp className="w-4 h-4" />
                <span>{study.metricLabel}</span>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 mb-3">
              Verified Commercial Results
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {study.results.map((res, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/40 text-center"
                >
                  <div className="text-lg sm:text-2xl font-black font-mono text-emerald-700 dark:text-emerald-400">
                    {res.value}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">{res.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-[#120B24] border border-purple-200 dark:border-purple-900/40 space-y-1.5">
              <div className="font-bold text-purple-800 dark:text-purple-300 text-xs uppercase tracking-wider">
                The Challenge
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{study.challenge}</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-[#120B24] border border-purple-200 dark:border-purple-900/40 space-y-1.5">
              <div className="font-bold text-fuchsia-800 dark:text-fuchsia-300 text-xs uppercase tracking-wider">
                Our Solution
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{study.solution}</p>
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300">
              Core Deliverables
            </div>
            <div className="grid grid-cols-2 gap-2">
              {study.deliverables.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-purple-200 dark:border-purple-900/40 flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
              Need similar results for your business?
            </span>
            <button
              onClick={() => {
                onClose();
                onRequestProposal(study.title);
              }}
              className="glow-pill-btn px-6 py-3 rounded-full text-white text-xs font-bold tracking-wider uppercase inline-flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
            >
              <span>Get Proposal For Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
