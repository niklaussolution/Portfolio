import type { MetadataRoute } from 'next';
import { caseStudies } from '@/lib/site-content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harishganesan.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date() },
    ...caseStudies.map((c) => ({
      url: `${siteUrl}/case-files/${c.slug}`,
      lastModified: new Date(),
    })),
  ];
}
