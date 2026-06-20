// theme/tokens.js
//
// Single source of truth for every design value approved in the Design
// Bible V1.0. Nothing outside this file should hardcode a color, font role,
// spacing step, radius, or breakpoint.
//
// Color values are mirrored as CSS custom properties in src/index.css so
// Tailwind (via tailwind.config.js) and raw CSS can consume them too. Plain
// CSS can't import a JS file at runtime without an extra build step, so
// that mirror has to be kept in sync by hand — it's commented clearly in
// both places. Everything else here (spacing, radius, breakpoints) is
// imported directly into tailwind.config.js, so those values only ever
// live in one place.

export const color = {
  bg: '#000000',
  bgDeep: '#050505',
  textPrimary: '#FFFFFF',
  textSecondary: '#9A9A9A',
  accent1: '#FF7A00',
  accent2: '#FF5A00',
  accent3: '#E64500',
  accent4: '#2A0000',
};

// The Design Bible permits exactly one radius value, used sparingly
// (Creative Side scene only). No other radius should exist in the project.
export const radius = {
  card: '32px',
};

// Font roles. Families are intentionally left as a CSS-variable indirection
// (set in index.css) until typefaces are chosen — nothing downstream should
// need to change when that decision is made.
export const font = {
  display: 'var(--font-display)',
  body: 'var(--font-body)',
  utility: 'var(--font-utility)',
};

// Fluid type scale: clamp(min, preferred, max). Keeps headings "larger than
// expected" at every viewport instead of stepping down to a generic mobile
// size at each breakpoint. See Architecture §7.
export const type = {
  hero: 'clamp(3.5rem, 9vw, 9rem)',
  display: 'clamp(2.5rem, 6vw, 5.5rem)',
  heading: 'clamp(1.75rem, 3.5vw, 3rem)',
  body: 'clamp(1rem, 1.2vw, 1.125rem)',
  caption: 'clamp(0.75rem, 1vw, 0.875rem)',
};

// Generous spacing scale — Design Bible: "never compress sections together."
export const space = {
  xs: '0.5rem',
  sm: '1rem',
  md: '2rem',
  lg: '4rem',
  xl: '8rem',
  '2xl': '12rem',
  '3xl': '16rem',
};

// Breakpoint tiers, including the "cinematic" tier added in Architecture §7
// specifically so full-bleed imagery (Work, Creative Side) gets to be
// cinematic on large displays rather than just stretching.
export const breakpoint = {
  tablet: 640,
  desktop: 1024,
  cinematic: 1536,
};

const tokens = { color, radius, font, type, space, breakpoint };

export default tokens;
