interface ColorSwatchProps {
  token: string;
  hex: string;
  cssVar: string;
}

export function ColorSwatch({ token, hex, cssVar }: ColorSwatchProps) {
  return (
    <div className="surface-card">
      <div
        className="w-full rounded mb-4"
        style={{
          height: '80px',
          backgroundColor: hex,
          border: hex.toLowerCase() === '#ffffff' || hex.toLowerCase() === '#fffff0'
            ? '1px solid var(--border-subtle)'
            : 'none',
        }}
      />
      <div className="font-mono-jet text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
        {cssVar}
      </div>
      <div className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
        {token}
      </div>
      <div className="font-mono-jet text-xs" style={{ color: 'var(--text-secondary)' }}>
        {hex}
      </div>
    </div>
  );
}
