"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Bot, User, Sparkles, Brain, Settings, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  metadata?: {
    model?: string;
    tokens?: number;
    responseTime?: number;
  };
}

interface AIConfig {
  provider: "openai" | "ollama" | "fallback";
  model: string;
  apiKey?: string;
  baseUrl?: string;
  temperature: number;
  maxTokens: number;
}

const defaultConfig: AIConfig = {
  provider: "fallback",
  model: "gpt-3.5-turbo",
  temperature: 0.7,
  maxTokens: 1000,
};

const systemPrompt = `Tu es l'assistant IA personnel d'un développeur backend talentueux. Voici les informations sur son profil :

PROFIL DU DÉVELOPPEUR :
- Nom : Développeur Backend spécialisé Python
- Expérience : 5+ ans en développement backend
- Spécialisation : Python (Django, FastAPI), Next.js, Machine Learning
- Formation : Bachelor en Computer Science
- Entreprise actuelle : TechCorp (Senior Backend Developer)

COMPÉTENCES PRINCIPALES :
Backend : Python (90%), Django (85%), FastAPI (80%), PostgreSQL (75%), Node.js (70%), Express.js (65%), MongoDB (60%), Redis (65%), GraphQL (55%)
Frontend : Next.js (75%), React (70%), TypeScript (65%), Vue.js (65%), Tailwind CSS (80%), Framer Motion (70%), Chart.js (60%)
ML/AI : NumPy (70%), Pandas (75%), Scikit-learn (65%)
DevOps : AWS (70%), Docker (75%), Kubernetes (60%), CI/CD (65%), GitHub Actions (70%)

PROJETS NOTABLES :
1. API E-commerce (Django REST Framework) - Gestion produits, authentification, commandes
2. Service Chat Temps Réel (FastAPI + WebSockets) - Support milliers connexions simultanées
3. Moteur de Recommandation ML (Scikit-learn) - Filtrage collaboratif et content-based
4. Dashboard Finance Personnelle (Next.js) - Visualisation données et budget planning
5. Système Task Management (Django + Next.js) - Updates temps réel et progress tracking
6. Outil Analyse Sentiment (NLTK + TensorFlow) - Analyse feedback clients et social media

DISPONIBILITÉ : Ouvert aux nouvelles opportunités et collaborations
CONTACT : Email, GitHub, LinkedIn

RÈGLES DE RÉPONSE :
- Réponds en français de manière professionnelle mais accessible
- Sois précis et donne des exemples concrets quand possible
- Si tu ne connais pas une information, sois honnête et suggère des alternatives
- Adapte ton niveau de détail selon la question
- Mentionne les technologies pertinentes quand c'est approprié
- Sois enthousiaste et passionné par le développement

Réponds aux questions sur ce profil de manière intelligente et contextuelle.`;

export default function SmartAIAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Bonjour ! Je suis l'assistant IA intelligent du développeur. Je peux répondre à toutes vos questions sur son profil, ses compétences, ses projets et son expérience. Posez-moi n'importe quelle question !",
      sender: "ai",
      timestamp: new Date(),
      metadata: { model: "System", responseTime: 0 }
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [config, setConfig] = useState<AIConfig>(defaultConfig);
  const [showSettings, setShowSettings] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "connecting">("disconnected");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const testConnection = async () => {
    setConnectionStatus("connecting");
    try {
      if (config.provider === "openai") {
        const response = await fetch("https://api.openai.com/v1/models", {
          headers: {
            "Authorization": `Bearer ${config.apiKey}`,
          },
        });
        setConnectionStatus(response.ok ? "connected" : "disconnected");
      } else if (config.provider === "ollama") {
        const response = await fetch(`${config.baseUrl || "http://localhost:11434"}/api/tags`);
        setConnectionStatus(response.ok ? "connected" : "disconnected");
      } else {
        setConnectionStatus("connected");
      }
    } catch (error) {
      setConnectionStatus("disconnected");
    }
  };

  useEffect(() => {
    testConnection();
  }, [config]);

  const callOpenAI = async (prompt: string): Promise<string> => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: config.temperature,
        max_tokens: config.maxTokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const callOllama = async (prompt: string): Promise<string> => {
    const response = await fetch(`${config.baseUrl || "http://localhost:11434"}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: config.model,
        prompt: `${systemPrompt}\n\nQuestion: ${prompt}`,
        stream: false,
        options: {
          temperature: config.temperature,
          num_predict: config.maxTokens,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  };

  const generateFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Enhanced keyword detection with more variations
    const skillsKeywords = ["python", "django", "fastapi", "nextjs", "react", "typescript", "compétence", "skill", "technologie", "tech"];
    const projectsKeywords = ["projet", "project", "e-commerce", "chat", "recommandation", "dashboard", "task", "sentiment"];
    const experienceKeywords = ["expérience", "exp", "parcours", "carrière", "travail", "techcorp", "années"];
    const educationKeywords = ["formation", "études", "étude", "bachelor", "diplôme", "université"];
    const availabilityKeywords = ["disponibilité", "disponible", "contact", "collaboration", "opportunité"];
    
    // Check for skills-related questions
    if (skillsKeywords.some(keyword => lowerMessage.includes(keyword))) {
      if (lowerMessage.includes("python")) {
        return "Maîtrise de **Python (90%)** avec expertise en **Django (85%)** et **FastAPI (80%)**. J'utilise Python depuis 5+ ans pour développer des APIs robustes, des applications web complexes et des solutions ML. C'est mon langage principal avec une connaissance approfondie de l'écosystème Python moderne.";
      }
      if (lowerMessage.includes("django")) {
        return "**Django (85%)** - Expert en développement d'applications web complexes avec Django REST Framework. J'ai créé des APIs e-commerce complètes, des systèmes de gestion, et des applications scalables. Ma maîtrise inclut l'ORM, les vues basées sur classes, les middlewares, et l'optimisation des performances.";
      }
      if (lowerMessage.includes("fastapi")) {
        return "**FastAPI (80%)** - Solides compétences pour développer des APIs haute performance et asynchrones. J'ai construit des services de chat temps réel supportant des milliers de connexions, des APIs ML, et des microservices. Expert en WebSockets, validation Pydantic, et documentation automatique.";
      }
      if (lowerMessage.includes("nextjs") || lowerMessage.includes("next.js")) {
        return "**Next.js (75%)** - Compétent en développement full-stack avec React Server Components, routing avancé, et intégration d'APIs. J'ai créé des dashboards interactifs, des portfolios, et des applications avec rendu côté serveur et SSG.";
      }
      if (lowerMessage.includes("react")) {
        return "**React (70%)** - Bonne maîtrise pour créer des interfaces utilisateur modernes avec hooks, state management, et composants réutilisables. J'utilise React avec TypeScript pour des applications robustes et maintenables.";
      }
      return "Mes compétences principales : **Backend** - Python/Django/FastAPI (85-90%), PostgreSQL, Node.js; **Frontend** - Next.js/React/TypeScript (65-75%); **ML/AI** - NumPy/Pandas/Scikit-learn (65-75%); **DevOps** - Docker/AWS/Kubernetes (60-75%). Expertise particulière en Python avec 5+ ans d'expérience.";
    }
    
    // Check for projects-related questions
    if (projectsKeywords.some(keyword => lowerMessage.includes(keyword))) {
      if (lowerMessage.includes("e-commerce")) {
        return "**API E-commerce** - Développée avec Django REST Framework, incluant : gestion des produits avec variants, système de panier avancé, intégration paiements Stripe, authentification JWT, notifications email, dashboard admin, et optimisation des requêtes pour 10k+ produits.";
      }
      if (lowerMessage.includes("chat")) {
        return "**Service Chat Temps Réel** - Créé avec FastAPI et WebSockets, supportant des milliers de connexions simultanées. Fonctionnalités : salons multi-users, messages privés, notifications push, historique persistant avec Redis, et interface React responsive.";
      }
      if (lowerMessage.includes("recommandation")) {
        return "**Moteur de Recommandation ML** - Utilise le filtrage collaboratif et content-based. Technologies : Scikit-learn pour les algorithmes, Pandas pour le数据处理, FastAPI pour l'API, et apprentissage continu avec nouvelles données utilisateur.";
      }
      return "J'ai réalisé 6 projets notables : **API E-commerce** (Django REST), **Chat temps réel** (FastAPI/WebSockets), **Moteur recommandation** (ML), **Dashboard finance** (Next.js), **Task Management** (Full-stack), et **Analyse sentiment** (NLP/TensorFlow). Chaque projet démontre des compétences spécifiques.";
    }
    
    // Check for experience-related questions
    if (experienceKeywords.some(keyword => lowerMessage.includes(keyword))) {
      if (lowerMessage.includes("techcorp")) {
        return "**Senior Backend Developer chez TechCorp** - Responsable d'architectures scalables, mentorat d'équipe, et meilleures pratiques. Missions : optimisation des performances (x3), migration microservices, implémentation CI/CD, et réduction des coûts infrastructure de 40%.";
      }
      return "Mon parcours : **5+ ans expérience** en développement backend, **Bachelor CS**, progression de Junior à Senior chez TechCorp. Spécialisation évolutive de Python pur vers ML/AI intégré. Expert en architectures distribuées et optimisation des performances.";
    }
    
    // Check for education-related questions
    if (educationKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "**Bachelor en Computer Science** - Formation académique solide avec spécialisation en développement logiciel et IA. Projets notables : système de gestion universitaire, plateforme de e-learning, et moteur de recherche sémantique. Mention bien avec spécialisation architectures distribuées.";
    }
    
    // Check for availability-related questions
    if (availabilityKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "**Actuellement ouvert aux nouvelles opportunités !** Intérêt particulier pour : projets Python/ML innovants, architectures cloud-native, startups tech, et missions de conseil. Disponibilité : immédiate pour full-time ou freelance. Contact direct via email, GitHub, ou LinkedIn pour discuter concrètement.";
    }
    
    // Handle specific questions about technologies
    if (lowerMessage.includes("aws") || lowerMessage.includes("cloud")) {
      return "**AWS (70%)** - Expérience pratique avec EC2, S3, RDS, Lambda, et API Gateway. J'ai déployé des applications Django/FastAPI en production, configuré des pipelines CI/CD, et optimisé les coûts. Connaissances en containerisation avec ECS et monitoring CloudWatch.";
    }
    
    if (lowerMessage.includes("docker") || lowerMessage.includes("kubernetes")) {
      return "**Docker (75%) / Kubernetes (60%)** - Expert en containerisation d'applications Python, multi-stage builds, et Docker Compose. K8s pour déploiement production, auto-scaling, et service mesh. J'ai conteneurisé tous mes projets récents avec optimisation des images et sécurité.";
    }
    
    if (lowerMessage.includes("machine learning") || lowerMessage.includes("ml")) {
      return "**ML/AI Skills** - NumPy (70%), Pandas (75%), Scikit-learn (65%). Projets : systèmes de recommandation, analyse de sentiment, et prédictions. Je construis des pipelines ML complets : preprocessing, feature engineering, model training, et déploiement via APIs REST.";
    }
    
    // Handle personal questions
    if (lowerMessage.includes("qui") || lowerMessage.includes("présente")) {
      return "Je suis un **développeur backend passionné** avec 5+ ans d'expérience, spécialisé en **Python/Django/FastAPI**. Expert en création d'APIs robustes et évolutives, avec une growing expertise en **ML/AI** pour construire des applications intelligentes. Actuellement Senior Backend Developer chez TechCorp.";
    }
    
    // Handle "what can you do" type questions
    if (lowerMessage.includes("que fais") || lowerMessage.includes("what do")) {
      return "En tant que développeur backend, je : **conçois des APIs RESTful** scalables, **développe des applications web** avec Django/FastAPI, **intègre des solutions ML** dans les applications, **optimise les performances** des systèmes existants, et **mentorise** les développeurs juniors. Ma passion : transformer des problèmes complexes en solutions élégantes.";
    }
    
    // Default response with more specific suggestions
    return "Je peux détailler mes **compétences techniques** (Python 90%, Django 85%, FastAPI 80%, Next.js 75%...), mes **6 projets réalisés** (e-commerce, chat temps réel, ML...), mon **parcours professionnel** (5+ ans, TechCorp), ou ma **formation** (Bachelor CS). Posez-moi une question spécifique sur n'importe quel aspect !";
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

    const startTime = Date.now();

    try {
      let aiResponse: string;
      let modelUsed: string;

      if (config.provider === "openai" && config.apiKey && connectionStatus === "connected") {
        aiResponse = await callOpenAI(input);
        modelUsed = config.model;
      } else if (config.provider === "ollama" && connectionStatus === "connected") {
        aiResponse = await callOllama(input);
        modelUsed = config.model;
      } else {
        aiResponse = generateFallbackResponse(input);
        modelUsed = "Fallback";
      }

      const responseTime = Date.now() - startTime;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
        metadata: {
          model: modelUsed,
          responseTime,
        }
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Désolé, je rencontre une difficulté technique. Utilisons le mode fallback pour répondre à votre question. " + generateFallbackResponse(input),
        sender: "ai",
        timestamp: new Date(),
        metadata: { model: "Fallback (Error)" }
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected": return "bg-green-500";
      case "connecting": return "bg-yellow-500";
      case "disconnected": return "bg-red-500";
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
                    className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor()}`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Assistant IA Avancé</h3>
                  <p className="text-purple-100 text-xs flex items-center gap-2">
                    {config.provider === "openai" && "ChatGPT"}
                    {config.provider === "ollama" && "Ollama"}
                    {config.provider === "fallback" && "Mode Local"}
                    <span className="text-xs">•</span>
                    <span className="text-xs">{config.model}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(true)}
                  className="text-white hover:bg-white/20"
                >
                  ×
                </Button>
              </div>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  className="bg-black/50 border-b border-purple-500/20 p-4 space-y-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">Provider</label>
                    <div className="flex gap-2">
                      {["openai", "ollama", "fallback"].map((provider) => (
                        <Button
                          key={provider}
                          variant={config.provider === provider ? "default" : "outline"}
                          size="sm"
                          onClick={() => setConfig({ ...config, provider: provider as any })}
                          className="text-xs"
                        >
                          {provider === "openai" && "ChatGPT"}
                          {provider === "ollama" && "Ollama"}
                          {provider === "fallback" && "Local"}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {config.provider === "openai" && (
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400">API Key</label>
                      <Input
                        type="password"
                        placeholder="sk-..."
                        value={config.apiKey || ""}
                        onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                        className="text-xs bg-white/10 border-purple-500/20"
                      />
                    </div>
                  )}

                  {config.provider === "ollama" && (
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400">Base URL</label>
                      <Input
                        placeholder="http://localhost:11434"
                        value={config.baseUrl || ""}
                        onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
                        className="text-xs bg-white/10 border-purple-500/20"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">Model</label>
                    <Input
                      placeholder="gpt-3.5-turbo"
                      value={config.model}
                      onChange={(e) => setConfig({ ...config, model: e.target.value })}
                      className="text-xs bg-white/10 border-purple-500/20"
                    />
                  </div>

                  <Button
                    onClick={testConnection}
                    size="sm"
                    className="w-full text-xs"
                    disabled={connectionStatus === "connecting"}
                  >
                    {connectionStatus === "connecting" && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                    Test Connection
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
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
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs opacity-60">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </p>
                          {message.metadata?.model && (
                            <Badge variant="secondary" className="text-xs px-1 py-0">
                              {message.metadata.model}
                            </Badge>
                          )}
                        </div>
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
                  placeholder="Posez votre question intelligente..."
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
            <motion.div
              className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor()}`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        )}
      </motion.button>
    </motion.div>
  );
}