'use client';

import React from 'react';
import { ArrowUpRight, Sparkles, GraduationCap, Building2, Briefcase } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

interface CtaBannerProps {
  onOpenWaitlist: (role?: 'student' | 'college' | 'employer') => void;
}

export default function CtaBanner({ onOpenWaitlist }: CtaBannerProps) {
  return (
    <section className="bg-ink text-paper py-24 sm:py-36 relative overflow-hidden">
      {/* Background Architectural Blueprint Grid */}
      <div className="absolute inset-0 bg-campus-grid-dark opacity-20 pointer-events-none" />

      {/* Decorative Hairline Accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/10" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-white/10" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono uppercase tracking-widest text-electric mb-8 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Priority Admissions & Enterprise Intake Open</span>
        </div>

        <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.02] tracking-tight max-w-5xl mx-auto text-white">
          The future of campus discovery <br className="hidden sm:inline" />
          belongs to the <span className="text-electric font-serif italic font-normal">verified</span>.
        </h2>

        <p className="mt-8 text-sm sm:text-lg text-white/65 max-w-2xl mx-auto font-sans leading-relaxed">
          Whether you are a student exploring your first high-growth career, a college dean showcasing placement outcomes, or an employer hiring with zero noise — welcome to CampusPe.
        </p>

        {/* 3 Audience Express Buttons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            variant="dark"
            size="lg"
            onClick={() => onOpenWaitlist('student')}
            className="!py-4 !px-8"
          >
            <span>Join as Student</span>
            <GraduationCap size={16} />
          </MagneticButton>

          <MagneticButton
            variant="outline"
            size="lg"
            onClick={() => onOpenWaitlist('college')}
            className="!py-4 !px-8"
          >
            <span>Onboard College</span>
            <Building2 size={16} />
          </MagneticButton>

          <MagneticButton
            variant="outline"
            size="lg"
            onClick={() => onOpenWaitlist('employer')}
            className="!py-4 !px-8"
          >
            <span>Hire Talent</span>
            <Briefcase size={16} />
          </MagneticButton>
        </div>

        {/* Footnote Disclosures */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-[10.5px] font-mono text-white/40 uppercase tracking-widest">
          <span>● ZERO COMMISSION BROKERAGE</span>
          <span>● COMPREHENSIVE DPDPA 2023 PRIVACY</span>
          <span>● ENCRYPTED ATS RESUME RADAR</span>
        </div>
      </div>
    </section>
  );
}
