import tokens from './src/theme/tokens.js';

// Colors are mapped to CSS custom properties (defined in src/index.css)
// rather than the raw hex values in tokens.js. That indirection is
// deliberate: it's the one piece of design state that benefits from being
// changeable at runtime (devtools, future theming) without a rebuild.
// Spacing/radius/breakpoints have no such need, so they're imported from
// tokens.js directly — one canonical value, no mirroring required.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-deep': 'var(--color-bg-deep)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        accent: {
          1: 'var(--color-accent-1)',
          2: 'var(--color-accent-2)',
          3: 'var(--color-accent-3)',
          4: 'var(--color-accent-4)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        utility: ['var(--font-utility)'],
      },
      fontSize: {
        hero: tokens.type.hero,
        display: tokens.type.display,
        heading: tokens.type.heading,
        body: tokens.type.body,
        caption: tokens.type.caption,
      },
      borderRadius: {
        card: tokens.radius.card,
      },
      spacing: {
        xs: tokens.space.xs,
        sm: tokens.space.sm,
        md: tokens.space.md,
        lg: tokens.space.lg,
        xl: tokens.space.xl,
        '2xl': tokens.space['2xl'],
        '3xl': tokens.space['3xl'],
      },
      screens: {
        tablet: `${tokens.breakpoint.tablet}px`,
        desktop: `${tokens.breakpoint.desktop}px`,
        cinematic: `${tokens.breakpoint.cinematic}px`,
      },
    },
  },
  // Deliberately no plugins. Glassmorphism/shadow utilities are forbidden
  // by the Design Bible, so nothing is added that would make reaching for
  // them easy.
  plugins: [],
};
