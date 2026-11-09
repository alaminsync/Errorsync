import React from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceItem } from '../data/agencyData';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestProposal: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onRequestProposal,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 dark:bg-[#06040C]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-purple-200 dark:border-purple-500/30 bg-white dark:bg-[#0E091E] p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-purple-950/80 border border-slate-200 dark:border-purple-800/60 text-slate-700 dark:text-purple-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
          aria-label="Close service modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-600 dark:text-fuchsia-400" />
              <span>Service Specification</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {service.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
              {service.shortDesc}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300">
              What Is Included In This Engagement
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-[#120B24] border border-purple-200 dark:border-purple-900/40 text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white">How we execute:</div>
            <p className="leading-relaxed">
              Every project begins with goals and metrics rather than rigid templates. You receive an itemized proposal with clear milestones, dedicated specialist support, and weekly reporting that connects technical work directly to commercial revenue.
            </p>
          </div>

          <div className="pt-4 border-t border-purple-200 dark:border-purple-900/40 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-slate-300 dark:border-purple-800 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestProposal(service.title);
              }}
              className="glow-pill-btn px-6 py-2.5 rounded-full text-white text-xs font-bold tracking-wider uppercase inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Get Proposal For This Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
