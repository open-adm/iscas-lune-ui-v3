# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js TypeScript application using the App Router. Route files live in `src/app`, with feature pages such as `src/app/produto/[slug]/page.tsx` and `src/app/pedido/page.tsx`. Shared UI primitives and composed widgets are in `src/components`, usually grouped by component name. Feature-level screen composition belongs in `src/view`, API hooks and endpoint route definitions in `src/api`, shared contexts in `src/context`, reusable hooks in `src/hooks`, data contracts in `src/types`, and helpers in `src/utils`. Theme customization is in `src/theme`; static assets are in `public`.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the local Next.js dev server with Turbopack on port `8082`.
- `npm run build`: create a production build and run Next.js/TypeScript checks.
- `npm run start`: serve the production build on port `8081`.
- `npm run lint`: run the configured Next.js ESLint checks.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Keep strict typing enabled; `any` is allowed by ESLint but should be used only when the API shape is genuinely unknown. Prefer the `@/*` path alias for imports from `src`, for example `@/components/Button/ButtonApp`. Follow the existing naming style: components and view files use PascalCase (`ViewPedido.tsx`, `ButtonApp.tsx`), hooks use `Use...` names, and type files use domain nouns (`Produto.ts`, `Pedido.ts`). Keep component-specific CSS modules beside the component, such as `Header.module.css`.

## Testing Guidelines

No test runner or `npm test` script is currently configured. For now, validate changes with `npm run lint` and `npm run build`, and manually exercise affected flows through `npm run dev`. When adding tests, colocate them near the relevant feature or component and add a package script so contributors can run them consistently.

## Commit & Pull Request Guidelines

Recent git history uses short `fix` commits, so there is no strict conventional-commit format in place. Prefer concise, imperative commit messages that describe the change, for example `fix cart total calculation` or `add partner store form validation`. Pull requests should include a brief summary, affected routes or components, validation steps performed, linked issues when applicable, and screenshots for visible UI changes.

## Security & Configuration Tips

Local environment values are stored in `.env.development`; do not commit secrets or production credentials. Keep API configuration centralized in `src/api` and route constants in `src/config` so endpoint changes remain easy to audit.
