import { Integration } from "@/lib/types/integration"

export const palette = {
  primary: "#222831",
  secondary: "#393e46",
  accent: "#00adb5",
  highlight: "#eeeeee"
}

export const colors = {
  blurple: "#5662f6",
  nightBlue: "#2163a0",
  dayYellow: "#ffd60a"
}

export const socialColors: Record<Integration, { color: string, bgColor: string }> = {
  YouTube: { color: "#ff0000", bgColor: "#ff0000" },
  Reddit: { color: "#ff4500", bgColor: "#ff5700" },
  Twitch: { color: "#a96fff", bgColor: "#893bff" },
  Kick: { color: "#53fc18", bgColor: "#3ddc00" },
  X: { color: "#000000", bgColor: "#0a0a0a" },
  Bluesky: { color: "#168eff", bgColor: "#0085ff" },
  Odysee: { color: "#ff6600", bgColor: "#dc5800" },
  Trovo: { color: "#1ed760", bgColor: "#13b84a" }
}

export const bannerColors = {
  pink: "#ff2f92",
  red: "#ff3b30",
  orange: "#ff8a2a",
  yellow: "#ffd43b",
  purple: "#8e44ad",
  blue: "#2bb3f3",
  teal: "#5fd3c6",
  green: "#5e9f1a"
}
