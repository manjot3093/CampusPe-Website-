'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, Network, Zap, Shield, ArrowUpRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

interface StorytellingSectionProps {
  onOpenWaitlist: (role?: 'student' | 'college' | 'employer') => void;
}

export default function StorytellingSection({ onOpenWaitlist }: StorytellingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const nexusRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<'problem' | 'transition' | 'solution'>('problem');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    if (!container || !pinSection) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=140%',
          scrub: 1,
          pin: pinSection,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress < 0.35) {
              setActiveStage('problem');
            } else if (self.progress < 0.72) {
              setActiveStage('transition');
            } else {
              setActiveStage('solution');
            }
          },
        },
      });

      // Stage 1 to 2: The 3 Silos slide inward and converge toward center
      tl.to(
        [card1Ref.current, card2Ref.current, card3Ref.current],
        {
          x: 0,
          y: 0,
          scale: 0.92,
          opacity: 0.25,
          stagger: 0.05,
          ease: 'power2.inOut',
        },
        0
      );

      // Stage 2 to 3: Central CampusPe Nexus expands to full clarity
      tl.to(
        nexusRef.current,
        {
          scale: 1,
          opacity: 1,
          ease: 'power3.out',
        },
        0.35
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="story" className="relative bg-ink text-paper">
      {/* Pinned Viewport Container */}
      <section
        ref={pinSectionRef}
        className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-10 flex flex-col justify-between overflow-hidden relative"
      >
        {/* Architectural Blueprint Grid Pattern */}
        <div className="absolute inset-0 bg-campus-grid-dark opacity-35 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto w-full z-10 my-auto">
          {/* Eyebrow Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8 sm:mb-12">
            <div className="flex items-center gap-3">
              <span className="text-[10.5px] font-mono px-2.5 py-0.5 rounded bg-white/10 text-electric font-bold tracking-wider">
                02 // SYSTEM EVOLUTION
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">
                The CampusPe Synthesis
              </span>
            </div>

            {/* Stage Progress Pills */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span
                className={`px-3 py-1 rounded-full transition-all ${
                  activeStage === 'problem'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                    : 'text-white/40'
                }`}
              >
                1. DISCONNECT
              </span>
              <span className="text-white/20">→</span>
              <span
                className={`px-3 py-1 rounded-full transition-all ${
                  activeStage === 'transition'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                    : 'text-white/40'
                }`}
              >
                2. CONVERGENCE
              </span>
              <span className="text-white/20">→</span>
              <span
                className={`px-3 py-1 rounded-full transition-all ${
                  activeStage === 'solution'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'text-white/40'
                }`}
              >
                3. VELOCITY
              </span>
            </div>
          </div>

          {/* Narrative Headline */}
          <div className="max-w-3xl mb-10 sm:mb-12">
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.05] tracking-tight">
              {activeStage === 'problem' && (
                <>
                  Three disconnected worlds. <br />
                  <span className="text-rose-400 italic">
                    Zero unified momentum.
                  </span>
                </>
              )}
              {activeStage === 'transition' && (
                <>
                  Synthesizing campus intelligence. <br />
                  <span className="text-amber-400 italic">
                    Bridging academia and opportunity.
                  </span>
                </>
              )}
              {activeStage === 'solution' && (
                <>
                  One synchronized ecosystem. <br />
                  <span className="text-emerald-400 italic">
                    Friction replaced by exponential velocity.
                  </span>
                </>
              )}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/65 leading-relaxed font-sans max-w-xl">
              Higher education and hiring run on fragmented emails, unverified PDF resumes, and opaque placement reports. CampusPe synchronizes students, institutions, and employers into one verified graph.
            </p>
          </div>

          {/* Interactive Visual Stage: The 3 Silos Converging into the CampusPe Nexus */}
          <div className="relative min-h-[360px] sm:min-h-[420px] flex items-center justify-center">
            {/* Silo A: Overwhelmed Students */}
            <div
              ref={card1Ref}
              className={`absolute top-0 sm:top-2 left-0 sm:left-4 max-w-xs w-full p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 ${
                activeStage === 'solution' ? 'scale-90 opacity-20 pointer-events-none' : 'opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold flex items-center gap-1.5">
                  <AlertCircle size={13} />
                  Silo 01 • Students
                </span>
                <span className="text-[9px] font-mono text-white/40">ISOLATION</span>
              </div>
              <h4 className="font-sans font-bold text-base text-white mb-1.5">
                The Resume Black Hole
              </h4>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Students apply to dozens of generic forms without feedback, guessing career trajectories on outdated hearsay.
              </p>
            </div>

            {/* Silo B: Colleges with Opaque Momentum */}
            <div
              ref={card2Ref}
              className={`absolute top-0 sm:top-2 right-0 sm:right-4 max-w-xs w-full p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 ${
                activeStage === 'solution' ? 'scale-90 opacity-20 pointer-events-none' : 'opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                  <AlertCircle size={13} />
                  Silo 02 • Colleges
                </span>
                <span className="text-[9px] font-mono text-white/40">FRAGMENTED</span>
              </div>
              <h4 className="font-sans font-bold text-base text-white mb-1.5">
                Manual Placement Spreadsheets
              </h4>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Institutions struggle to prove authentic student outcomes to prospective applicants and manage recruiters at scale.
              </p>
            </div>

            {/* Silo C: Employers Overwhelmed by Low Signal */}
            <div
              ref={card3Ref}
              className={`absolute bottom-0 sm:bottom-2 left-0 sm:left-10 max-w-xs w-full p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 ${
                activeStage === 'solution' ? 'scale-90 opacity-20 pointer-events-none' : 'opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold flex items-center gap-1.5">
                  <AlertCircle size={13} />
                  Silo 03 • Recruiters
                </span>
                <span className="text-[9px] font-mono text-white/40">LOW SIGNAL</span>
              </div>
              <h4 className="font-sans font-bold text-base text-white mb-1.5">
                Noisy Requisition Backlogs
              </h4>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Recruiting teams spend weeks sorting thousands of unverified candidates with sluggish 45-day hiring cycles.
              </p>
            </div>

            {/* Central Unified CampusPe Nexus Card */}
            <div
              ref={nexusRef}
              className={`relative z-20 max-w-xl w-full p-6 sm:p-8 rounded-3xl bg-white text-ink shadow-[0_25px_80px_rgba(0,98,255,0.28)] border border-ink/[0.08] transition-all duration-500 ${
                activeStage === 'problem' ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-ink/[0.08] mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-electric text-white flex items-center justify-center font-bold text-sm">
                    CP
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-electric font-bold block">
                      SYNCHRONIZED CAMPUS GRAPH
                    </span>
                    <h3 className="font-sans font-bold text-lg text-ink">
                      CampusPe Verified Platform
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  10X VELOCITY
                </span>
              </div>

              {/* Before vs After Telemetry Matrix */}
              <div className="grid sm:grid-cols-3 gap-3 text-left mb-5">
                <div className="p-3.5 rounded-xl bg-paper-warm border border-ink/[0.06]">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-ink/45 block mb-1">
                    TIME TO SHORTLIST
                  </span>
                  <div className="font-editorial font-bold text-2xl text-ink">
                    5 Mins
                  </div>
                  <span className="text-[10px] font-mono text-rose-600 line-through">
                    Was 3-4 Weeks
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-paper-warm border border-ink/[0.06]">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-ink/45 block mb-1">
                    VERIFIED MATCH
                  </span>
                  <div className="font-editorial font-bold text-2xl text-ink">
                    94.2%
                  </div>
                  <span className="text-[10px] font-mono text-rose-600 line-through">
                    Was &lt; 8% signal
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-paper-warm border border-ink/[0.06]">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-ink/45 block mb-1">
                    COLLEGE REACH
                  </span>
                  <div className="font-editorial font-bold text-2xl text-ink">
                    National
                  </div>
                  <span className="text-[10px] font-mono text-rose-600 line-through">
                    Was local silos
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-xs text-ink/80 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Authenticated institutional student records with deterministic skill verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Transparent campus NIRF accreditations and verifiable alumni placement outcomes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Zero-spam corporate recruitment pipeline with automated interview scheduling</span>
                </div>
              </div>

              <MagneticButton
                variant="primary"
                size="md"
                onClick={() => onOpenWaitlist()}
                className="w-full justify-center !py-3.5"
              >
                <span>Enter The Verified Network</span>
                <ArrowRight size={15} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
