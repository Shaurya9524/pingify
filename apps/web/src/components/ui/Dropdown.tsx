"use client"

import { DropdownCaretIcon } from "./Icons"
import { HTMLAttributes, useEffect, useRef, useState } from "react"
import styles from "@/styles/ui/dropdown.module.css"

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  items: string[],
  selectedItem: string,
  setSelectedItem: (item: string) => void,
  disabled?: boolean
}

export function Dropdown({ items, selectedItem, setSelectedItem, disabled, className, ...props }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const toggleMenu = () => setOpen(!open)
  const closeMenu = () => setOpen(false)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeMenu()
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  function renderItems() {
    return items.map((item, i) => {
      function handleSelection() {
        setSelectedItem(item)
        closeMenu()
      }

      return (
        <div
          key={i}
          className={styles.dropdownItem}
          onClick={handleSelection}
        >
          {item}
        </div>
      )
    })
  }

  return (
    <div
      className={`${styles.dropdown} ${disabled ? styles.disabled : ""} ${className}`}
      aria-expanded={open}
      ref={dropdownRef}
      {...props}
    >
      <div className={styles.dropdownSelectedItem} onClick={toggleMenu}>
        <span>{selectedItem}</span>
        <DropdownCaretIcon />
      </div>
      <div className={styles.dropdownList}>
        {renderItems()}
      </div>
    </div>
  )
}
