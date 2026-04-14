type LogType = "success" | "info" | "warn" | "error"

export function log(data: { type?: LogType, label?: string }, ...args: unknown[]) {
  const { type = "info", label } = data

  const colors: Record<LogType, string> = {
    success: "\x1b[32m", // green
    info: "\x1b[36m",    // cyan
    warn: "\x1b[33m",    // yellow
    error: "\x1b[31m",   // red
  }

  const color = colors[type]
  const tagLabel = label || type.charAt(0).toUpperCase() + type.slice(1)
  const tag = `${color}[${tagLabel}]\x1b[0m`

  console.log(tag, ...args)
}
