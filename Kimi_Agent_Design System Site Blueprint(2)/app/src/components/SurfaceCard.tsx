import type { ReactNode } from 'react';

interface SurfaceCardProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'hover' | 'module';
  className?: string;
}

export function SurfaceCard({ children, variant = 'primary', className = '' }: SurfaceCardProps) {
  const variantClass =
    variant === 'primary'
      ? 'surface-primary'
      : variant === 'secondary'
        ? 'surface-secondary'
        : variant === 'hover'
          ? 'surface-hover'
          : 'surface-primary';

  return <div className={`${variantClass} ${className}`}>{children}</div>;
}
