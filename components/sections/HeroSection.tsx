'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Search, Sparkles, Building2, Briefcase, GraduationCap, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import gsap from 'gsap';
import CampusThreeVisual from '../canvas/CampusThreeVisual';
import MagneticButton from '../ui/MagneticButton';

interface HeroSectionProps {
  onOpenWaitlist: (role?: 'student' | 'college' | 'employer') => void;
}

const quickQueries = [
  'IIM Bangalore MBA',
  'Software Engineer Intern',
  'BITS Pilani Tech',
  'Design Fellowships',
  'Product Manager',
];

export default function HeroSection({ onOpenWaitlist }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const artefact1Ref = useRef<HTMLDivElement>(null);
  const artefact2Ref = useRef<HTMLDivElement>(null);
  const artefact3Ref = useRef<HTMLDivElement>(null);

  // GSAP Cinematic Entrance Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Staggered reveal for headline lines
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.headline-line');
        tl.fromTo(
          lines,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, delay: 0.15 }
        );
      }

      // Smooth entrance for search bar
      if (searchBarRef.current) {
        tl.fromTo(
          searchBarRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.4'
        );
      }

      // Parallax entrance for floating artefacts
      if (artefact1Ref.current && artefact2Ref.current && artefact3Ref.current) {
        tl.fromTo(
          [artefact1Ref.current, artefact2Ref.current, artefact3Ref.current],
          { y: 30, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15 },
          '-=0.5'
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = document.querySelector('#opportunities');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickTagClick = (tag: string) => {
    setSearchQuery(tag);
    const target = document.querySelector('#opportunities');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative min-h-[96vh] pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-paper flex flex-col justify-between"
    >
      {/* 1. Interactive Three.js Living Campus Network Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
        <CampusThreeVisual theme="light" />
      </div>

      {/* 2. Abstract Campus Architectural Map Lines & Lat/Long Coordinates */}
      <div className="absolute inset-0 bg-campus-grid opacity-60 pointer-events-none z-0" />
      
      {/* Architectural Coordinates Watermark */}
      <div className="hidden xl:flex absolute top-28 right-12 z-0 flex-col items-end text-[9px] font-mono text-ink/30 tracking-widest pointer-events-none uppercase">
        <span>NEXUS // 12°58'23"N 77°35'45"E</span>
        <span>ACCREDITED CAMPUS GRAPH V2.6</span>
        <span>REAL-TIME NODE DENSITY: HIGH</span>
      </div>

      {/* Left & Right Editorial Hairline Margins */}
      <div className="hidden lg:block absolute left-10 inset-y-0 w-px bg-ink/[0.06] pointer-events-none z-10" />
      <div className="hidden lg:block absolute right-10 inset-y-0 w-px bg-ink/[0.06] pointer-events-none z-10" />

      {/* Main Content Area */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full z-10 my-auto">
        {/* Editorial Eyebrow Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-ink/[0.08] text-[11px] font-mono uppercase tracking-widest text-ink/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
            <span>The Unified Higher Education & Career Protocol</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[10.5px] font-mono uppercase tracking-widest text-ink/50">
            <span>● 130+ VERIFIED UNIVERSITIES</span>
            <span>● 1,200+ DIRECT ROLES</span>
            <span>● 99.9% TRUST SLA</span>
          </div>
        </div>

        {/* Hero Composition: Tall Vertically Rhythmic Headline + Floating Artefacts */}
        <div className="grid lg:grid-cols-[1.3fr_0.8fr] gap-12 lg:gap-16 items-center">
          {/* Left Column: Tall Editorial Headline & Search Interface */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-electric font-bold mb-4">
              Where Fragmentation Ends & Momentum Begins
            </p>

            {/* Tall Vertically Stretched Headline with Strong Vertical Rhythm */}
            <h1
              ref={headlineRef}
              className="font-editorial text-4xl sm:text-6xl md:text-7xl xl:text-[5.4rem] font-normal leading-[1.0] sm:leading-[0.96] tracking-[-0.03em] text-ink"
            >
              <span className="headline-line block">
                Where disconnected
              </span>
              <span className="headline-line block">
                <span className="font-serif italic text-electric font-normal">higher education</span>
              </span>
              <span className="headline-line block">
                unifies with <span className="font-editorial italic font-medium text-ochre">verified career</span>
              </span>
              <span className="headline-line block">
                <span className="font-serif italic font-normal text-ink">opportunities</span> at scale.
              </span>
            </h1>

            <p className="mt-8 text-base sm:text-lg text-ink/75 max-w-xl font-sans font-normal leading-relaxed">
              Students waste months guessing admissions and outcomes. Colleges struggle to prove real placement momentum. Employers drown in unvetted CVs. CampusPe replaces the broken cycle with an intelligent, authenticated network.
            </p>

            {/* Search Dossier Input */}
            <div ref={searchBarRef} className="mt-9 max-w-xl">
              <form
                onSubmit={handleSearchSubmit}
                className="p-2 bg-white/95 border border-ink/[0.09] rounded-2xl shadow-[0_12px_36px_rgba(14,17,24,0.06)] flex flex-col sm:flex-row gap-2 transition-all focus-within:border-electric/50 focus-within:shadow-[0_16px_45px_rgba(0,98,255,0.12)]"
              >
                <div className="flex-1 flex items-center gap-3 px-3 py-2">
                  <Search size={18} className="text-electric shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search premier colleges, verified roles, or tech skills..."
                    className="w-full text-xs sm:text-sm text-ink bg-transparent focus:outline-none placeholder:text-ink/40 font-medium"
                    aria-label="Search colleges or opportunities"
                  />
                </div>
                <MagneticButton
                  variant="primary"
                  size="md"
                  type="submit"
                  className="sm:shrink-0 !py-3 !px-6"
                >
                  <span>Explore Radar</span>
                  <ArrowRight size={14} />
                </MagneticButton>
              </form>

              {/* Quick Query Navigation Pills */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink/45 mr-1">
                  Active Inquiries:
                </span>
                {quickQueries.map((query) => (
                  <button
                    key={query}
                    type="button"
                    onClick={() => handleQuickTagClick(query)}
                    className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-paper-warm hover:bg-white text-ink/70 hover:text-electric border border-ink/[0.06] transition-all hover:shadow-2xs"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                variant="primary"
                size="md"
                onClick={() => onOpenWaitlist('student')}
              >
                <span>Discover Opportunities</span>
                <GraduationCap size={15} />
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                size="md"
                onClick={() => onOpenWaitlist('employer')}
              >
                <span>For Hiring Partners</span>
                <Briefcase size={15} />
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Carefully Art-Directed Floating Campus Artefacts */}
          <div className="relative h-[440px] sm:h-[500px] lg:h-[560px] flex items-center justify-center">
            {/* Artefact 1: Clipped Student Academic Photograph (Rotated, Thin Border) */}
            <div
              ref={artefact1Ref}
              className="absolute top-2 right-4 sm:right-8 z-20 max-w-[240px] sm:max-w-[270px] bg-white p-2.5 rounded-2xl border border-ink/[0.08] shadow-[0_20px_50px_rgba(14,17,24,0.08)] transform rotate-2 hover:rotate-0 transition-transform duration-500"
            >
              <div className="relative h-36 sm:h-44 w-full rounded-xl overflow-hidden bg-paper-warm">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
                  alt="Student exploring opportunities"
                  className="w-full h-full object-cover object-center filter grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                  loading="eager"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-ink/80 backdrop-blur-sm text-[9px] font-mono text-white uppercase tracking-wider">
                  Verified Candidate
                </div>
              </div>
              <div className="p-2 pt-2.5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-ink">Devansh Sharma</p>
                  <p className="text-[10px] font-mono text-ink/55">B.Tech • IIT Delhi '26</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  <CheckCircle2 size={12} />
                  <span>96% ATS</span>
                </div>
              </div>
            </div>

            {/* Artefact 2: Institutional Prestige Anchor (IIM Bangalore Verified Stamp) */}
            <div
              ref={artefact2Ref}
              className="absolute bottom-24 left-0 sm:left-4 z-30 max-w-[260px] sm:max-w-[290px] bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-ink/[0.08] shadow-[0_25px_60px_rgba(14,17,24,0.09)] transform -rotate-2 hover:rotate-0 transition-transform duration-500"
            >
              <div className="flex items-center justify-between pb-2 border-b border-ink/[0.06] mb-3">
                <span className="text-[9px] font-mono uppercase tracking-widest text-electric font-bold">
                  INSTITUTIONAL RADAR
                </span>
                <span className="text-[9px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  NIRF RANK #2
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-paper-warm border border-ink/[0.08] flex items-center justify-center font-editorial font-bold text-sm text-ink shrink-0">
                  IIMB
                </div>
                <div>
                  <h4 className="text-xs font-bold text-ink">IIM Bangalore</h4>
                  <p className="text-[10.5px] font-mono text-ink/55">Management • Bengaluru</p>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-ink/[0.06] flex items-center justify-between text-[10px] font-mono text-ink/65">
                <span>MEDIAN CTC: ₹33.8 LPA</span>
                <span className="text-electric font-bold">ADMISSIONS OPEN</span>
              </div>
            </div>

            {/* Artefact 3: Direct Opportunity Match Snippet (Lower Right) */}
            <div
              ref={artefact3Ref}
              className="absolute -bottom-2 right-1 sm:right-6 z-30 max-w-[240px] sm:max-w-[260px] bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-ink/[0.08] shadow-[0_20px_50px_rgba(14,17,24,0.08)] transform rotate-1 hover:rotate-0 transition-transform duration-500"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-electric/10 text-electric flex items-center justify-center font-bold text-xs shrink-0">
                  SDE
                </div>
                <div>
                  <p className="text-xs font-bold text-ink truncate">Founding Engineer</p>
                  <p className="text-[10px] font-mono text-ink/50">₹45,000 / mo • Remote</p>
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[9px] font-mono text-emerald-600 bg-emerald-50/80 px-2 py-1 rounded">
                <span>Direct Placement Cell Sync</span>
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
