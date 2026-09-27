'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Check, ArrowRight, Sparkles, Building2, GraduationCap, Briefcase } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'student' | 'college' | 'employer';
}

type RoleType = 'student' | 'college' | 'employer';

export default function WaitlistModal({
  isOpen,
  onClose,
  initialRole = 'student',
}: WaitlistModalProps) {
  const [role, setRole] = useState<RoleType>(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [queueNumber] = useState(() => Math.floor(1000 + Math.random() * 9000));
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRole(initialRole);
  }, [initialRole]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/65 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-paper hairline-border rounded-2xl shadow-[0_30px_90px_rgba(7,9,14,0.35)] overflow-hidden"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 hairline-b bg-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink/60">
              CampusPe Priority Access
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-ink/50 hover:text-ink hover:bg-paper-warm transition"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-10 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-electric/10 border border-electric/20 flex items-center justify-center text-electric">
              <Check size={28} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-electric font-bold">
              Access Reserved
            </span>
            <h3 className="font-serif italic text-3xl sm:text-4xl text-ink mt-2 mb-3">
              You are #{queueNumber} on the priority docket.
            </h3>
            <p className="text-sm text-ink/70 max-w-sm mx-auto leading-relaxed mb-8">
              We have reserved your access credentials for <span className="font-semibold text-ink">{email}</span>. A personal verification briefing will arrive in your inbox prior to public opening.
            </p>
            <div className="p-4 rounded-xl bg-white hairline-border text-left mb-6 text-xs text-ink/75 space-y-1">
              <div className="flex justify-between font-mono text-[10px] text-ink/50 uppercase">
                <span>Account Classification</span>
                <span className="text-electric font-bold">{role.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact Reference</span>
                <span className="font-medium text-ink">{name}</span>
              </div>
            </div>
            <MagneticButton variant="primary" size="md" onClick={onClose} className="w-full">
              <span>Return To Dossier</span>
            </MagneticButton>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-electric font-bold">
                Invitation Docket
              </span>
              <h2 id="waitlist-title" className="font-serif text-2xl sm:text-3xl text-ink mt-1">
                Enter the Unified Campus Ecosystem.
              </h2>
              <p className="text-xs text-ink/65 mt-1">
                Select your designation to receive calibrated onboarding protocols.
              </p>
            </div>

            {/* Role Switcher */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-paper-warm rounded-xl mb-6 hairline-border">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-lg text-xs font-semibold transition ${
                  role === 'student'
                    ? 'bg-white text-electric shadow-sm font-bold'
                    : 'text-ink/60 hover:text-ink'
                }`}
              >
                <GraduationCap size={16} />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('college')}
                className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-lg text-xs font-semibold transition ${
                  role === 'college'
                    ? 'bg-white text-electric shadow-sm font-bold'
                    : 'text-ink/60 hover:text-ink'
                }`}
              >
                <Building2 size={16} />
                <span>College</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('employer')}
                className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-lg text-xs font-semibold transition ${
                  role === 'employer'
                    ? 'bg-white text-electric shadow-sm font-bold'
                    : 'text-ink/60 hover:text-ink'
                }`}
              >
                <Briefcase size={16} />
                <span>Employer</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-ink/70 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Devansh Sharma"
                  className="w-full px-4 py-3 text-sm bg-white hairline-border rounded-xl focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-ink/70 mb-1.5">
                  Work / Academic Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    role === 'student'
                      ? 'student@campus.edu.in'
                      : role === 'college'
                      ? 'dean@university.ac.in'
                      : 'talent@enterprise.com'
                  }
                  className="w-full px-4 py-3 text-sm bg-white hairline-border rounded-xl focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-ink/70 mb-1.5">
                  {role === 'student'
                    ? 'Current College / Program'
                    : role === 'college'
                    ? 'Institution Name & State'
                    : 'Company & Hiring Domain'}
                </label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder={
                    role === 'student'
                      ? 'IIT Bombay • Computer Science (Final Year)'
                      : role === 'college'
                      ? 'BITS Pilani • Placements Division'
                      : 'CRED • Product Engineering'
                  }
                  className="w-full px-4 py-3 text-sm bg-white hairline-border rounded-xl focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition"
                />
              </div>

              <div className="pt-2">
                <MagneticButton variant="primary" size="md" type="submit" className="w-full">
                  <span>Submit Priority Registration</span>
                  <ArrowRight size={15} />
                </MagneticButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
