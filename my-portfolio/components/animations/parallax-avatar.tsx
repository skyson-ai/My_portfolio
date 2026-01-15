"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

interface ParallaxAvatarProps {
  src?: string;
  alt?: string;
  className?: string;
}

export default function ParallaxAvatar({ 
  src = "/image.jpeg", 
  alt = "Profile", 
  className = "" 
}: ParallaxAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(x);
  const rotateY = useSpring(y);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -15;
    const rotateYValue = (mouseX / (rect.width / 2)) * 15;
    
    x.set(rotateXValue);
    y.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-80 md:h-96 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Main avatar */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </div>

        {/* Floating elements */}
        {isHovered && (
          <>
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full blur-xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 0.1 }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-indigo-500 rounded-full blur-xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ delay: 0.2 }}
            />
            <motion.div
              className="absolute top-1/2 -left-6 w-6 h-6 bg-pink-500 rounded-full blur-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ delay: 0.15 }}
            />
          </>
        )}

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 opacity-0 blur-xl"
          animate={{ opacity: isHovered ? 0.4 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-purple-500/30"
          animate={{ 
            borderColor: isHovered ? "rgba(139, 92, 246, 0.8)" : "rgba(139, 92, 246, 0.3)",
            boxShadow: isHovered ? "0 0 40px rgba(139, 92, 246, 0.4), inset 0 0 20px rgba(139, 92, 246, 0.1)" : "inset 0 0 10px rgba(139, 92, 246, 0.05)"
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Corner accents */}
        {isHovered && (
          <>
            <motion.div
              className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-purple-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            />
            <motion.div
              className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-purple-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            />
            <motion.div
              className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-purple-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            />
            <motion.div
              className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-purple-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}