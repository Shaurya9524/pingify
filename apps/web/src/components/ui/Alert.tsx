"use client"

import { useEffect, useState } from "react"
import { useAlertContext } from "@/contexts/Alert"
import { CloseIcon, DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from "./Icons"
import styles from "@/styles/ui/alert.module.css"

const alertIcons = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon
}

export function Alert() {
  const { alert, setAlert } = useAlertContext()
  const [visible, setVisible] = useState(false)
  const [displayedAlert, setDisplayedAlert] = useState(alert)

  const type = displayedAlert?.type ?? "info"
  const Icon = alertIcons[type]
  const backgroundColor = `var(--color-alert-bg-${type})`
  const color = `var(--color-alert-text-${type})`
  const borderColor = `var(--color-alert-border-${type})`

  // handle new alerts
  useEffect(() => {
    if (!alert?.message) {
      setVisible(false)
      return
    }

    // alert already visible: fade out first
    if (visible) {
      setVisible(false)

      const timeout = setTimeout(() => {
        setDisplayedAlert(alert)
        // wait a tick before showing for transition to apply
        requestAnimationFrame(() => setVisible(true))
      }, 200)

      return () => clearTimeout(timeout)
    }

    // first alert or previously hidden: delay show to trigger animation
    setDisplayedAlert(alert)
    const timeout = setTimeout(() => setVisible(true), 10)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert])

  // auto-dismiss
  useEffect(() => {
    if (!visible || !displayedAlert?.message) return

    const timeout = setTimeout(() => {
      setVisible(false)
      setTimeout(() => setAlert({ message: "" }), 200)
    }, displayedAlert.duration ?? 5000)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, displayedAlert])

  if (!displayedAlert?.message) return null

  return (
    <div
      className={`${styles.alert} ${visible ? styles.visible : styles.hidden}`}
      style={{ backgroundColor, border: `1px solid ${borderColor}` }}
    >
      <Icon style={{ color, width: 25, height: 25 }} />
      <div style={{ color }}>{displayedAlert.message}</div>
      <CloseIcon
        className={styles.closeBtn}
        style={{ color, width: 20, height: 20 }}
        onClick={() => setVisible(false)}
      />
    </div>
  )
}
