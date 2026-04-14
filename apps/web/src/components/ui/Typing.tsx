"use client"

import { useEffect, useState } from "react"

export function TypingCarousel({ texts }: { texts: string[] }) {
  const [currText, setCurrText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (texts.length === 0) return

    const currentString = texts[textIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && charIndex <= currentString.length) {
      // typing forward
      timeout = setTimeout(() => {
        setCurrText(currentString.slice(0, charIndex))
        setCharIndex(prev => prev + 1)
      }, 70)
    } else if (isDeleting && charIndex >= 0) {
      // deleting backwards
      timeout = setTimeout(() => {
        setCurrText(currentString.slice(0, charIndex))
        setCharIndex(prev => prev - 1)
      }, 30)
    } else if (!isDeleting && charIndex > currentString.length) {
      // pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && charIndex < 0) {
      // move to next string
      setIsDeleting(false)
      setCharIndex(0)
      setTextIndex(prev => (prev + 1) % texts.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts])

  return <div>{currText}</div>
}
