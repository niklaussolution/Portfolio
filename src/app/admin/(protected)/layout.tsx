import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { HGMark } from '@/components/ui/HGMark';

const SIDEBAR = [
  'Overview', 'Profile', 'Case Studies', 'Projects', 'Awards', 'Experience',
  'Certifications', 'Skills', 'Testimonials', 'Media', 'Incident Requests',
  'Contact Messages', 'SEO', 'Settings', 'Users', 'Security Logs',
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  return (
    <div className="flex min-h-[100svh] bg-ink-950">
      <aside className="hidden w-64 shrink-0 border-r border-line bg-ink-900 p-6 lg:block">
        <Link href="/admin" className="flex items-center gap-2">
          <HGMark className="h-7 w-7" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper-white">Admin</span>
        </Link>
        <nav className="mt-10 space-y-1">
          {SIDEBAR.map((item) => (
            <p
              key={item}
              className="cursor-default px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-paper-muted hover:bg-ink-950 hover:text-paper-white"
            >
              {item}
            </p>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
