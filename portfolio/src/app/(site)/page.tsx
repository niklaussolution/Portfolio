import { Hero } from '@/components/sections/Hero';
import { IdentityMarquee } from '@/components/sections/IdentityMarquee';
import { About } from '@/components/sections/About';
import { Stats } from '@/components/sections/Stats';
import { Expertise } from '@/components/sections/Expertise';
import { FeaturedCase } from '@/components/sections/FeaturedCase';
import { Arsenal } from '@/components/sections/Arsenal';
import { Award } from '@/components/sections/Award';
import { Timeline } from '@/components/sections/Timeline';
import { CompanyStrip } from '@/components/sections/CompanyStrip';
import { Projects } from '@/components/sections/Projects';
import { Leadership } from '@/components/sections/Leadership';
import { IncidentCTA } from '@/components/sections/IncidentCTA';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <IdentityMarquee />
      <About />
      <Stats />
      <Expertise />
      <FeaturedCase />
      <Arsenal />
      <Award />
      <Timeline />
      <CompanyStrip />
      <Projects />
      <Leadership />
      <IncidentCTA />
      <Contact />
    </>
  );
}
