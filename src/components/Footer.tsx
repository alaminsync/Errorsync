import React from 'react';
import {
  Rocket,
  MapPin,
  Clock,
  Linkedin,
  Facebook,
  Youtube,
  MessageCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import { AGENCY_INFO } from '../data/agencyData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer className="relative bg-slate-100 dark:bg-[#06040C] border-t border-purple-200 dark:border-purple-500/20 pt-12 sm:pt-16 pb-12 overflow-hidden transition-colors duration-500">
        {/* Animated wave / top gradient border highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-purple-600/10 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-purple-200/70 dark:border-purple-900/40">
            {/* Column 1: Brand & Bio (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Error Sync"
                  className="h-9 w-auto object-contain dark:hidden"
                />
                <img
                  src="/logo-dark.png"
                  alt="Error Sync"
                  className="h-9 w-auto object-contain hidden dark:block"
                />
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-[1.618] max-w-sm">
                We build websites, Shopify stores and software that work like business engines — engineered for speed, conversion and real outcomes.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={AGENCY_INFO.contact.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-xl bg-purple-200/50 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/40 text-purple-800 dark:text-purple-300 hover:text-purple-950 dark:hover:text-white hover:border-purple-400 hover:scale-110 transition-all flex items-center justify-center"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={AGENCY_INFO.contact.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-xl bg-purple-200/50 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/40 text-purple-800 dark:text-purple-300 hover:text-purple-950 dark:hover:text-white hover:border-purple-400 hover:scale-110 transition-all flex items-center justify-center"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={AGENCY_INFO.contact.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-xl bg-purple-200/50 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/40 text-purple-800 dark:text-purple-300 hover:text-purple-950 dark:hover:text-white hover:border-purple-400 hover:scale-110 transition-all flex items-center justify-center"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Services List (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300">
                Services
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <li>
                  <a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    Web Design & Development
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    Shopify Store Design & Development
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    SEO, AEO & GEO
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    Agentic SEO
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    PPC Advertising (Google Ads)
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    Meta Ads (Facebook & Instagram)
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    Custom Software Solutions
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Links (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <li>
                  <a href="#why-us" onClick={(e) => scrollToSection(e, '#why-us')} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    Why Error Sync
                  </a>
                </li>
                <li>
                  <a href="#cases" onClick={(e) => scrollToSection(e, '#cases')} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => scrollToSection(e, '#faq')} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    FAQ & Pricing
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Office Locations & Inquiries (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300">
                Office Locations
              </h4>

              <div className="space-y-2.5 text-xs">

                <div className="pt-1">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Drop us a line</span>
                  <a
                    href={`mailto:${AGENCY_INFO.contact.email}`}
                    className="font-mono text-purple-700 dark:text-purple-300 hover:underline transition-colors"
                  >
                    {AGENCY_INFO.contact.email}
                  </a>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{AGENCY_INFO.contact.hours}</span>
                </div>

                {/* Physical Addresses */}
                <div className="pt-2 border-t border-purple-200 dark:border-purple-900/30 space-y-2 text-[11px] text-slate-600 dark:text-slate-400">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    <span>{AGENCY_INFO.contact.locations[0].address}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-fuchsia-600 dark:text-fuchsia-400 shrink-0 mt-0.5" />
                    <span>{AGENCY_INFO.contact.locations[1].address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div>
              © 2026 {AGENCY_INFO.name}. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Sitemap</a>
              <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Terms of Use</a>
            </div>

            {/* Back to top rocket button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-200/60 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/40 text-purple-800 dark:text-purple-300 hover:text-purple-950 dark:hover:text-white hover:border-purple-400 transition-all cursor-pointer text-[11px] font-semibold"
              title="Back to top"
            >
              <Rocket className="w-3.5 h-3.5 text-fuchsia-600 dark:text-fuchsia-400" />
              <span>Back to top</span>
            </button>
          </div>
        </motion.div>
      </footer>
    </>
  );
};
