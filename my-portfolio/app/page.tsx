"use client";

import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Code,
  Database,
  Brain,
  Star,
  Zap,
  Shield,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/contact-form";
import FadeIn from "@/components/animations/fade-in";
import StaggeredChildren from "@/components/animations/staggered-children";
import ParallaxSection from "@/components/animations/parallax-section";
import FloatingElement from "@/components/animations/floating-element";
import { motion } from "framer-motion";

// New innovative components
import GlitchText from "@/components/animations/glitch-text";
import NeuralBackground from "@/components/animations/neural-background";
import ParallaxAvatar from "@/components/animations/parallax-avatar";
import QuantumNav from "@/components/navigation/quantum-nav";
import SphericalSkills from "@/components/skills/spherical-skills";
import PortalCard from "@/components/projects/portal-card";
import { MagneticButton, BreathingText } from "@/components/animations/micro-interactions";

// Workaround for TS2786 error: Type assert lucide-react icons to bypass JSX type mismatch
// TODO: Update react, @types/react, lucide-react to latest versions for a permanent fix
const ArrowRightIcon = ArrowRight as any;
const GithubIcon = Github as any;
const LinkedinIcon = Linkedin as any;
const MailIcon = Mail as any;
const CodeIcon = Code as any;
const DatabaseIcon = Database as any;
const BrainIcon = Brain as any;
const StarIcon = Star as any;
const ZapIcon = Zap as any;
const ShieldIcon = Shield as any;
const RocketIcon = Rocket as any;

// Define sections for navigation
const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// Define skills for 3D sphere
const skillsData = [
  { name: "Python", level: 90, category: "Backend", icon: <CodeIcon />, color: "from-blue-400 to-cyan-500", xp: 850, maxXP: 1000, unlocked: true },
  { name: "Django", level: 85, category: "Backend", icon: <DatabaseIcon />, color: "from-green-400 to-emerald-500", xp: 750, maxXP: 1000, unlocked: true },
  { name: "FastAPI", level: 80, category: "Backend", icon: <RocketIcon />, color: "from-purple-400 to-pink-500", xp: 680, maxXP: 1000, unlocked: true },
  { name: "PostgreSQL", level: 75, category: "Backend", icon: <DatabaseIcon />, color: "from-indigo-400 to-blue-500", xp: 600, maxXP: 1000, unlocked: true },
  { name: "NumPy", level: 70, category: "ML", icon: <BrainIcon />, color: "from-yellow-400 to-orange-500", xp: 520, maxXP: 1000, unlocked: true },
  { name: "Pandas", level: 75, category: "ML", icon: <BrainIcon />, color: "from-red-400 to-pink-500", xp: 580, maxXP: 1000, unlocked: true },
  { name: "Scikit-learn", level: 65, category: "ML", icon: <BrainIcon />, color: "from-teal-400 to-cyan-500", xp: 450, maxXP: 1000, unlocked: true },
  { name: "Next.js", level: 75, category: "Frontend", icon: <CodeIcon />, color: "from-gray-400 to-slate-500", xp: 620, maxXP: 1000, unlocked: true },
  { name: "React", level: 70, category: "Frontend", icon: <CodeIcon />, color: "from-blue-400 to-indigo-500", xp: 550, maxXP: 1000, unlocked: true },
  { name: "TypeScript", level: 65, category: "Frontend", icon: <CodeIcon />, color: "from-blue-500 to-indigo-600", xp: 480, maxXP: 1000, unlocked: true },
];

// Define projects for portal cards
const projectsData = [
  {
    id: "1",
    title: "E-commerce API",
    description: "A robust RESTful API built with Django REST Framework for an e-commerce platform with authentication, product management, and order processing.",
    tags: ["Python", "Django", "PostgreSQL", "Docker"],
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
    technologies: ["Python", "Django", "PostgreSQL", "Redis", "Docker"],
    duration: "3 months",
    status: "completed" as const,
  },
  {
    id: "2",
    title: "Real-time Chat Service",
    description: "A high-performance chat service built with FastAPI and WebSockets, supporting thousands of concurrent connections.",
    tags: ["Python", "FastAPI", "WebSockets", "Redis"],
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
    technologies: ["Python", "FastAPI", "WebSockets", "Redis", "Nginx"],
    duration: "2 months",
    status: "completed" as const,
  },
  {
    id: "3",
    title: "ML-powered Recommendation Engine",
    description: "A recommendation system using collaborative filtering and content-based approaches to suggest products to users.",
    tags: ["Python", "Scikit-learn", "Pandas", "API Integration"],
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
    github: "https://github.com",
    featured: false,
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "FastAPI"],
    duration: "4 months",
    status: "in-progress" as const,
  },
  {
    id: "4",
    title: "Personal Finance Dashboard",
    description: "A Next.js application for tracking personal finances with data visualization and budget planning features.",
    tags: ["Next.js", "React", "TypeScript", "Chart.js"],
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
    technologies: ["Next.js", "React", "TypeScript", "Chart.js", "Tailwind"],
    duration: "6 weeks",
    status: "completed" as const,
  },
  {
    id: "5",
    title: "Task Management System",
    description: "A full-stack application for team task management with real-time updates and progress tracking.",
    tags: ["Django", "Next.js", "PostgreSQL", "WebSockets"],
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
    github: "https://github.com",
    featured: false,
    technologies: ["Django", "Next.js", "PostgreSQL", "WebSockets", "Redis"],
    duration: "2 months",
    status: "prototype" as const,
  },
  {
    id: "6",
    title: "Sentiment Analysis Tool",
    description: "An ML-powered tool that analyzes customer feedback and social media mentions to determine sentiment and key topics.",
    tags: ["Python", "NLTK", "TensorFlow", "FastAPI"],
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
    github: "https://github.com",
    featured: false,
    technologies: ["Python", "NLTK", "TensorFlow", "FastAPI", "Docker"],
    duration: "3 months",
    status: "in-progress" as const,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Quantum Navigation */}
      <QuantumNav sections={sections} />

      {/* Hero Section with Neural Background */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <NeuralBackground />
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <FadeIn direction="right" className="flex-1 space-y-6">
              <div className="space-y-4">
                <GlitchText
                  texts={["Backend Developer", "Full Stack Engineer", "ML Enthusiast"]}
                  className="text-4xl md:text-6xl font-bold tracking-tighter text-white"
                  duration={3000}
                />
                
                <BreathingText className="block text-2xl md:text-3xl">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400">
                    Crafting Digital Experiences
                  </span>
                </BreathingText>
              </div>
              
              <motion.p 
                className="text-xl text-gray-300 max-w-[600px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Specialized in Python (Django/FastAPI) with expertise in Next.js
                and a passion for Machine Learning innovations.
              </motion.p>
              
              <div className="flex flex-wrap gap-4">
                <MagneticButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  <div className="relative overflow-hidden group">
                    <span className="relative z-10 flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white font-medium">
                      Explore Projects
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </MagneticButton>
                
                <MagneticButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  <div className="px-6 py-3 border border-purple-500/30 rounded-lg text-purple-400 font-medium hover:bg-purple-500/10 transition-colors">
                    Get in Touch
                  </div>
                </MagneticButton>
              </div>
              
              <div className="flex gap-6 pt-4">
                {[
                  { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
                  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: MailIcon, href: "mailto:your-email@example.com", label: "Email" },
                ].map((social, index) => (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
                    >
                      <social.icon className="h-6 w-6" />
                      <span className="sr-only">{social.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={0.3} className="flex-1 w-full max-w-sm">
              <ParallaxAvatar className="w-full" />
            </FadeIn>
          </div>
        </div>
      </section>

{/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-b from-black via-purple-900/10 to-black relative"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                About Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ParallaxSection direction="up" className="space-y-6">
              <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20">
                <h3 className="text-2xl font-semibold mb-4 text-purple-400">Background</h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm a passionate backend developer with expertise in Python
                  frameworks like Django and FastAPI. I also have experience with
                  Next.js for full-stack development. Currently, I'm expanding my
                  skills in Machine Learning to build more intelligent applications.
                </p>
              </div>
            </ParallaxSection>
            
            <ParallaxSection
              direction="up"
              baseVelocity={0.3}
              className="space-y-6"
            >
              <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-indigo-500/20">
                <h3 className="text-2xl font-semibold mb-4 text-indigo-400">Journey</h3>
                <ul className="space-y-4 text-gray-300">
                  {[
                    "🎓 Bachelor's in Computer Science",
                    "💼 5+ years of backend development experience",
                    "🚀 Worked at TechCorp as Senior Backend Developer",
                    "🌟 Currently building innovative ML-powered solutions",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-purple-400">{item.split(' ')[0]}</span>
                      <span>{item.split(' ').slice(1).join(' ')}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Skills Section - 3D Spherical */}
      <section id="skills" className="relative">
        <SphericalSkills skills={skillsData} />
      </section>

      {/* Projects Section - Portal Cards */}
      <section
        id="projects"
        className="py-20 bg-gradient-to-b from-black via-indigo-900/10 to-black relative"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Featured Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <PortalCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

{/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-b from-black via-pink-900/10 to-black relative"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Let's Connect
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ParallaxSection direction="right" className="space-y-6">
              <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/20">
                <h3 className="text-2xl font-semibold mb-4 text-pink-400">Get in Touch</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  I'm always open to discussing new projects, opportunities, or
                  partnerships. Feel free to reach out using the form or through my
                  social media profiles.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: MailIcon, text: "your-email@example.com", href: "mailto:your-email@example.com" },
                    { icon: GithubIcon, text: "github.com/yourusername", href: "https://github.com" },
                    { icon: LinkedinIcon, text: "linkedin.com/in/yourusername", href: "https://linkedin.com" },
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-pink-500/30"
                      whileHover={{ x: 10, scale: 1.02 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                        <contact.icon className="h-5 w-5 text-white" />
                      </div>
                      <Link
                        href={contact.href}
                        target={contact.href.startsWith('http') ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {contact.text}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ParallaxSection>
            
            <ParallaxSection
              direction="left"
              className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20"
            >
              <ContactForm />
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black/90 backdrop-blur-sm border-t border-white/10 relative z-10">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p 
              className="text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </motion.p>
            
            <motion.div 
              className="flex gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}