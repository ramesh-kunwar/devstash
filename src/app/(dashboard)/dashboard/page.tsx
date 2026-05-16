import { Pin } from 'lucide-react'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { RecentCollections } from '@/components/dashboard/recent-collections'
import { ItemRow } from '@/components/dashboard/item-row'
import { getRecentCollections } from '@/lib/db/collections'
import { getPinnedItems, getRecentItems, getDashboardStats } from '@/lib/db/items'
import { prisma } from '@/lib/prisma'

async function getDemoUserId() {
  const user = await prisma.user.findUnique({
    where: { email: 'demo@devstash.io' },
    select: { id: true },
  })
  return user?.id ?? null
}

export default async function DashboardPage() {
  const userId = await getDemoUserId()

  const [collections, pinnedItems, recentItems, stats] = await Promise.all([
    userId ? getRecentCollections(userId) : [],
    userId ? getPinnedItems(userId) : [],
    userId ? getRecentItems(userId) : [],
    userId
      ? getDashboardStats(userId)
      : { totalItems: 0, totalCollections: 0, favoriteItems: 0, favoriteCollections: 0 },
  ])

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Your developer knowledge hub</p>
      </div>

      <StatsCards stats={stats} />

      <RecentCollections collections={collections} />

      {pinnedItems.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Pin className="size-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Pinned</h2>
          </div>
          <div className="flex flex-col gap-2">
            {pinnedItems.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-sm font-semibold mb-3">Recent Items</h2>
        <div className="flex flex-col gap-2">
          {recentItems.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
