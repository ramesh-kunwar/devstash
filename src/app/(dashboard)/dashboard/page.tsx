import { Pin } from 'lucide-react'
import { mockItems } from '@/lib/mock-data'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { RecentCollections } from '@/components/dashboard/recent-collections'
import { ItemRow } from '@/components/dashboard/item-row'

const pinnedItems = mockItems.filter((i) => i.isPinned)
const recentItems = mockItems.slice(0, 10)

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Your developer knowledge hub</p>
      </div>

      <StatsCards />

      <RecentCollections />

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
