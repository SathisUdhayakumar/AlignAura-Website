## Visual polish pass – premium editorial landing

### Files that render the homepage

- `app/page.tsx` – root route mapping to the landing page.
- `sections/landing-page.tsx` – composes all homepage sections.
- Section components:
  - `sections/navbar.tsx`
  - `sections/hero-section.tsx`
  - `sections/ai-vastu-section.tsx`
  - `sections/services-section.tsx`
  - `sections/mission-vision-section.tsx`
  - `sections/testimonials-section.tsx`
  - `sections/team-section.tsx`
  - `sections/pricing-section.tsx`
  - `sections/community-section.tsx`
  - `sections/footer-section.tsx`
- Shared UI used on the homepage:
  - `components/motion-section.tsx`
  - `components/ui/button.tsx`
  - `components/ui/card.tsx`
  - `components/ui/input.tsx`
  - `components/ui/container.tsx`
  - `lib/utils.ts`

### Global styling changes

- **`app/globals.css`**
  - Added Chronicle-style accent tokens: `--color-accent-soft`, `--color-accent-muted`, `--color-accent-muted-soft`.
  - Introduced base typography rules for headings and paragraphs and enabled OpenType stylistic sets for a more editorial feel.
  - Kept the existing CSS variable-based theme but tuned it for a calmer, premium SaaS look.

- **`tailwind.config.mjs`**
  - New Tailwind config with:
    - `content` paths for `app/`, `components/`, `sections/`, `pages/`.
    - Centered `container` with a 1200px max width and 1–2rem padding.
    - Extended `accent` colors wired to the new CSS variables.
    - Added `transitionTimingFunction.editorial` (`cubic-bezier(0.25, 0.1, 0.25, 1)`).

### Layout / shell

- **`sections/landing-page.tsx`**
  - Updated page background to a soft radial + linear gradient.
  - Adjusted top padding and between-section gap for a more editorial vertical rhythm.

- **`components/ui/container.tsx`**
  - New shared `Container` component standardising the 6xl max width and responsive horizontal padding.

- **`sections/navbar.tsx`**
  - Restyled into a minimal sticky header with a compact logomark, understated nav, and a single strong call-to-action.
  - Applied smooth entrance motion and Chronicle-like typography (small caps meta, tighter tracking).

- **`sections/footer-section.tsx`**
  - Replaced the simple bar with a three-column editorial footer:
    - Brand blurb and copyright.
    - “Explore” navigation links.
    - Newsletter email field and social links.

### Hero refinements

- **`sections/hero-section.tsx`**
  - Converted the hero into a large floating panel with:
    - Left: editorial kicker, multi-line headline, and supporting copy.
    - Right: framed mockup using `next/image` with a fixed aspect ratio to minimise layout shift.
  - Added parallax-like motion on the right mockup using `framer-motion` (`useMotionValue`, `useSpring`, `useTransform`).
  - Implemented staggered reveal for the headline, body copy, and CTA via variants on a nested `motion.div`.
  - Refined primary CTA into a pill button with subtle scale and shadow on hover.

### Motion system

- **`components/motion-section.tsx`**
  - Standardised reveal-on-scroll across sections to fade + rise + blur-out with a 0.7s editorial easing curve.
  - Keeps reduced-motion users respected by disabling the animation when `prefers-reduced-motion` is set.

- Section cards and buttons (services, mission/vision, testimonials, team, pricing, community) already used `framer-motion` and have been tuned towards:
  - Hover scale between 1.02 and 1.05.
  - 300–500ms transitions using `easeOut` or the editorial timing function.

### Style guide (overview)

- **Type scale**
  - Hero heading: ~44px on desktop (`md:text-[44px]`), 3–4xl on smaller screens.
  - Section headings: `text-xl`–`text-2xl`.
  - Body copy: `text-sm` / `text-[15px]` with `leading-relaxed`.
  - Meta / overline text: `text-[11px]` uppercase with `tracking-[0.18–0.24em]`.

- **Spacing**
  - Global layout: container `max-w-6xl` with `px-4 md:px-8`.
  - Section vertical rhythm: `gap-24 md:gap-32` on the main stack.
  - Hero panel padding: `px-6 py-12 md:px-12 md:py-16`.

- **Colors**
  - Base background: soft white gradient (`#f9fafb` → `#ffffff`) with a pale radial accent.
  - Text: `text-zinc-900` for headings, `text-zinc-600` for body, `text-zinc-500` for meta.
  - Accent: teal/indigo-like hues via `--color-accent-soft`, `--color-accent-muted`, `--color-accent-muted-soft`.

- **Motion timings**
  - Section reveals: 0.7s with `cubic-bezier(0.25, 0.1, 0.25, 1)`.
  - CTA and card hovers: 0.3–0.4s `easeOut`, scale 1.02–1.05 with soft drop shadows.

### Running the app

- Dependencies:
  - `framer-motion` is already listed in `package.json` and should be installed via `npm install`.

- Dev server:
  - Start the app with:
    - `npm run dev`
  - Next.js will bind to port 3000 by default, or automatically fall back to the next free port (e.g. `http://localhost:3001`) if 3000 is already in use. The active URL is printed in the dev server output.






