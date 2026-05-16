# Current Feature

Neon PostgreSQL + Prisma 7 Setup

## Status

Completed

## Goals

- Install and configure Prisma 7 ORM
- Connect to Neon PostgreSQL (serverless) database
- Create initial schema based on project-overview.md data models
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Create initial migration (never use db push)
- Seed system item types

## Notes

- Use Prisma 7 (breaking changes from v6 — read upgrade guide before implementing)
- Always use `prisma migrate dev` — never `db push`
- DATABASE_URL points to development branch; production uses a separate branch
- Seed script must upsert system item types (snippet, prompt, command, note, file, image, link)
- Reference: context/features/database-spec.md

## History

- **Neon PostgreSQL + Prisma 7 Setup** - Prisma 7 with @prisma/adapter-neon, prisma.config.ts, full schema with all models, initial migration, and system item types seed (Completed)

<!-- Keep this updated. Latest to oldest. -->

- **Theme Toggle** - Light/dark mode with next-themes, ThemeProvider, and toggle button in top bar (Completed)
- **Dashboard Phase 3** - Main content area with stats cards, recent collections grid, pinned items, and recent items list (Completed)
- **Dashboard Phase 2** - Collapsible sidebar with item types + counts, favorite and recent collections, user avatar area, mobile drawer with floating trigger (Completed)
- **Dashboard Phase 1** - shadcn/ui initialized, /dashboard route, dark mode, top bar with search and action buttons, sidebar and main placeholders (Completed)
- **Initial Setup** - Next.js 16, Tailwind CSS v4, TypeScript configured (Completed)
