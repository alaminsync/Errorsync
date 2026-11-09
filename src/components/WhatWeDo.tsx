import React from 'react';
import {
  Code2,
  ShoppingCart,
  Terminal,
  Search,
  Bot,
  Target,
  Share2,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES, ServiceItem } from '../data/agencyData';

interface WhatWeDoProps {
  onSelectService: (service: ServiceItem) => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="pt-12 sm:pt-16 pb-24 sm:pb-32 relative bg-slate-100/70 dark:bg-[#0E091D]/90 border-t border-purple-200/60 dark:border-purple-900/30 overflow-hidden transition-colors duration-500">
      {/* Background radial gradient light */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-fuchsia-500/10 dark:bg-fuchsia-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-700/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Slide-Up on Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-12 sm:mb-14 space-y-3"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            What we do
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-[1.618] text-balance">
            We build your website, store or software, then help it grow. Choose a single service or combine them into a joined-up plan.
          </p>
        </motion.div>

        {/* Bento Grid with Staggered Slide-Up on Scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onLearnMore={() => onSelectService(service)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  onLearnMore: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, onLearnMore }) => {
  const renderIcon = (type: ServiceItem['iconType']) => {
    switch (type) {
      case 'code':
        return <Code2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'cart':
        return <ShoppingCart className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />;
      case 'terminal':
        return <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'search':
        return <Search className="w-5 h-5 text-pink-600 dark:text-pink-400" />;
      case 'bot':
        return <Bot className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
      case 'target':
        return <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'share':
        return <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'chart':
        return <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Code2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-3xl glass-panel p-8 sm:p-9 border border-purple-200/80 dark:border-purple-500/20 hover:border-purple-400 dark:hover:border-purple-400/50 hover:shadow-[0_16px_40px_rgba(168,85,247,0.14)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 space-y-5">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-purple-100/80 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center shadow-xs group-hover:scale-105 transition-all duration-300">
            {renderIcon(service.iconType)}
          </div>
          <span className="font-mono text-xs text-purple-600/70 dark:text-purple-400/60 font-semibold">
            0{index + 1}
          </span>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors tracking-tight">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-[1.618]">
            {service.shortDesc}
          </p>
        </div>
      </div>

      {/* Learn More Button */}
      <div className="relative z-10 mt-8 pt-4">
        <button
          onClick={onLearnMore}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-xs tracking-wider uppercase inline-flex items-center gap-2 transition-all duration-200 shadow-sm cursor-pointer hover:scale-105"
        >
          <span>LEARN MORE</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};
