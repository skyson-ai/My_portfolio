"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const saveSubmissionToStorage = (data: typeof formData) => {
    // Get existing submissions
    const existingSubmissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]");
    
    // Create new submission with unique ID and timestamp
    const newSubmission = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      timestamp: new Date().toISOString(),
      status: "new" as const,
      to: "micheecephasl@gmail.com"
    };
    
    // Add to existing submissions
    existingSubmissions.push(newSubmission);
    
    // Save back to localStorage
    localStorage.setItem("contactSubmissions", JSON.stringify(existingSubmissions));
    
    console.log("Submission saved to admin dashboard:", newSubmission);
    return true;
  };

  const sendEmailDirectly = async (data: typeof formData) => {
    // First save to localStorage for admin dashboard
    saveSubmissionToStorage(data);
    
    // Simulate API call for email sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Log data (in production, this would be sent to your email)
    console.log("Contact Form Submission:", {
      to: "micheecephasl@gmail.com",
      from: data.email,
      subject: data.subject,
      message: data.message,
      name: data.name,
      timestamp: new Date().toISOString()
    });
    
    // For demo purposes, we'll always return success
    // In production, you'd check actual response
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send the email
      const success = await sendEmailDirectly(formData);

      if (success) {
        // Show success message
        toast({
          title: "✅ Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon at micheecephasl@gmail.com",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        // Optional: Store in localStorage for debugging
        const submissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]");
        submissions.push({
          ...formData,
          timestamp: new Date().toISOString(),
          to: "micheecephasl@gmail.com"
        });
        localStorage.setItem("contactSubmissions", JSON.stringify(submissions));
      }
    } catch (error) {
      console.error("Form submission error:", error);
      
      // Show error message with fallback
      toast({
        title: "❌ Unable to send message",
        description: "Please email me directly at micheecephasl@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEmailClient = () => {
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent from portfolio website`);
    const mailtoLink = `mailto:micheecephasl@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="name" className="text-sm font-medium text-purple-300 block">
            Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
            />
            {formData.name && (
              <motion.div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                ✓
              </motion.div>
            )}
          </div>
        </motion.div>
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <label htmlFor="email" className="text-sm font-medium text-purple-300 block">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
            />
            {formData.email && formData.email.includes("@") && (
              <motion.div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                ✓
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
      
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <label htmlFor="subject" className="text-sm font-medium text-purple-300 block">
          Subject
        </label>
        <div className="relative">
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            required
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
          />
          {formData.subject && (
            <motion.div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              ✓
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <label htmlFor="message" className="text-sm font-medium text-purple-300 block">
          Message
        </label>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me more about your project or inquiry..."
            rows={5}
            required
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-none"
          />
          {formData.message && (
            <motion.div
              className="absolute right-3 bottom-3 text-green-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              ✓
            </motion.div>
          )}
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-400">
            {formData.message.length} characters
          </span>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="pt-4 space-y-3"
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center">
            {isSubmitting ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <motion.svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
        
        {/* Alternative email button */}
        <button
          type="button"
          onClick={openEmailClient}
          className="w-full px-4 py-2 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-all duration-300 text-sm"
        >
          Or email me directly
        </button>
      </motion.div>
      
      {/* Email info */}
      <motion.div
        className="text-center text-xs text-gray-400 pt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Your message will be sent to micheecephasl@gmail.com
      </motion.div>
      
      {/* Admin access */}
      <motion.div
        className="text-center pt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <a
          href="/admin"
          className="text-xs text-purple-400 hover:text-purple-300 underline"
          target="_blank"
        >
          Admin Dashboard Access
        </a>
      </motion.div>
    </form>
  );
}