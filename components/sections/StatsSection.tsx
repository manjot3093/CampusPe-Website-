'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const metrics = [
  {
    serial: '01',
    numeric: 8420,
    suffix: '+',
    displayDefault: '8,420+',
    label: 'Verified Students',
    eyebrow: 'TALENT VELOCITY',
    description:
      'Active student profiles with verified institutional records, GitHub repositories, and authenticated skill graphs.',
    context: '28 STATES REPRESENTED',
  },
  {
    serial: '02',
    numeric: 130,
    suffix: '+',
    displayDefault: '130+',
    label: 'Colleges & Universities',
    eyebrow: 'ACCREDITED CAMPUSES',
    description:
      'Leading NIRF-ranked institutions, autonomous engineering councils, and premier business schools.',
    context: 'TIER-1 & TIER-2 ECOSYSTEM',
  },
  {
    serial: '03',
    numeric: 1200,
    suffix: '+',
    displayDefault: '1,200+',
    label: 'Direct Opportunities',
    eyebrow: 'OPPORTUNITY VOLUME',
    description:
      'Verified corporate roles, summer research fellowships, and high-growth associate positions with transparent compensation.',
    context: '₹14.2L MEDIAN PACKAGE',
  },
  {
    serial: '04',
    numeric: 99.9,
    suffix: '%',
    displayDefault: '99.9%',
    label: 'Network Trust SLA',
    eyebrow: 'SECURITY PROTOCOL',
    description:
      'Immutable verification protocol eliminating recruitment fraud, ghost requisitions, and unvetted candidates.',
    context: 'ZERO SPAM GUARANTEE',
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setAnimated(true);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => setAnimated(true),
      once: true,
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="bg-paper border-y border-ink/[0.08] py-20 sm:py-28 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-ink/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-electric" />
              <span className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-electric font-bold">
                Platform Scale & Institutional Telemetry
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl text-ink font-normal tracking-tight">
              Verified campus momentum, <br className="hidden sm:inline" />
              <span className="font-serif italic text-electric">measured with institutional rigor.</span>
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-ink/40 uppercase tracking-widest block">
              DATA REFRESH: REAL-TIME 2026 AUDIT
            </span>
            <span className="text-xs font-mono text-ink/65 font-medium mt-1 block">
              Aggregated across 28 states & 1,000+ active placement cycles
            </span>
          </div>
        </div>

        {/* Monolithic Editorial Data Ledger (No rounded cards, pure architectural grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-ink/[0.08]">
          {metrics.map((item) => (
            <div
              key={item.label}
              className="py-10 md:py-12 md:px-8 lg:px-10 flex flex-col justify-between group hover:bg-white/60 transition-colors duration-300"
            >
              {/* Item Eyebrow & Serial */}
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-ink/40 mb-6">
                  <span>[{item.serial} // DATA]</span>
                  <span className="text-electric font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.eyebrow}
                  </span>
                </div>

                {/* Oversized Tall Editorial Figure */}
                <div className="font-editorial text-5xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-ink mb-3 group-hover:text-electric transition-colors duration-300">
                  {item.displayDefault}
                </div>

                {/* Metric Label */}
                <h3 className="font-sans font-bold text-base text-ink mb-2">
                  {item.label}
                </h3>

                {/* Descriptive Caption */}
                <p className="text-xs text-ink/65 leading-relaxed font-sans font-normal">
                  {item.description}
                </p>
              </div>

              {/* Provenance Context Stamp */}
              <div className="mt-8 pt-4 border-t border-ink/[0.06] flex items-center justify-between text-[9.5px] font-mono text-ink/45">
                <span>VERIFIED PROVENANCE</span>
                <span className="font-bold text-ink/60">{item.context}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
