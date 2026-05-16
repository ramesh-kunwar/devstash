import { TopBar } from '@/components/layout/top-bar'
import { Sidebar } from '@/components/layout/sidebar'
import { prisma } from '@/lib/prisma'
import { getItemTypesWithCounts, getSidebarCollections } from '@/lib/db/items'

async function getDemoUser() {
  return prisma.user.findUnique({
    where: { email: 'demo@devstash.io' },
    select: { id: true, name: true, email: true },
  })
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getDemoUser()

  const [itemTypes, collections] = user
    ? await Promise.all([getItemTypesWithCounts(user.id), getSidebarCollections(user.id)])
    : [[], []]

  const sidebarUser = {
    name: user?.name ?? 'Demo User',
    email: user?.email ?? '',
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar itemTypes={itemTypes} collections={collections} user={sidebarUser} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
