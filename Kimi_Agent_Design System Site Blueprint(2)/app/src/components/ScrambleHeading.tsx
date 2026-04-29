import { useRef } from 'react';
import { useTextScramble } from '@/hooks/useTextScramble';

interface ScrambleHeadingProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
  className?: string;
}

export function ScrambleHeading({ children, as: Tag = 'h2', className = '' }: ScrambleHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  useTextScramble(ref);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`scramble-text ${className}`}
    >
      {children}
    </Tag>
  );
}
