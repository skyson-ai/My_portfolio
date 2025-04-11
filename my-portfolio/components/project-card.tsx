"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ThreeDCard from "@/components/animations/3d-card"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  link: string
}

export default function ProjectCard({ title, description, tags, image, link }: ProjectCardProps) {
  return (
    <ThreeDCard className="h-full">
      <Card className="overflow-hidden h-full transition-all bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-opacity-40">
        <div className="relative h-48 w-full overflow-hidden">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} className="h-full w-full">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </motion.div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <motion.div
                key={tag}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Badge variant="secondary" className="bg-opacity-80 backdrop-blur-sm">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Link
            href={link}
            className="text-sm font-medium text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="inline-block">
              View Project →
            </motion.span>
          </Link>
        </CardFooter>
      </Card>
    </ThreeDCard>
  )
}
