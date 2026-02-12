"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Code, Database, Brain, Star, Zap, Shield, Cpu, Globe, Palette, Server, Cloud } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: React.ReactNode;
  color: string;
  experience: string;
  projects: number;
  description: string;
}

interface SkillsRevolutionProps {
  skills: Skill[];
}

interface CategoryStats {
  category: string;
  count: number;
  avgLevel: number;
  color: string;
}

export default function SkillsRevolution({ skills }: SkillsRevolutionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(skills.map(skill => skill.category)))];
  
  // Calculate category stats
  const categoryStats: CategoryStats[] = categories.slice(1).map(category => {
    const categorySkills = skills.filter(skill => skill.category === category);
    const avgLevel = Math.round(categorySkills.reduce((acc, skill) => acc + skill.level, 0) / categorySkills.length);
    return {
      category,
      count: categorySkills.length,
      avgLevel,
      color: categorySkills[0]?.color || "from-gray-400 to-slate-500"
    };
  });

  // Filter skills based on selected category
  const filteredSkills = selectedCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  // Get skill expertise level
  const getExpertiseLevel = (level: number) => {
    if (level >= 90) return { level: "Elite", color: "from-yellow-400 to-orange-500", bg: "bg-yellow-500/10" };
    if (level >= 80) return { level: "Expert", color: "from-purple-400 to-pink-500", bg: "bg-purple-500/10" };
    if (level >= 70) return { level: "Advanced", color: "from-blue-400 to-indigo-500", bg: "bg-blue-500/10" };
    if (level >= 60) return { level: "Proficient", color: "from-green-400 to-teal-500", bg: "bg-green-500/10" };
    return { level: "Developing", color: "from-gray-400 to-slate-500", bg: "bg-gray-500/10" };
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-purple-900/20" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute -top-40 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-40 left-0 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [50, 0, 50],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container px-4 md:px-6 mx-auto relative z-10 py-20">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
            style={{ y: parallaxY }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
              Technical Arsenal
            </span>
          </motion.h2>
          <motion.p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            A carefully curated tech stack honed through years of production experience
          </motion.p>
          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mx-auto rounded-full"
            animate={{ width: ["32px", "128px", "32px"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
            }`}
          >
            All Skills ({skills.length})
          </button>
          {categoryStats.map((stat, index) => (
            <motion.button
              key={stat.category}
              onClick={() => setSelectedCategory(stat.category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === stat.category
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {stat.category} ({stat.count})
            </motion.button>
          ))}
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Total Skills", value: skills.length, color: "from-blue-400 to-cyan-500" },
            { label: "Categories", value: categories.length - 1, color: "from-purple-400 to-pink-500" },
            { label: "Expert Level", value: skills.filter(s => s.level >= 80).length, color: "from-yellow-400 to-orange-500" },
            { label: "Avg Proficiency", value: `${Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length)}%`, color: "from-green-400 to-teal-500" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(168, 85, 247, 0.3)" }}
            >
              <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const expertise = getExpertiseLevel(skill.level);
              
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ 
                    opacity: { duration: 0.2 }, 
                    layout: { duration: 0.3 },
                    delay: index * 0.05 
                  }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)"
                  }}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  onClick={() => setSelectedSkill(skill)}
                  className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10 cursor-pointer group hover:border-purple-500/30 transition-all duration-300"
                >
                  {/* Skill Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.color} p-0.5`}>
                        <div className="w-full h-full rounded-xl bg-black/80 backdrop-blur-sm flex items-center justify-center text-white text-xl">
                          {skill.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                          {skill.name}
                        </h3>
                        <p className="text-sm text-gray-400">{skill.category}</p>
                      </div>
                    </div>
                    <motion.div
                      className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${expertise.color}`}
                      animate={{ scale: hoveredSkill === skill.name ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {expertise.level}
                    </motion.div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Proficiency</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Skill Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Cpu className="w-4 h-4 mr-1" />
                        {skill.experience}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {skill.projects} projects
                      </span>
                    </div>
                  </div>

                  {/* Hover Preview */}
                  <AnimatePresence>
                    {hoveredSkill === skill.name && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-4 border border-purple-500/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-sm text-gray-200 line-clamp-3">
                          {skill.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Category Performance Chart */}
        <motion.div
          className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Category Performance</h3>
          <div className="space-y-4">
            {categoryStats.map((stat, index) => (
              <motion.div
                key={stat.category}
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-24">
                  <span className="text-white font-medium">{stat.category}</span>
                </div>
                <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.avgLevel}%` }}
                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                  />
                </div>
                <div className="w-16 text-right">
                  <span className="text-gray-300 font-medium">{stat.avgLevel}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-black/90 to-purple-900/20 rounded-3xl border border-white/20 p-8 max-w-2xl w-full"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${selectedSkill.color} p-0.5`}>
                    <div className="w-full h-full rounded-2xl bg-black/80 backdrop-blur-sm flex items-center justify-center text-white text-3xl">
                      {selectedSkill.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">{selectedSkill.name}</h3>
                    <p className="text-gray-400">{selectedSkill.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Proficiency Level</span>
                      <span>{selectedSkill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <motion.div
                        className={`h-3 rounded-full bg-gradient-to-r ${selectedSkill.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSkill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Experience</span>
                    <span className="text-white font-medium">{selectedSkill.experience}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Projects Completed</span>
                    <span className="text-white font-medium">{selectedSkill.projects}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl ${getExpertiseLevel(selectedSkill.level).bg} border border-white/10`}>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Expertise Level</span>
                      <span className={`font-bold bg-gradient-to-r ${getExpertiseLevel(selectedSkill.level).color} bg-clip-text text-transparent`}>
                        {getExpertiseLevel(selectedSkill.level).level}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Performance", "Scalability", "Best Practices", "Innovation"].map((strength) => (
                        <span key={strength} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-3">Description</h4>
                <p className="text-gray-300 leading-relaxed">{selectedSkill.description}</p>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}