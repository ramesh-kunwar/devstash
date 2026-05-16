# Current Feature

Stats & Sidebar — Real Data

## Status

Completed

## Goals

- Display stats (total items, collections, etc.) from real database data instead of mock data
- Display system item types in the sidebar with their icons, linking to `/items/[typename]`
- Add "View all collections" link under the collections list that goes to `/collections`
- Keep star icons for favorite collections; show a colored circle (based on most-used item type) for recent collections
- Add database functions to `src/lib/db/items.ts` as needed

## Notes

- Keep the current design and layout — no visual changes
- Fetch data directly in server components
- Reference `src/lib/db/collections.ts` for patterns
- Reference: context/features/stats-sidebar-spec.md

## History

<!-- Keep this updated. Latest to oldest. -->

- **Stats & Sidebar — Real Data** - Replaced mock stats/sidebar data with live Neon data; sidebar item types show real counts; recent collections show colored circle by most-used type; "View all collections" link added (Completed)
- **Dashboard Items — Real Data** - Replaced mock pinned/recent items with live Neon data; ItemRow now uses embedded itemType for icon/color; no pinned section when empty (Completed)
- **Dashboard Collections — Real Data** - Replaced mock collections with live Neon data via Prisma; accent color from most-used item type; type icons per collection (Completed)
- **Seed Data** - Demo user, 7 system item types, 5 collections with 15 items (snippets, prompts, commands, links) (Completed)
- **Neon PostgreSQL + Prisma 7 Setup** - Prisma 7 with @prisma/adapter-neon, prisma.config.ts, full schema with all models, initial migration, and system item types seed (Completed)
- **Theme Toggle** - Light/dark mode with next-themes, ThemeProvider, and toggle button in top bar (Completed)
- **Dashboard Phase 3** - Main content area with stats cards, recent collections grid, pinned items, and recent items list (Completed)
- **Dashboard Phase 2** - Collapsible sidebar with item types + counts, favorite and recent collections, user avatar area, mobile drawer with floating trigger (Completed)
- **Dashboard Phase 1** - shadcn/ui initialized, /dashboard route, dark mode, top bar with search and action buttons, sidebar and main placeholders (Completed)
- **Initial Setup** - Next.js 16, Tailwind CSS v4, TypeScript configured (Completed)
