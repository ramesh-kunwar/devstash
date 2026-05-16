# Current Feature

Dashboard Items — Real Data

## Status

Completed

## Goals

- Create `src/lib/db/items.ts` with data fetching functions for pinned and recent items
- Replace mock pinned and recent items in the dashboard with real data from Neon via Prisma
- Item card icon/color derived from the item type
- Display item type tags and all existing item row details
- If no pinned items, show nothing in the pinned section

## Notes

- Fetch items directly in server component
- Keep existing design and layout — no visual changes
- Reference: context/features/dashboard-items-spec.md

## History

<!-- Keep this updated. Latest to oldest. -->

- **Dashboard Items — Real Data** - Replaced mock pinned/recent items with live Neon data; ItemRow now uses embedded itemType for icon/color; no pinned section when empty (Completed)
- **Dashboard Collections — Real Data** - Replaced mock collections with live Neon data via Prisma; accent color from most-used item type; type icons per collection (Completed)
- **Seed Data** - Demo user, 7 system item types, 5 collections with 15 items (snippets, prompts, commands, links) (Completed)
- **Neon PostgreSQL + Prisma 7 Setup** - Prisma 7 with @prisma/adapter-neon, prisma.config.ts, full schema with all models, initial migration, and system item types seed (Completed)
- **Theme Toggle** - Light/dark mode with next-themes, ThemeProvider, and toggle button in top bar (Completed)
- **Dashboard Phase 3** - Main content area with stats cards, recent collections grid, pinned items, and recent items list (Completed)
- **Dashboard Phase 2** - Collapsible sidebar with item types + counts, favorite and recent collections, user avatar area, mobile drawer with floating trigger (Completed)
- **Dashboard Phase 1** - shadcn/ui initialized, /dashboard route, dark mode, top bar with search and action buttons, sidebar and main placeholders (Completed)
- **Initial Setup** - Next.js 16, Tailwind CSS v4, TypeScript configured (Completed)
