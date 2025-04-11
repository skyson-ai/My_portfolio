"use client"

import React from "react"

import { useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

interface StaggeredChildrenProps {
  children: React.ReactNode
  delay?: number
  staggerDelay?: number
  className?: string
}

export default function StaggeredChildren({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className = "",
}: StaggeredChildrenProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible")
          observer.unobserve(entry.target)
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
  }, [controls])

  // Clone children and wrap each in a motion.div with the child variants
  const staggeredChildren = React.Children.map(children, (child) => {
    return <motion.div variants={childVariants}>{child}</motion.div>
  })

  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={controls} variants={containerVariants}>
      {staggeredChildren}
    </motion.div>
  )
}
