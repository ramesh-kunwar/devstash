import { Search, Plus, FolderPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function TopBar() {
  return (
    <header className="h-14 shrink-0 border-b border-border flex items-center gap-4 px-4">
      <span className="text-base font-semibold tracking-tight mr-2">DevStash</span>

      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search items..."
          className="pl-8 h-8 text-sm bg-muted border-0 focus-visible:ring-1"
        />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground hidden sm:inline">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-sm">
          <FolderPlus className="size-4" />
          New Collection
        </Button>
        <Button size="sm" className="h-8 gap-1.5 text-sm">
          <Plus className="size-4" />
          New Item
        </Button>
      </div>
    </header>
  )
}
