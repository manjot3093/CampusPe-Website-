'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronRight, CheckCircle2, ShieldCheck, Building2, BarChart3, Users2, Award } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

interface CollegesSectionProps {
  onOpenWaitlist: (role?: 'student' | 'college' | 'employer') => void;
}

const collegeSteps = [
  {
    number: '01',
    title: 'Verified Institutional Profile',
    tag: 'SYSTEM VERIFICATION',
    summary: 'Surface authenticated NIRF accreditations, verified placement histories, and average CTC outcomes.',
    details: 'Replace unverified third-party rankings with immutable institutional metrics that top students respect.',
    icon: ShieldCheck,
  },
  {
    number: '02',
    title: 'Nationwide Student Inquiries',
    tag: 'TARGETED REACH',
    summary: 'Direct engagement from prospective students filtered by entrance cutoff percentiles and career goals.',
    details: 'Reduce admissions drop-offs with high-intent applicants who match your departmental criteria.',
    icon: Users2,
  },
  {
    number: '03',
    title: 'Integrated Corporate Placement Desk',
    tag: 'PIPELINE ARCHITECTURE',
    summary: 'Connect your training & placement cell directly with verified corporate hiring managers.',
    details: 'Orchestrate on-campus and off-campus recruitment drives with automated shortlisting and scheduling.',
    icon: Building2,
  },
  {
    number: '04',
    title: 'Real-Time Cohort Analytics',
    tag: 'EXECUTIVE TELEMETRY',
    summary: 'Track student job readiness, skill gaps, and salary trends across departments in real time.',
    details: 'Empower deans and academic councils with live telemetry on corporate demand to update syllabi.',
    icon: BarChart3,
  },
];

export default function CollegesSection({ onOpenWaitlist }: CollegesSectionProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="colleges" className="py-20 sm:py-32 bg-paper relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-ink/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10.5px] font-mono px-2.5 py-0.5 rounded bg-electric/10 text-electric font-bold tracking-wider">
                05 // FOR HIGHER EDUCATION INSTITUTIONS
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-ink/50">
                Institutional Infrastructure
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-ink font-normal tracking-tight">
              Elevate campus prestige. <br />
              <span className="font-serif italic text-electric">Build verified placement momentum.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm text-ink/75 leading-relaxed font-sans mb-6">
              CampusPe equips universities, autonomous colleges, and vocational institutes with an enterprise platform to showcase authentic outcomes and attract premier corporate recruiters.
            </p>
            <MagneticButton
              variant="primary"
              size="md"
              onClick={() => onOpenWaitlist('college')}
            >
              <span>Onboard Your College</span>
              <ArrowRight size={14} />
            </MagneticButton>
          </div>
        </div>

        {/* Asymmetrical Layout: Interactive Step Selector + Rich Preview */}
        <div className="grid lg:grid-cols-[1.2fr_0.9fr] gap-10 pt-10 items-start">
          {/* Step Accordion List */}
          <div className="space-y-4">
            {collegeSteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 sm:p-7 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-white shadow-[0_16px_40px_rgba(14,17,24,0.06)] border-electric'
                      : 'bg-white/60 border-ink/[0.07] hover:bg-white'
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-editorial font-bold text-base shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-electric text-white'
                          : 'bg-paper-warm text-ink/60'
                      }`}
                    >
                      {step.number}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-electric font-bold">
                          {step.tag}
                        </span>
                        <ChevronRight
                          size={18}
                          className={`text-ink/40 transition-transform ${
                            isSelected ? 'rotate-90 text-electric' : ''
                          }`}
                        />
                      </div>

                      <h3 className="font-sans font-bold text-lg text-ink mb-1">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-ink/65 leading-relaxed font-sans">
                        {step.summary}
                      </p>

                      {isSelected && (
                        <div className="mt-4 pt-4 border-t border-ink/[0.06] text-xs text-ink/80 leading-relaxed font-sans animate-in fade-in duration-200">
                          {step.details}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Institutional Preview Card */}
          <div className="p-8 rounded-3xl bg-white border border-ink/[0.08] shadow-[0_20px_50px_rgba(14,17,24,0.04)] sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-ink/[0.08] mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-electric font-bold">
                CAMPUS PORTAL PREVIEW
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                ACTIVE COHORT 2026
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-paper-warm border border-ink/[0.06] mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-ink text-white flex items-center justify-center font-bold text-xs">
                  BITS
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-ink">
                    Birla Institute of Technology & Science
                  </h4>
                  <p className="text-[11px] font-mono text-ink/50">Pilani • Goa • Hyderabad</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center pt-2">
                <div className="p-2.5 rounded-xl bg-white border border-ink/[0.06]">
                  <span className="text-[9px] font-mono text-ink/45 block">MEDIAN CTC</span>
                  <span className="font-mono text-xs font-bold text-ink">₹20.4 LPA</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-ink/[0.06]">
                  <span className="text-[9px] font-mono text-ink/45 block">PLACEMENT RATIO</span>
                  <span className="font-mono text-xs font-bold text-emerald-600">97.8%</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-paper-warm border border-ink/[0.06]">
                <span className="font-medium text-ink">Autonomous T&P Desk Access</span>
                <CheckCircle2 size={16} className="text-emerald-600" />
              </div>
              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-paper-warm border border-ink/[0.06]">
                <span className="font-medium text-ink">Automated NIRF Dossier Export</span>
                <CheckCircle2 size={16} className="text-emerald-600" />
              </div>
              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-paper-warm border border-ink/[0.06]">
                <span className="font-medium text-ink">Student Academic ID Handshake</span>
                <CheckCircle2 size={16} className="text-emerald-600" />
              </div>
            </div>

            <MagneticButton
              variant="primary"
              size="md"
              onClick={() => onOpenWaitlist('college')}
              className="w-full justify-center !py-3.5"
            >
              <span>Schedule Institutional Consultation</span>
              <ArrowRight size={15} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
