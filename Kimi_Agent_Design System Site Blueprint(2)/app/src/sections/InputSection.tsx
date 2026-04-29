import { useState } from 'react';
import { ScrambleHeading } from '@/components/ScrambleHeading';
import { TextInput } from '@/components/TextInput';

export function InputSection() {
  const [inputValue, setInputValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <section id="input" className="scroll-mt-10" style={{ marginTop: 'var(--section-gap)' }}>
      <ScrambleHeading
        as="h3"
        className="text-2xl font-semibold tracking-tight mb-8"
      >
        Text Input
      </ScrambleHeading>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Default Input */}
        <div className="surface-card">
          <div className="component-label">Default</div>
          <TextInput
            label="Label"
            placeholder="Enter text..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="mono-label mb-2">States</div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--text-secondary)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Rest — border: var(--border-subtle)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Focus — border: var(--accent), glow ring</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Filled — value present</span>
              </div>
            </div>
          </div>
        </div>

        {/* Password Input */}
        <div className="surface-card">
          <div className="component-label">Password</div>
          <TextInput
            label="Password"
            type="password"
            placeholder="••••••••"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <p className="text-sm mt-4" style={{ color: 'var(--text-secondary)' }}>
            Type=&quot;password&quot; masks input. Same focus ring and label behavior.
          </p>
        </div>

        {/* Input Anatomy */}
        <div className="surface-card lg:col-span-2">
          <div className="component-label">Anatomy</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Container</div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                44px height, --bg-sidebar background, 1px --border-subtle border. 4px border-radius. Full width within parent.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Label</div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                12px JetBrains Mono, --text-secondary at rest. Shifts up 2px and brightens to --text-accent on focus.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Focus Ring</div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Border transitions to --accent blue. Outer glow: box-shadow: 0 0 0 3px rgba(45,98,255,0.15). 200ms ease.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
