"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation, type Variants } from "framer-motion"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  duration?: number
  once?: boolean
  className?: string
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  distance = 50,
  duration = 0.5,
  once = true,
  className = "",
}: FadeInProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Set up variants based on direction
  const getDirectionOffset = (): { x: number; y: number } => {
    switch (direction) {
      case "up":
        return { x: 0, y: distance }
      case "down":
        return { x: 0, y: -distance }
      case "left":
        return { x: distance, y: 0 }
      case "right":
        return { x: -distance, y: 0 }
      case "none":
        return { x: 0, y: 0 }
      default:
        return { x: 0, y: distance }
    }
  }

  const offset = getDirectionOffset()

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // easeOut equivalent
      },
    },
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          controls.start("visible")
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          setIsVisible(false)
          controls.start("hidden")
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [controls, once])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.div>
  )
}
