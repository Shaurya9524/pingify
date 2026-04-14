import { hexToRgb } from "@/lib/utils/color"
import { Integration } from "@/lib/types/integration"

type TagProps = {
  name: string
  color: string
  backgroundColor?: string
  count?: number
}

export function Tag({ name, color, backgroundColor, count }: TagProps) {
  const styles = {
    color,
    backgroundColor: hexToRgb(backgroundColor ? backgroundColor : color, 0.1),
    padding: "0.2rem 0.5rem",
    width: "fit-content",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: 4
  }

  return <div style={styles}>
    {count ? <div style={{ fontSize: "0.75rem" }}>
      {count}
    </div> : null}
    <div style={{ fontSize: "0.85rem", fontWeight: "500" }}>
      {name}
    </div>
  </div>
}

export function IntegrationTag({ preset, count }: { preset: Integration, count?: number }) {
  const colors: Record<Integration, { color: string, bgColor?: string }> = {
    YouTube: { color: "#ff0000", bgColor: "#ff0000" },
    Reddit: { color: "#ff4500", bgColor: "#ff5700" },
    Twitch: { color: "#a96fff", bgColor: "#893bff" },
    Kick: { color: "#53fc18", bgColor: "#3ddc00" },
    X: { color: "#000000", bgColor: "#0a0a0a" },
    Bluesky: { color: "#168eff", bgColor: "#0085ff" },
    Odysee: { color: "#ff6600", bgColor: "#dc5800" },
    Trovo: { color: "#1ed760", bgColor: "#13b84a" },
  }

  const { color, bgColor } = colors[preset]
  return <Tag name={preset} color={color} backgroundColor={bgColor} count={count} />
}
