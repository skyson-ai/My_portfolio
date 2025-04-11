"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, ArrowRight, Code, Database, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import ContactForm from "@/components/contact-form"
import FadeIn from "@/components/animations/fade-in"
import StaggeredChildren from "@/components/animations/staggered-children"
import ParticleBackground from "@/components/animations/particle-background"
import TypingText from "@/components/animations/typing-text"
import ParallaxSection from "@/components/animations/parallax-section"
import FloatingElement from "@/components/animations/floating-element"
import RevealText from "@/components/animations/reveal-text"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <ParticleBackground />
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <FadeIn direction="right" className="flex-1 space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                <RevealText text="Backend Developer" as="span" />
                <span className="block mt-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">
                    <TypingText
                      sequences={["& ML Enthusiast", 1000, "& Python Expert", 1000, "& Problem Solver", 1000]}
                    />
                  </span>
                </span>
              </h1>
              <p className="text-xl text-gray-500 dark:text-gray-400 max-w-[600px]">
                Specialized in Python (Django/FastAPI) with experience in Next.js and a passion for Machine Learning.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="relative overflow-hidden group">
                  <Link href="#projects">
                    <span className="relative z-10 flex items-center">
                      View Projects{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="#contact">Contact Me</Link>
                </Button>
              </div>
              <div className="flex gap-4 pt-4">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-transform hover:scale-110"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-transform hover:scale-110"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="mailto:your-email@example.com"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-transform hover:scale-110"
                >
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.3} className="flex-1 w-full max-w-sm">
              <FloatingElement yOffset={10} duration={5}>
                <div className="relative w-full h-80 md:h-96 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
                    Your Photo Here
                  </div>
                </div>
              </FloatingElement>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <FadeIn>
            <RevealText text="About Me" className="text-3xl font-bold tracking-tighter mb-8" />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ParallaxSection direction="up" className="space-y-4">
              <h3 className="text-xl font-semibold">Background</h3>
              <p className="text-gray-500 dark:text-gray-400">
                I'm a passionate backend developer with expertise in Python frameworks like Django and FastAPI. I also
                have experience with Next.js for full-stack development. Currently, I'm expanding my skills in Machine
                Learning to build more intelligent applications.
              </p>
            </ParallaxSection>
            <ParallaxSection direction="up" baseVelocity={0.3} className="space-y-4">
              <h3 className="text-xl font-semibold">Education & Experience</h3>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Bachelor's in Computer Science (or your actual degree)
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />X years of experience in backend
                  development
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Worked at [Previous Company] as [Position]
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Currently working at [Current Company] as [Position]
                </li>
              </ul>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm relative">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <FadeIn>
            <RevealText text="Skills" className="text-3xl font-bold tracking-tighter mb-8" />
          </FadeIn>
          <div className="space-y-12">
            <div className="relative">
              <FloatingElement className="absolute -left-12 top-0 text-purple-500/20 dark:text-purple-500/10">
                <Code className="w-24 h-24" />
              </FloatingElement>
              <FadeIn direction="up">
                <h3 className="text-xl font-semibold mb-4 pl-4 border-l-4 border-purple-500">Backend Development</h3>
                <StaggeredChildren className="flex flex-wrap gap-3">
                  <SkillBadge name="Python" level={90} />
                  <SkillBadge name="Django" level={85} />
                  <SkillBadge name="FastAPI" level={80} />
                  <SkillBadge name="PostgreSQL" level={75} />
                  <SkillBadge name="RESTful APIs" level={85} />
                  <SkillBadge name="Docker" level={70} />
                </StaggeredChildren>
              </FadeIn>
            </div>

            <div className="relative">
              <FloatingElement className="absolute -right-12 top-0 text-indigo-500/20 dark:text-indigo-500/10">
                <Brain className="w-24 h-24" />
              </FloatingElement>
              <FadeIn direction="up" delay={0.2}>
                <h3 className="text-xl font-semibold mb-4 pl-4 border-l-4 border-indigo-500">Machine Learning</h3>
                <StaggeredChildren className="flex flex-wrap gap-3" delay={0.2}>
                  <SkillBadge name="NumPy" level={70} />
                  <SkillBadge name="Pandas" level={75} />
                  <SkillBadge name="Scikit-learn" level={65} />
                  <SkillBadge name="TensorFlow" level={60} />
                  <SkillBadge name="Data Analysis" level={70} />
                </StaggeredChildren>
              </FadeIn>
            </div>

            <div className="relative">
              <FloatingElement className="absolute -left-12 top-0 text-pink-500/20 dark:text-pink-500/10">
                <Database className="w-24 h-24" />
              </FloatingElement>
              <FadeIn direction="up" delay={0.4}>
                <h3 className="text-xl font-semibold mb-4 pl-4 border-l-4 border-pink-500">Frontend Development</h3>
                <StaggeredChildren className="flex flex-wrap gap-3" delay={0.4}>
                  <SkillBadge name="Next.js" level={75} />
                  <SkillBadge name="React" level={70} />
                  <SkillBadge name="TypeScript" level={65} />
                  <SkillBadge name="Tailwind CSS" level={70} />
                  <SkillBadge name="Responsive Design" level={75} />
                </StaggeredChildren>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm relative">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <FadeIn>
            <RevealText text="Projects" className="text-3xl font-bold tracking-tighter mb-8" />
          </FadeIn>
          <StaggeredChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              title="E-commerce API"
              description="A robust RESTful API built with Django REST Framework for an e-commerce platform with authentication, product management, and order processing."
              tags={["Python", "Django", "PostgreSQL", "Docker"]}
              image="/placeholder.svg?height=200&width=400"
              link="#"
            />
            <ProjectCard
              title="Real-time Chat Service"
              description="A high-performance chat service built with FastAPI and WebSockets, supporting thousands of concurrent connections."
              tags={["Python", "FastAPI", "WebSockets", "Redis"]}
              image="/placeholder.svg?height=200&width=400"
              link="#"
            />
            <ProjectCard
              title="ML-powered Recommendation Engine"
              description="A recommendation system using collaborative filtering and content-based approaches to suggest products to users."
              tags={["Python", "Scikit-learn", "Pandas", "API Integration"]}
              image="/placeholder.svg?height=200&width=400"
              link="#"
            />
            <ProjectCard
              title="Personal Finance Dashboard"
              description="A Next.js application for tracking personal finances with data visualization and budget planning features."
              tags={["Next.js", "React", "TypeScript", "Chart.js"]}
              image="/placeholder.svg?height=200&width=400"
              link="#"
            />
            <ProjectCard
              title="Task Management System"
              description="A full-stack application for team task management with real-time updates and progress tracking."
              tags={["Django", "Next.js", "PostgreSQL", "WebSockets"]}
              image="/placeholder.svg?height=200&width=400"
              link="#"
            />
            <ProjectCard
              title="Sentiment Analysis Tool"
              description="An ML-powered tool that analyzes customer feedback and social media mentions to determine sentiment and key topics."
              tags={["Python", "NLTK", "TensorFlow", "FastAPI"]}
              image="/placeholder.svg?height=200&width=400"
              link="#"
            />
          </StaggeredChildren>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm relative">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <FadeIn>
            <RevealText text="Contact Me" className="text-3xl font-bold tracking-tighter mb-8" />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ParallaxSection direction="right" className="space-y-4">
              <h3 className="text-xl font-semibold">Get in Touch</h3>
              <p className="text-gray-500 dark:text-gray-400">
                I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out using
                the form or through my social media profiles.
              </p>
              <div className="space-y-4">
                <motion.div
                  className="flex items-center gap-2 text-gray-500 dark:text-gray-400 p-3 rounded-lg border border-gray-200 dark:border-gray-800"
                  whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                >
                  <Mail className="h-5 w-5 text-purple-500" />
                  <span>your-email@example.com</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 text-gray-500 dark:text-gray-400 p-3 rounded-lg border border-gray-200 dark:border-gray-800"
                  whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                >
                  <Github className="h-5 w-5 text-purple-500" />
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    github.com/yourusername
                  </Link>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 text-gray-500 dark:text-gray-400 p-3 rounded-lg border border-gray-200 dark:border-gray-800"
                  whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                >
                  <Linkedin className="h-5 w-5 text-purple-500" />
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    linkedin.com/in/yourusername
                  </Link>
                </motion.div>
              </div>
            </ParallaxSection>
            <ParallaxSection
              direction="left"
              className="bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            >
              <ContactForm />
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 relative z-10">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
