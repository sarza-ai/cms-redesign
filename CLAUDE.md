# Colorado Mycological Society Redesign

Redesign of cmsweb.org for the Colorado Mycological Society, featuring interactive parallax mushroom art. Repo: `sarza-ai/cms-redesign`, auto-deploys to Vercel on push to main.

## Stack

React 19 + TypeScript + Vite + Tailwind CSS 4. Main component is `src/App.tsx`, entry point `src/main.tsx`.

## Dev server

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173`.

## Existing docs

This repo already has several markdown docs from earlier work: `README.md`, `QUICK_START.md`, `DESIGN_GUIDE.md`, `PROJECT_SUMMARY.md`, `STATUS.md`. Some of their details (e.g. React version) are stale, treat `package.json` and the source as the source of truth over prose docs when they disagree.

## Skills

These external skills enhance website design and testing work (installed at `~/.claude/skills`):

- `frontend-design.md` — Anthropic's official frontend design skill for creating high-quality UI components and layouts
- `web-design-guidelines.md` — Vercel's web design guidelines for modern, performant web experiences
- `webapp-testing.md` — Playwright-based webapp testing for automated quality assurance
