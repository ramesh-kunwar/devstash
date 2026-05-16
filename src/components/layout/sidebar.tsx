'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link as LinkIcon,
  PanelLeftClose,
  PanelLeftOpen,
  Star,
  FolderOpen,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { mockCollections, mockItemTypes, mockTypeCounts, mockUser } from '@/lib/mock-data'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const TYPE_ICONS = {
  snippet: Code,
  prompt: Sparkles,
  command: Terminal,
  note: StickyNote,
  file: File,
  image: Image,
  link: LinkIcon,
} as const

const favoriteCollections = mockCollections.filter((c) => c.isFavorite)
const recentCollections = mockCollections.slice(0, 3)

function UserArea() {
  const initials = mockUser.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <div className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-muted/50 cursor-pointer">
      <div className="size-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold shrink-0">
        {initials}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium truncate">{mockUser.name}</p>
        <p className="text-xs text-muted-foreground truncate">{mockUser.email}</p>
      </div>
    </div>
  )
}

function SidebarContent({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full py-3 gap-4">
      {/* Types */}
      <div>
        <p
          className={cn(
            'text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-1',
            collapsed && 'sr-only'
          )}
        >
          Types
        </p>
        <nav className="flex flex-col gap-0.5">
          {mockItemTypes.map((type) => {
            const Icon = TYPE_ICONS[type.name as keyof typeof TYPE_ICONS]
            const href = `/items/${type.name}s`
            const isActive = pathname === href
            const count = mockTypeCounts[type.name]

            return (
              <Link
                key={type.id}
                href={href}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-colors',
                  'hover:bg-muted/60',
                  isActive ? 'bg-muted text-foreground' : 'text-muted-foreground'
                )}
              >
                <Icon className="size-4 shrink-0" style={{ color: type.color }} />
                {!collapsed && (
                  <>
                    <span className="flex-1 capitalize">{type.name}s</span>
                    <span className="text-xs text-muted-foreground tabular-nums">{count}</span>
                  </>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Favorite Collections */}
      <div>
        <p
          className={cn(
            'text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-1 flex items-center gap-1',
            collapsed && 'sr-only'
          )}
        >
          <Star className="size-3" />
          Favorites
        </p>
        <nav className="flex flex-col gap-0.5">
          {favoriteCollections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.id}`}
              className={cn(
                'flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-colors',
                'hover:bg-muted/60 text-muted-foreground'
              )}
            >
              <FolderOpen className="size-4 shrink-0 text-muted-foreground" />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{col.name}</span>
                  <span className="text-xs text-muted-foreground tabular-nums">{col.itemCount}</span>
                </>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Recent Collections */}
      {!collapsed && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-1">
            Recent
          </p>
          <nav className="flex flex-col gap-0.5">
            {recentCollections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.id}`}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-colors hover:bg-muted/60 text-muted-foreground"
              >
                <FolderOpen className="size-4 shrink-0" />
                <span className="flex-1 truncate">{col.name}</span>
                <span className="text-xs tabular-nums">{col.itemCount}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* User area */}
      <div className="px-1 border-t border-border pt-3">
        {collapsed ? (
          <div className="flex justify-center">
            <div className="size-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
              {mockUser.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
          </div>
        ) : (
          <UserArea />
        )}
      </div>
    </div>
  )
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden md:flex flex-col shrink-0 border-r border-border overflow-hidden transition-all duration-200',
          collapsed ? 'w-14' : 'w-56'
        )}
      >
        <div className="flex items-center justify-end px-2 pt-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarContent collapsed={collapsed} />
        </div>
      </aside>

      {/* Mobile drawer */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="fixed bottom-4 left-4 z-50 size-10 rounded-full border border-border bg-background shadow-md"
                aria-label="Open sidebar"
              />
            }
          >
            <PanelLeftOpen className="size-4" />
          </SheetTrigger>
          <SheetContent side="left" className="w-56 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
