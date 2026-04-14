import Nav from "@/components/main/Nav"
import { Montserrat } from "next/font/google"
import { Alert } from "@/components/ui/Alert"
import { AlertProvider } from "@/contexts/Alert"
import { GuildsProvider } from "@/contexts/Guilds"
import { SubscriptionsProvider } from "@/contexts/Subscriptions"
import "@/styles/main/globals.css"

const montserrat = Montserrat({ subsets: ["latin"] })

export * from "@/config/metadata"

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AlertProvider>
          <GuildsProvider>
            <SubscriptionsProvider>
              <Nav />
              {children}
              <Alert />
            </SubscriptionsProvider>
          </GuildsProvider>
        </AlertProvider>
      </body>
    </html>
  )
}
