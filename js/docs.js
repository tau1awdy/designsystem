const NAV_CONFIG = [
  {
    id: 'brand',
    label: 'Brand',
    divider: false,
    children: [
      { id: 'logo', label: 'Logo', path: 'brand/logo.html' },
      { id: 'colours', label: 'Colours', path: 'brand/colours.html' },
      { id: 'typography', label: 'Typography', path: 'brand/typography.html' },
    ]
  },
  {
    id: 'atoms',
    label: 'Atoms',
    divider: false,
    children: [
      { id: 'button', label: 'Button', path: 'atoms/button.html' },
      { id: 'link', label: 'Link', path: 'atoms/link.html' },
      { id: 'badge', label: 'Badge', path: 'atoms/badge.html' },
      { id: 'input', label: 'Input', path: 'atoms/input.html' },
    ]
  },
  {
    id: 'molecules',
    label: 'Molecules',
    divider: false,
    children: []
  },
  {
    id: 'organisms',
    label: 'Organisms',
    divider: false,
    children: []
  },
  {
    id: 'templates',
    label: 'Templates',
    divider: false,
    children: []
  },
  {
    id: 'pages',
    label: 'Pages',
    divider: true,
    children: [
      { id: 'overview', label: 'Page Overview', path: 'pages/overview.html' },
      { id: 'home', label: 'Home', path: 'pages/home.html' },
    ]
  },
  {
    id: 'dev',
    label: 'Dev',
    divider: false,
    children: [
      { id: 'tokens', label: 'Design Tokens', path: 'dev/tokens.html' },
      { id: 'setup', label: 'Setup', path: 'dev/setup.html' },
      { id: 'changelog', label: 'Changelog', path: 'dev/changelog.html' },
    ]
  }
];

function getRootPath() {
  const depth = location.pathname.split('/').length - 2;
  if (depth <= 1) return '';
  return '../'.repeat(Math.max(0, depth - 1));
}

function patchHref(path) {
  const prefix = getRootPath();
  if (prefix === './' || prefix === '') return path;
  return prefix + path;
}

function buildSidebar() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;

  let html = '';

  for (const section of NAV_CONFIG) {
    html += `<div class="nav-section">`;

    if (section.children.length > 0) {
      const childrenWithHref = section.children.map(c => ({ ...c, href: patchHref(c.path) }));
      const isOpen = childrenWithHref.some(c => location.pathname.includes(c.href));
      html += `<div class="nav-section-header" data-section="${section.id}">
        <span>${section.label}</span>
        <span class="arrow">${isOpen ? '▴' : '▾'}</span>
      </div>`;
      html += `<ul class="nav-children ${isOpen ? '' : 'collapsed'}" id="nav-${section.id}">`;
      for (const child of childrenWithHref) {
        const isActive = location.pathname.endsWith(child.href);
        html += `<li><a href="${child.href}" class="${isActive ? 'active' : ''}">${child.label}</a></li>`;
      }
      html += `</ul>`;
    } else {
      html += `<div class="nav-section-header" data-section="${section.id}" style="cursor:default;">
        <span>${section.label}</span>
        <span class="arrow" style="opacity:0.3;">›</span>
      </div>`;
    }

    html += `</div>`;

    if (section.divider) {
      html += `<div class="nav-divider"></div>`;
    }
  }

  nav.innerHTML = html;

  document.querySelectorAll('.nav-section-header[data-section]').forEach(header => {
    const sectionId = header.dataset.section;
    const children = document.getElementById(`nav-${sectionId}`);
    if (!children) return;

    header.addEventListener('click', () => {
      const isCollapsed = children.classList.toggle('collapsed');
      const arrow = header.querySelector('.arrow');
      arrow.textContent = isCollapsed ? '▾' : '▴';
    });
  });
}

function setupMobileToggle() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (!toggle || !sidebar || !overlay) return;

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });
}

function setupCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.closest('.code-block').querySelector('code');
      if (!code) return;

      try {
        await navigator.clipboard.writeText(code.textContent);
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      } catch {
        btn.textContent = 'Failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      }
    });
  });
}

/* === Lenis smooth scroll === */
function initLenis() {
  if (typeof Lenis === 'undefined') return;
  const lenis = new Lenis({ lerp: 0.1, autoRaf: true });
  lenis.on('scroll', () => { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.update(); });
  if (typeof gsap !== 'undefined') {
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  return lenis;
}

/* === GSAP scroll-triggered entrance animations === */
function initEntranceAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const targets = document.querySelectorAll('.surface-card, .component-preview, .hub-card, .preview-card');
  if (targets.length === 0) return;

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
  });

  ScrollTrigger.batch(targets, {
    start: 'top 85%',
    onEnter: batch => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        overwrite: true,
      });
    },
  });
}

/* === Scramble heading effect === */
function initScramble() {
  document.querySelectorAll('.page-header h1, h2.scramble').forEach(el => {
    const original = el.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

    function scramble(final, duration) {
      const steps = Math.max(8, Math.floor(duration / 60));
      let step = 0;
      function next() {
        if (step >= steps) { el.textContent = final; return; }
        const progress = step / steps;
        let result = '';
        for (let i = 0; i < final.length; i++) {
          if (i / final.length < progress) {
            result += final[i];
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        el.textContent = result;
        step++;
        requestAnimationFrame(next);
      }
      next();
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scramble(original, 800);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  setupMobileToggle();
  setupCopyButtons();
  initLenis();
  initEntranceAnimations();
  initScramble();
});
