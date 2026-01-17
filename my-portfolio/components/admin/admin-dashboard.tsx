"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  Mail, 
  User, 
  Calendar, 
  Trash2, 
  Download,
  Eye,
  Search,
  Filter,
  Shield,
  LogOut
} from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: "new" | "read" | "replied";
  to: string;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "new" | "read" | "replied">("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  // Simple password protection (in production, use proper auth)
  const ADMIN_PASSWORD = "admin123"; // Change this to a secure password

  useEffect(() => {
    if (isAuthenticated) {
      loadSubmissions();
    }
  }, [isAuthenticated]);

  const loadSubmissions = () => {
    const stored = localStorage.getItem("contactSubmissions");
    if (stored) {
      const data = JSON.parse(stored);
      // Add status if not present
      const withStatus = data.map((sub: any) => ({
        ...sub,
        id: sub.id || Date.now().toString(),
        status: sub.status || "new"
      }));
      setSubmissions(withStatus);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Welcome back!",
        description: "Admin dashboard loaded successfully",
      });
    } else {
      toast({
        title: "Access denied",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setSelectedSubmission(null);
  };

  const markAsRead = (id: string) => {
    setSubmissions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: "read" as const } : sub
      )
    );
    saveSubmissions();
  };

  const markAsReplied = (id: string) => {
    setSubmissions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: "replied" as const } : sub
      )
    );
    saveSubmissions();
  };

  const deleteSubmission = (id: string) => {
    setSubmissions(prev => prev.filter(sub => sub.id !== id));
    saveSubmissions();
    if (selectedSubmission?.id === id) {
      setSelectedSubmission(null);
    }
    toast({
      title: "Submission deleted",
      description: "The submission has been removed",
    });
  };

  const saveSubmissions = () => {
    localStorage.setItem("contactSubmissions", JSON.stringify(submissions));
  };

  const exportSubmissions = () => {
    const dataStr = JSON.stringify(submissions, null, 2);
    const dataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `submissions_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Export successful",
      description: `Downloaded ${submissions.length} submissions`,
    });
  };

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || sub.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-green-500";
      case "read": return "bg-blue-500";
      case "replied": return "bg-gray-500";
      default: return "bg-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "new": return "New";
      case "read": return "Read";
      case "replied": return "Replied";
      default: return "Unknown";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md bg-black/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Enter password to access submissions</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Access Dashboard
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-xl border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">Manage form submissions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={exportSubmissions}
                variant="outline"
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submissions List */}
          <div className="lg:col-span-2">
            <div className="bg-black/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search submissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-black/30 border-purple-500/20 text-white placeholder-gray-400"
                  />
                </div>
                <div className="flex gap-2">
                  {["all", "new", "read", "replied"].map((status) => (
                    <Button
                      key={status}
                      onClick={() => setFilterStatus(status as any)}
                      variant={filterStatus === status ? "default" : "outline"}
                      size="sm"
                      className={`${
                        filterStatus === status
                          ? "bg-purple-600"
                          : "border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Submissions Count */}
              <div className="mb-4 text-sm text-gray-400">
                {filteredSubmissions.length} of {submissions.length} submissions
              </div>

              {/* Submissions List */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredSubmissions.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No submissions found</p>
                  </div>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <motion.div
                      key={submission.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedSubmission?.id === submission.id
                          ? "bg-purple-500/10 border-purple-500/30"
                          : "bg-black/30 border-purple-500/20 hover:bg-purple-500/5"
                      }`}
                      onClick={() => {
                        setSelectedSubmission(submission);
                        if (submission.status === "new") {
                          markAsRead(submission.id);
                        }
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(submission.status)}`} />
                            <h3 className="font-semibold text-white">{submission.subject}</h3>
                            <span className="text-xs text-gray-400">
                              {getStatusText(submission.status)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {submission.name}
                            </span>
                            <span className="flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {submission.email}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(submission.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSubmission(submission);
                            }}
                            className="text-purple-400 hover:text-purple-300"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSubmission(submission.id);
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Submission Details */}
          <div className="lg:col-span-1">
            {selectedSubmission ? (
              <motion.div
                className="bg-black/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4">Submission Details</h2>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedSubmission.status)} bg-opacity-20 text-white`}>
                    {getStatusText(selectedSubmission.status)}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-1">
                      From
                    </label>
                    <p className="text-white">{selectedSubmission.name}</p>
                    <p className="text-sm text-gray-400">{selectedSubmission.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-1">
                      Subject
                    </label>
                    <p className="text-white">{selectedSubmission.subject}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-1">
                      Message
                    </label>
                    <div className="bg-black/30 rounded-lg p-3 max-h-40 overflow-y-auto">
                      <p className="text-sm text-gray-300 whitespace-pre-wrap">
                        {selectedSubmission.message}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-1">
                      Received
                    </label>
                    <p className="text-sm text-gray-400">
                      {new Date(selectedSubmission.timestamp).toLocaleString()}
                    </p>
                  </div>

                  <div className="pt-4 space-y-2">
                    {selectedSubmission.status !== "replied" && (
                      <Button
                        onClick={() => markAsReplied(selectedSubmission.id)}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        Mark as Replied
                      </Button>
                    )}
                    {selectedSubmission.status === "new" && (
                      <Button
                        onClick={() => markAsRead(selectedSubmission.id)}
                        variant="outline"
                        className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                      >
                        Mark as Read
                      </Button>
                    )}
                    <Button
                      onClick={() => window.open(`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`)}
                      variant="outline"
                      className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                    >
                      Reply via Email
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-black/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" />
                <p className="text-gray-400">Select a submission to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}