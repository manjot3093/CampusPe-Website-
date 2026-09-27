import './globals.css';
import type { Metadata } from 'next';
import { Instrument_Serif, Newsreader, Plus_Jakarta_Sans } from 'next/font/google';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-editorial',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CampusPe — Modern Campus & Career Opportunity Network',
  description:
    'A verified discovery platform connecting over 8,400 students, 130+ accredited institutions, and leading employers into one intelligent campus ecosystem.',
  keywords: [
    'CampusPe',
    'College Discovery',
    'Campus Placements',
    'Internships',
    'Higher Education',
    'Career Matching',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${newsreader.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-paper font-sans text-ink antialiased selection:bg-electric selection:text-white">
        {children}
      </body>
    </html>
  );
}
