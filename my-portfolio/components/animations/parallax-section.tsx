"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  baseVelocity?: number
  direction?: "up" | "down" | "left" | "right"
}

export default function ParallaxSection({
  children,
  className = "",
  baseVelocity = 0.2,
  direction = "up",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Determine transform property based on direction
  const transformProp = "translateY"
  let transformValue

  const upTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
  const downTransform = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const leftTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
  const rightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  switch (direction) {
    case "up":
      transformValue = upTransform
      break
    case "down":
      transformValue = downTransform
      break
    case "left":
      transformValue = leftTransform
      break
    case "right":
      transformValue = rightTransform
      break
    default:
      transformValue = upTransform
  }

  return (
    <motion.div ref={ref} className={`relative ${className}`} style={{ [transformProp]: transformValue }}>
      {children}
    </motion.div>
  )
}
