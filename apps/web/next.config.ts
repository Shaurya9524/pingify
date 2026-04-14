import type { NextConfig } from "next"
import { botConfig } from "@/config/bot"

const { botInvite, supportServerInvite } = botConfig

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/invite",
        destination: botInvite,
        permanent: false
      },
      {
        source: "/support",
        destination: supportServerInvite,
        permanent: false
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com"
      },
    ],
  }
}

export default nextConfig
