'use client';

import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Search, MapPin, Tag, Building2, Briefcase, GraduationCap, CheckCircle2, SlidersHorizontal, Sparkles } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

interface OpportunitySectionProps {
  onOpenWaitlist: (role?: 'student' | 'college' | 'employer') => void;
}

interface OpportunityItem {
  id: string;
  badge: string;
  title: string;
  category: 'Colleges' | 'Jobs' | 'Internships' | 'Fellowships';
  organization: string;
  location: string;
  compensation: string;
  deadline: string;
  skills: string[];
  typeTag: string;
  verified: boolean;
}

const allOpportunities: OpportunityItem[] = [
  {
    id: 'opp-1',
    badge: 'IIMB',
    title: 'Post Graduate Programme in Management (MBA)',
    category: 'Colleges',
    organization: 'Indian Institute of Management Bangalore',
    location: 'Bengaluru, Karnataka',
    compensation: '₹33.8L avg CTC',
    deadline: 'Admissions Active',
    skills: ['Strategic Management', 'Quantitative Finance', 'Leadership'],
    typeTag: 'Top 1% Tier',
    verified: true,
  },
  {
    id: 'opp-2',
    badge: 'SDE',
    title: 'Founding Software Engineering Intern',
    category: 'Internships',
    organization: 'HyperScale Systems',
    location: 'Bengaluru / Hybrid',
    compensation: '₹45,000 / month',
    deadline: 'Closes in 4 days',
    skills: ['TypeScript', 'Next.js', 'Distributed Systems', 'PostgreSQL'],
    typeTag: 'High Velocity',
    verified: true,
  },
  {
    id: 'opp-3',
    badge: 'NIFT',
    title: 'Master of Design (Industrial & Interaction)',
    category: 'Colleges',
    organization: 'National Institute of Fashion Technology',
    location: 'New Delhi, Delhi NCR',
    compensation: 'Accredited Curriculum',
    deadline: 'Admissions Open',
    skills: ['Design Systems', 'Ergonomics', 'Material Synthesis'],
    typeTag: 'National Premier',
    verified: true,
  },
  {
    id: 'opp-4',
    badge: 'PM',
    title: 'Associate Product Manager (APM)',
    category: 'Jobs',
    organization: 'Aura Fintech Labs',
    location: 'Remote / Mumbai',
    compensation: '₹18,00,000 / year',
    deadline: 'Interviewing Now',
    skills: ['Product Discovery', 'User Metrics', 'Wireframing', 'SQL'],
    typeTag: 'Direct Placement',
    verified: true,
  },
  {
    id: 'opp-5',
    badge: 'BITS',
    title: 'Applied AI & Neural Computing Fellowship',
    category: 'Fellowships',
    organization: 'BITS Pilani Research Council',
    location: 'Pilani / Remote',
    compensation: '₹35,000 / month grant',
    deadline: 'Rolling Applications',
    skills: ['PyTorch', 'Transformer Architecture', 'Mathematical Modeling'],
    typeTag: 'Grant Backed',
    verified: true,
  },
  {
    id: 'opp-6',
    badge: 'ANL',
    title: 'Growth & Strategy Analyst',
    category: 'Jobs',
    organization: 'Vanguard Logistics',
    location: 'Gurugram, Haryana',
    compensation: '₹14,00,000 / year',
    deadline: '5 Open Positions',
    skills: ['Financial Modeling', 'Market Expansion', 'Executive Comms'],
    typeTag: 'Campus Direct',
    verified: true,
  },
];

export default function OpportunitySection({ onOpenWaitlist }: OpportunitySectionProps) {
  const [selectedTab, setSelectedTab] = useState<string>('All');
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<OpportunityItem | null>(allOpportunities[0]);

  const tabs = ['All', 'Colleges', 'Jobs', 'Internships', 'Fellowships'];

  const filteredItems = useMemo(() => {
    return allOpportunities.filter((item) => {
      const matchesTab = selectedTab === 'All' || item.category === selectedTab;
      const matchesQuery =
        item.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.organization.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.skills.some((s) => s.toLowerCase().includes(filterQuery.toLowerCase()));
      return matchesTab && matchesQuery;
    });
  }, [selectedTab, filterQuery]);

  return (
    <section id="opportunities" className="py-20 sm:py-32 bg-paper relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-ink/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10.5px] font-mono px-2.5 py-0.5 rounded bg-electric/10 text-electric font-bold tracking-wider">
                03 // OPPORTUNITY RADAR
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-ink/50">
                Live Discovery Docket
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-ink font-normal tracking-tight">
              Stop guessing outcomes. <br />
              <span className="font-serif italic text-electric">Discover verified campus trajectories.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm text-ink/75 leading-relaxed font-sans mb-4">
              CampusPe continuously scans accredited university programs, verified hiring requisition bands, and campus placement cells. No stale postings. No ghost openings.
            </p>
            {/* Live Filter Bar */}
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search by role, campus, or tech stack..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-ink/[0.08] rounded-xl focus:outline-none focus:border-electric transition-all shadow-2xs font-medium"
              />
            </div>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 py-6 border-b border-ink/[0.08]">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                selectedTab === tab
                  ? 'bg-ink text-white font-bold shadow-sm'
                  : 'bg-white/80 border border-ink/[0.08] text-ink/65 hover:text-ink hover:bg-white'
              }`}
            >
              {tab}
            </button>
          ))}
          <span className="ml-auto text-[11px] font-mono text-ink/45 hidden sm:inline">
            SHOWING {filteredItems.length} ACCREDITED ENTRIES
          </span>
        </div>

        {/* Master-Detail Editorial Layout */}
        <div className="grid lg:grid-cols-[1.25fr_0.95fr] gap-8 pt-8 items-start">
          {/* Opportunities List Column */}
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-white shadow-[0_16px_40px_rgba(0,98,255,0.08)] border-electric'
                      : 'bg-white/70 border-ink/[0.07] hover:bg-white hover:border-ink/[0.12] hover:shadow-2xs'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-paper-warm border border-ink/[0.08] flex items-center justify-center font-editorial font-bold text-sm text-electric shrink-0">
                      {item.badge}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-paper-tint text-ink/70 font-semibold">
                          {item.typeTag}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600 flex items-center gap-1 font-semibold">
                          <CheckCircle2 size={12} />
                          AUTHENTICATED
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-base text-ink hover:text-electric transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-ink/65 font-medium mt-0.5">
                        {item.organization} • {item.location}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <div className="font-mono font-bold text-xs sm:text-sm text-ink">
                      {item.compensation}
                    </div>
                    <div className="text-[10px] font-mono text-ink/45 mt-0.5">
                      {item.deadline}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Detailed Inspection Dossier Panel */}
          {selectedItem && (
            <div className="p-7 sm:p-8 rounded-3xl bg-white border border-ink/[0.08] shadow-[0_20px_50px_rgba(14,17,24,0.04)] sticky top-28 self-start">
              <div className="flex items-center justify-between pb-4 border-b border-ink/[0.08] mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-electric font-bold">
                  DOSSIER INSPECTION // {selectedItem.id.toUpperCase()}
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  VERIFIED RECORD
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-paper-warm border border-ink/[0.08] flex items-center justify-center font-editorial font-bold text-lg text-electric mb-4">
                {selectedItem.badge}
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-ink leading-snug mb-3">
                {selectedItem.title}
              </h3>

              <div className="space-y-2 text-xs text-ink/75 font-medium mb-6">
                <div className="flex items-center gap-2">
                  <Building2 size={15} className="text-electric shrink-0" />
                  <span>{selectedItem.organization}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-electric shrink-0" />
                  <span>{selectedItem.location}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-paper-warm border border-ink/[0.06] mb-6">
                <span className="text-[9.5px] font-mono uppercase tracking-widest text-ink/45 block mb-1">
                  OFFICIAL METRICS & REMUNERATION
                </span>
                <div className="font-editorial font-bold text-2xl text-ink">
                  {selectedItem.compensation}
                </div>
                <p className="text-[11px] font-mono text-ink/55 mt-1">
                  STATUS: {selectedItem.deadline.toUpperCase()}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink/50 block mb-2">
                  CURRICULUM & SKILL PREREQUISITES
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-3 py-1 rounded-md bg-paper border border-ink/[0.08] text-ink/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <MagneticButton
                variant="primary"
                size="md"
                onClick={() => onOpenWaitlist('student')}
                className="w-full justify-center !py-3.5"
              >
                <span>Express Direct Interest</span>
                <ArrowUpRight size={15} />
              </MagneticButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
