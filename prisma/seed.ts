import { PrismaClient, ContentType } from '../src/generated/prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

// ============================================
// SYSTEM ITEM TYPES
// ============================================
const systemItemTypes = [
  { name: 'snippet', icon: 'Code', color: '#3b82f6', isSystem: true },
  { name: 'prompt', icon: 'Sparkles', color: '#8b5cf6', isSystem: true },
  { name: 'command', icon: 'Terminal', color: '#f97316', isSystem: true },
  { name: 'note', icon: 'StickyNote', color: '#fde047', isSystem: true },
  { name: 'file', icon: 'File', color: '#6b7280', isSystem: true },
  { name: 'image', icon: 'Image', color: '#ec4899', isSystem: true },
  { name: 'link', icon: 'Link', color: '#10b981', isSystem: true },
]

// ============================================
// COLLECTIONS
// ============================================
const collections = [
  { name: 'React Patterns', description: 'Reusable React patterns and hooks' },
  { name: 'AI Workflows', description: 'AI prompts and workflow automations' },
  { name: 'DevOps', description: 'Infrastructure and deployment resources' },
  { name: 'Terminal Commands', description: 'Useful shell commands for everyday development' },
  { name: 'Design Resources', description: 'UI/UX resources and references' },
]

// ============================================
// ITEMS
// ============================================
const reactPatternItems = [
  {
    title: 'useDebounce Hook',
    contentType: ContentType.TEXT,
    language: 'typescript',
    isPinned: true,
    content: `import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}`,
  },
  {
    title: 'useLocalStorage Hook',
    contentType: ContentType.TEXT,
    language: 'typescript',
    content: `import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}`,
  },
  {
    title: 'Context Provider Pattern',
    contentType: ContentType.TEXT,
    language: 'typescript',
    content: `import { createContext, useContext, useState, ReactNode } from 'react'

interface ThemeContextValue {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}`,
  },
]

const aiWorkflowItems = [
  {
    title: 'Code Review Prompt',
    contentType: ContentType.TEXT,
    language: null,
    isPinned: true,
    content: `Review the following code and provide feedback on:

1. **Correctness** - Are there any bugs or logic errors?
2. **Performance** - Any unnecessary re-renders, N+1 queries, or inefficiencies?
3. **Security** - Input validation, auth checks, XSS/injection risks?
4. **Readability** - Is the code clear and well-named?
5. **Patterns** - Does it follow the existing codebase conventions?

Be concise. Flag critical issues first, then minor suggestions.

\`\`\`
[PASTE CODE HERE]
\`\`\``,
  },
  {
    title: 'Documentation Generator Prompt',
    contentType: ContentType.TEXT,
    language: null,
    content: `Generate concise documentation for the following function/component.

Include:
- **Purpose**: What it does in one sentence
- **Parameters**: Name, type, description for each
- **Returns**: What it returns and when
- **Example**: A minimal usage example

Keep it brief. Developers prefer examples over prose.

\`\`\`
[PASTE CODE HERE]
\`\`\``,
  },
  {
    title: 'Refactoring Assistant Prompt',
    contentType: ContentType.TEXT,
    language: null,
    content: `Refactor the following code to improve quality without changing behavior.

Goals:
- Reduce complexity and nesting
- Extract reusable logic into named functions
- Improve naming for clarity
- Remove duplication
- Apply appropriate patterns

Constraints:
- Do NOT change the public API or function signatures
- Do NOT add new dependencies
- Keep the same language and framework

Explain each significant change briefly.

\`\`\`
[PASTE CODE HERE]
\`\`\``,
  },
]

const devOpsItems = [
  {
    title: 'Dockerfile (Next.js)',
    contentType: ContentType.TEXT,
    language: 'dockerfile',
    content: `FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]`,
  },
  {
    title: 'Deploy to Production',
    contentType: ContentType.TEXT,
    language: 'bash',
    content: `#!/bin/bash
set -e

echo "Running database migrations..."
npx prisma migrate deploy

echo "Building application..."
pnpm build

echo "Restarting service..."
pm2 restart devstash

echo "Deploy complete!"`,
  },
  {
    title: 'Neon Database Docs',
    contentType: ContentType.URL,
    language: null,
    url: 'https://neon.tech/docs/introduction',
  },
  {
    title: 'GitHub Actions Docs',
    contentType: ContentType.URL,
    language: null,
    url: 'https://docs.github.com/en/actions',
  },
]

const terminalCommandItems = [
  {
    title: 'Git — Undo Last Commit (Keep Changes)',
    contentType: ContentType.TEXT,
    language: 'bash',
    content: `git reset --soft HEAD~1`,
  },
  {
    title: 'Docker — Remove All Stopped Containers & Unused Images',
    contentType: ContentType.TEXT,
    language: 'bash',
    content: `docker system prune -af`,
  },
  {
    title: 'Find & Kill Process on Port',
    contentType: ContentType.TEXT,
    language: 'bash',
    content: `lsof -ti tcp:3000 | xargs kill -9`,
  },
  {
    title: 'pnpm — Clean Install',
    contentType: ContentType.TEXT,
    language: 'bash',
    content: `rm -rf node_modules pnpm-lock.yaml && pnpm install`,
  },
]

const designResourceItems = [
  {
    title: 'Tailwind CSS Docs',
    contentType: ContentType.URL,
    language: null,
    url: 'https://tailwindcss.com/docs',
  },
  {
    title: 'shadcn/ui Components',
    contentType: ContentType.URL,
    language: null,
    url: 'https://ui.shadcn.com/docs/components',
  },
  {
    title: 'Radix UI Primitives',
    contentType: ContentType.URL,
    language: null,
    url: 'https://www.radix-ui.com/primitives/docs/overview/introduction',
  },
  {
    title: 'Lucide React Icons',
    contentType: ContentType.URL,
    language: null,
    url: 'https://lucide.dev/icons',
  },
]

// ============================================
// MAIN
// ============================================
async function main() {
  console.log('🌱 Starting seed...')

  // System item types
  console.log('  → Seeding system item types...')
  const typeMap: Record<string, string> = {}
  for (const type of systemItemTypes) {
    const existing = await prisma.itemType.findFirst({ where: { name: type.name, userId: null } })
    const record = existing ?? (await prisma.itemType.create({ data: type }))
    typeMap[type.name] = record.id
  }

  // Clear existing demo user data to avoid duplicates on re-seed
  const existingUser = await prisma.user.findUnique({ where: { email: 'demo@devstash.io' } })
  if (existingUser) {
    console.log('  → Clearing existing demo data...')
    await prisma.item.deleteMany({ where: { userId: existingUser.id } })
    await prisma.collection.deleteMany({ where: { userId: existingUser.id } })
  }

  // Demo user
  console.log('  → Creating demo user...')
  const hashedPassword = await bcrypt.hash('12345678', 12)
  const user = await prisma.user.upsert({
    where: { email: 'demo@devstash.io' },
    update: {},
    create: {
      email: 'demo@devstash.io',
      name: 'Demo User',
      password: hashedPassword,
      emailVerified: new Date(),
      isPro: false,
    },
  })

  // Helper to create a collection with items
  async function createCollection(
    name: string,
    description: string,
    items: Array<{
      title: string
      contentType: ContentType
      language: string | null
      content?: string
      url?: string
      typeName: string
      isPinned?: boolean
    }>
  ) {
    const collection = await prisma.collection.upsert({
      where: { id: `seed-${name.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: {
        id: `seed-${name.toLowerCase().replace(/\s+/g, '-')}`,
        name,
        description,
        userId: user.id,
      },
    })

    for (const item of items) {
      const created = await prisma.item.create({
        data: {
          title: item.title,
          contentType: item.contentType,
          content: item.content ?? null,
          url: item.url ?? null,
          language: item.language,
          isPinned: item.isPinned ?? false,
          userId: user.id,
          itemTypeId: typeMap[item.typeName],
        },
      })
      await prisma.itemCollection.create({
        data: { itemId: created.id, collectionId: collection.id },
      })
    }

    return collection
  }

  console.log('  → Creating collections and items...')

  await createCollection(
    collections[0].name,
    collections[0].description,
    reactPatternItems.map((i) => ({ ...i, typeName: 'snippet' }))
  )

  await createCollection(
    collections[1].name,
    collections[1].description,
    aiWorkflowItems.map((i) => ({ ...i, typeName: 'prompt' }))
  )

  await createCollection(collections[2].name, collections[2].description, [
    { ...devOpsItems[0], typeName: 'snippet' },
    { ...devOpsItems[1], typeName: 'command' },
    { ...devOpsItems[2], typeName: 'link' },
    { ...devOpsItems[3], typeName: 'link' },
  ])

  await createCollection(
    collections[3].name,
    collections[3].description,
    terminalCommandItems.map((i) => ({ ...i, typeName: 'command' }))
  )

  await createCollection(
    collections[4].name,
    collections[4].description,
    designResourceItems.map((i) => ({ ...i, typeName: 'link' }))
  )

  console.log('✅ Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
