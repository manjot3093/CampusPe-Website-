'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BellRing,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Download,
  GraduationCap,
  Menu,
  MessageSquareText,
  Search,
  ShieldCheck,
  Upload,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  personalization: boolean;
};

const navItems = [
  ['Students', '#students'],
  ['Colleges', '#colleges'],
  ['Employers', '#employers'],
  ['Jobs', '#opportunities'],
] as const;

const stats = [
  { value: '8K+', label: 'Students active' },
  { value: '130+', label: 'Colleges live' },
  { value: '1,200+', label: 'Jobs surfaced' },
  { value: '99.9%', label: 'Trust score' },
];

const opportunityCards = [
  {
    icon: GraduationCap,
    label: 'For students',
    title: 'Find the right program, campus and career path.',
    bullets: ['Compare colleges and courses', 'Track fees, placements and outcomes', 'Explore scholarships and deadlines'],
    cta: 'Explore colleges',
    badge: 'Student-first',
  },
  {
    icon: BriefcaseBusiness,
    label: 'For job seekers',
    title: 'Upload your CV and discover roles that fit you.',
    bullets: ['AI-powered job matching', 'WhatsApp and email alerts', 'Career paths from 1,000+ sources'],
    cta: 'Find opportunities',
    badge: 'Live now',
  },
  {
    icon: Users,
    label: 'For employers',
    title: 'Hire faster with campus-ready, verified candidates.',
    bullets: ['Direct college access', 'Shortlist by skills and intent', 'Simplify hiring workflows'],
    cta: 'Hire smarter',
    badge: 'New pipeline',
  },
];

const feedData = [
  { badge: 'IIMB', title: 'IIM Bangalore', meta: 'MBA • Bengaluru', price: 'Rs 3L+ / year' },
  { badge: 'SDE', title: 'Software Engineer Intern', meta: 'Product • Bengaluru', price: 'Rs 35K / mo' },
  { badge: 'NIFT', title: 'NIFT Admissions', meta: 'Design • New Delhi', price: 'Open now' },
  { badge: 'PM', title: 'Product Manager', meta: 'Startup • Remote', price: 'Rs 18L / yr' },
];

const schoolRows = [
  { number: '01', title: 'Build your profile', caption: 'Highlight your courses, placements and outcomes.', tag: 'Verified profile' },
  { number: '02', title: 'Reach the right students', caption: 'Surface your campus in search and direct enquiries.', tag: 'Discovery' },
  { number: '03', title: 'Hire smarter from campus', caption: 'Connect with future candidates and talent pipelines.', tag: 'Recruitment' },
  { number: '04', title: 'Track live performance', caption: 'See applications, reach and student engagement in real time.', tag: 'Live dashboard' },
];

const employerRows = [
  { number: '01', title: 'Post a role in minutes', caption: 'Define skills, locations and hiring needs in one flow.', tag: 'Fast setup' },
  { number: '02', title: 'Get a matched shortlist', caption: 'Rank candidates by fit, skills and intent instead of volume.', tag: 'Smart matches' },
  { number: '03', title: 'Interview with less friction', caption: 'Coordinate schedules and feedback without the usual admin.', tag: 'Fewer handoffs' },
  { number: '04', title: 'Reduce time to hire', caption: 'From shortlist to offer with cleaner visibility and speed.', tag: 'Ready to hire' },
];

const proofPoints = [
  { value: '5 min', label: 'Average role setup' },
  { value: '500+', label: 'Hiring partners' },
  { value: '42%', label: 'Faster shortlists' },
  { value: '24/7', label: 'Student support' },
];

const footerGroups = [
  { heading: 'Platform', links: ['Students', 'Colleges', 'Employers', 'Jobs'] },
  { heading: 'Resources', links: ['Guides', 'Careers', 'Blog', 'Help centre'] },
  { heading: 'Company', links: ['About', 'Privacy', 'Terms', 'Contact'] },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

function Logo() {
  return (
    <a href="#top" className="group inline-flex items-center gap-3" aria-label="CampusPe home">
      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_top,_#3ec7ff,_#0ca7ec_65%,_#088ecc)] text-sm font-black text-white shadow-[0_18px_36px_rgba(9,154,219,0.32)] transition duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3">
        CP
      </span>
      <span className="text-[1.45rem] font-black tracking-[-0.07em] text-sky-600">CampusPe</span>
    </a>
  );
}

function WaitlistModal({ onClose, title = 'Join the CampusPe waitlist' }: { onClose: () => void; title?: string }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Waitlist form"
    >
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.96 }}
        transition={{ duration: 0.22, ease: easeOut }}
        className="w-full max-w-lg rounded-[30px] border border-white/70 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.24)] sm:p-7"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-sky-600">CampusPe</p>
            <h3 className="text-2xl font-black tracking-[-0.06em] text-slate-900">{title}</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50" aria-label="Close waitlist modal">
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="rounded-[24px] border border-sky-100 bg-sky-50 p-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg shadow-sky-200">
              <Check size={20} />
            </div>
            <p className="text-lg font-black tracking-[-0.04em] text-slate-900">You're on the list.</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">We'll keep your interest on file and share the next CampusPe update as soon as it's ready.</p>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              Name
              <input required placeholder="Your name" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100" />
            </label>
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              Email
              <input required type="email" placeholder="you@example.com" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100" />
            </label>
            <button type="submit" className="btn-primary w-full justify-center">
              Join waitlist
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function TopNav({ onWaitlist }: { onWaitlist: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600 transition hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-100"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a href="#opportunities" className="btn-secondary !px-4 !py-2.5">Sign in</a>
          <button type="button" onClick={onWaitlist} className="btn-primary !px-4 !py-2.5">Sign up</button>
        </div>

        <button type="button" className="rounded-2xl border border-slate-200 p-2 md:hidden" aria-label="Toggle menu" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="border-t border-slate-200 bg-white md:hidden">
            <div className="mx-auto flex max-w-[1280px] flex-col gap-1 px-4 py-4">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
                >
                  {label}
                </a>
              ))}
              <button type="button" onClick={onWaitlist} className="btn-primary mt-2 justify-center">Join waitlist</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ onWaitlist }: { onWaitlist: () => void }) {
  const reduceMotion = useReducedMotion();
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    const target = document.querySelector('#opportunities');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
    setCursor({ x, y });
  };

  return (
    <section id="top" className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(10,168,239,0.16),_rgba(255,255,255,0)_35%),linear-gradient(180deg,_#f5fbff_0%,_#ffffff_40%,_#f7fbff_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.04)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(circle_at_center,black_35%,transparent_100%)]" />
      <div className="pointer-events-none absolute -left-28 top-8 h-80 w-80 rounded-full bg-sky-200/55 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-16 h-[22rem] w-[22rem] rounded-full bg-violet-200/35 blur-3xl" />

      <div className="pointer-events-none absolute inset-x-0 top-20 hidden h-[36rem] items-center justify-center lg:flex">
        <div className="relative h-full w-[82%]">
          <div className="absolute left-[8%] top-[5%] h-40 w-48 rounded-[2rem] border border-slate-200/80 bg-white/40 shadow-[0_28px_80px_rgba(15,23,42,0.04)] backdrop-blur-sm" />
          <div className="absolute right-[10%] top-[12%] h-48 w-56 rounded-[2rem] border border-sky-200/80 bg-sky-50/60 shadow-[0_28px_80px_rgba(14,165,233,0.06)]" />
          <div className="absolute bottom-[12%] left-[22%] h-28 w-[42%] rounded-[2rem] border border-slate-200/80 bg-white/30 shadow-[0_22px_60px_rgba(15,23,42,0.04)]" />
          <div className="absolute left-[20%] top-[28%] h-20 w-20 rounded-full border border-sky-200/80 bg-white/80 shadow-[0_18px_40px_rgba(14,165,233,0.08)]" />
          <div className="absolute right-[28%] bottom-[22%] h-16 w-16 rounded-full border border-slate-200 bg-white/80 shadow-[0_18px_40px_rgba(15,23,42,0.06)]" />
          <div className="absolute left-[42%] top-[18%] h-[8rem] w-px bg-slate-200/80" />
          <div className="absolute left-[36%] top-[34%] h-[9rem] w-px bg-sky-200/80" />
          <div className="absolute left-[58%] top-[20%] h-[8rem] w-px bg-slate-200/80" />
          <div className="absolute left-[62%] top-[32%] h-[10rem] w-px bg-sky-200/80" />
          <div className="absolute left-[25%] top-[30%] h-px w-[18rem] bg-slate-200/80" />
          <div className="absolute right-[18%] top-[40%] h-px w-[14rem] bg-sky-200/80" />
          <div className="absolute left-[12%] top-[46%] h-px w-[16rem] bg-slate-200/70" />
          <div className="absolute left-[18%] top-[18%] rounded-full border border-sky-200 bg-white px-2 py-1 text-[8px] font-black uppercase tracking-[0.18em] text-sky-700">IIMS</div>
          <div className="absolute right-[21%] top-[20%] rounded-full border border-slate-200 bg-white px-2 py-1 text-[8px] font-black uppercase tracking-[0.18em] text-slate-500">NIFT</div>
          <div className="absolute right-[16%] bottom-[28%] rounded-full border border-sky-200 bg-white px-2 py-1 text-[8px] font-black uppercase tracking-[0.18em] text-sky-700">JOBS</div>
          <div className="absolute left-[30%] bottom-[18%] rounded-full border border-slate-200 bg-white px-2 py-1 text-[8px] font-black uppercase tracking-[0.18em] text-slate-500">UNI</div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-12" onMouseMove={handleMouseMove}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut }} className="relative z-10 grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-sky-700 shadow-[0_10px_30px_rgba(14,165,233,0.08)]">
              <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
              Campus ecosystem intelligence
            </div>

            <h1 className="mt-8 max-w-[820px] text-[clamp(4rem,7vw,10rem)] font-black leading-[0.72] tracking-[-0.085em] text-slate-950">
              <span className="block">PROBLEM</span>
              <span className="mt-1 block text-[0.78em] leading-[0.9] text-slate-700">is fragmented.</span>
              <span className="mt-5 block text-[0.54em] leading-[0.92] text-slate-950">SCALE</span>
              <span className="mt-1 block text-[0.48em] leading-[0.92] text-slate-700">8K students • 130 colleges • 1,200 roles</span>
              <span className="mt-7 block text-sky-600">CAMPUSPE</span>
              <span className="mt-2 block text-[0.44em] leading-[0.92] text-slate-800">connects the ecosystem.</span>
            </h1>

            <div className="mt-8 flex max-w-xl flex-col gap-3 rounded-[26px] border border-slate-200 bg-white/90 p-2 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-left">
                <Search size={17} className="text-sky-600" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') handleSearch();
                  }}
                  placeholder="Search colleges, jobs or skills"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  aria-label="Search campus opportunities"
                />
              </div>
              <button type="button" onClick={handleSearch} className="btn-primary sm:min-w-[170px]">
                Search
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
              <span className="text-slate-900">PROBLEM</span>
              <span className="text-sky-600">→</span>
              <span className="text-slate-900">SCALE</span>
              <span className="text-sky-600">→</span>
              <span className="text-sky-600">CAMPUSPE</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            className="relative h-[540px] lg:h-[620px]"
          >
            <motion.div
              animate={{ x: cursor.x * 1.8, y: cursor.y * 1.8 }}
              transition={{ type: 'spring', stiffness: 90, damping: 18, mass: 0.7 }}
              className="relative h-full overflow-hidden rounded-[32px] border border-sky-100/80 bg-white/75 p-4 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur"
            >
              <div className="absolute inset-5 rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(240,249,255,0.72))]" />
              <div className="absolute left-8 top-8 rounded-full border border-sky-200 bg-white/90 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-sky-700 shadow-[0_15px_30px_rgba(14,165,233,0.12)]">Live campus map</div>
              <div className="absolute right-8 top-8 rounded-full bg-emerald-100 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-emerald-700">+12 new</div>

              <div className="absolute left-[16%] top-[20%] h-36 w-36 rounded-[2rem] border border-slate-200 bg-white/80 shadow-[0_20px_40px_rgba(15,23,42,0.04)]" />
              <div className="absolute right-[18%] top-[18%] h-40 w-44 rounded-[2rem] border border-sky-200/80 bg-sky-50/70 shadow-[0_20px_50px_rgba(14,165,233,0.08)]" />
              <div className="absolute bottom-[16%] left-[18%] h-32 w-[40%] rounded-[2rem] border border-slate-200 bg-white/80 shadow-[0_20px_40px_rgba(15,23,42,0.04)]" />
              <div className="absolute bottom-[20%] right-[12%] h-24 w-24 rounded-full border border-slate-200 bg-white/80" />

              <div className="absolute left-[24%] top-[24%] h-24 w-px bg-slate-200" />
              <div className="absolute left-[38%] top-[34%] h-28 w-px bg-sky-200" />
              <div className="absolute left-[52%] top-[28%] h-32 w-px bg-slate-200" />
              <div className="absolute left-[62%] top-[38%] h-28 w-px bg-sky-200" />
              <div className="absolute left-[18%] top-[40%] h-px w-[14rem] bg-slate-200" />
              <div className="absolute left-[30%] bottom-[28%] h-px w-[12rem] bg-sky-200" />
              <div className="absolute right-[20%] top-[42%] h-px w-[11rem] bg-slate-200" />

              <div className="absolute left-[22%] top-[14%] rounded-full border border-sky-200 bg-white px-2 py-1 text-[8px] font-black uppercase tracking-[0.18em] text-sky-700">IIMB</div>
              <div className="absolute right-[26%] top-[12%] rounded-full border border-slate-200 bg-white px-2 py-1 text-[8px] font-black uppercase tracking-[0.18em] text-slate-500">NIFT</div>
              <div className="absolute left-[28%] bottom-[28%] rounded-full border border-slate-200 bg-white px-2 py-1 text-[8px] font-black uppercase tracking-[0.18em] text-slate-500">Jobs</div>
              <div className="absolute right-[18%] bottom-[18%] rounded-full border border-sky-200 bg-white px-2 py-1 text-[8px] font-black uppercase tracking-[0.18em] text-sky-700">2.4x</div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15, ease: easeOut }}
                className="absolute bottom-5 left-5 right-5 rounded-[26px] border border-slate-200 bg-white/90 p-4 shadow-[0_20px_35px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Opportunity feed</p>
                    <p className="mt-1 text-base font-black tracking-[-0.04em] text-slate-900">Matched for you</p>
                  </div>
                  <div className="rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-emerald-700">12 new</div>
                </div>

                <div className="mt-4 space-y-3">
                  {feedData.slice(0, 3).map((item) => (
                    <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-[9px] font-black text-sky-600">{item.badge}</div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black tracking-[-0.03em] text-slate-900">{item.title}</p>
                        <p className="mt-1 text-[11px] text-slate-500">{item.meta}</p>
                      </div>
                      <div className="text-right text-[11px] font-bold text-slate-700">{item.price}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-slate-200 bg-white/70">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4 sm:px-6 lg:px-8">
        {stats.map((stat) => (
          <motion.div key={stat.label} whileHover={{ y: -4 }} className="rounded-[22px] border border-slate-200 bg-white p-4 text-center shadow-[0_12px_28px_rgba(15,23,42,0.02)]">
            <div className="text-2xl font-black tracking-[-0.06em] text-slate-900 sm:text-3xl">{stat.value}</div>
            <div className="mt-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function OpportunityFeed() {
  const [active, setActive] = useState('All');
  const tabs = ['All', 'Colleges', 'Jobs', 'Internships', 'Freelance'];
  const items = useMemo(
    () => ({
      All: feedData,
      Colleges: [feedData[0]],
      Jobs: [feedData[1]],
      Internships: [feedData[1], feedData[3]],
      Freelance: [feedData[3]],
    }),
    [],
  );

  return (
    <section id="opportunities" className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-sky-600">01 • Opportunity discovery</p>
          <h2 className="mt-4 text-4xl font-black leading-[0.96] tracking-[-0.07em] text-slate-900 sm:text-5xl">
            Stop searching.
            <span className="block text-sky-600">Start matching.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
            CampusPe continuously scans the right signals for your goals, then surfaces programs and roles that are relevant, timely and worth your attention.
          </p>
          <button type="button" onClick={() => document.querySelector('#resume')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary mt-7">
            Try the live match
            <ArrowRight size={16} />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-[30px] border border-slate-200 bg-white/90 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-5">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <p className="text-base font-black tracking-[-0.04em] text-slate-900">Your discovery feed</p>
              <p className="mt-1 text-[11px] text-slate-500">Curated matches for your goals</p>
            </div>
            <div className="rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-emerald-700">12 new</div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.12em] transition ${
                  active === tab ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-sky-50 hover:text-sky-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {items[active as keyof typeof items].map((item) => (
              <motion.div
                key={item.title}
                layout
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50/60 p-3 transition"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-[10px] font-black text-sky-600">{item.badge}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black tracking-[-0.03em] text-slate-900">{item.title}</p>
                  <p className="mt-1 text-[11px] text-slate-500">{item.meta}</p>
                </div>
                <div className="text-right text-[11px] font-bold text-slate-700">{item.price}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ResumeSection() {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section id="resume" className="bg-[linear-gradient(180deg,#f5fbff_0%,#ffffff_100%)] py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-sky-600">Try it live • v2.4 AI engine</p>
          <h2 className="mt-4 text-4xl font-black leading-[0.96] tracking-[-0.07em] text-slate-900 sm:text-5xl">
            Upload your CV.
            <span className="block text-sky-600">Find jobs that fit.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            One upload gives you a clearer view of relevant programs, roles and hiring opportunities across the best-fit sources.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 max-w-5xl rounded-[30px] border border-sky-100 bg-white p-3 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              setFile(event.dataTransfer.files?.[0] ?? null);
            }}
            className="cursor-pointer rounded-[24px] border-2 border-dashed border-sky-200 bg-[linear-gradient(135deg,#edf9ff_0%,#f5f3ff_100%)] px-5 py-10 text-center transition hover:border-sky-300 hover:bg-white"
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-sky-600 shadow-[0_10px_25px_rgba(14,165,233,0.15)]">
              <Upload size={22} />
            </div>
            <p className="mt-5 text-lg font-black tracking-[-0.04em] text-slate-900">{file ? file.name : 'Upload your resume'}</p>
            <p className="mt-2 text-sm text-slate-600">{file ? 'Ready for analysis • click to replace' : 'PDF, DOC or DOCX • Up to 10MB'}</p>
            <button type="button" onClick={(event) => { event.stopPropagation(); inputRef.current?.click(); }} className="btn-primary mt-5">
              {file ? 'Choose another file' : 'Upload resume'}
              <Download size={15} />
            </button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ['ATS-ready', 'Structured parsing'],
              ['Resume analyzed', 'Ready in under 4s'],
              ['Skills matched', 'Deeper role fit'],
              ['Experience mapped', 'Context-aware ranking'],
            ].map(([title, meta]) => (
              <div key={String(title)} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{String(title)}</p>
                <p className="mt-2 text-sm font-semibold text-slate-700">{String(meta)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CollegesSection() {
  return (
    <section id="colleges" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-sky-600">02 • For colleges</p>
          <h2 className="mt-4 text-4xl font-black leading-[0.96] tracking-[-0.07em] text-slate-900 sm:text-5xl">
            Get discovered.
            <span className="block text-sky-600">Build momentum.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
            Put your campus in front of students who are ready to act, and employers who are ready to hire. Showcase your outcomes and become the obvious choice.
          </p>
          <a href="#footer" className="btn-primary mt-7">
            List your college
            <ArrowRight size={16} />
          </a>
        </motion.div>

        <div className="space-y-3">
          {schoolRows.map((row, index) => (
            <motion.div
              key={row.number}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 rounded-[24px] border border-slate-200 bg-slate-50/60 p-4 sm:p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sm font-black text-sky-600">{row.number}</div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-sky-600">{row.tag}</p>
                <p className="mt-1 text-lg font-black tracking-[-0.04em] text-slate-900">{row.title}</p>
                <p className="mt-1 text-sm text-slate-600">{row.caption}</p>
              </div>
              <div className="hidden rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500 sm:inline-flex">CampusPe</div>
              <ChevronRight size={18} className="text-sky-600" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmployersSection() {
  return (
    <section id="employers" className="bg-[linear-gradient(180deg,#ffffff_0%,#f9fbff_100%)] py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="space-y-3">
          {employerRows.map((row, index) => (
            <motion.div
              key={row.number}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ x: -4 }}
              className="rounded-[24px] border border-slate-200 bg-white p-4 sm:p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-sm font-black text-orange-500">{row.number}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{row.tag}</p>
                    <div className="rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-emerald-700">Live</div>
                  </div>
                  <p className="mt-2 text-lg font-black tracking-[-0.04em] text-slate-900">{row.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{row.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-sky-600">03 • For employers</p>
          <h2 className="mt-4 text-4xl font-black leading-[0.96] tracking-[-0.07em] text-slate-900 sm:text-5xl">
            Hire with less noise.
            <span className="block text-sky-600">More signal.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
            Move from generic campus outreach to better-fit hiring. Compare candidate intent, skills and readiness without dragging your team through scattered workflows.
          </p>
          <a href="#footer" className="btn-primary mt-7">
            Post a role
            <ArrowRight size={16} />
          </a>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {proofPoints.map((point) => (
              <motion.div key={point.label} whileHover={{ y: -4 }} className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.03)]">
                <div className="text-2xl font-black tracking-[-0.06em] text-slate-900">{point.value}</div>
                <div className="mt-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{point.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer({ onWaitlist }: { onWaitlist: () => void }) {
  const [toast, setToast] = useState(false);

  const handleContact = () => {
    setToast(true);
    window.setTimeout(() => setToast(false), 2200);
  };

  return (
    <footer id="footer" className="bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-sky-100 bg-[linear-gradient(135deg,#ecf9ff_0%,#f5f3ff_100%)] p-8 text-center shadow-[0_18px_50px_rgba(14,165,233,0.08)] sm:p-10">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-sky-600">Support</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.07em] text-slate-900 sm:text-4xl">Still have questions?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">Our team can help with onboarding, listings, hiring workflows and anything in between.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={handleContact} className="btn-primary">
              <MessageSquareText size={16} />
              Contact support
            </button>
            <button type="button" onClick={onWaitlist} className="btn-secondary">
              Book a call
            </button>
          </div>
        </div>

        <div className="mt-10 rounded-[28px] border border-slate-200 bg-slate-50 p-6 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-2xl font-black tracking-[-0.06em] text-slate-900">Ready for what's next?</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Discover programs, find jobs and connect with the right campus opportunities faster.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="#colleges" className="btn-primary">Explore colleges</a>
              <a href="#opportunities" className="btn-secondary">Jobs & internships</a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-slate-200 pt-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-600">
              CampusPe helps students, colleges and employers move forward with more clarity, better fit and less friction.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.heading}>
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">{group.heading}</p>
              <div className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <a key={link} href="#top" className="block text-sm text-slate-600 transition hover:text-sky-600">{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CampusPe. Built for every campus milestone.</p>
          <div className="flex items-center gap-4">
            <a href="#top" className="transition hover:text-sky-600">Privacy</a>
            <a href="#top" className="transition hover:text-sky-600">Terms</a>
            <a href="#top" className="transition hover:text-sky-600">Help</a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-4 right-4 z-50 rounded-2xl border border-sky-100 bg-white px-4 py-3 shadow-[0_18px_35px_rgba(15,23,42,0.12)]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                <BellRing size={16} />
              </div>
              <div>
                <p className="text-sm font-black tracking-[-0.03em] text-slate-900">Support message sent</p>
                <p className="text-xs text-slate-500">We'll get back soon.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}

function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    personalization: false,
  });

  useEffect(() => {
    const saved = window.localStorage.getItem('campuspe-cookie-consent');

    if (!saved) {
      setVisible(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as CookiePreferences;
      setPreferences({
        necessary: true,
        analytics: Boolean(parsed.analytics),
        personalization: Boolean(parsed.personalization),
      });
    } catch {
      setVisible(true);
    }
  }, []);

  const savePreferences = (next: CookiePreferences) => {
    window.localStorage.setItem('campuspe-cookie-consent', JSON.stringify(next));
    setVisible(false);
  };

  const updatePreference = (key: keyof Omit<CookiePreferences, 'necessary'>) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.28, ease: easeOut }}
          className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-4xl rounded-[26px] border border-slate-200 bg-white/90 p-4 shadow-[0_25px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:bottom-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-base font-black tracking-[-0.04em] text-slate-900">We use cookies to improve your experience.</p>
                <p className="mt-1 text-sm text-slate-600">We keep it essential by default and only use optional cookies when you choose to enable them.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => setSettingsOpen((value) => !value)} className="btn-secondary !px-3 !py-2.5 text-[11px]">
                {settingsOpen ? 'Hide details' : 'Cookie settings'}
              </button>
              <button type="button" onClick={() => savePreferences({ necessary: true, analytics: false, personalization: false })} className="btn-secondary !px-3 !py-2.5 text-[11px]">
                Reject optional
              </button>
              <button type="button" onClick={() => savePreferences({ necessary: true, analytics: true, personalization: true })} className="btn-primary !px-3 !py-2.5 text-[11px]">
                Accept all
              </button>
            </div>
          </div>

          <AnimatePresence>
            {settingsOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="mt-5 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                  <div className="space-y-3">
                    {[
                      ['Analytics cookies', preferences.analytics, 'analytics'],
                      ['Personalization cookies', preferences.personalization, 'personalization'],
                    ].map(([label, checked, key]) => (
                      <label key={String(label)} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                        <span className="text-sm font-medium text-slate-700">{String(label)}</span>
                        <button
                          type="button"
                          aria-pressed={Boolean(checked)}
                          onClick={() => updatePreference(key as keyof Omit<CookiePreferences, 'necessary'>)}
                          className={`relative h-7 w-12 rounded-full border transition ${Boolean(checked) ? 'border-sky-400 bg-sky-500' : 'border-slate-300 bg-slate-200'}`}
                        >
                          <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${Boolean(checked) ? 'left-6' : 'left-1'}`} />
                        </button>
                      </label>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button type="button" onClick={() => savePreferences(preferences)} className="btn-primary !px-3 !py-2.5 text-[11px]">
                      Save preferences
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function CampusPeLanding() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6fbff] text-slate-900">
      <TopNav onWaitlist={() => setModalOpen(true)} />
      <main>
        <Hero onWaitlist={() => setModalOpen(true)} />
        <Stats />
        <OpportunityFeed />
        <ResumeSection />
        <CollegesSection />
        <EmployersSection />
      </main>
      <Footer onWaitlist={() => setModalOpen(true)} />
      <CookieConsentBanner />

      <AnimatePresence>
        {modalOpen && <WaitlistModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
