import { Container } from '@/components/ui/Container';
import { StatCounter } from './StatCounter';
import { stats } from '@/lib/site-content';

export function Stats() {
  return (
    <section className="border-b border-line py-20">
      <Container>
        <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} label={s.label} draft={s.draft} />
          ))}
        </div>
      </Container>
    </section>
  );
}
