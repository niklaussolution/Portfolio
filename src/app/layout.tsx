import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { profile } from '@/lib/site-content';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', weight: ['500', '700'] });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harishganesan.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Harish Ganesan — Cybersecurity Professional & Ethical Hacker',
    template: '%s — Harish Ganesan',
  },
  description:
    'Harish Ganesan is a cybersecurity professional and Director at Niklaus Solutions, specializing in ethical hacking, security operations, threat investigation and web application security.',
  keywords: [
    'Harish Ganesan',
    'Cybersecurity Professional',
    'Ethical Hacker',
    'Security Researcher',
    'Director Niklaus Solutions',
    'Cybersecurity Erode',
    'Web Application Security',
    'Threat Investigation',
  ],
  openGraph: {
    title: 'Harish Ganesan — Cybersecurity Professional & Ethical Hacker',
    description:
      'Ethical Hacker • Security Operations • Threat Investigation. Cybersecurity professional with 10+ years of experience.',
    url: siteUrl,
    siteName: 'Harish Ganesan',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harish Ganesan — Cybersecurity Professional & Ethical Hacker',
    description:
      'Ethical Hacker • Security Operations • Threat Investigation. Cybersecurity professional with 10+ years of experience.',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  worksFor: {
    '@type': 'Organization',
    name: profile.company,
    url: profile.companyUrl,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Erode',
    addressCountry: 'IN',
  },
  knowsAbout: [
    'Ethical Hacking',
    'Cybersecurity',
    'Security Operations',
    'Threat Investigation',
    'Web Application Security',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
