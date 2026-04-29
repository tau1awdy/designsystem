# Tech Spec — Onyx Design System

## Dependencies

| Package | Purpose |
|---|---|
| `three` | 3D engine for the Interactive Text Mask effect |
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | R3F helpers (`Html`, `useFBO`, camera components) |
| `gsap` | Core animation engine (ScrollTrigger, timeline animations) |
| `lenis` | Smooth scroll with inertia |
| `@fontsource/manrope` | Self-hosted Manrope font (400, 500, 600, 700) |
| `@fontsource/jetbrains-mono` | Self-hosted JetBrains Mono font (400) |

No shadcn/ui components are used — the design system defines all its own primitives (buttons, inputs, cards, accordions) to maintain full control over the Mid-Century Modern aesthetic and custom interaction physics.

## Component Inventory

### Layout
- **NavRail** — Fixed 300px left sidebar. Contains logo, version tag, and collapsible accordion sections. Manages active section highlighting via ScrollTrigger callbacks. GSAP-powered accordion expand/collapse with chevron rotation.
- **NavSection** — Accordion group header + collapsible content. GSAP `height: 0 → auto` animation.
- **NavLink** — Individual navigation link with active state indicator (2px left blue border). Scrolls to target section on click.
- **MainCanvas** — Scrollable content area with Lenis integration.

### Sections
- **BrandSection** — Hero with H1, body text, two pill buttons, and the Interactive Text Mask (R3F) component behind.
- **TypographySection** — Vertical type scale specimen grid. Each row: label | specimen | CSS variable.
- **ColorSection** — 3-column grid of ColorSwatch cards.
- **ButtonSection** — Card containing PressButton (primary) and PressButton (ghost).
- **InputSection** — Card containing TextInput with focus ring and floating label.
- **SurfacesSection** — 2×2 grid of Surface cards demonstrating different surface tokens.
- **StatesMatrixSection** — Wide card with 6-column grid of interaction state demonstrations.

### Interactive / Animated Components
- **TextMask** — R3F Canvas component. Renders `TextMaskScene` with orthographic + perspective cameras, dual FBO pipeline, and mouse-following mask mesh. See Core Effects for full architecture.
- **PressButton** — Custom button with press physics. Tracks `isPressed` state via `onMouseDown/Up/Leave`. CSS-driven `translateY(4px)` depression and shadow compression on `:active`. Two variants: `primary` (blue fill) and `ghost` (transparent, border).
- **TextInput** — Custom input with `focus` state management. Focus ring: border transitions to `--accent`, `box-shadow: 0 0 0 3px rgba(45,98,255,0.15)`. Floating label shifts up and brightens on focus.
- **ColorSwatch** — Card showing: color block (80px), token name, hex value, CSS variable reference.
- **SurfaceCard** — Demonstration card with hover lift effect (`translateY(-2px)`, enhanced shadow).
- **LoadingButton** — PressButton variant with pulsing opacity animation (`@keyframes pulse`, 1.5s loop).
- **DisabledButton** — PressButton variant at 40% opacity with `cursor: not-allowed`.

### Utility Components
- **ScrambleHeading** — Wrapper that applies the Text Scramble Effect to any heading element via `useTextScramble` hook.
- **ScrambleText** — Wrapper for non-heading text elements (nav links, body text) with scramble effect.
- **ActiveSectionTracker** — Invisible marker components placed at each section. Uses GSAP ScrollTrigger to toggle `.active` class on corresponding NavLink.

## Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|---|---|---|---|
| Text Scramble Effect | Custom (RAF) | Standalone `ScrambleText` class with `requestAnimationFrame` loop. Randomizes chars through A-Z0-9 at 30ms intervals. React integration via `useTextScramble` hook attaching mouseenter/mouseleave listeners. | Medium |
| Interactive Text Mask | Three.js + R3F | Dual FBO pipeline: offscreen capture of HTML heading → texture → masked plane with mouse-following circular gradient alphaMap. Custom `MaskedViewMaterial` shader discards fragments below threshold. Orthographic + perspective cameras. | High |
| Button Press Physics | CSS + React state | CSS transitions on `transform` and `box-shadow`. React tracks `isPressed` state for programmatic control. `:hover:not(:active)` lifts, `:active` depresses 4px with compressed shadow. | Low |
| Section Entrance (stagger) | GSAP ScrollTrigger | `gsap.from()` with `opacity: 0, y: 30`, `stagger: 0.1`, `duration: 0.6`, `ease: power2.out`. ScrollTrigger: `start: "top 85%"`. Applied to all section children. | Low |
| Nav Accordion | GSAP | `gsap.to()` on content wrapper, `height: "auto"`, `duration: 0.3`, `ease: power2.inOut`. Chevron icon rotation: `rotate: 180`. Toggle on section header click. | Low |
| Card Hover Lift | CSS | `transition: transform 300ms ease, box-shadow 300ms ease`. Hover: `translateY(-2px)`, enhanced shadow. | Low |
| Input Focus Ring | CSS | `transition: border-color 200ms ease, box-shadow 200ms ease`. Focus: border → `--accent`, blue glow ring. Floating label: `transition: transform 200ms ease, color 200ms ease`. | Low |
| Loading Button Pulse | CSS `@keyframes` | `animation: pulse 1.5s ease-in-out infinite`. Opacity oscillates 0.6 ↔ 1.0. | Low |
| Active Section Tracking | GSAP ScrollTrigger | ScrollTrigger instances on invisible section markers. `onEnter` / `onLeaveBack` callbacks set active nav link via React state. | Low |
| Smooth Scroll | Lenis | `new Lenis({ lerp: 0.1, autoRaf: true })`. Synced with GSAP ScrollTrigger via `lenis.on("scroll", ScrollTrigger.update)`. | Low |

## State & Logic Plan

### ScrambleText Class (Global Utility)
- **Why not a hook?** The scramble effect manages its own RAF loop and queue independently of React's render cycle. A class encapsulates this imperative logic cleanly.
- **Lifecycle**: Instantiated in `useTextScramble` hook's `useEffect`. `destroy()` removes event listeners and cancels the RAF frame on cleanup.
- **Queue system**: Each character transition is an object `{ from, to, start, end, char? }`. The `update()` method processes the queue per-frame, interpolating between scramble noise and final characters based on frame count.

### Dual FBO Pipeline (TextMask)
- **Buffer 1 (`buffer1`)**: Captures the HTML heading rendered offscreen via `useFBO()`.
- **Buffer 2 (`buffer2`)**: Secondary render target for the compositing pass.
- **Flow per frame**: 
  1. Render `MaskedViewMaterial` mesh into `buffer1` (offscreen) using perspective camera.
  2. Update mask mesh position to follow normalized mouse coordinates.
  3. Assign `buffer1.texture` to the visible plane's `uTexture` uniform.
  4. Render visible plane to screen.
- **Camera duality**: Orthographic camera for the visible plane (stable fullscreen quad). Perspective camera for offscreen capture (matches DOM perspective).

### NavRail Section Tracking
- **State**: `activeSection: string` stored in App-level state (or React context if deep prop-drilling becomes an issue).
- **Updates**: Each section has an invisible `<div>` at its top with a `data-section-id`. GSAP ScrollTrigger watches these markers. `onEnter` → set `activeSection`. `onLeaveBack` → revert to previous section.
- **Nav sync**: The NavRail receives `activeSection` and applies the `.active` class (2px left blue border) to the matching NavLink.

### Lenis + GSAP ScrollTrigger Sync
- **Initialization order**: 
  1. Create Lenis instance.
  2. Connect Lenis scroll events to ScrollTrigger: `lenis.on("scroll", ScrollTrigger.update)`.
  3. Use `gsap.ticker.add()` to drive Lenis RAF if not using `autoRaf`.
- **Scroll-to**: NavLink clicks call `lenis.scrollTo(targetElement, { offset: -20 })` for smooth programmatic scrolling.

## Other Key Decisions

### Font Loading Strategy
- Use `@fontsource/manrope` and `@fontsource/jetbrains-mono` for self-hosted fonts (no external network requests, no FOIT).
- Import in `main.tsx`: `import "@fontsource/manrope/400.css"` through `700.css`, and `import "@fontsource/jetbrains-mono/400.css"`.
- Apply `font-display: swap` is handled by fontsource packages.

### Three.js Performance
- `<Canvas dpr={[1, 2]}>` caps pixel ratio.
- FBO textures sized to viewport dimensions via `useThree((state) => state.size)`.
- The TextMask scene only renders when the Brand section is in or near viewport — use `IntersectionObserver` to pause/resume the R3F render loop.

### CSS Architecture
- All design tokens defined as CSS custom properties on `:root` in `index.css`.
- Tailwind used for layout utilities (flex, grid, spacing) but NOT for component styling — component styles are in dedicated CSS modules to maintain precise control over the design system's visual language.
- Component-scoped styles: `NavRail.module.css`, `PressButton.module.css`, `TextInput.module.css`, etc.

### Responsive Strategy
- **≥ 1024px**: Full layout — 300px sidebar + main canvas.
- **< 1024px**: Sidebar collapses to hamburger menu (overlay drawer). Surface grid becomes single column. Hero heading: 88px → 48px.
- **Breakpoints**: Use Tailwind's `lg:` (1024px) as the primary breakpoint.

### Accessibility
- Text scramble respects `prefers-reduced-motion`: when enabled, characters appear immediately without animation (check in `ScrambleText.init()`).
- Button press effect degrades to simple `:active` state without shadow animation under `prefers-reduced-motion`.
- All interactive elements have `focus-visible` styles.
- Color contrast: `--text-primary` (#fffff0) on `--bg-base` (#1c1c1c) passes WCAG AAA (contrast ratio ~18:1).
