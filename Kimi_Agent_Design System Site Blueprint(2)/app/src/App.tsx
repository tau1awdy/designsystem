import { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavRail } from '@/components/NavRail';
import { BrandSection } from '@/sections/BrandSection';
import { TypographySection } from '@/sections/TypographySection';
import { ColorSection } from '@/sections/ColorSection';
import { ButtonSection } from '@/sections/ButtonSection';
import { InputSection } from '@/sections/InputSection';
import { SurfacesSection } from '@/sections/SurfacesSection';
import { StatesMatrixSection } from '@/sections/StatesMatrixSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeSection, setActiveSection] = useState('brand');
  const mainRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      autoRaf: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  // Section entrance animations
  useEffect(() => {
    const sections = mainRef.current?.querySelectorAll('section');
    if (!sections) return;

    const triggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      const children = section.querySelectorAll(
        '.surface-card, .surface-primary, .surface-secondary, .surface-hover, .press-button, input'
      );

      if (children.length > 0) {
        gsap.set(children, { opacity: 0, y: 30 });

        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(children, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
            });
          },
          once: true,
        });
        triggers.push(st);
      }
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = mainRef.current?.querySelectorAll('section[id]');
    if (!sections) return;

    const triggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      const id = section.getAttribute('id');
      if (!id) return;

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  // Navigation handler
  const handleNavigate = useCallback((target: string) => {
    setActiveSection(target);
    const element = document.getElementById(target);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -20 });
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Navigation Rail */}
      <NavRail activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content */}
      <main
        ref={mainRef}
        className="min-h-screen"
        style={{
          marginLeft: 'var(--sidebar-width)',
          padding: 'var(--page-padding)',
          maxWidth: 'calc(100vw - var(--sidebar-width))',
        }}
      >
        <div style={{ maxWidth: '1200px' }}>
          {/* Home / Intro */}
          <section id="home" className="scroll-mt-10 mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="font-semibold"
                style={{
                  fontSize: '88px',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  color: 'var(--text-primary)',
                }}
              >
                Onyx
              </span>
            </div>
            <p
              className="text-xl mb-8"
              style={{ color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.6 }}
            >
              A premium dark-mode design system. Swiss precision meets digital craftsmanship — razor-sharp typography, monochromatic surfaces, and tactile interactivity.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--success)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>v1.0 Stable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>32 Components</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--warning)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>TypeScript</span>
              </div>
            </div>
          </section>

          <BrandSection />
          <TypographySection />
          <ColorSection />
          <SurfacesSection />
          <ButtonSection />
          <InputSection />
          <StatesMatrixSection />

          {/* Footer */}
          <footer
            className="mt-24 pt-8 pb-12 border-t text-center"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Onyx Design System v1.0 — Built with precision and care.
            </p>
            <p className="text-xs mt-2 font-mono-jet" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
              MIT License · 2025
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
