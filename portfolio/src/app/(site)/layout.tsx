import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Preloader } from '@/components/layout/Preloader';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { SmoothScroll } from '@/components/layout/SmoothScroll';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <CustomCursor />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
