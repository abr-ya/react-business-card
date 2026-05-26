# React Component Lab

This project is a sandbox for testing larger React components before moving them into production applications or shared UI libraries.

It is intentionally small: each feature can be developed, reviewed, and exercised in isolation without the surrounding complexity of a real product.

## Existing Components

### Digital Business Card

A compact profile/business-card component with avatar, role, company, contact details, location, short bio, and social links.

Demo route: `/business-card`

### Peak Hours Range Selector

A controlled time-range selector for configuring peak load hours within a day. It supports multiple ranges, drag handles, whole-range dragging, configurable add strategies, minimum gaps between ranges, and optional double-click add/delete behavior.

The project also includes a weekly wrapper that displays seven daily selectors in a dark schedule-style layout.

Demo route: `/peak-hours`

### Related Projects

A curated gallery of external projects that use components from this lab, with local preview images, component badges, stack chips, and external links.

Demo route: `/related-projects`

## Stack

- **Build:** Vite 8, TypeScript 5
- **UI:** React 19, React Compiler via Babel
- **Styling:** Tailwind CSS 4, `tailwind-merge`, `class-variance-authority`, `tailwindcss-animate`, `tw-animate-css`
- **Components and a11y:** Radix UI, Lucide React, Radix Icons
- **Routing:** React Router 7
- **Data:** TanStack Query and React Query Devtools
- **Charts:** Recharts
- **Utilities:** `next-themes`, Sonner, cmdk, date-fns
- **Tooling:** ESLint 9, Prettier, `@/` import alias to `src/`

## Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint
- `npm run fix` - run ESLint with auto-fix
