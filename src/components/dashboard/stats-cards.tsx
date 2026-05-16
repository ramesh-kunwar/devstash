import { Layers, FolderOpen, Star, BookMarked } from 'lucide-react'
import { mockCollections, mockItems, mockTypeCounts } from '@/lib/mock-data'

const totalItems = Object.values(mockTypeCounts).reduce((a, b) => a + b, 0)
const totalCollections = mockCollections.length
const favoriteItems = mockItems.filter((i) => i.isFavorite).length
const favoriteCollections = mockCollections.filter((c) => c.isFavorite).length

const stats = [
  { label: 'Total Items', value: totalItems, icon: Layers },
  { label: 'Collections', value: totalCollections, icon: FolderOpen },
  { label: 'Favorite Items', value: favoriteItems, icon: Star },
  { label: 'Favorite Collections', value: favoriteCollections, icon: BookMarked },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map(({ label, value, icon: Icon }) => (
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
