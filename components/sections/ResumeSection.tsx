'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, ArrowRight, Sparkles, RefreshCw, AlertCircle, FileCheck } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

interface ResumeSectionProps {
  onOpenWaitlist: (role?: 'student' | 'college' | 'employer') => void;
}

export default function ResumeSection({ onOpenWaitlist }: ResumeSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [parsedResult, setParsedResult] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setAnalyzing(true);
    setParsedResult(false);

    // Simulate ATS vector parsing
    setTimeout(() => {
      setAnalyzing(false);
      setParsedResult(true);
    }, 1800);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const resetUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setParsedResult(false);
    setAnalyzing(false);
  };

  return (
    <section id="resume" className="py-20 sm:py-32 bg-paper-warm border-y border-ink/[0.08] relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10.5px] font-mono px-2.5 py-0.5 rounded bg-electric/10 text-electric font-bold tracking-wider">
              04 // ATS CV INTELLIGENCE
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-ink/50">
              Deterministic Skill Extraction
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-ink font-normal tracking-tight">
            Upload your curriculum vitae. <br />
            <span className="font-serif italic text-electric">Unlock verified opportunity calibration.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ink/75 leading-relaxed font-sans max-w-xl">
            Our neural parser converts unstructured PDF resumes into structured skill graphs, ranking your coursework against active employer requisitions with zero bias.
          </p>
        </div>

        {/* Interactive Dropzone & Live Analyzer Grid */}
        <div className="grid lg:grid-cols-[1.1fr_1.1fr] gap-8 items-start">
          {/* Tactile Dropzone Container */}
          <div
            onClick={() => !analyzing && inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`p-8 sm:p-12 rounded-3xl bg-white border text-center cursor-pointer transition-all duration-300 relative overflow-hidden group ${
              analyzing
                ? 'cursor-wait border-electric shadow-md'
                : 'border-ink/[0.08] hover:border-electric/50 hover:shadow-xl'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />

            {/* Icon & Status */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-paper-warm border border-ink/[0.08] flex items-center justify-center text-electric group-hover:scale-105 transition-transform">
              {analyzing ? (
                <RefreshCw size={26} className="animate-spin text-electric" />
              ) : file ? (
                <FileCheck size={28} className="text-emerald-600" />
              ) : (
                <Upload size={26} />
              )}
            </div>

            {analyzing ? (
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-electric font-bold">
                  Vectorizing Curriculum Vitae...
                </span>
                <p className="text-sm font-semibold text-ink">
                  Extracting academic GPA, project milestones, and tech competencies.
                </p>
                <div className="w-48 h-1.5 bg-paper-tint rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-electric rounded-full animate-pulse w-3/4" />
                </div>
              </div>
            ) : file ? (
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-bold block">
                  FILE INDEXED & VERIFIED
                </span>
                <p className="text-base font-sans font-bold text-ink truncate max-w-sm mx-auto">
                  {file.name}
                </p>
                <p className="text-xs font-mono text-ink/50">
                  {(file.size / 1024).toFixed(1)} KB • CLICK TO RE-UPLOAD
                </p>
                <button
                  type="button"
                  onClick={resetUpload}
                  className="text-xs font-mono text-rose-500 hover:underline pt-2"
                >
                  Clear Current File
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-sans font-bold text-xl text-ink">
                  Drop your resume here, or click to browse
                </h3>
                <p className="text-xs text-ink/60 max-w-sm mx-auto font-sans leading-relaxed">
                  Supports PDF, DOC, or DOCX formats up to 15MB. Encrypted in-memory; strictly private under DPDPA 2023.
                </p>
                <div className="pt-2">
                  <MagneticButton variant="secondary" size="sm" type="button">
                    <span>Select Local File</span>
                  </MagneticButton>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Dossier / Metrics Panel */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-ink/[0.08] shadow-[0_20px_60px_rgba(14,17,24,0.04)]">
            <div className="flex items-center justify-between pb-4 border-b border-ink/[0.08] mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-electric font-bold">
                ATS SYNTHESIS BENCHMARK
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.08] text-ink/65">
                V2.6 PROTOCOL
              </span>
            </div>

            {parsedResult ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-paper-warm border border-ink/[0.06]">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-ink/50 block">
                      ATS READINESS SCORE
                    </span>
                    <div className="font-editorial font-bold text-4xl text-emerald-600">
                      96 / 100
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-ink/50 block">
                      EXTRACTED SIGNALS
                    </span>
                    <span className="font-mono text-xs font-bold text-ink">
                      18 Skills • 2 Degrees
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-ink/50 block mb-2">
                    IDENTIFIED COMPETENCIES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Distributed Systems', 'TypeScript', 'Next.js', 'System Architecture', 'SQL Optimization', 'API Design'].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs font-mono rounded-lg bg-paper-warm border border-ink/[0.07] text-ink/80"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-ink/50 block mb-2">
                    CALIBRATED REQUISITION MATCHES
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-paper border border-ink/[0.06] flex justify-between items-center">
                      <span className="font-bold text-ink">Software Engineer Intern (HyperScale)</span>
                      <span className="font-mono text-emerald-600 font-bold">98% Fit</span>
                    </div>
                    <div className="p-3 rounded-xl bg-paper border border-ink/[0.06] flex justify-between items-center">
                      <span className="font-bold text-ink">Associate PM (Aura Fintech)</span>
                      <span className="font-mono text-electric font-bold">89% Fit</span>
                    </div>
                  </div>
                </div>

                <MagneticButton
                  variant="primary"
                  size="md"
                  onClick={() => onOpenWaitlist('student')}
                  className="w-full justify-center !py-3.5"
                >
                  <span>Lock Profile & Access Direct Referrals</span>
                  <ArrowRight size={15} />
                </MagneticButton>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-paper-warm border border-ink/[0.06]">
                    <span className="text-[9.5px] font-mono uppercase tracking-widest text-ink/45 block mb-1">
                      PARSER LATENCY
                    </span>
                    <div className="font-editorial font-bold text-2xl text-ink">Under 4.0s</div>
                    <p className="text-[10px] text-ink/55 mt-1 font-mono">Instant AST tokenization</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-paper-warm border border-ink/[0.06]">
                    <span className="text-[9.5px] font-mono uppercase tracking-widest text-ink/45 block mb-1">
                      ACCURACY RATE
                    </span>
                    <div className="font-editorial font-bold text-2xl text-ink">99.4%</div>
                    <p className="text-[10px] text-ink/55 mt-1 font-mono">Normalized ontology</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-ink/75 font-medium">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-electric shrink-0 mt-0.5" />
                    <span>Eliminates formatting penalties from legacy enterprise applicant tracking systems.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-electric shrink-0 mt-0.5" />
                    <span>Cross-references curriculum against 1,200+ verified corporate requisitions.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-electric shrink-0 mt-0.5" />
                    <span>Guarantees verified candidate privacy until interview handshake.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
