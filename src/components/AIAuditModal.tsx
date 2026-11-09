import React, { useState } from 'react';
import { X, Bot, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

interface AIAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestProposal: () => void;
}

export const AIAuditModal: React.FC<AIAuditModalProps> = ({
  isOpen,
  onClose,
  onRequestProposal,
}) => {
  const [domain, setDomain] = useState('');
  const [industry, setIndustry] = useState('E-Commerce / Shopify');
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'done'>('idle');

  if (!isOpen) return null;

  const handleRunAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;

    setStatus('analyzing');
    setTimeout(() => {
      setStatus('done');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 dark:bg-[#06040C]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-purple-200 dark:border-purple-500/30 bg-white dark:bg-[#0E091E] p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-purple-950/80 border border-slate-200 dark:border-purple-800/60 text-slate-700 dark:text-purple-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-600 dark:text-fuchsia-400" />
              <span>Instant Generative Engine Audit (GEO)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Free AI Visibility Diagnostic
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Discover whether your brand is cited by ChatGPT, Google Gemini, and Perplexity when potential buyers search for your products.
            </p>
          </div>

          {status === 'idle' && (
            <form onSubmit={handleRunAudit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Your Website / Brand URL:
                </label>
                <input
                  type="text"
                  required
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="e.g. yourstore.com"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#120B24] border border-purple-200 dark:border-purple-500/30 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500 font-mono shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Primary Market Sector:
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#120B24] border border-purple-200 dark:border-purple-500/30 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500 cursor-pointer shadow-xs"
                >
                  <option value="E-Commerce / Shopify">E-Commerce / DTC Shopify</option>
                  <option value="B2B Software / SaaS">B2B Software / SaaS</option>
                  <option value="Local Professional Services">Local Professional Services</option>
                  <option value="Health & Wellness">Health & Wellness</option>
                  <option value="Renewable Energy & Tech">Renewable Energy & Tech</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full glow-pill-btn py-3.5 rounded-full text-white text-xs font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Run Real-Time AI Visibility Check</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {status === 'analyzing' && (
            <div className="py-12 text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 border-t-purple-600 animate-spin" />
                <Bot className="w-8 h-8 text-fuchsia-600 dark:text-fuchsia-400 absolute inset-0 m-auto" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Querying LLM Knowledge Graph & Search Grounding...
              </h4>
              <p className="text-xs font-mono text-purple-700 dark:text-purple-300">
                Checking OpenAI Web Search · Google Gemini Grounding · Perplexity Indices
              </p>
            </div>
          )}

          {status === 'done' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-purple-200 dark:border-purple-800/40">
                  <span className="text-xs font-mono text-purple-700 dark:text-purple-300">Target: {domain}</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40">
                    AEO Opportunity Detected
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center py-1">
                  <div className="p-2 rounded-lg bg-white dark:bg-[#140C28]">
                    <div className="text-sm font-bold text-amber-600 dark:text-amber-400">Moderate</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">ChatGPT Citations</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-[#140C28]">
                    <div className="text-sm font-bold text-rose-600 dark:text-red-400">Low</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Gemini Entity Authority</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-[#140C28]">
                    <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Strong</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Keyword Indexing</div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      Missing semantic JSON-LD Organization & SameAs entity links prevents AI models from disambiguating your brand against competitors.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      Error Sync can establish authoritative knowledge graph entities and agentic search signals to position you as the recommended solution.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-end">
                <button
                  onClick={() => setStatus('idle')}
                  className="px-4 py-2.5 rounded-full border border-slate-300 dark:border-purple-800 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer w-full sm:w-auto"
                >
                  Test Another URL
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onRequestProposal();
                  }}
                  className="glow-pill-btn px-6 py-2.5 rounded-full text-white text-xs font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <span>Request Full In-Depth Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
