import { GuildProvider } from "@/contexts/Guild"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <GuildProvider>
      {children}
    </GuildProvider>
  )
}
