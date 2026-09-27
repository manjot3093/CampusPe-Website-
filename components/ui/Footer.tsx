'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowUpRight, Check, Send } from 'lucide-react';
import CampusPeLogo from './CampusPeLogo';
import MagneticButton from './MagneticButton';

interface FooterProps {
  onOpenWaitlist: () => void;
}

export default function Footer({ onOpenWaitlist }: FooterProps) {
  const [timeIST, setTimeIST] = useState('');
  const [timeUTC, setTimeUTC] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimeIST(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setTimeUTC(
        now.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer id="footer" className="bg-ink text-paper relative overflow-hidden">
      {/* Top Hairline Indicator Bar */}
      <div className="border-b border-white/10 py-4 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-white/50 uppercase">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Network State: Nominal</span>
            </div>
            <div className="hidden sm:block">
              <span>Bengaluru: {timeIST || '12:00:00'} IST</span>
            </div>
            <div className="hidden md:block">
              <span>London / UTC: {timeUTC || '06:30:00'}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/30 hidden sm:inline">CAMPUSPE DISCOVERY ENGINE V2.6</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1 text-[10px] uppercase font-mono"
            >
              <span>Back To Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Editorial Footer Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24">
        {/* Massive Editorial Headline & Newsletter Dispatch */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 pb-16 border-b border-white/10">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-electric font-bold">
              The Next Era of Campus Velocity
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight mt-4 text-white">
              Connecting colleges, students, and recruiters with zero friction.
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-xl leading-relaxed mt-6 font-sans font-normal">
              CampusPe unifies fragmented academic outcomes into a transparent, verified career ecosystem. No noise. No cold pitches. Only qualified momentum.
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-sm">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-2">
                Executive Dispatch
              </span>
              <h3 className="font-sans font-bold text-xl text-white mb-2">
                Receive the Quarterly Campus Placement Briefing.
              </h3>
              <p className="text-xs text-white/60 mb-6 leading-relaxed font-sans">
                Curated intelligence on campus hiring benchmarks, salary trends, and emerging university talent pipelines.
              </p>

              {subscribed ? (
                <div className="p-3.5 rounded-xl bg-electric/20 border border-electric/40 text-electric flex items-center gap-2 text-xs font-semibold">
                  <Check size={16} />
                  <span>Dispatch subscription confirmed. Check your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="official.email@domain.com"
                    className="flex-1 bg-white/10 border border-white/15 px-4 py-3 text-xs text-white rounded-xl placeholder:text-white/35 focus:outline-none focus:border-electric transition"
                  />
                  <MagneticButton
                    variant="dark"
                    size="sm"
                    type="submit"
                    className="shrink-0 !py-3 !px-5"
                  >
                    <span>Dispatch</span>
                    <Send size={12} />
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Directory Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-white/10 text-sm">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-5">
              [01 // PLATFORM]
            </p>
            <ul className="space-y-3 font-medium text-white/75 text-xs sm:text-sm">
              <li>
                <a href="#story" className="hover:text-white transition">Network Topology</a>
              </li>
              <li>
                <a href="#opportunities" className="hover:text-white transition">Discovery Feed</a>
              </li>
              <li>
                <a href="#resume" className="hover:text-white transition">ATS Radar Engine</a>
              </li>
              <li>
                <a href="#colleges" className="hover:text-white transition">Institutional Roster</a>
              </li>
              <li>
                <a href="#employers" className="hover:text-white transition">Recruiter Gateway</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-5">
              [02 // COHORTS]
            </p>
            <ul className="space-y-3 font-medium text-white/75 text-xs sm:text-sm">
              <li>
                <button onClick={onOpenWaitlist} className="hover:text-white transition text-left">
                  Undergraduate Talent
                </button>
              </li>
              <li>
                <button onClick={onOpenWaitlist} className="hover:text-white transition text-left">
                  Engineering Councils
                </button>
              </li>
              <li>
                <button onClick={onOpenWaitlist} className="hover:text-white transition text-left">
                  Management Institutes
                </button>
              </li>
              <li>
                <button onClick={onOpenWaitlist} className="hover:text-white transition text-left">
                  Enterprise Talent Teams
                </button>
              </li>
              <li>
                <button onClick={onOpenWaitlist} className="hover:text-white transition text-left">
                  Series A-E Startups
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-5">
              [03 // INTELLIGENCE]
            </p>
            <ul className="space-y-3 font-medium text-white/75 text-xs sm:text-sm">
              <li>
                <a href="#stats" className="hover:text-white transition">Placement Index 2026</a>
              </li>
              <li>
                <a href="#opportunities" className="hover:text-white transition">Salary & Stipend Medians</a>
              </li>
              <li>
                <a href="#resume" className="hover:text-white transition">Skill Scarcity Mapping</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition">Institutional FAQ</a>
              </li>
              <li>
                <a href="#top" className="hover:text-white transition">System Architecture</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-5">
              [04 // PROTOCOLS]
            </p>
            <ul className="space-y-3 font-medium text-white/75 text-xs sm:text-sm">
              <li>
                <a href="#top" className="hover:text-white transition">Data Sovereignty</a>
              </li>
              <li>
                <a href="#top" className="hover:text-white transition">DPDPA 2023 Compliance</a>
              </li>
              <li>
                <a href="#top" className="hover:text-white transition">Verification Security</a>
              </li>
              <li>
                <a href="#top" className="hover:text-white transition">Terms of Protocol</a>
              </li>
              <li>
                <a href="#top" className="hover:text-white transition">Editorial Disclosures</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Colophon & Bottom Bar */}
        <div className="pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-white/40 font-mono">
          <div className="flex items-center gap-3">
            <CampusPeLogo theme="dark" size="sm" />
            <span>© 2026 CampusPe Technologies Inc. All Rights Reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <span className="text-white/60">Designed with Editorial Rigor</span>
            <div className="flex items-center gap-4">
              <a href="#top" className="hover:text-white transition">Privacy</a>
              <a href="#top" className="hover:text-white transition">Terms</a>
              <a href="#top" className="hover:text-white transition">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
