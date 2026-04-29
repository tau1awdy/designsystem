import { useState, useRef, useCallback } from 'react';
import gsap from 'gsap';

interface NavSection {
  title: string;
  links: Array<{ label: string; target: string }>;
}

const navSections: NavSection[] = [
  {
    title: 'Core',
    links: [
      { label: 'Home', target: 'home' },
      { label: 'Brand', target: 'brand' },
      { label: 'Typography', target: 'typography' },
      { label: 'Color', target: 'color' },
      { label: 'Tokens', target: 'tokens' },
    ],
  },
  {
    title: 'Elements',
    links: [
      { label: 'Accordion', target: 'accordion' },
      { label: 'Alert', target: 'alert' },
      { label: 'Badge', target: 'badge' },
      { label: 'Breadcrumb', target: 'breadcrumb' },
      { label: 'Button', target: 'button' },
      { label: 'Card', target: 'card' },
      { label: 'Checkbox', target: 'checkbox' },
      { label: 'Input', target: 'input' },
      { label: 'Select', target: 'select' },
      { label: 'Slider', target: 'slider' },
      { label: 'Switch', target: 'switch' },
      { label: 'Tabs', target: 'tabs' },
      { label: 'Toast', target: 'toast' },
      { label: 'Tooltip', target: 'tooltip' },
    ],
  },
  {
    title: 'Modules',
    links: [
      { label: 'Navbar', target: 'navbar' },
      { label: 'Footer', target: 'footer' },
    ],
  },
  {
    title: 'Layout',
    links: [
      { label: 'Landing Page', target: 'landing' },
      { label: 'Article', target: 'article' },
    ],
  },
  {
    title: 'Archive',
    links: [{ label: 'Changelog', target: 'changelog' }],
  },
];

interface NavRailProps {
  activeSection: string;
  onNavigate: (target: string) => void;
}

function NavSectionGroup({
  section,
  activeSection,
  onNavigate,
}: {
  section: NavSection;
  activeSection: string;
  onNavigate: (target: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);

  const toggle = useCallback(() => {
    const content = contentRef.current;
    const chevron = chevronRef.current;
    if (!content) return;

    if (isOpen) {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
      gsap.to(chevron, {
        rotation: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    } else {
      gsap.to(content, {
        height: 'auto',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.inOut',
      });
      gsap.to(chevron, {
        rotation: 180,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="mb-1">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between nav-section-label cursor-pointer hover:opacity-80 transition-opacity px-0"
      >
        <span>{section.title}</span>
        <svg
          ref={chevronRef}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        ref={contentRef}
        style={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
        }}
      >
        {section.links.map((link) => (
          <div
            key={link.target}
            className={`nav-link ${activeSection === link.target ? 'active' : ''}`}
            onClick={() => onNavigate(link.target)}
          >
            {link.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function NavRail({ activeSection, onNavigate }: NavRailProps) {
  return (
    <nav
      className="fixed left-0 top-0 h-full overflow-y-auto"
      style={{
        width: 'var(--sidebar-width)',
        backgroundColor: 'var(--bg-sidebar)',
        zIndex: 100,
        padding: '24px 20px',
      }}
    >
      <div className="flex items-center gap-2 mb-8">
        <span
          className="font-semibold tracking-tight"
          style={{
            fontSize: '24px',
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          }}
        >
          Onyx
        </span>
        <span
          className="font-mono-jet text-xs px-1.5 py-0.5 rounded"
          style={{
            color: 'var(--text-secondary)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          v1.0
        </span>
      </div>

      {navSections.map((section) => (
        <NavSectionGroup
          key={section.title}
          section={section}
          activeSection={activeSection}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}
