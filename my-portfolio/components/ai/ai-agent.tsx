"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Bot, User, Sparkles, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIKnowledgeBase {
  [key: string]: string;
}

const aiKnowledge: AIKnowledgeBase = {
  // Personal Information
  "name": "Je suis un développeur backend passionné spécialisé en Python, Django et FastAPI.",
  "experience": "J'ai plus de 5 ans d'expérience en développement backend, avec une expertise dans la création d'API robustes et évolutives.",
  "background": "Titulaire d'un Bachelor en Informatique, j'ai travaillé chez TechCorp en tant que Senior Backend Developer avant de me spécialiser dans les solutions ML-powered.",
  
  // Skills
  "python": "Maîtrise de Python (90%) avec une expertise approfondie en Django, FastAPI, et l'écosystème Python moderne.",
  "django": "Expert en Django (85%) avec expérience dans la création d'applications web complexes et d'API RESTful.",
  "fastapi": "Solides compétences en FastAPI (80%) pour développer des API haute performance et asynchrones.",
  "nextjs": "Compétent en Next.js (75%) pour le développement full-stack avec React et TypeScript.",
  "machine learning": "Passionné par le Machine Learning avec NumPy, Pandas et Scikit-learn pour créer des applications intelligentes.",
  "devops": "Expérience pratique en DevOps avec Docker, Kubernetes, AWS et CI/CD pipelines.",
  
  // Projects
  "projects": "J'ai travaillé sur divers projets incluant des APIs e-commerce, des services de chat en temps réel, et des moteurs de recommandation ML-powered.",
  "ecommerce": "Développement d'une API e-commerce complète avec Django REST Framework, gestion des produits, authentification et traitement des commandes.",
  "chat": "Création d'un service de chat en temps réel haute performance avec FastAPI et WebSockets supportant des milliers de connexions simultanées.",
  "recommendation": "Moteur de recommandation utilisant du filtrage collaboratif et des approches content-based pour suggérer des produits aux utilisateurs.",
  
  // Education
  "education": "Bachelor en Computer Science avec une spécialisation en développement logiciel et intelligence artificielle.",
  "studies": "Formation académique solide en informatique avec des projets pratiques en développement web et machine learning.",
  
  // Career
  "career": "Carrière progressive de développeur junior à senior backend chez TechCorp, puis specialization dans les solutions innovantes ML-powered.",
  "techcorp": "Senior Backend Developer chez TechCorp, responsable d'architectures scalables et de meilleures pratiques de développement.",
  
  // General
  "availability": "Actuellement ouvert aux nouvelles opportunités et collaborations intéressantes.",
  "contact": "Vous pouvez me contacter via email, GitHub ou LinkedIn pour discuter de projets ou d'opportunités.",
  "specialization": "Spécialisation en développement backend Python avec une passion pour l'intégration de ML dans les applications web modernes."
};

export default function AIAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Bonjour ! Je suis l'assistant IA du développeur. Posez-moi n'importe quelle question sur son expérience, ses compétences, ses projets ou sa formation !",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords in the knowledge base
    for (const [keyword, response] of Object.entries(aiKnowledge)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Handle common questions
    if (lowerMessage.includes("qui") || lowerMessage.includes("présente")) {
      return aiKnowledge.name + " " + aiKnowledge.experience;
    }
    
    if (lowerMessage.includes("compétence") || lowerMessage.includes("skill")) {
      return "Mes compétences principales incluent: Python/Django/FastAPI (backend), Next.js/React (frontend), et ML avec NumPy/Pandas/Scikit-learn. J'ai aussi une expérience DevOps avec Docker et AWS.";
    }
    
    if (lowerMessage.includes("projet")) {
      return aiKnowledge.projects + " Mes projets notables incluent une API e-commerce, un service de chat temps réel, et un moteur de recommandation ML.";
    }
    
    if (lowerMessage.includes("disponibilité") || lowerMessage.includes("travail")) {
      return aiKnowledge.availability + " " + aiKnowledge.contact;
    }
    
    if (lowerMessage.includes("merci")) {
      return "De rien ! N'hésitez pas si vous avez d'autres questions sur mon profil ou mes projets.";
    }
    
    // Default response
    return "Je peux vous renseigner sur mes compétences (Python, Django, FastAPI, Next.js...), mes projets (e-commerce, chat temps réel, ML...), mon expérience professionnelle ou ma formation. Sur quoi souhaitez-vous en savoir plus ?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: generateResponse(input),
      sender: "ai",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Chat Window */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            className="mb-4 w-96 max-h-[600px] bg-black/90 backdrop-blur-xl rounded-2xl border border-purple-500/20 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="w-8 h-8 text-white" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Assistant IA</h3>
                  <p className="text-purple-100 text-xs">Disponible pour répondre</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="text-white hover:bg-white/20"
              >
                ×
              </Button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                        : "bg-white/10 text-gray-200 border border-purple-500/20"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "ai" && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                          <Brain className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                          <User className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-white/10 text-gray-200 border border-purple-500/20 p-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-purple-400" />
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-purple-400 rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.1
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-purple-500/20">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez votre question..."
                  className="bg-white/10 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-400"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsMinimized(!isMinimized)}
        className="w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMinimized ? (
          <MessageCircle className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <Sparkles className="w-6 h-6 text-white" />
            {!isMinimized && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
        )}
      </motion.button>
    </motion.div>
  );
}