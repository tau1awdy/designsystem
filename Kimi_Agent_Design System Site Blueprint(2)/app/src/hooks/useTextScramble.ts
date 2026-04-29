import { useEffect, useRef } from 'react';
import { ScrambleText } from '@/utils/ScrambleText';

export function useTextScramble(ref: React.RefObject<HTMLElement | null>) {
  const scrambleRef = useRef<ScrambleText | null>(null);

  useEffect(() => {
    if (ref.current) {
      scrambleRef.current = new ScrambleText(ref.current);
    }

    return () => {
      if (scrambleRef.current) {
        scrambleRef.current.destroy();
        scrambleRef.current = null;
      }
    };
  }, [ref]);
}
