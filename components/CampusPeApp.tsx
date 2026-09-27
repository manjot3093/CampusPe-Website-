'use client';

import React, { useState, useEffect } from 'react';
import TopNav from './ui/TopNav';
import Footer from './ui/Footer';
import WaitlistModal from './ui/WaitlistModal';
import CookieConsent from './ui/CookieConsent';
import HeroSection from './sections/HeroSection';
import StorytellingSection from './sections/StorytellingSection';
import StatsSection from './sections/StatsSection';
import OpportunitySection from './sections/OpportunitySection';
import ResumeSection from './sections/ResumeSection';
import CollegesSection from './sections/CollegesSection';
import EmployersSection from './sections/EmployersSection';
import FaqSection from './sections/FaqSection';
import CtaBanner from './sections/CtaBanner';

export default function CampusPeApp() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistRole, setWaitlistRole] = useState<'student' | 'college' | 'employer'>('student');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenWaitlist = (role: 'student' | 'college' | 'employer' = 'student') => {
    setWaitlistRole(role);
    setWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen bg-paper text-ink relative selection:bg-electric selection:text-white">
      {/* Subtle Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-electric z-[60] transition-all duration-75 ease-out pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Editorial Navigation */}
      <TopNav onOpenWaitlist={() => handleOpenWaitlist('student')} />

      {/* Main Content Flow */}
      <main id="main-content" className="relative">
        {/* 01 // Editorial Hero with Living Campus Network & Clipped Artefacts */}
        <HeroSection onOpenWaitlist={handleOpenWaitlist} />

        {/* 02 // GSAP ScrollTrigger Pinned Storytelling: Fragmentation to Solution */}
        <StorytellingSection onOpenWaitlist={handleOpenWaitlist} />

        {/* 03 // Monolithic Typographic Scale & Telemetry Data Ledger */}
        <StatsSection />

        {/* 04 // Interactive Opportunity Feed & Live Dossier Inspection */}
        <OpportunitySection onOpenWaitlist={handleOpenWaitlist} />

        {/* 05 // Interactive ATS Resume Parser & Deterministic Skill Radar */}
        <ResumeSection onOpenWaitlist={handleOpenWaitlist} />

        {/* 06 // Institutional Portal & Accreditation Momentum */}
        <CollegesSection onOpenWaitlist={handleOpenWaitlist} />

        {/* 07 // Enterprise & Startup Recruiter Gateway */}
        <EmployersSection onOpenWaitlist={handleOpenWaitlist} />

        {/* 08 // Comprehensive Institutional & Candidate FAQ */}
        <FaqSection onOpenWaitlist={handleOpenWaitlist} />

        {/* 09 // Monolithic Conversion Statement */}
        <CtaBanner onOpenWaitlist={handleOpenWaitlist} />
      </main>

      {/* Architectural Footer with World Clocks and Network Telemetry */}
      <Footer onOpenWaitlist={() => handleOpenWaitlist('student')} />

      {/* Luxury Bottom-Sheet Cookie Telemetry Banner */}
      <CookieConsent />

      {/* Multi-Role Waitlist Modal */}
      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        initialRole={waitlistRole}
      />
    </div>
  );
}
