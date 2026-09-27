'use client';

import React, { useState } from 'react';
import { ArrowRight, Briefcase, Zap, CheckCircle2, Shield, Filter, Users, Clock } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

interface EmployersSectionProps {
  onOpenWaitlist: (role?: 'student' | 'college' | 'employer') => void;
}

const employerSteps = [
  {
    num: '01',
    title: 'Publish Role Criteria in 5 Minutes',
    summary: 'Define verified prerequisite coursework, tech stacks, or CGPA cutoffs. Zero boilerplate.',
    badge: 'RAPID PROTOCOL',
  },
  {
    num: '02',
    title: 'Precision Skill-Ranked Shortlists',
    summary: 'Our algorithm eliminates 95% unqualified noise by matching verified GitHub, ATS, and campus project proofs.',
    badge: 'NEURAL RANKING',
  },
  {
    num: '03',
    title: 'Frictionless Interview Handshake',
    summary: 'Batch schedule interviews with automated calendar integration and placement cell approvals.',
    badge: 'ZERO HANDOFFS',
  },
  {
    num: '04',
    title: 'Close Offers with 42% Less Lead Time',
    summary: 'Move from requisition opening to accepted campus offer in days rather than multiple weeks.',
    badge: 'HIGH VELOCITY',
  },
];

const proofMetrics = [
  { value: '5 min', label: 'Average Requisition Setup', sub: 'Zero boilerplate intake' },
  { value: '500+', label: 'Hiring Partners', sub: 'From Seed to Fortune 500' },
  { value: '42%', label: 'Accelerated Time-to-Offer', sub: 'Compared to traditional drives' },
  { value: '94.6%', label: 'Offer Acceptance Ratio', sub: 'Pre-calibrated candidate intent' },
];

export default function EmployersSection({ onOpenWaitlist }: EmployersSectionProps) {
  const [skillThreshold, setSkillThreshold] = useState(85);

  const matchedCount = Math.round((skillThreshold / 100) * 140) + 12;

  return (
    <section id="employers" className="py-20 sm:py-32 bg-paper-warm border-y border-ink/[0.08] relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-ink/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10.5px] font-mono px-2.5 py-0.5 rounded bg-electric/10 text-electric font-bold tracking-wider">
                06 // FOR ENTERPRISE & RECRUITING TEAMS
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-ink/50">
                Talent Pipeline Engine
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-ink font-normal tracking-tight">
              Hire with razor precision. <br />
              <span className="font-serif italic text-electric">Eradicate recruitment overhead.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm text-ink/75 leading-relaxed font-sans mb-6">
              Connect directly with verified talent pools across 130+ accredited colleges without the friction of physical drives, agency markups, or unqualified applicants.
            </p>
            <MagneticButton
              variant="primary"
              size="md"
              onClick={() => onOpenWaitlist('employer')}
            >
              <span>Deploy Hiring Requisition</span>
              <ArrowRight size={14} />
            </MagneticButton>
          </div>
        </div>

        {/* Asymmetric Content: Pipeline Calibrator + Workflow Cards */}
        <div className="grid lg:grid-cols-[1.1fr_1.1fr] gap-10 pt-10 items-start">
          {/* Interactive Recruitment Pipeline Console */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-ink/[0.08] shadow-[0_20px_50px_rgba(14,17,24,0.04)]">
            <div className="flex items-center justify-between pb-4 border-b border-ink/[0.08] mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-electric font-bold">
                CANDIDATE RADAR CALIBRATOR
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-paper border border-ink/[0.08] text-ink/65">
                DYNAMIC FILTER
              </span>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-bold text-ink">Minimum Match Precision Threshold</span>
                <span className="font-mono text-sm font-extrabold text-electric">{skillThreshold}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="98"
                value={skillThreshold}
                onChange={(e) => setSkillThreshold(Number(e.target.value))}
                className="w-full h-2 bg-paper-tint rounded-lg appearance-none cursor-pointer accent-electric"
              />
              <div className="flex justify-between text-[10px] font-mono text-ink/40 mt-1">
                <span>Broad Pool (60%)</span>
                <span>Hyper-Targeted (98%)</span>
              </div>
            </div>

            {/* Matched Talent Readout */}
            <div className="p-4 rounded-2xl bg-paper-warm border border-ink/[0.06] mb-6 flex items-center justify-between">
              <div>
                <span className="text-[9.5px] font-mono uppercase tracking-widest text-ink/45 block mb-0.5">
                  PRE-SCREENED TALENT AVAILABLE
                </span>
                <div className="font-editorial font-bold text-3xl text-ink">
                  {matchedCount} Candidates
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-emerald-600 font-bold block">
                  READY TO INTERVIEW
                </span>
                <span className="text-xs font-mono text-ink/50">Across 22 Campuses</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="p-3 rounded-xl bg-white border border-ink/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-electric/10 text-electric flex items-center justify-center font-bold text-xs">
                    TS
                  </div>
                  <div>
                    <p className="font-bold text-ink">TypeScript + Distributed Systems</p>
                    <p className="text-[10px] font-mono text-ink/50">IIT Delhi, BITS Pilani, NIT Trichy</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-600">96% Fit</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-ink/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-electric/10 text-electric flex items-center justify-center font-bold text-xs">
                    PM
                  </div>
                  <div>
                    <p className="font-bold text-ink">Quantitative Product Metrics</p>
                    <p className="text-[10px] font-mono text-ink/50">IIM Ahmedabad, IIM Bangalore</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-electric">92% Fit</span>
              </div>
            </div>

            <MagneticButton
              variant="primary"
              size="md"
              onClick={() => onOpenWaitlist('employer')}
              className="w-full justify-center !py-3.5"
            >
              <span>Initiate Direct Talent Shortlist</span>
              <ArrowRight size={15} />
            </MagneticButton>
          </div>

          {/* Workflow Sequence */}
          <div className="space-y-4">
            {employerSteps.map((step) => (
              <div
                key={step.num}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-ink/[0.08] hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-ink text-white flex items-center justify-center font-editorial font-bold text-sm shrink-0">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-electric font-bold block mb-1">
                      {step.badge}
                    </span>
                    <h3 className="font-sans font-bold text-base text-ink mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-ink/65 leading-relaxed font-sans">
                      {step.summary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proof Points Metric Matrix */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-12">
          {proofMetrics.map((metric) => (
            <div
              key={metric.label}
              className="p-6 rounded-2xl bg-white border border-ink/[0.08]"
            >
              <div className="font-editorial font-bold text-3xl sm:text-4xl text-ink mb-1">
                {metric.value}
              </div>
              <h4 className="font-sans font-bold text-xs text-ink mb-0.5">
                {metric.label}
              </h4>
              <p className="text-[11px] font-mono text-ink/50">
                {metric.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
