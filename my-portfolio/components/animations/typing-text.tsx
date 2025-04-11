"use client"

import { TypeAnimation } from "react-type-animation"

interface TypingTextProps {
  sequences: (string | number)[]
  className?: string
  speed?: number
  repeat?: number
}

export default function TypingText({
  sequences,
  className = "",
  speed = 50,
  repeat = Number.POSITIVE_INFINITY,
}: TypingTextProps) {
  return (
    <TypeAnimation
      sequence={sequences}
      wrapper="span"
      speed={speed as any}
      repeat={repeat}
      className={className}
      cursor={true}
    />
  )
}
