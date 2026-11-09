# Linktree-Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the existing Linktree app so it fully follows the `Main_design.md` design guidelines: system colors (OS Light/Dark), system fonts only, inline SVGs instead of `lucide-react`, no UI library, 600 px max content width, 20vh top padding, visible focus outlines.

**Architecture:** Single-page React app (Vite). All styling lives in `src/index.css` (design tokens) and `src/App.css` (component styles). `App.tsx` and `LinkCard.tsx` swap `lucide-react` imports for hand-written inline SVGs (1.5 px stroke, 24 × 24 viewBox). Content structure (Me / Social / Music sections, Impressum footer) stays unchanged.

**Tech Stack:** React 19, TypeScript, Vite. No new dependencies. `lucide-react` and Google Fonts are removed.

**Spec:** `docs/superpowers/specs/2026-11-09-linktree-redesign-design.md`

## Global Constraints

- Follow `Main_design.md` exactly: tokens `--color-bg`, `--color-ink`, `--color-body`, `--color-muted`, `--color-faint`, `--color-rule`, `--color-accent`
- `--color-accent`: oklch(57.7% 0.245 27.325) light, oklch(70.4% 0.191 22.216) dark
- `--spacing: 0.25rem` basis; `--spacing-content` max 600px
- `--font-sans` = system-ui, `--font-mono` = ui-monospace
- Inline SVGs: 1.5 px stroke, 24 × 24 viewBox, monochrome, `aria-hidden="true"` where decorative
- Focus: 2 px outline in `--color-accent` with 2 px offset, always visible
- No new UI libraries, no external fonts, no new breakpoints beyond 40rem / 64rem / 80rem
- `prefers-reduced-motion: reduce` respected

## Review Focus

- OS Light / Dark mode toggle: colors must switch via `color-scheme` / `Canvas` / `CanvasText`
- Keyboard focus: every link must show a 2 px `--color-accent` outline with 2 px offset
- Narrow viewport: content must fit within `100vw - 3rem`, min 1.5rem horizontal padding
- Reduced motion: fade-in/reveal animations disabled under `prefers-reduced-motion: reduce`
- Contrast: system colors must maintain 4.5:1 in both modes

---

### Task 1: Design tokens in `src/index.css`

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: none
- Produces: CSS custom properties `--color-bg`, `--color-ink`, `--color-body`, `--color-muted`, `--color-faint`, `--color-rule`, `--color-accent`, `--font-sans`, `--font-mono`, `--spacing`

- [ ] **Step 1: Rewrite `:root` and `body` in `src/index.css`**

```css
:root {
  --color-bg: Canvas;
  --color-ink: CanvasText;
  --color-body: CanvasText;
  --color-muted: CanvasText;
  --color-faint: CanvasText;
  --color-rule: CanvasText;
  --color-accent: oklch(57.7% 0.245 27.325);
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: ui-monospace, 'JetBrains Mono', monospace;
  --spacing: 0.25rem;
  color-scheme: light dark;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-accent: oklch(70.4% 0.191 22.216);
  }
}
body {
  background: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-weight: 300;
  line-height: 1.6;
  min-height: 100vh;
  margin: 0;
}
```

- [ ] **Step 2: Remove old color/font variables and scrollbar styling not needed**

Remove `--background`, `--surface`, `--primary`, `--text-primary`, `--font-heading`, `--font-body`, etc. Keep `scroll-behavior: smooth` and `::-webkit-scrollbar` rules if still desired; otherwise drop them.

- [ ] **Step 3: Verify build compiles**

Run: `npm run build` (or `npx tsc --noEmit && npx vite build`)
Expected: no TypeScript or CSS errors

- [ ] **Step 4: Commit**

Not applicable — no git repository initialized in this workspace.

---

### Task 2: App layout and shell in `src/App.tsx` + `src/App.css`

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.css`

**Interfaces:**
- Consumes: tokens from Task 1
- Produces: `.main-container`, `.profile-section`, `.links-container`, `.links-section`, `.section-header`, `.footer` markup and classes

- [ ] **Step 1: Rewrite `src/App.tsx`**

Replace `lucide-react` imports with inline SVG components (`UserIcon`, `GlobeIcon`, `MusicIcon`, `ExternalLinkIcon`). Keep link data and section structure. Apply classes per guideline:
- `.main-container`: `max-width: 600px`, `margin: 0 auto`, `padding-top: 20vh`, `padding: 0 1.5rem`
- `.profile-section`: `margin-bottom`, no surface/background
- `.profile-name`: monospace? No — H1 Namemark-style text, large, `clamp`
- `.profile-bio`: sans, weight 300
- `.section-header`: mono, uppercase, 0.75rem, letter-spacing 0.06em, gap 0.5rem
- Footer link: mono, small, focus outline

- [ ] **Step 2: Rewrite `src/App.css`**

Component styles:
- `.main-container`: max 600px, centered, 20vh top, 1.5rem horizontal on mobile
- `.profile-section`, `.profile-name`, `.profile-bio`: typography per guideline (clamp sizes, mono for metadata)
- `.links-container`, `.links-section`: no background card, thin rule border if any, small gaps
- `.section-header`: mono uppercase, 0.75rem, spacing via `--spacing` multiples
- `.footer`: clear separation, mono small metadata
- Focus: `a:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }`
- Links: hover/focus → `--color-accent` background with contrasting text

- [ ] **Step 3: Verify build compiles**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

Not applicable — no git repository.

---

### Task 3: LinkCard inline SVGs and styles

**Files:**
- Modify: `src/components/LinkCard.tsx`
- Modify: `src/components/LinkCard.css`

**Interfaces:**
- Consumes: tokens from Task 1
- Produces: `<a class="link-card">` with inline SVGs instead of lucide-react

- [ ] **Step 1: Rewrite `src/components/LinkCard.tsx`**

Remove `lucide-react` import. Define four inline SVG icon components (user, globe, music, external-link) with 1.5 px stroke, 24 × 24 viewBox, `aria-hidden="true"`. Pass icon via `icon: React.ComponentType` or render based on a `kind` prop. Keep `href`, `title`, `subtitle`, `delay`. Add `data-testid="link-card"`.

- [ ] **Step 2: Rewrite `src/components/LinkCard.css`**

- `.link-card`: block link, no card background, thin `--color-rule` border, no shadow, no border-radius (or minimal), padding per guideline
- Hover: `--color-accent` background, contrasting text color
- Focus-visible: 2 px `--color-accent` outline, 2 px offset
- `.link-title`: sans, weight, size
- `.link-subtitle`: muted, smaller
- External icon: shown on hover/focus, accent color
- Animation: `fadeInUp` 0.35s ease-out after 0.5s delay, disabled under `prefers-reduced-motion: reduce`

- [ ] **Step 3: Verify build compiles**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

Not applicable — no git repository.

---

### Task 4: `index.html` cleanup and final verification

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: none
- Produces: cleaned HTML head

- [ ] **Step 1: Remove Google Fonts preconnect/links**

Delete the two `<link rel="preconnect">` lines and the Google Fonts stylesheet link.

- [ ] **Step 2: Adjust `theme-color`**

Set to a neutral value matching system scheme (or remove fixed dark value).

- [ ] **Step 3: Full build + visual smoke test**

Run: `npm run build`
Expected: PASS, `dist/` produced
Open `index.html` (or `dist/index.html`) and confirm: no external font requests, colors follow OS scheme, focus outlines visible on Tab.

- [ ] **Step 4: Commit**

Not applicable — no git repository.

---

## Self-Review

1. **Spec coverage:** Tokens (Task 1), layout/typography (Task 2), LinkCard components (Task 3), HTML cleanup (Task 4). All spec sections mapped.
2. **Step scan:** Each step produces exactly one checkable thing. No "TBD" or vague lines.
3. **Type consistency:** `LinkCard.tsx` keeps `href`, `title`, `subtitle`, `delay` props; icon type adjusted to inline SVG component type.
4. **Review Focus:** Light/Dark via `color-scheme` (Task 1), focus outline (Tasks 2 & 3), narrow viewport padding (Task 2), reduced motion (Task 3).
5. **Proportion:** Plan is ~2× the spec, acceptable for a restyle with file-level decisions.

---

Plan complete and saved to `docs/superpowers/plans/2026-11-09-linktree-redesign-plan.md`.

Please review the plan. Does it capture what you want?

For this plan I recommend **Native** execution — the tasks are small, tightly coupled through shared CSS tokens, and there are only four of them, so implementing them myself in this session is cheapest and fastest; a single final review on the whole branch suffices.

Which execution approach do you prefer?
- **Native** - I implement every task myself in this session, then one final review on the whole branch.
- **Subagent-driven** - A fresh subagent implements each task with a reviewer gate between tasks, then a whole-branch review.