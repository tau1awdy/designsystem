import { useRef } from 'react';
import { ScrambleHeading } from '@/components/ScrambleHeading';
import { PressButton } from '@/components/PressButton';
import { useTextScramble } from '@/hooks/useTextScramble';
import { TextMask } from '@/components/TextMask';

export function BrandSection() {
  const bodyRef = useRef<HTMLParagraphElement>(null);
  useTextScramble(bodyRef);

  return (
    <section id="brand" className="scroll-mt-10">
      {/* Text Mask Hero */}
      <div
        className="relative mb-16"
        style={{ height: '60vh', minHeight: '400px' }}
      >
        <TextMask headingText="ONYX" />
      </div>

      {/* Brand Content */}
      <div style={{ maxWidth: '720px' }}>
        <ScrambleHeading
          as="h1"
          className="text-5xl lg:text-7xl font-normal tracking-tight mb-8"
        >
          Onyx
        </ScrambleHeading>

        <p
          ref={bodyRef}
          className="scramble-text text-base leading-relaxed mb-10"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
        >
          A unified design system for precision-crafted digital experiences. Built on principles of clarity, restraint, and tactile interactivity.
        </p>

        <div className="flex items-center gap-4">
          <PressButton>Get Started</PressButton>
          <PressButton variant="ghost">View Tokens</PressButton>
        </div>
      </div>
    </section>
  );
}
