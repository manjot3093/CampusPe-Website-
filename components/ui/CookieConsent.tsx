'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, SlidersHorizontal, Check, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  personalization: boolean;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: true,
    personalization: false,
  });

  useEffect(() => {
    // Delay check slightly for smooth initial page render
    const timer = setTimeout(() => {
      const stored = localStorage.getItem('campuspe_cookie_consent_v2');
      if (!stored) {
        setVisible(true);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const saveAndClose = (customSettings: CookieSettings) => {
    localStorage.setItem(
      'campuspe_cookie_consent_v2',
      JSON.stringify({ ...customSettings, date: new Date().toISOString() })
    );
    setVisible(false);
  };

  const handleAcceptAll = () => {
    const all = { necessary: true, analytics: true, personalization: true };
    setSettings(all);
    saveAndClose(all);
  };

  const handleRejectOptional = () => {
    const minimal = { necessary: true, analytics: false, personalization: false };
    setSettings(minimal);
    saveAndClose(minimal);
  };

  const handleSaveCustom = () => {
    saveAndClose(settings);
  };

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie and telemetry consent preferences"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl hairline-border rounded-2xl shadow-[0_20px_60px_rgba(7,9,14,0.18)] pointer-events-auto p-5 sm:p-6 transition-all duration-300">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          {/* Information & Badge */}
          <div className="flex items-start gap-3.5 max-w-xl">
            <div className="w-10 h-10 rounded-xl bg-electric/10 border border-electric/20 flex items-center justify-center text-electric shrink-0 mt-0.5">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-electric font-bold">
                  Data Sovereignty & Telemetry
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-paper-warm text-ink/60">
                  GDPR / DPDPA 2023
                </span>
              </div>
              <p className="text-xs text-ink/75 leading-relaxed">
                CampusPe uses privacy-conscious cookies to authenticate student dossiers, route institutional matching algorithms, and preserve verified search telemetry.
              </p>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full hairline-border text-[11px] font-mono uppercase tracking-wider text-ink/70 hover:text-ink hover:bg-paper-warm transition"
            >
              <SlidersHorizontal size={13} />
              <span>{expanded ? 'Hide Controls' : 'Customize'}</span>
            </button>

            <MagneticButton
              variant="secondary"
              size="sm"
              onClick={handleRejectOptional}
              className="!py-2.5 !px-4"
            >
              <span>Reject Optional</span>
            </MagneticButton>

            <MagneticButton
              variant="primary"
              size="sm"
              onClick={handleAcceptAll}
              className="!py-2.5 !px-5"
            >
              <span>Accept All</span>
            </MagneticButton>
          </div>
        </div>

        {/* Expandable Granular Controls */}
        {expanded && (
          <div className="mt-5 pt-5 hairline-t grid sm:grid-cols-3 gap-3 animate-in fade-in duration-200">
            <div className="p-3.5 rounded-xl bg-paper hairline-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-ink">Essential Protocols</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-electric/10 text-electric font-bold">
                    ALWAYS ACTIVE
                  </span>
                </div>
                <p className="text-[11px] text-ink/60">
                  Required for secure token handshake, routing, and access to waitlist vaults.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-paper hairline-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-ink">Opportunity Telemetry</span>
                  <input
                    type="checkbox"
                    checked={settings.analytics}
                    onChange={(e) =>
                      setSettings({ ...settings, analytics: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-electric focus:ring-electric"
                  />
                </div>
                <p className="text-[11px] text-ink/60">
                  Aggregated discovery analytics to improve placement velocity across colleges.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-paper hairline-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-ink">Smart Curriculum Memory</span>
                  <input
                    type="checkbox"
                    checked={settings.personalization}
                    onChange={(e) =>
                      setSettings({ ...settings, personalization: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-electric focus:ring-electric"
                  />
                </div>
                <p className="text-[11px] text-ink/60">
                  Saves search queries, resume filters, and matched institution bookmarks.
                </p>
              </div>
            </div>

            <div className="sm:col-span-3 flex justify-end pt-2">
              <MagneticButton
                variant="primary"
                size="sm"
                onClick={handleSaveCustom}
                className="!py-2 !px-4"
              >
                <span>Save Configured Preferences</span>
              </MagneticButton>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
