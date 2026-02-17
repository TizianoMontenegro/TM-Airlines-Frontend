# AGENTS.md - Development Guidelines for TM Airlines Frontend

This document provides guidance for agentic coding agents working in this repository.

## 1. Build, Lint, and Test Commands

### Running the Application
```bash
# Development server (runs on port 3000)
npm run dev
# or
bun --bun run dev

# Production build
npm run build
# or
bun --bun run build
```

### Running Tests
```bash
# Run all tests
npm test
# or
bun --bun run test

# Run a single test file
npx vitest run src/path/to/file.test.ts
# or
bun --bun vitest run src/path/to/file.test.ts

# Run tests in watch mode (during development)
npx vitest
```

### Linting & Formatting
```bash
# Check code for issues (includes lint + format + import organization)
npm run check
# or
bun --bun run check

# Lint only
npm run lint
# or
bun --bun run lint

# Format code
npm run format
# or
bun --bun run format
```

### Type Checking
```bash
# Type checking is included in build, or run separately
npx tsc --noEmit
```

## 2. Code Style Guidelines

### General Conventions
- **Framework**: React 19 with TypeScript (strict mode enabled)
- **Routing**: TanStack Router (file-based routing in `src/routes/`)
- **Styling**: Tailwind CSS v4
- **Package Manager**: npm or bun (bun preferred for speed)

### Formatting (Biome)
- **Indentation**: Tabs (not spaces)
- **Quotes**: Double quotes for JavaScript strings
- **Semicolons**: Required
- **Line endings**: LF (autodetected)

Run `npm run format` before committing to ensure consistent formatting.

### TypeScript Configuration
- **Target**: ES2022
- **Module**: ESNext
- **Strict mode**: Enabled
- **Path alias**: `@/*` maps to `./src/*`

Always use explicit types for function parameters and return values when they cannot be inferred.

### Import Conventions
- Use path alias `@/` for imports from `src/`
- Group imports in this order: external libraries, internal components/hooks, styles/assets
- Use Biome's auto-import organization: `npm run check` will auto-organize imports

```tsx
// Good import examples
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import Header from "@/components/Header";
import { useId, useState } from "react";
import appCss from "../styles.css?url";
```

### Naming Conventions
- **Components**: PascalCase (e.g., `Header.tsx`, `Footer.tsx`)
- **Files**: kebab-case for non-component files (e.g., `routeTree.gen.ts`)
- **Functions/variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE for true constants
- **CSS classes**: kebab-case (Tailwind utility classes)

### Component Structure
- Export components as default for page components
- Export named exports for reusable components
- Use functional components with hooks only

```tsx
// Page route component (default export)
export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  // component logic
}

// Reusable component (named export)
export default function Header() {
  // component logic
}
```

### Error Handling
- Use try/catch blocks for async operations
- Set error state in React and display user-friendly messages
- Use `catch (err: unknown)` and type guard for proper error typing

```tsx
try {
  const result = await someAsyncOperation();
  // handle success
} catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("An unexpected error occurred");
  }
} finally {
  setLoading(false);
}
```

### Tailwind CSS v4 Guidelines
- Use utility classes for styling
- Custom colors defined in `src/styles.css` using `@theme`:
  - `primary` (green: rgb(32, 96, 53))
  - `accent-red` (rgb(206, 43, 55))
  - `gold` (rgb(212, 175, 55))
  - `background-light` / `background-dark`
  - `box-light` / `box-dark`
- Dark mode: Use `dark:` prefix for dark mode variants

```tsx
// Example usage
<div className="bg-primary text-white dark:bg-background-dark">
  content
</div>
```

### Biome Lint Rules
The project uses Biome with recommended rules. Key rules:
- `noUnusedVariables`: Errors for unused variables
- `noUnusedImports`: Errors for unused imports
- Use `/** biome-ignore lint/rule: reason */` to suppress when necessary (e.g., for accessibility IDs)

### Testing Guidelines
- Testing framework: Vitest with React Testing Library
- Test files: Currently no test files present, but follow vitest conventions
- Run tests with `npm test`

## 3. Project Structure

```
src/
├── assets/icons/       # Icon components
├── components/         # Reusable UI components
├── routes/             # TanStack Router pages (file-based)
│   ├── __root.tsx      # Root layout
│   ├── index.tsx       # Home page
│   └── auth/           # Auth routes
├── main.tsx            # App entry point
├── routeTree.gen.ts    # Generated router tree
└── styles.css          # Global styles & Tailwind config
```

## 4. API Integration

- API base URL: `http://127.0.0.1:8000/api/v1/`
- Authentication tokens stored in localStorage
- Follow RESTful conventions for endpoints

## 5. Important Notes

- The `routeTree.gen.ts` file is auto-generated - do not edit manually
- Run `npm run check` before committing to catch lint/format issues
- The project uses Tailwind CSS v4 with the new `@import "tailwindcss"` syntax
- Development server runs on port 3000
