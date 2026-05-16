import { prisma } from '@/lib/prisma'

export type DashboardStats = {
  totalItems: number
  totalCollections: number
  favoriteItems: number
  favoriteCollections: number
}

export type ItemTypeWithCount = {
  id: string
  name: string
  icon: string
  color: string
  count: number
}

export type SidebarCollection = {
  id: string
  name: string
  itemCount: number
  isFavorite: boolean
  accentColor: string
}

export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  const [totalItems, totalCollections, favoriteItems, favoriteCollections] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.collection.count({ where: { userId } }),
    prisma.item.count({ where: { userId, isFavorite: true } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ])
  return { totalItems, totalCollections, favoriteItems, favoriteCollections }
}

export async function getItemTypesWithCounts(userId: string): Promise<ItemTypeWithCount[]> {
  const itemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    include: {
      _count: {
        select: { items: { where: { userId } } },
      },
    },
    orderBy: { name: 'asc' },
  })

  return itemTypes.map((t) => ({
    id: t.id,
    name: t.name,
    icon: t.icon,
    color: t.color,
    count: t._count.items,
  }))
}

export async function getSidebarCollections(userId: string): Promise<SidebarCollection[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    take: 10,
    include: {
      _count: { select: { items: true } },
      items: {
        include: { item: { include: { itemType: true } } },
      },
    },
  })

  return collections.map((col) => {
    const typeCounts = new Map<string, { count: number; color: string }>()
    for (const ic of col.items) {
      const t = ic.item.itemType
      const existing = typeCounts.get(t.id)
      if (existing) existing.count++
      else typeCounts.set(t.id, { count: 1, color: t.color })
    }
    const sorted = [...typeCounts.values()].sort((a, b) => b.count - a.count)
    const accentColor = sorted[0]?.color ?? '#6b7280'

    return {
      id: col.id,
      name: col.name,
      itemCount: col._count.items,
      isFavorite: col.isFavorite,
      accentColor,
    }
  })
}

export type ItemWithType = {
  id: string
  title: string
  description: string | null
  isFavorite: boolean
  isPinned: boolean
  language: string | null
  createdAt: Date
  itemType: {
    name: string
    icon: string
    color: string
  }
  tags: Array<{ name: string }>
}

export async function getPinnedItems(userId: string): Promise<ItemWithType[]> {
  return prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: 'desc' },
    include: {
      itemType: { select: { name: true, icon: true, color: true } },
      tags: { select: { name: true } },
    },
  })
}

export async function getRecentItems(userId: string, limit = 10): Promise<ItemWithType[]> {
  return prisma.item.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      itemType: { select: { name: true, icon: true, color: true } },
      tags: { select: { name: true } },
    },
  })
}
