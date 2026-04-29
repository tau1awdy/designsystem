import { useRef } from 'react';
import { ScrambleHeading } from '@/components/ScrambleHeading';
import { useTextScramble } from '@/hooks/useTextScramble';

const typeScale = [
  { label: 'H1', size: '88px', weight: 400, lh: '1.1', ls: '-0.04em', text: 'The quick brown fox jumps', varName: '--text-h1' },
  { label: 'H2', size: '64px', weight: 400, lh: '1.15', ls: '-0.03em', text: 'The quick brown fox jumps', varName: '--text-h2' },
  { label: 'H3', size: '40px', weight: 600, lh: '1.2', ls: '-0.02em', text: 'The quick brown fox jumps', varName: '--text-h3' },
  { label: 'H4', size: '28px', weight: 600, lh: '1.3', ls: '-0.01em', text: 'The quick brown fox jumps', varName: '--text-h4' },
  { label: 'Body Large', size: '18px', weight: 400, lh: '1.6', ls: '0', text: 'The quick brown fox jumps over the lazy dog. This is body text at a larger size for emphasis.', varName: '--text-body-lg' },
  { label: 'Body', size: '16px', weight: 400, lh: '1.6', ls: '0', text: 'The quick brown fox jumps over the lazy dog. This is the standard body text size for all content.', varName: '--text-body' },
  { label: 'Small', size: '14px', weight: 500, lh: '1.5', ls: '0.01em', text: 'The quick brown fox jumps', varName: '--text-small' },
  { label: 'Caption', size: '12px', weight: 400, lh: '1.4', ls: '0.02em', text: 'The quick brown fox', varName: '--text-caption' },
];

function TypeSpecimen({
  label,
  size,
  weight,
  lh,
  ls,
  text,
  varName,
}: {
  label: string;
  size: string;
  weight: number;
  lh: string;
  ls: string;
  text: string;
  varName: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useTextScramble(ref);

  return (
    <div className="flex items-start gap-8 py-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="w-24 flex-shrink-0 pt-1">
        <span className="mono-label">{label}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div
          ref={ref}
          className="scramble-text"
          style={{
            fontSize: size,
            fontWeight: weight,
            lineHeight: lh,
            letterSpacing: ls,
            color: 'var(--text-primary)',
            wordBreak: 'break-word',
          }}
        >
          {text}
        </div>
      </div>
      <div className="w-48 flex-shrink-0 text-right pt-1 hidden lg:block">
        <span className="mono-label">{varName}</span>
        <div className="mono-label mt-1" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
          {size} / {weight} / {lh}
        </div>
      </div>
    </div>
  );
}

export function TypographySection() {
  return (
    <section id="typography" className="scroll-mt-10" style={{ marginTop: 'var(--section-gap)' }}>
      <ScrambleHeading
        as="h2"
        className="text-4xl lg:text-6xl font-normal tracking-tight mb-4"
      >
        Type Scale
      </ScrambleHeading>
      <p className="text-base mb-12" style={{ color: 'var(--text-secondary)' }}>
        The complete typographic system using Manrope at defined weights and sizes.
      </p>

      <div>
        {typeScale.map((spec) => (
          <TypeSpecimen key={spec.label} {...spec} />
        ))}
      </div>

      {/* Weight Specimens */}
      <div className="mt-16">
        <h3 className="component-label">Weight Variations</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[400, 500, 600, 700].map((w) => (
            <div
              key={w}
              className="surface-card text-center"
            >
              <div
                className="text-3xl mb-2"
                style={{ fontWeight: w, color: 'var(--text-primary)' }}
              >
                Aa
              </div>
              <div className="mono-label">{w}</div>
              <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                {w === 400 ? 'Regular' : w === 500 ? 'Medium' : w === 600 ? 'SemiBold' : 'Bold'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
