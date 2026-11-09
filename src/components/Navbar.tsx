import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SERVICES, CASE_STUDIES } from '../data/agencyData';

interface NavbarProps {
  onOpenProposalModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProposalModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dropdown states for desktop
  const [servicesOpen, setServicesOpen] = useState(false);
  const [casesOpen, setCasesOpen] = useState(false);

  const servicesTimeoutRef = useRef<number | null>(null);
  const casesTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100);
      }

      // Track active section for underline indicator
      const sections = ['hero', 'services', 'cases', 'why-us', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setCasesOpen(false);

    if (href === '#hero' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hero');
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProposalClick = () => {
    if (onOpenProposalModal) {
      onOpenProposalModal();
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top scroll progress indicator bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 shadow-[0_0_10px_rgba(217,70,239,0.8)] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-white/90 dark:bg-[#0B0716]/90 backdrop-blur-xl border-b border-purple-200/60 dark:border-purple-500/15 shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* Zone 1: Main Brand Logo */}
            <a
              href="#"
              onClick={(e) => scrollToSection(e, '#hero')}
              className="flex items-center group whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
              aria-label="Error Sync Home"
            >
              <img
                src="/logo.png"
                alt="Error Sync"
                className="h-8 sm:h-9 w-auto object-contain dark:hidden"
              />
              <img
                src="/logo-dark.png"
                alt="Error Sync"
                className="h-8 sm:h-9 w-auto object-contain hidden dark:block"
              />
            </a>

            {/* Zone 2: Navigation Links Matching Attached Image:
                HOME | SERVICES ⌵ | CASE STUDIES ⌵ | OUR STORY | CONTACT */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-bold tracking-wider uppercase">
              {/* HOME */}
              <a
                href="#hero"
                onClick={(e) => scrollToSection(e, '#hero')}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === 'hero'
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>HOME</span>
                {activeSection === 'hero' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}
              </a>

              {/* SERVICES ⌵ Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
                  setServicesOpen(true);
                }}
                onMouseLeave={() => {
                  servicesTimeoutRef.current = window.setTimeout(() => setServicesOpen(false), 150);
                }}
              >
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, '#services')}
                  className={`relative py-1.5 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeSection === 'services'
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>SERVICES</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-purple-600 dark:text-purple-400 transition-transform duration-200 ${
                      servicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                  {activeSection === 'services' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  )}
                </a>

                {/* Dropdown Menu */}
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl p-2.5 bg-white/95 dark:bg-[#120B24]/95 backdrop-blur-2xl border border-purple-200 dark:border-purple-500/30 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-purple-700 dark:text-purple-400 px-3 py-1 font-semibold">
                      Our Services
                    </div>
                    {SERVICES.slice(0, 7).map((s) => (
                      <a
                        key={s.id}
                        href="#services"
                        onClick={(e) => scrollToSection(e, '#services')}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/60 transition-colors text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-300"
                      >
                        <span className="truncate">{s.title}</span>
                        <ArrowRight className="w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* CASE STUDIES ⌵ Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (casesTimeoutRef.current) clearTimeout(casesTimeoutRef.current);
                  setCasesOpen(true);
                }}
                onMouseLeave={() => {
                  casesTimeoutRef.current = window.setTimeout(() => setCasesOpen(false), 150);
                }}
              >
                <a
                  href="#cases"
                  onClick={(e) => scrollToSection(e, '#cases')}
                  className={`relative py-1.5 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeSection === 'cases'
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>CASE STUDIES</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-purple-600 dark:text-purple-400 transition-transform duration-200 ${
                      casesOpen ? 'rotate-180' : ''
                    }`}
                  />
                  {activeSection === 'cases' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  )}
                </a>

                {/* Dropdown Menu */}
                {casesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl p-2.5 bg-white/95 dark:bg-[#120B24]/95 backdrop-blur-2xl border border-purple-200 dark:border-purple-500/30 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-purple-700 dark:text-purple-400 px-3 py-1 font-semibold">
                      Featured Work
                    </div>
                    {CASE_STUDIES.map((c) => (
                      <a
                        key={c.id}
                        href="#cases"
                        onClick={(e) => scrollToSection(e, '#cases')}
                        className="flex flex-col p-2 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/60 transition-colors text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-300"
                      >
                        <span>{c.title}</span>
                        <span className="text-[10px] font-normal text-slate-500 dark:text-purple-300/80">
                          {c.category} · {c.location}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* OUR STORY */}
              <a
                href="#why-us"
                onClick={(e) => scrollToSection(e, '#why-us')}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === 'why-us'
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>OUR STORY</span>
                {activeSection === 'why-us' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}
              </a>

              {/* CONTACT */}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === 'contact'
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>CONTACT</span>
                {activeSection === 'contact' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}
              </a>
            </nav>

            {/* Zone 3: Right Side matching attached image:
                WhatsApp Us | Get a Custom Proposal (with ThemeToggle alongside) */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              {/* WhatsApp Us Link */}
              <a
                href="https://wa.me/8801852170810"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-300 transition-colors whitespace-nowrap cursor-pointer py-1.5 px-2"
                title="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>WhatsApp Us</span>
              </a>

              {/* Get a Custom Proposal Button (matches purple pill in screenshot) */}
              <button
                onClick={handleProposalClick}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#a855f7] hover:from-[#6d28d9] hover:to-[#9333ea] text-white text-xs font-bold tracking-wide shadow-[0_4px_20px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_25px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                Get a Custom Proposal
              </button>

              {/* Theme Toggle Button (Light by default, switchable to Dark) */}
              <ThemeToggle />
            </div>

            {/* Mobile Actions: Hamburger & Theme Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-500/20 text-slate-700 dark:text-slate-200"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-5 pt-4 pb-6 bg-white/95 dark:bg-[#0B0716]/95 backdrop-blur-2xl border-b border-purple-200 dark:border-purple-500/20 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-2 text-xs font-bold tracking-wider uppercase">
              <a
                href="#hero"
                onClick={(e) => scrollToSection(e, '#hero')}
                className="px-3 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-800/30 text-slate-800 dark:text-slate-200"
              >
                HOME
              </a>
              <a
                href="#services"
                onClick={(e) => scrollToSection(e, '#services')}
                className="px-3 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-800/30 text-slate-800 dark:text-slate-200 flex items-center justify-between"
              >
                <span>SERVICES</span>
                <ChevronDown className="w-3.5 h-3.5 text-purple-500" />
              </a>
              <a
                href="#cases"
                onClick={(e) => scrollToSection(e, '#cases')}
                className="px-3 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-800/30 text-slate-800 dark:text-slate-200 flex items-center justify-between"
              >
                <span>CASE STUDIES</span>
                <ChevronDown className="w-3.5 h-3.5 text-purple-500" />
              </a>
              <a
                href="#why-us"
                onClick={(e) => scrollToSection(e, '#why-us')}
                className="px-3 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-800/30 text-slate-800 dark:text-slate-200"
              >
                OUR STORY
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="px-3 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-800/30 text-slate-800 dark:text-slate-200"
              >
                CONTACT
              </a>
            </div>

            <div className="pt-2 border-t border-purple-100 dark:border-purple-900/40 flex flex-col gap-2.5">
              <a
                href="https://wa.me/8801852170810"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-600/40 text-xs font-semibold text-emerald-800 dark:text-emerald-300"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleProposalClick();
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white font-bold text-xs tracking-wider uppercase shadow-md cursor-pointer"
              >
                Get a Custom Proposal
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
