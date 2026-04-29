import { useState, type ReactNode } from 'react';

interface PressButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function PressButton({
  children,
  variant = 'primary',
  onClick,
  className = '',
  disabled = false,
  loading = false,
}: PressButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const btnClass = variant === 'ghost' ? 'press-button-ghost' : 'press-button';

  return (
    <button
      className={`${btnClass} ${className}`}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
      disabled={disabled}
      style={
        isPressed && !disabled
          ? {
              transform: 'translateY(4px)',
              boxShadow:
                variant === 'ghost'
                  ? '0 2px 4px rgba(255,255,255,0.02)'
                  : '0 4px 6px -2px rgba(45,98,255,0.3)',
            }
          : undefined
      }
    >
      {loading ? (
        <>
          <span className="loading-pulse">Loading</span>
          <span className="loading-pulse" style={{ animationDelay: '0.2s' }}>.</span>
          <span className="loading-pulse" style={{ animationDelay: '0.4s' }}>.</span>
          <span className="loading-pulse" style={{ animationDelay: '0.6s' }}>.</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
