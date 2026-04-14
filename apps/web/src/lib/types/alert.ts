export type AlertType = "success" | "danger" | "warning" | "info"

export type Alert = {
  message: string,
  type?: AlertType,
  duration?: number
}
