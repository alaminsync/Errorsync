import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';
import { FAQ_ITEMS } from '../data/agencyData';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string>('q1');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faq" className="pt-12 sm:pt-16 pb-24 sm:pb-32 relative bg-slate-50 dark:bg-[#0B0716] overflow-hidden transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Slide-Up on Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-14 space-y-3"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.2]">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-[1.618]">
            Straightforward answers to the questions clients ask before hiring us.
          </p>
        </motion.div>

        {/* Accordion List with Staggered Slide-Up on Scroll */}
        <div className="space-y-6">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`rounded-2xl glass-panel border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-purple-300 dark:border-purple-400/50 shadow-md'
                    : 'border-purple-200 dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-500/40'
                }`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                    <span className="text-purple-600 dark:text-purple-400 font-mono text-sm hidden sm:inline">Q.</span>
                    {item.question}
                  </span>

                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-purple-600 text-white rotate-180'
                        : 'bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Answer Content with Golden Ratio Line Height */}
                {isOpen && (
                  <div className="px-8 pb-7 pt-2 text-base text-slate-600 dark:text-slate-300 leading-[1.618] border-t border-purple-100 dark:border-purple-900/30 animate-in fade-in duration-300">
                    <p className="pt-2">{item.answer}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
