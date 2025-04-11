"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

interface ThreeDCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  perspective?: number
  glareOpacity?: number
  shadow?: boolean
}

export default function ThreeDCard({
  children,
  className = "",
  intensity = 15,
  perspective = 1000,
  glareOpacity = 0.2,
  shadow = true,
}: ThreeDCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = (e.clientX - rect.left) / width - 0.5
    const mouseY = (e.clientY - rect.top) / height - 0.5

    setMouseX(mouseX)
    setMouseY(mouseY)
    setRotateY(mouseX * intensity)
    setRotateX(-mouseY * intensity)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        boxShadow: shadow ? (isHovering ? "0 20px 40px rgba(0, 0, 0, 0.2)" : "0 10px 20px rgba(0, 0, 0, 0.1)") : "none",
      }}
      transition={{
        rotateX: { type: "spring", stiffness: 300, damping: 20 },
        rotateY: { type: "spring", stiffness: 300, damping: 20 },
        boxShadow: { duration: 0.2 },
      }}
    >
      {children}
      {isHovering && (
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mouseX * 100 + 50}% ${
              mouseY * 100 + 50
            }%, rgba(255, 255, 255, ${glareOpacity}) 0%, rgba(255, 255, 255, 0) 70%)`,
            borderRadius: "inherit",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  )
}
