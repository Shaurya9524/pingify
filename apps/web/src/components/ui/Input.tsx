import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import styles from "@/styles/ui/input.module.css"

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${styles.input} ${className}`} {...props} />
}

export function TextArea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${styles.input} ${styles.textarea} ${className}`} {...props} />
}
