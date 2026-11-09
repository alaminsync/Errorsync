import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from './context/ThemeContext';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedMarquee } from './components/TrustedMarquee';
import { RecentWork } from './components/RecentWork';
import { WhatWeDo } from './components/WhatWeDo';
import { AIVisibilityBanner } from './components/AIVisibilityBanner';
import { WhyChooseUs } from './components/WhyChooseUs';
import { NumbersBanner } from './components/NumbersBanner';
import { Testimonials } from './components/Testimonials';
import { HowWeWork } from './components/HowWeWork';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ServiceModal } from './components/ServiceModal';
import { AllCasesModal } from './components/AllCasesModal';
import { AIAuditModal } from './components/AIAuditModal';
import { CaseStudy, ServiceItem } from './data/agencyData';

function AppContent() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isAllCasesOpen, setIsAllCasesOpen] = useState(false);
  const [isAIAuditOpen, setIsAIAuditOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lenis: Lenis | null = null;
    let rafId: number;

    try {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis initialization bypassed:', e);
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  const handleOpenProposal = (prefillTopic?: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      if (prefillTopic) {
        setTimeout(() => {
          const subjectInput = document.querySelector('input[name="subject"]') as HTMLInputElement | null;
          if (subjectInput) {
            subjectInput.value = `Enquiry regarding: ${prefillTopic}`;
            subjectInput.focus();
          }
        }, 600);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#0B0716] text-slate-900 dark:text-slate-100 selection:bg-purple-600/30 selection:text-purple-700 dark:selection:text-purple-200 transition-colors duration-300">
      {/* Interactive Glowing Custom Cursor */}
      <CustomCursor />

      {/* Sticky frosted Navbar with Theme Toggle */}
      <Navbar onOpenProposalModal={() => handleOpenProposal()} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero with 2D relevant agency showcase card */}
        <Hero onOpenProposal={() => handleOpenProposal()} />

        {/* 2. Infinite client logo marquee */}
        <TrustedMarquee />

        {/* 3. Recent Work case study cards */}
        <RecentWork
          onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
          onViewAll={() => setIsAllCasesOpen(true)}
        />

        {/* 4. What We Do: Bento-grid service cards */}
        <WhatWeDo onSelectService={(service) => setSelectedService(service)} />

        {/* 5. Next-gen AI Visibility banner */}
        <AIVisibilityBanner onOpenCheck={() => setIsAIAuditOpen(true)} />

        {/* 6. Why Businesses Choose Error Sync */}
        <WhyChooseUs />

        {/* 7. Numbers That Tell Our Story */}
        <NumbersBanner onSeeCaseStudies={() => setIsAllCasesOpen(true)} />

        {/* 8. Client Testimonials carousel */}
        <Testimonials />

        {/* 9. How We Work 4-step progressive timeline */}
        <HowWeWork />

        {/* 10. Frequently Asked Questions accordion */}
        <FAQ />

        {/* 11. Proposal Request Form & Client Quote card */}
        <ContactSection />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* Modals */}
      <CaseStudyModal
        study={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onRequestProposal={(title) => handleOpenProposal(`Case Study: ${title}`)}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onRequestProposal={(serviceTitle) => handleOpenProposal(`Service: ${serviceTitle}`)}
      />

      <AllCasesModal
        isOpen={isAllCasesOpen}
        onClose={() => setIsAllCasesOpen(false)}
        onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
        onRequestProposal={(title) => handleOpenProposal(title)}
      />

      <AIAuditModal
        isOpen={isAIAuditOpen}
        onClose={() => setIsAIAuditOpen(false)}
        onRequestProposal={() => handleOpenProposal('Free AI Visibility Audit')}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
