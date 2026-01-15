"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useMotionValue, useSpring } from "framer-motion";

interface GlitchTextProps {
  texts: string[];
  className?: string;
  duration?: number;
}

export default function GlitchText({ texts, className = "", duration = 3000 }: GlitchTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsGlitching(false);
      }, 200);
    }, duration);

    return () => clearInterval(interval);
  }, [texts.length, duration]);

  const glitchVariants = {
    normal: {
      textShadow: "0 0 10px rgba(139, 92, 246, 0.5)",
      x: 0,
      y: 0,
    },
    glitch: {
      textShadow: [
        "0 0 10px rgba(139, 92, 246, 0.5), 2px 2px 0px rgba(239, 68, 68, 0.5), -2px -2px 0px rgba(59, 130, 246, 0.5)",
        "0 0 10px rgba(139, 92, 246, 0.5), -2px 2px 0px rgba(239, 68, 68, 0.5), 2px -2px 0px rgba(59, 130, 246, 0.5)",
        "0 0 10px rgba(139, 92, 246, 0.5), 2px -2px 0px rgba(239, 68, 68, 0.5), -2px 2px 0px rgba(59, 130, 246, 0.5)",
      ],
      x: [0, 2, -2, 0],
      y: [0, -2, 2, 0],
      transition: {
        duration: 0.2,
        repeat: 3,
      },
    },
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.h1
        variants={glitchVariants}
        animate={isGlitching ? "glitch" : "normal"}
        className="relative z-10"
      >
        {texts[currentIndex]}
      </motion.h1>
      
      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-red-500 opacity-70 mix-blend-screen"
            style={{ clipPath: "inset(0 0 50% 0)" }}
            animate={{ x: [0, 2, -2, 0] }}
            transition={{ duration: 0.2, repeat: 3 }}
          >
            {texts[currentIndex]}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 text-blue-500 opacity-70 mix-blend-screen"
            style={{ clipPath: "inset(50% 0 0 0)" }}
            animate={{ x: [0, -2, 2, 0] }}
            transition={{ duration: 0.2, repeat: 3 }}
          >
            {texts[currentIndex]}
          </motion.span>
        </>
      )}
    </div>
  );
}