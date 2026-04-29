import { ScrambleHeading } from '@/components/ScrambleHeading';
import { ColorSwatch } from '@/components/ColorSwatch';

const colorGroups = [
  {
    title: 'Background',
    colors: [
      { token: 'Base', hex: '#1c1c1c', cssVar: '--bg-base' },
      { token: 'Sidebar', hex: '#141414', cssVar: '--bg-sidebar' },
      { token: 'Surface', hex: '#222222', cssVar: '--bg-surface' },
      { token: 'Surface Hover', hex: '#2a2a2a', cssVar: '--bg-surface-hover' },
    ],
  },
  {
    title: 'Text',
    colors: [
      { token: 'Primary', hex: '#fffff0', cssVar: '--text-primary' },
      { token: 'Secondary', hex: '#8a8a8a', cssVar: '--text-secondary' },
      { token: 'Accent', hex: '#ffffff', cssVar: '--text-accent' },
    ],
  },
  {
    title: 'Accent',
    colors: [
      { token: 'Blue', hex: '#2d62ff', cssVar: '--accent' },
      { token: 'Blue Hover', hex: '#1e4fd8', cssVar: '--accent-hover' },
    ],
  },
  {
    title: 'Feedback',
    colors: [
      { token: 'Success', hex: '#4ade80', cssVar: '--success' },
      { token: 'Warning', hex: '#fbbf24', cssVar: '--warning' },
      { token: 'Error', hex: '#f87171', cssVar: '--error' },
    ],
  },
];

export function ColorSection() {
  return (
    <section id="color" className="scroll-mt-10" style={{ marginTop: 'var(--section-gap)' }}>
      <ScrambleHeading
        as="h2"
        className="text-4xl lg:text-6xl font-normal tracking-tight mb-4"
      >
        Color Palette
      </ScrambleHeading>
      <p className="text-base mb-12" style={{ color: 'var(--text-secondary)' }}>
        A curated palette designed for dark-mode interfaces with warm ivory text and precise blue accents.
      </p>

      {colorGroups.map((group) => (
        <div key={group.title} className="mb-12">
          <h3 className="component-label mb-4">{group.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.colors.map((color) => (
              <ColorSwatch key={color.token} {...color} />
            ))}
          </div>
        </div>
      ))}

      {/* Usage guidelines */}
      <div className="surface-card mt-8">
        <h3 className="component-label mb-4">Usage Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Background Hierarchy
            </h4>
            <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Use --bg-base for the main canvas, --bg-sidebar for navigation panels, and --bg-surface for elevated cards and components. --bg-surface-hover is reserved exclusively for interactive hover states.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Text Contrast
            </h4>
            <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              --text-primary (#fffff0) on --bg-base (#1c1c1c) provides a contrast ratio of 18:1, exceeding WCAG AAA. Use --text-secondary for captions, labels, and metadata only.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Accent Application
            </h4>
            <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Reserve --accent (#2d62ff) for primary actions, active states, and focus rings. The blue should never occupy more than 10% of the viewport at any time.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Feedback Colors
            </h4>
            <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Success, Warning, and Error colors are used for validation states, toast notifications, and status indicators. Never use these for decorative purposes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
