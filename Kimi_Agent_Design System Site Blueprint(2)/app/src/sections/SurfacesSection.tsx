import { ScrambleHeading } from '@/components/ScrambleHeading';
import { PressButton } from '@/components/PressButton';
import { SurfaceCard } from '@/components/SurfaceCard';

export function SurfacesSection() {
  return (
    <section id="tokens" className="scroll-mt-10" style={{ marginTop: 'var(--section-gap)' }}>
      <ScrambleHeading
        as="h2"
        className="text-4xl lg:text-6xl font-normal tracking-tight mb-4"
      >
        Surfaces
      </ScrambleHeading>
      <p className="text-base mb-12" style={{ color: 'var(--text-secondary)' }}>
        The foundational surface system — elevation, interaction, and hierarchy through background and border tokens.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Surface */}
        <SurfaceCard variant="primary">
          <div className="flex items-center justify-between mb-4">
            <span className="component-label mb-0">Primary Surface</span>
            <span className="mono-label">--bg-surface</span>
          </div>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            The default elevated surface for cards, dialogs, and panels. Provides subtle separation from the base background while maintaining the dark-mode continuum.
          </p>
          <PressButton>Action</PressButton>
          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="mono-label">#222222 · 1px solid #333333 · 4px radius</span>
          </div>
        </SurfaceCard>

        {/* Secondary Surface */}
        <SurfaceCard variant="secondary">
          <div className="flex items-center justify-between mb-4">
            <span className="component-label mb-0">Secondary Surface</span>
            <span className="mono-label">--bg-base</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            A recessed surface that sits closer to the canvas. Used for nested content, code blocks, and areas that need to visually sink below the primary surface level.
          </p>
          <div className="mt-4 p-4 rounded" style={{ backgroundColor: 'var(--bg-sidebar)', border: '1px solid var(--border-subtle)' }}>
            <span className="mono-label">Nested content area</span>
          </div>
          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="mono-label">#1c1c1c · 1px solid #333333 · 4px radius</span>
          </div>
        </SurfaceCard>

        {/* Hover Surface */}
        <SurfaceCard variant="hover">
          <div className="flex items-center justify-between mb-4">
            <span className="component-label mb-0">Hover Surface</span>
            <span className="mono-label">--bg-surface-hover</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            This card demonstrates the hover state. Hover over this card to see the background transition from --bg-surface to --bg-surface-hover.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--bg-surface)' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Rest</span>
            <span className="mx-2" style={{ color: 'var(--border-subtle)' }}>→</span>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--bg-surface-hover)' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Hover (#2a2a2a)</span>
          </div>
        </SurfaceCard>

        {/* Active Module */}
        <div className="surface-primary">
          <div className="flex items-center justify-between mb-4">
            <span className="component-label mb-0">Active Module</span>
            <span className="mono-label">composite</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-subtle)' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Module Header</span>
            <div
              className="w-10 h-5 rounded-full relative cursor-pointer"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <div
                className="absolute w-4 h-4 rounded-full"
                style={{
                  backgroundColor: 'var(--text-primary)',
                  top: '2px',
                  right: '2px',
                }}
              />
            </div>
          </div>
          <div className="p-3 mt-2 rounded" style={{ backgroundColor: 'var(--bg-sidebar)' }}>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Module body content sits at a deeper elevation. This demonstrates nested surface composition with header controls and content areas.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="mono-label">Module pattern: header + body, nested surfaces</span>
          </div>
        </div>
      </div>
    </section>
  );
}
