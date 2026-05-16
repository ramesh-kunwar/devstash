import Link from 'next/link'
import { Star, MoreHorizontal } from 'lucide-react'
import { mockCollections, mockItemTypes } from '@/lib/mock-data'

const recentCollections = mockCollections.slice(0, 6)

const typeColorMap = Object.fromEntries(mockItemTypes.map((t) => [t.id, t.color]))

export function RecentCollections() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold">Collections</h2>
        <Link
          href="/collections"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {recentCollections.map((col) => {
          const accentColor = typeColorMap[col.defaultTypeId] ?? '#6b7280'
          return (
            <Link
              key={col.id}
              href={`/collections/${col.id}`}
              className="group rounded-lg border border-border bg-card p-4 flex flex-col gap-2 hover:border-border/80 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="size-2 rounded-full shrink-0 mt-0.5"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span className="text-sm font-medium truncate">{col.name}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {col.isFavorite && <Star className="size-3.5 fill-yellow-400 text-yellow-400" />}
                  <MoreHorizontal className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">{col.description}</p>
              <span className="text-xs text-muted-foreground">{col.itemCount} items</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
