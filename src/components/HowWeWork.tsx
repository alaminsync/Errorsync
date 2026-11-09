import React, { useState } from 'react';
import { Search, Compass, Rocket, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { HOW_WE_WORK } from '../data/agencyData';

export const HowWeWork: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = [
    <Search className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    <Compass className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />,
    <Rocket className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  ];

  return (
    <section id="process" className="pt-12 sm:pt-16 pb-24 sm:pb-32 relative bg-slate-100/70 dark:bg-[#0E091D]/90 border-t border-purple-200/60 dark:border-purple-900/30 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Slide-Up on Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.2]">
            How We Work
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-[1.618]">
            From initial discovery to launch, our four-stage framework ensures predictable delivery.
          </p>
        </motion.div>

        {/* 4 Steps Grid with Staggered Slide-Up on Scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {HOW_WE_WORK.map((step, index) => {
            const isCurrent = activeStep === index;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setActiveStep(index)}
                className={`group relative rounded-2xl glass-panel p-8 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'border-purple-400 dark:border-purple-400/60 shadow-[0_12px_40px_rgba(168,85,247,0.18)] -translate-y-1.5'
                    : 'border-purple-200 dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-400/40'
                }`}
              >
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center">
                    {stepIcons[index % stepIcons.length]}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors tracking-tight">
                      {step.number} · {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-[1.618]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
