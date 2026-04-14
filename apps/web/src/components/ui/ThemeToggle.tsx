"use client"

import { useTheme } from "@/lib/hooks/useTheme"
import { DarkModeIcon, LightModeIcon } from "./Icons"
import styles from "@/styles/ui/themeToggle.module.css"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isLightTheme = theme === "light"
  const className = styles[isLightTheme ? "darkModeIcon" : "lightModeIcon"]
  const ThemeIcon = isLightTheme ? DarkModeIcon : LightModeIcon

  return (
    <div className={styles.themeToggle} onClick={toggleTheme}>
      <ThemeIcon style={{ transition: "0.2s color ease-in-out", width: "1.5rem", height: "1.5rem" }} className={className} />
    </div>
  )
}
