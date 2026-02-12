"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Code, Database, Brain, Star, Zap, Shield } from "lucide-react";

interface Skill3D {
  name: string;
  level: number;
  category: string;
  icon: React.ReactNode;
  color: string;
  xp: number;
  maxXP: number;
  unlocked: boolean;
}

interface SphericalSkillsProps {
  skills: Skill3D[];
}

export default function SphericalSkills({ skills }: SphericalSkillsProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill3D | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x,
        y: prev.y + 1
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    setIsAutoRotating(false);
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateYValue = (mouseX / (rect.width / 2)) * 180;
    const rotateXValue = -(mouseY / (rect.height / 2)) * 180;
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    setIsAutoRotating(true);
  };

  const calculatePosition = (index: number, total: number) => {
    const radius = 240;
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    
    const x = Math.cos(theta) * Math.sin(phi) * radius;
    const y = Math.sin(theta) * Math.sin(phi) * radius;
    const z = Math.cos(phi) * radius;
    
    return { x, y, z };
  };

  const getXPLevel = (xp: number, maxXP: number) => {
    const percentage = (xp / maxXP) * 100;
    if (percentage >= 100) return { level: "Master", color: "from-yellow-400 to-orange-500" };
    if (percentage >= 75) return { level: "Expert", color: "from-purple-400 to-pink-500" };
    if (percentage >= 50) return { level: "Advanced", color: "from-blue-400 to-indigo-500" };
    if (percentage >= 25) return { level: "Intermediate", color: "from-green-400 to-teal-500" };
    return { level: "Beginner", color: "from-gray-400 to-slate-500" };
  };

  return (
    <div className="relative min-h-[900px] bg-black flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-black to-slate-900/20" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute -top-40 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/10 via-slate-500/10 to-blue-500/10 blur-3xl" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Skills & Expertise
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            A focused, production-ready stack across backend, frontend, data, and cloud.
          </p>
          <div className="mt-6 h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </div>

        {/* 3D Sphere Container */}
        <div 
          ref={containerRef}
          className="relative w-full h-[700px] md:h-[760px] flex items-center justify-center cursor-move"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="relative w-full h-full preserve-3d"
            style={{
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformStyle: "preserve-3d",
              transform: "perspective(1000px)",
            }}
          >
          {/* Skills positioned on sphere */}
          {skills.map((skill, index) => {
            const position = calculatePosition(index, skills.length);
            const xpInfo = getXPLevel(skill.xp, skill.maxXP);
            
            return (
              <motion.div
                key={skill.name}
                className="absolute w-24 h-24 cursor-pointer"
                style={{
                  transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`,
                  left: "50%",
                  top: "50%",
                  marginLeft: "-48px",
                  marginTop: "-48px",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.15 }}
                onClick={() => setSelectedSkill(skill)}
              >
                <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${skill.color} p-0.5`}>
                  <div className="w-full h-full rounded-full bg-black/85 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-2xl mb-1">{skill.icon}</div>
                      <div className="text-[11px] font-semibold truncate">{skill.name}</div>
                      <div className="text-[11px] opacity-75">{skill.level}%</div>
                    </div>
                  </div>
                  
                  {/* XP Progress Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="46"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="2"
                      fill="none"
                    />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="46"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 46}`}
                      strokeDashoffset={`${2 * Math.PI * 46 * (1 - skill.xp / skill.maxXP)}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 46 * (1 - skill.xp / skill.maxXP) }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                {/* Level Badge */}
                <motion.div
                  className={`absolute -top-2 -right-2 px-2 py-1 rounded-full bg-gradient-to-r ${xpInfo.color} text-white text-[10px] font-bold tracking-wide`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {xpInfo.level}
                </motion.div>
              </motion.div>
            );
          })}
          </motion.div>
        </div>
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              className="bg-black/90 backdrop-blur-xl rounded-3xl border border-white/15 p-8 max-w-lg w-full mx-4"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${selectedSkill.color} p-0.5`}>
                    <div className="w-full h-full rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center text-white text-2xl">
                      {selectedSkill.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedSkill.name}</h3>
                    <p className="text-slate-400">{selectedSkill.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
              
              {/* XP Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Experience</span>
                  <span>{selectedSkill.xp} / {selectedSkill.maxXP} XP</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <motion.div
                    className={`h-3 rounded-full bg-gradient-to-r ${getXPLevel(selectedSkill.xp, selectedSkill.maxXP).color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(selectedSkill.xp / selectedSkill.maxXP) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
              
              {/* Skill Level */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Proficiency</span>
                  <span className="text-white font-bold">{selectedSkill.level}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
              
              {/* Achievements */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-400">Achievements</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.level >= 90 && (
                    <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">
                      <Star className="w-3 h-3" />
                      <span>Master</span>
                    </div>
                  )}
                  {selectedSkill.level >= 75 && (
                    <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs">
                      <Zap className="w-3 h-3" />
                      <span>Expert</span>
                    </div>
                  )}
                  {selectedSkill.level >= 50 && (
                    <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                      <Shield className="w-3 h-3" />
                      <span>Advanced</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-400 text-sm">
          Drag to rotate • Click skills for details
        </p>
      </div>
    </div>
  );
}
