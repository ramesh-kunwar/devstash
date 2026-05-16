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
import { mockItemTypes } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const TYPE_ICONS = {
  snippet: Code,
  prompt: Sparkles,
  command: Terminal,
  note: StickyNote,
  file: File,
  image: Image,
  link: LinkIcon,
} as const

const typeMap = Object.fromEntries(mockItemTypes.map((t) => [t.id, t]))

type Item = {
  id: string
  title: string
  description: string | null
  itemTypeId: string
  isFavorite: boolean
  isPinned: boolean
  language: string | null
  tags: string[]
  createdAt: string
}

export function ItemRow({ item }: { item: Item }) {
  const type = typeMap[item.itemTypeId]
  const Icon = type ? TYPE_ICONS[type.name as keyof typeof TYPE_ICONS] : Code

  const date = new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="group flex items-start gap-3 px-4 py-3 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors cursor-pointer">
      <div
        className="size-8 rounded-md flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: type?.color ? `${type.color}20` : '#6b728020' }}
      >
        <Icon className="size-4" style={{ color: type?.color ?? '#6b7280' }} />
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
                key={tag}
                className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground'
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <span className="text-xs text-muted-foreground shrink-0 mt-0.5">{date}</span>
    </div>
  )
}
