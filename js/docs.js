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
        <span class="arrow ${isOpen ? 'open' : ''}">▶</span>
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
        <span class="arrow" style="opacity:0.3;">▶</span>
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
      header.querySelector('.arrow').classList.toggle('open');
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

document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  setupMobileToggle();
  setupCopyButtons();
});
