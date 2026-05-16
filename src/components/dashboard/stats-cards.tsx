import { Layers, FolderOpen, Star, BookMarked } from 'lucide-react'
import type { DashboardStats } from '@/lib/db/items'

export function StatsCards({ stats }: { stats: DashboardStats }) {
  const cards = [
    { label: 'Total Items', value: stats.totalItems, icon: Layers },
    { label: 'Collections', value: stats.totalCollections, icon: FolderOpen },
    { label: 'Favorite Items', value: stats.favoriteItems, icon: Star },
    { label: 'Favorite Collections', value: stats.favoriteCollections, icon: BookMarked },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-lg border border-border bg-card p-4 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{label}</span>
            <Icon className="size-4 text-muted-foreground" />
          </div>
          <span className="text-2xl font-semibold tabular-nums">{value}</span>
        </div>
      ))}
    </div>
  )
}
