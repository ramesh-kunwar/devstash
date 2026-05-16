import { TopBar } from '@/components/layout/top-bar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 shrink-0 border-r border-border overflow-y-auto p-4">
          <h2 className="text-muted-foreground text-sm font-semibold">Sidebar</h2>
        </aside>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
