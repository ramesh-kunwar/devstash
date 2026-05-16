import { prisma } from '@/lib/prisma'

export type CollectionWithMeta = {
  id: string
  name: string
  description: string | null
  isFavorite: boolean
  itemCount: number
  accentColor: string
  typeIcons: Array<{ name: string; color: string; icon: string }>
}

export async function getRecentCollections(
  userId: string,
  limit = 6
): Promise<CollectionWithMeta[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    take: limit,
    include: {
      _count: { select: { items: true } },
      items: {
        include: {
          item: {
            include: { itemType: true },
          },
        },
      },
    },
  })

  return collections.map((col) => {
    // Tally item types to find accent color (most-used type)
    const typeCounts = new Map<
      string,
      { count: number; color: string; icon: string; name: string }
    >()
    for (const itemCol of col.items) {
      const type = itemCol.item.itemType
      const existing = typeCounts.get(type.id)
      if (existing) {
        existing.count++
      } else {
        typeCounts.set(type.id, { count: 1, color: type.color, icon: type.icon, name: type.name })
      }
    }

    const sortedTypes = [...typeCounts.values()].sort((a, b) => b.count - a.count)
    const accentColor = sortedTypes[0]?.color ?? '#6b7280'
    const typeIcons = sortedTypes.map(({ name, color, icon }) => ({ name, color, icon }))

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      itemCount: col._count.items,
      accentColor,
      typeIcons,
    }
  })
}
