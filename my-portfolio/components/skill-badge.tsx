"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

interface SkillBadgeProps {
  name: string
  level: number
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="inline-flex flex-col gap-1 min-w-[120px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Badge
        variant="outline"
        className={`justify-center transition-all duration-300 ${
          isHovered ? "bg-primary text-primary-foreground" : ""
        }`}
      >
        {name}
      </Badge>
      <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.8, delay: 0.2 }}>
        <Progress
          value={isHovered ? 100 : level}
          className={`h-1.5 w-full transition-all duration-700 ${isHovered ? "bg-primary/20" : ""}`}
        />
      </motion.div>
    </motion.div>
  )
}
