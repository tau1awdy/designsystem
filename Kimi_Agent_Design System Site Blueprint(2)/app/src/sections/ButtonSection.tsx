import { useState } from 'react';
import { ScrambleHeading } from '@/components/ScrambleHeading';
import { PressButton } from '@/components/PressButton';

export function ButtonSection() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <section id="button" className="scroll-mt-10" style={{ marginTop: 'var(--section-gap)' }}>
      <ScrambleHeading
        as="h3"
        className="text-2xl font-semibold tracking-tight mb-8"
      >
        Button
      </ScrambleHeading>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Button */}
        <div className="surface-card">
          <div className="component-label">Primary</div>
          <div className="flex flex-col items-start gap-6">
            <PressButton onClick={() => setClickCount((c) => c + 1)}>
              Button
            </PressButton>
            <div className="mono-label">
              Clicks: {clickCount}
            </div>
          </div>
          <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="mono-label mb-2">CSS</div>
            <pre className="font-mono-jet text-xs p-4 rounded overflow-x-auto" style={{ backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-secondary)' }}>
{`.press-button {
  background: var(--accent); /* #2d62ff */
  color: var(--text-primary);
  border-radius: 100px;
  box-shadow: 0 12px 20px -8px rgba(45,98,255,0.6);
  transition: transform 150ms ease-out,
              box-shadow 150ms ease-out;
}
.press-button:active {
  transform: translateY(4px);
  box-shadow: 0 4px 6px -2px rgba(45,98,255,0.3);
}`}
            </pre>
          </div>
        </div>

        {/* Ghost Button */}
        <div className="surface-card">
          <div className="component-label">Ghost</div>
          <div className="flex flex-col items-start gap-6">
            <PressButton variant="ghost">
              Button
            </PressButton>
          </div>
          <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="mono-label mb-2">CSS</div>
            <pre className="font-mono-jet text-xs p-4 rounded overflow-x-auto" style={{ backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-secondary)' }}>
{`.press-button-ghost {
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  border-radius: 100px;
}
.press-button-ghost:hover {
  background: var(--bg-surface-hover);
}`}
            </pre>
          </div>
        </div>

        {/* Small Variant */}
        <div className="surface-card">
          <div className="component-label">Small</div>
          <div className="flex items-center gap-4">
            <PressButton>Small</PressButton>
            <PressButton variant="ghost">Small</PressButton>
          </div>
          <p className="text-sm mt-4" style={{ color: 'var(--text-secondary)' }}>
            Reduced padding for dense UI contexts.
          </p>
        </div>

        {/* With Icon */}
        <div className="surface-card">
          <div className="component-label">With Icon</div>
          <div className="flex items-center gap-4">
            <PressButton>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Add New
            </PressButton>
            <PressButton variant="ghost">
              Learn More
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </PressButton>
          </div>
          <p className="text-sm mt-4" style={{ color: 'var(--text-secondary)' }}>
            Icon buttons for actions with visual affordance.
          </p>
        </div>
      </div>
    </section>
  );
}
