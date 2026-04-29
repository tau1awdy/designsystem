import { ScrambleHeading } from '@/components/ScrambleHeading';
import { TextInput } from '@/components/TextInput';

function StateCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="surface-card">
      <div className="mono-label mb-4" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </div>
      {children}
    </div>
  );
}

export function StatesMatrixSection() {
  return (
    <section id="states" className="scroll-mt-10" style={{ marginTop: 'var(--section-gap)' }}>
      <ScrambleHeading
        as="h3"
        className="text-2xl font-semibold tracking-tight mb-8"
      >
        Interaction Tokens
      </ScrambleHeading>

      <div className="surface-card">
        <div className="component-label mb-6">Interactive States Matrix</div>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          A comprehensive overview of all interactive states in the Onyx system. Each state has defined visual properties for background, border, shadow, transform, and opacity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Rest */}
          <StateCard label="Rest">
            <button
              className="press-button w-full"
              style={{ fontSize: '13px', padding: '8px 16px' }}
            >
              Button
            </button>
            <div className="mt-3 space-y-1">
              <div className="mono-label text-xs">bg: --accent</div>
              <div className="mono-label text-xs">shadow: rest</div>
              <div className="mono-label text-xs">transform: none</div>
            </div>
          </StateCard>

          {/* Hover */}
          <StateCard label="Hover">
            <button
              className="w-full"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '100px',
                padding: '8px 16px',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: '0 16px 24px -8px rgba(45, 98, 255, 0.7)',
                transform: 'translateY(-1px)',
                transition: 'transform 150ms ease-out, box-shadow 150ms ease-out',
              }}
            >
              Button
            </button>
            <div className="mt-3 space-y-1">
              <div className="mono-label text-xs">bg: --accent</div>
              <div className="mono-label text-xs">shadow: elevated</div>
              <div className="mono-label text-xs">transform: Y(-1px)</div>
            </div>
          </StateCard>

          {/* Active */}
          <StateCard label="Active">
            <button
              className="w-full"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '100px',
                padding: '8px 16px',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -2px rgba(45, 98, 255, 0.3)',
                transform: 'translateY(4px)',
              }}
            >
              Button
            </button>
            <div className="mt-3 space-y-1">
              <div className="mono-label text-xs">bg: --accent</div>
              <div className="mono-label text-xs">shadow: compressed</div>
              <div className="mono-label text-xs">transform: Y(4px)</div>
            </div>
          </StateCard>

          {/* Focus */}
          <StateCard label="Focus">
            <TextInput
              placeholder="Focused..."
              className="w-full"
            />
            <div className="mt-3 space-y-1">
              <div className="mono-label text-xs">border: --accent</div>
              <div className="mono-label text-xs">ring: 3px rgba(45,98,255,0.15)</div>
              <div className="mono-label text-xs">label: brightened</div>
            </div>
          </StateCard>

          {/* Disabled */}
          <StateCard label="Disabled">
            <button
              className="w-full"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '100px',
                padding: '8px 16px',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'not-allowed',
                opacity: 0.4,
              }}
              disabled
            >
              Button
            </button>
            <div className="mt-3 space-y-1">
              <div className="mono-label text-xs">opacity: 0.4</div>
              <div className="mono-label text-xs">cursor: not-allowed</div>
              <div className="mono-label text-xs">events: none</div>
            </div>
          </StateCard>

          {/* Loading */}
          <StateCard label="Loading">
            <div className="loading-pulse">
              <button
                className="press-button w-full"
                disabled
                style={{ fontSize: '13px', padding: '8px 16px', cursor: 'default' }}
              >
                Loading...
              </button>
            </div>
            <div className="mt-3 space-y-1">
              <div className="mono-label text-xs">opacity: 0.6-1.0 loop</div>
              <div className="mono-label text-xs">duration: 1.5s</div>
              <div className="mono-label text-xs">pointer-events: none</div>
            </div>
          </StateCard>
        </div>

        {/* State Transition Diagram */}
        <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="component-label mb-6">State Transition Flow</div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Rest', 'Hover', 'Active', 'Rest'].map((state, i, arr) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="px-4 py-2 rounded text-sm font-medium"
                  style={{
                    backgroundColor: i === 2 ? 'var(--accent)' : 'var(--bg-sidebar)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {state}
                </div>
                {i < arr.length - 1 && (
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                    <path
                      d="M1 6h14M12 2l4 4-4 4"
                      stroke="var(--text-secondary)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-4" style={{ color: 'var(--text-secondary)' }}>
            Click activates Active state → releases return to Rest via Hover if cursor remains.
          </p>
        </div>
      </div>
    </section>
  );
}
