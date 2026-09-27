'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import CampusPeLogo from './CampusPeLogo';
import MagneticButton from './MagneticButton';

interface TopNavProps {
  onOpenWaitlist: () => void;
}

const navLinks = [
  { id: 'story', num: '01', label: 'Ecosystem', href: '#story' },
  { id: 'opportunities', num: '02', label: 'Opportunities', href: '#opportunities' },
  { id: 'resume', num: '03', label: 'CV Intelligence', href: '#resume' },
  { id: 'colleges', num: '04', label: 'Colleges', href: '#colleges' },
  { id: 'employers', num: '05', label: 'Employers', href: '#employers' },
  { id: 'faq', num: '06', label: 'FAQ', href: '#faq' },
];

export default function TopNav({ onOpenWaitlist }: TopNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('top');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = ['story', 'opportunities', 'resume', 'colleges', 'employers', 'faq'];
      const scrollPos = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection('top');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'py-2.5 bg-[#f9f8f5]/80 backdrop-blur-xl border-b border-ink/[0.06] shadow-[0_12px_40px_rgba(10,14,19,0.06)] translate-y-0'
            : 'py-5 sm:py-6 bg-transparent border-b border-transparent translate-y-0'
        }`}
      >
        <div className="mx-auto flex max-w-[1420px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
          <a
            href="#top"
            className="group rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-transform duration-300 hover:scale-[1.01]"
            aria-label="CampusPe Home"
          >
            <div className="flex items-center gap-3.5">
              <CampusPeLogo size="md" />
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[8px] font-mono uppercase tracking-[0.28em] text-ink/45">Network OS</span>
              </div>
            </div>
          </a>

          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center justify-center gap-1 rounded-full border border-ink/[0.06] bg-white/60 px-2 py-1.5 shadow-[0_8px_20px_rgba(13,17,24,0.02)] backdrop-blur-md"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`group relative flex items-center gap-2.5 rounded-full px-3.5 py-2 text-[10.5px] font-sans font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
                    isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  <span className={`font-mono text-[8.5px] tracking-[0.2em] ${isActive ? 'text-electric' : 'text-ink/40'}`}>
                    {link.num}
                  </span>
                  <span className="relative pb-0.5">
                    <span>{link.label}</span>
                    <span
                      className={`absolute inset-x-0 -bottom-[2px] h-px origin-left transition-transform duration-300 ${
                        isActive ? 'scale-x-100 bg-electric' : 'scale-x-0 bg-ink/60 group-hover:scale-x-100'
                      }`}
                    />
                  </span>
                  {isActive && (
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_0_5px_rgba(0,98,255,0.12)]" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 rounded-full border border-ink/[0.06] bg-white/65 px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.22em] text-ink/65 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>8,420 Live</span>
            </div>

            <a
              href="#opportunities"
              className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-sans font-medium uppercase tracking-[0.18em] text-ink/65 transition-colors duration-300 hover:text-electric"
            >
              Directory Feed
              <ArrowUpRight size={12} />
            </a>

            <MagneticButton
              variant="primary"
              size="sm"
              onClick={onOpenWaitlist}
              className="!rounded-full !bg-[#0d1117] !px-4 !py-2.5 !text-[10px] !tracking-[0.2em] !uppercase shadow-[0_12px_28px_rgba(13,17,24,0.18)] hover:!bg-electric"
            >
              <span>Priority Access</span>
              <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-ink/[0.08] bg-white/70 px-2.5 py-1.5 text-[8px] font-mono uppercase tracking-[0.2em] text-ink/65">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-full border border-ink/[0.08] bg-white/80 p-2.5 text-ink shadow-[0_6px_18px_rgba(0,0,0,0.05)] transition-all active:scale-95"
              aria-label="Open navigation menu"
            >
              <Menu size={17} />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-ink p-6 text-paper sm:p-10"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <CampusPeLogo theme="dark" size="sm" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full border border-white/15 p-2.5 text-white transition hover:bg-white/10 active:scale-95"
              aria-label="Close navigation menu"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="my-auto flex flex-col gap-4 py-6">
            <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.24em] text-white/40">
              Network Directory // 2026
            </p>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-baseline justify-between border-b border-white/10 pb-3"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs font-mono text-electric">{link.num}</span>
                  <span className="font-editorial text-2xl text-white/90 transition-colors group-hover:text-electric sm:text-3xl">
                    {link.label}
                  </span>
                </div>
                <ArrowUpRight size={18} className="text-white/40 transition-all group-hover:translate-x-1 group-hover:text-white" />
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3.5 border-t border-white/15 pt-6">
            <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.24em] text-white/50">
              <span>CampusPe Directory</span>
              <span className="text-emerald-400">130+ Colleges Active</span>
            </div>
            <MagneticButton
              variant="dark"
              size="lg"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWaitlist();
              }}
              className="w-full justify-center !py-3.5"
            >
              <span>Join Exclusive Waitlist</span>
              <ArrowUpRight size={16} />
            </MagneticButton>
          </div>
        </div>
      )}
    </>
  );
}
