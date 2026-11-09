import React, { useState } from 'react';
import { X, ArrowUpRight, TrendingUp, Sparkles, MapPin } from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '../data/agencyData';

interface AllCasesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCaseStudy: (study: CaseStudy) => void;
  onRequestProposal: (title?: string) => void;
}

export const AllCasesModal: React.FC<AllCasesModalProps> = ({
  isOpen,
  onClose,
  onSelectCaseStudy,
  onRequestProposal,
}) => {
  const [filter, setFilter] = useState<'all' | 'shopify' | 'custom' | 'growth'>('all');

  if (!isOpen) return null;

  const filteredStudies = CASE_STUDIES.filter((study) => {
    if (filter === 'shopify') return study.category.toLowerCase().includes('shopify');
    if (filter === 'custom') return study.category.toLowerCase().includes('software') || study.category.toLowerCase().includes('erp');
    if (filter === 'growth') return study.category.toLowerCase().includes('ads') || study.category.toLowerCase().includes('seo');
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 dark:bg-[#06040C]/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl rounded-3xl glass-panel border border-purple-200 dark:border-purple-500/30 bg-white dark:bg-[#0E091E] p-6 sm:p-10 shadow-2xl z-10 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 dark:bg-purple-950/80 border border-slate-200 dark:border-purple-800/60 text-slate-700 dark:text-purple-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-600 dark:text-fuchsia-400" />
              <span>Full Portfolio Archive</span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              All Client Case Studies
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              Explore our full track record across custom development, Shopify stores, and revenue growth campaigns.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'shopify', label: 'Shopify Stores' },
              { id: 'custom', label: 'Custom Software' },
              { id: 'growth', label: 'SEO & Paid Ads' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
                    : 'bg-purple-50 dark:bg-purple-950/40 text-slate-700 dark:text-slate-300 hover:text-purple-900 dark:hover:text-white border border-purple-200 dark:border-purple-800/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Case Studies Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study) => (
              <div
                key={study.id}
                onClick={() => {
                  onClose();
                  onSelectCaseStudy(study);
                }}
                className="group relative rounded-2xl glass-panel p-4 border border-purple-200 dark:border-purple-500/20 hover:border-purple-400 dark:hover:border-purple-400/50 cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-slate-100 dark:bg-purple-950/40 mb-4">
                  <img
                    src={study.image}
                    alt={study.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-[#0B0716]/90 via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 dark:bg-[#0B0716]/80 text-[10px] text-slate-800 dark:text-purple-200 shadow-xs">
                    <MapPin className="w-2.5 h-2.5 text-purple-600 dark:text-purple-400" />
                    <span>{study.location}</span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-white/90 dark:bg-purple-950/90 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-500/30 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {study.metricLabel}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold tracking-wider text-purple-700 dark:text-purple-400 uppercase">
                      {study.category}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                      {study.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                      {study.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-purple-100 dark:border-purple-900/30 flex items-center justify-between text-[11px] text-purple-700 dark:text-purple-300 font-medium">
                    <span>View full breakdown</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-purple-200 dark:border-purple-900/40 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Ready to start your next growth initiative?
            </span>
            <button
              onClick={() => {
                onClose();
                onRequestProposal();
              }}
              className="glow-pill-btn px-6 py-2.5 rounded-full text-white text-xs font-bold tracking-wider uppercase inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Get Custom Proposal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
