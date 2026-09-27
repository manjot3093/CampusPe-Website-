'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ArrowUpRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

interface FaqSectionProps {
  onOpenWaitlist: (role?: 'student' | 'college' | 'employer') => void;
}

interface FaqItem {
  id: string;
  category: 'Students' | 'Colleges' | 'Employers';
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Students',
    question: 'How does CampusPe differ from generic job boards like LinkedIn or Naukri?',
    answer:
      'Standard job boards are open broadcast portals where a single internship posting receives 3,000 unverified applicants. CampusPe is a closed, authenticated campus opportunity network. Every profile is tied to accredited academic coursework, verified GPA and institutional records, and matched deterministically against employer requisition requirements. You skip the resume black hole and enter direct priority consideration.',
  },
  {
    id: 'faq-2',
    category: 'Students',
    question: 'Is the resume ATS parsing and match scoring completely free for students?',
    answer:
      'Yes. Our deterministic ATS Vector Parser is 100% free for all enrolled college students. You can analyze your resume as many times as needed to optimize formatting, identify missing curriculum competencies, and benchmark your readiness against live industry requisitions.',
  },
  {
    id: 'faq-3',
    category: 'Colleges',
    question: 'How do Training & Placement Cells integrate their existing recruitment records?',
    answer:
      'Our team provides an administrative API and CSV ingestion portal that allows placement coordinators to import historical student records, NIRF documentation, and active placement drives in under 30 minutes. Colleges retain complete data sovereignty and can approve or decline corporate recruitment requests with one click.',
  },
  {
    id: 'faq-4',
    category: 'Colleges',
    question: 'Can colleges showcase both engineering and management cohorts simultaneously?',
    answer:
      'Yes. CampusPe supports multi-faculty institutional architecture. Universities can establish dedicated departmental desks (e.g., Computer Science, Electrical Engineering, Business School, Design Department) with distinct placement statistics, faculty coordinators, and corporate partner rosters.',
  },
  {
    id: 'faq-5',
    category: 'Employers',
    question: 'What is the vetting standard for student candidates surfaced on CampusPe?',
    answer:
      'Candidates on CampusPe undergo three levels of verification: institutional email domain authentication, algorithmic ATS parsing of real coursework and GitHub/portfolio repositories, and placement cell verification. Recruiters receive zero bot applications and pre-screened talent ready for technical interviews.',
  },
  {
    id: 'faq-6',
    category: 'Employers',
    question: 'How does CampusPe achieve a 42% reduction in time-to-offer?',
    answer:
      'Traditional campus placement cycles involve traveling to physical campuses, dealing with conflicting schedules, and manual spreadsheet filtering. With CampusPe, employers filter nationwide candidates by verified skill thresholds, conduct batch interviews through synchronized calendar slots, and issue standardized offers with clear tracking.',
  },
];

export default function FaqSection({ onOpenWaitlist }: FaqSectionProps) {
  const [activeTab, setActiveTab] = useState<'All' | 'Students' | 'Colleges' | 'Employers'>('All');
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const filteredFaqs =
    activeTab === 'All'
      ? faqData
      : faqData.filter((item) => item.category === activeTab);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 sm:py-32 bg-paper relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-ink/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10.5px] font-mono px-2.5 py-0.5 rounded bg-electric/10 text-electric font-bold tracking-wider">
                07 // FREQUENTLY ADDRESSED INQUIRIES
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-ink/50">
                Institutional Disclosures
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-ink font-normal tracking-tight">
              Clear answers. <br />
              <span className="font-serif italic text-electric">Institutional transparency.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm text-ink/75 leading-relaxed font-sans mb-6">
              Review our operational principles across candidate verification, university accreditation, and enterprise hiring protocols.
            </p>
            <div className="flex items-center gap-2">
              {(['All', 'Students', 'Colleges', 'Employers'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition ${
                    activeTab === tab
                      ? 'bg-ink text-white font-bold'
                      : 'bg-white border border-ink/[0.08] text-ink/65 hover:text-ink'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Accordion Matrix */}
        <div className="max-w-4xl mx-auto pt-10 divide-y divide-ink/[0.08]">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-6 transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-6 text-left group focus:outline-none"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-mono text-electric mt-1 font-bold">
                      [{faq.category.toUpperCase()}]
                    </span>
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-ink group-hover:text-electric transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-ink/[0.1] flex items-center justify-center shrink-0 text-ink/60 group-hover:text-ink group-hover:border-ink/30 transition">
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pl-12 pr-6 text-sm text-ink/75 leading-relaxed font-sans animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support & Contact Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-paper-warm border border-ink/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="font-sans font-bold text-lg text-ink">
              Have an institutional inquiry or bespoke partnership request?
            </h4>
            <p className="text-xs text-ink/65 mt-1 font-sans">
              Our campus relations team responds within 4 business hours to verified college deans and corporate leaders.
            </p>
          </div>
          <MagneticButton
            variant="secondary"
            size="sm"
            onClick={() => onOpenWaitlist('college')}
            className="shrink-0"
          >
            <span>Direct Campus Inquiry</span>
            <ArrowUpRight size={13} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
