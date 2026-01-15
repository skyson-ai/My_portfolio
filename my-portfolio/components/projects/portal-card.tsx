"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Play, ArrowRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github?: string;
  demo?: string;
  featured: boolean;
  technologies: string[];
  duration: string;
  status: "completed" | "in-progress" | "prototype";
}

interface PortalCardProps {
  project: Project;
  index: number;
}

export default function PortalCard({ project, index }: PortalCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleCardClick = () => {
    setShowPreview(true);
  };

  return (
    <>
      <motion.div
        className="relative group cursor-pointer"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ y: -10 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        {/* Portal Effect Container */}
        <div className="relative w-full h-80 rounded-2xl overflow-hidden">
          {/* Portal Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-indigo-900"
            animate={{
              background: isHovered 
                ? "linear-gradient(135deg, #8b5cf6 0%, #000000 50%, #3b82f6 100%)"
                : "linear-gradient(135deg, #581c87 0%, #000000 50%, #1e3a8a 100%)"
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Portal Swirl Effect */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 2, ease: "linear", repeat: isHovered ? Infinity : 0 }}
          >
            <div className="absolute inset-4 border-2 border-purple-500 rounded-full" />
            <div className="absolute inset-8 border-2 border-indigo-500 rounded-full" />
            <div className="absolute inset-12 border-2 border-pink-500 rounded-full" />
          </motion.div>
          
          {/* Project Image */}
          <motion.div
            className="absolute inset-0 z-10"
            animate={{
              scale: isHovered ? 1.1 : 1,
              opacity: isHovered ? 0.8 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </motion.div>
          
          {/* Hologram Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 z-20 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Hologram Scan Lines */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                      initial={{ y: -100 }}
                      animate={{ y: 400 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "linear",
                      }}
                      style={{ opacity: 0.3 }}
                    />
                  ))}
                </div>
                
                {/* Glitch Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 mix-blend-screen"
                  animate={{
                    x: [0, 10, -10, 0],
                    opacity: [0, 0.5, 0.5, 0],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: 2,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Content */}
          <div className="absolute inset-0 z-30 p-6 flex flex-col justify-between">
            {/* Header */}
            <div>
              <motion.div
                className="flex items-center justify-between mb-2"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <motion.div
                  className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center"
                  animate={{ rotate: isHovered ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                </motion.div>
              </motion.div>
              
              {/* Status Badge */}
              <motion.div
                className="inline-block px-2 py-1 rounded-full text-xs font-medium mb-3"
                className={`
                  inline-block px-2 py-1 rounded-full text-xs font-medium mb-3
                  ${project.status === 'completed' ? 'bg-green-500/20 text-green-400' : ''}
                  ${project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                  ${project.status === 'prototype' ? 'bg-blue-500/20 text-blue-400' : ''}
                `}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.status === 'completed' ? '✨ Completed' : ''}
                {project.status === 'in-progress' ? '🚧 In Progress' : ''}
                {project.status === 'prototype' ? '🔬 Prototype' : ''}
              </motion.div>
            </div>
            
            {/* Description */}
            <motion.p
              className="text-gray-300 text-sm mb-4 line-clamp-2"
              animate={{ opacity: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {project.description}
            </motion.p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 3).map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + tagIndex * 0.05 }}
                >
                  {tag}
                </motion.span>
              ))}
              {project.tags.length > 3 && (
                <motion.span
                  className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-400 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  +{project.tags.length - 3}
                </motion.span>
              )}
            </div>
            
            {/* Action Buttons */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="flex gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.demo && (
                    <motion.button
                      className="flex-1 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-400 text-sm font-medium backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.demo, '_blank');
                      }}
                    >
                      <Play className="w-3 h-3" />
                      Demo
                    </motion.button>
                  )}
                  {project.github && (
                    <motion.button
                      className="flex-1 px-3 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-lg text-indigo-400 text-sm font-medium backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github, '_blank');
                      }}
                    >
                      <Github className="w-3 h-3" />
                      Code
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Portal Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, transparent 30%, rgba(139, 92, 246, 0.4) 70%, transparent 100%)",
              filter: "blur(20px)",
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
      
      {/* Project Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <ProjectPreviewModal
            project={project}
            onClose={() => setShowPreview(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface ProjectPreviewModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectPreviewModal({ project, onClose }: ProjectPreviewModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-black/90 backdrop-blur-2xl rounded-3xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-64 md:h-80">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover rounded-t-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            ×
          </button>
          
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.status === 'completed' ? 'bg-green-500/20 text-green-400' : ''
              }${project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' : ''
              }${project.status === 'prototype' ? 'bg-blue-500/20 text-blue-400' : ''
              }`}>
                {project.status === 'completed' ? '✨ Completed' : ''}
                {project.status === 'in-progress' ? '🚧 In Progress' : ''}
                {project.status === 'prototype' ? '🔬 Prototype' : ''}
              </span>
              <span className="text-gray-300 text-sm">{project.duration}</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">About</h3>
                <p className="text-gray-300 leading-relaxed">{project.description}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={tech}
                      className="px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-400 text-sm backdrop-blur-sm transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                <div className="space-y-2">
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-400 backdrop-blur-sm transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-4 h-4" />
                      <span>Live Demo</span>
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </motion.a>
                  )}
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-lg text-indigo-400 backdrop-blur-sm transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </motion.a>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}