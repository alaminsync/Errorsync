import React, { useState, useEffect, useRef } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface NumbersBannerProps {
  onSeeCaseStudies: () => void;
}

export const NumbersBanner: React.FC<NumbersBannerProps> = ({ onSeeCaseStudies }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [count6, setCount6] = useState(0);
  const [count5, setCount5] = useState(0);
  const [count13, setCount13] = useState(0);
  const [count5Countries, setCount5Countries] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTime: number | null = null;
          const duration = 1800; // ms

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            setCount6(Math.floor(ease * 6));
            setCount5(Number((ease * 5.0).toFixed(1)));
            setCount13(Math.floor(ease * 13));
            setCount5Countries(Math.floor(ease * 5));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount6(6);
              setCount5(5.0);
              setCount13(13);
              setCount5Countries(5);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={containerRef} className="py-14 sm:py-16 relative overflow-hidden bg-slate-50 dark:bg-[#0B0716] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Full-width gradient banner container with Slide Up on Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl p-10 sm:p-14 lg:p-16 overflow-hidden border border-purple-400/30 bg-gradient-to-r from-[#581c87] via-[#7e22ce] to-[#c026d3] shadow-[0_0_55px_rgba(168,85,247,0.3)] text-white"
        >
          {/* Subtle noise and glow overlay */}
          <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-12">
            {/* Banner Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.2]">
                Numbers That Tell Our Story
              </h2>
            </div>

            {/* 4 Stats Grid with Glowing Dividers */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 items-start">
              {/* Stat 1 */}
              <div className="relative pr-6">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-mono tracking-tight flex items-baseline">
                  <span>{count6}</span>
                  <span className="text-purple-200">+</span>
                </div>
                <p className="text-sm text-purple-100 font-medium mt-3 leading-snug">
                  Years building & growing online brands
                </p>
                <div className="hidden lg:block absolute right-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
              </div>

              {/* Stat 2: Rating */}
              <div className="relative lg:px-6">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-mono tracking-tight flex items-center gap-2">
                  <span>{count5.toFixed(1)}</span>
                  <Star className="w-8 h-8 sm:w-9 sm:h-9 text-amber-300 fill-amber-300 inline-block drop-shadow-[0_0_12px_rgba(252,211,77,0.6)]" />
                </div>
                <p className="text-sm text-purple-100 font-medium mt-3 leading-snug">
                  Fiverr rating from 110+ reviews
                </p>
                <div className="hidden lg:block absolute right-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
              </div>

              {/* Stat 3 */}
              <div className="relative lg:px-6">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-mono tracking-tight">
                  {count13}
                </div>
                <p className="text-sm text-purple-100 font-medium mt-3 leading-snug">
                  Specialists in our team
                </p>
                <div className="hidden lg:block absolute right-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
              </div>

              {/* Stat 4 */}
              <div className="relative lg:pl-6">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-mono tracking-tight flex items-baseline">
                  <span>{count5Countries}</span>
                  <span className="text-purple-200">+</span>
                </div>
                <p className="text-sm text-purple-100 font-medium mt-3 leading-snug">
                  Countries served
                </p>
              </div>
            </div>

            {/* Banner Action Button */}
            <div className="pt-2">
              <button
                onClick={onSeeCaseStudies}
                className="px-7 py-3.5 rounded-full bg-white text-purple-950 font-bold text-xs tracking-wider uppercase hover:bg-purple-50 transition-all duration-200 hover:scale-105 shadow-lg inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>SEE OUR CASE STUDIES</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
