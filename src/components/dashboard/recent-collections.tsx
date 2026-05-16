import Link from 'next/link'
import {
  Star,
  MoreHorizontal,
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link as LinkIcon,
} from 'lucide-react'
import type { CollectionWithMeta } from '@/lib/db/collections'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; color?: string }>> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link: LinkIcon,
}

export function RecentCollections({ collections }: { collections: CollectionWithMeta[] }) {
  if (collections.length === 0) {
    return (
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Collections</h2>
        </div>
        <p className="text-sm text-muted-foreground">No collections yet.</p>
      </section>
    )
  }

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
        {collections.map((col) => (
          <Link
            key={col.id}
            href={`/collections/${col.id}`}
            className="group rounded-lg border border-border bg-card p-4 flex flex-col gap-2 hover:border-border/80 hover:bg-card/80 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="size-2 rounded-full shrink-0 mt-0.5"
                  style={{ backgroundColor: col.accentColor }}
                />
                <span className="text-sm font-medium truncate">{col.name}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {col.isFavorite && <Star className="size-3.5 fill-yellow-400 text-yellow-400" />}
                <MoreHorizontal className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">{col.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {col.typeIcons.slice(0, 4).map((t) => {
                  const Icon = ICON_MAP[t.icon]
                  return Icon ? (
                    <span key={t.name} style={{ color: t.color }}>
                      <Icon className="size-3" />
                    </span>
                  ) : null
                })}
              </div>
              <span className="text-xs text-muted-foreground">{col.itemCount} items</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
