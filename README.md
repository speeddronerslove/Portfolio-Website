# Mogana Murali — Portfolio (Foundation)

Single-page cinematic portfolio. This is the **foundation layer only** —
React + Vite + Tailwind + Framer Motion wired up exactly per the approved
Design Bible, Scene Map, and Technical Architecture. No scene UI exists yet.

## Run it

```bash
npm install
npm run dev
```

The dev server will show a black screen with the ambient gradient light
drifting — that's correct. `App.jsx` has commented slots for all eight
scenes; nothing renders until they're built.

```bash
npm run build      # production build
npm run preview    # preview the production build locally
```

## What's here

| Piece | File |
|---|---|
| Design tokens (color, type, spacing, radius, breakpoints) | `src/theme/tokens.js` |
| Framer Motion variants | `src/theme/motion.js` |
| Global styles + CSS variable mirror of tokens | `src/index.css` |
| Tailwind config (reads tokens.js + CSS vars) | `tailwind.config.js` |
| Cross-scene state (active scene, scroll progress, reduced motion) | `src/context/SceneContext.jsx` |
| Composition root (wraps scenes, renders atmosphere) | `src/atmosphere/ScrollOrchestrator.jsx` |
| Persistent orange "light source" background | `src/atmosphere/GradientLight.jsx` |
| Per-scene wrapper (registration, min-height, layout) | `src/components/layout/SceneWrapper.jsx` |

## What's deliberately not here yet

- `components/primitives/` and `components/motion/` — empty, see their
  README.md
- `scenes/01-Arrival` through `08-Contact` — empty, see `scenes/README.md`
- Chosen typefaces — `--font-display` / `--font-body` / `--font-utility`
  currently fall back to system fonts in `index.css`

## One rule to keep this intact

Color, type, spacing, and radius only ever change in `src/theme/tokens.js`
(and its CSS-variable mirror at the top of `src/index.css`). No scene or
component should hardcode a hex value, font-size, or border-radius.
