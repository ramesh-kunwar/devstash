import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link as LinkIcon,
  Star,
  Pin,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ItemWithType } from '@/lib/db/items'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link: LinkIcon,
}

export function ItemRow({ item }: { item: ItemWithType }) {
  const Icon = ICON_MAP[item.itemType.icon] ?? Code
  const color = item.itemType.color

  const date = new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="group flex items-start gap-3 px-4 py-3 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors cursor-pointer">
      <div
        className="size-8 rounded-md flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: `${color}20` }}
      >
        <span style={{ color }}>
          <Icon className="size-4" />
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate">{item.title}</span>
          {item.isPinned && <Pin className="size-3 text-muted-foreground shrink-0" />}
          {item.isFavorite && <Star className="size-3 fill-yellow-400 text-yellow-400 shrink-0" />}
        </div>
        {item.description && (
          <p className="text-xs text-muted-foreground truncate mt-0.5">{item.description}</p>
        )}
        {item.tags.length > 0 && (
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {item.tags.map((tag) => (
              <span
                key={tag.name}
                className={cn('text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground')}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <span className="text-xs text-muted-foreground shrink-0 mt-0.5">{date}</span>
    </div>
  )
}
