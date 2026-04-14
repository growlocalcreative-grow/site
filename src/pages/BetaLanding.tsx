import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import React, { useState } from "react";
import { 
  Church, 
  Calendar, 
  FileText, 
  BookOpen, 
  ArrowLeft, 
  Send,
  Sparkles,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db, handleFirestoreError, OperationType } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const BETA_APPS = {
  "church-volunteer-hub": {
    title: "Church Volunteer Hub",
    description: "Simple signup, scheduling, and coordination for your congregation.",
    icon: <Church className="h-20 w-20" />,
    color: "bg-blue-50 text-blue-600",
    features: ["One-tap signups", "Automatic reminders", "Team coordination"]
  },
  "local-events-board": {
    title: "Local Events Board",
    description: "One spot to find what's happening around the Georgetown Divide, no Facebook required.",
    icon: <Calendar className="h-20 w-20" />,
    color: "bg-orange-50 text-orange-600",
    features: ["Community-driven", "Easy filtering", "Mobile-first design"]
  },
  "nonprofit-intake-tool": {
    title: "Nonprofit Intake Tool",
    description: "Calm, simple intake forms and client tracking for local organizations.",
    icon: <FileText className="h-20 w-20" />,
    color: "bg-green-50 text-green-600",
    features: ["Secure data", "Simple interface", "Customizable forms"]
  },
  "community-directory-2-0": {
    title: "Community Directory 2.0",
    description: "An always-fresh, easy-to-update directory for local businesses and services.",
    icon: <BookOpen className="h-20 w-20" />,
    color: "bg-purple-50 text-purple-600",
    features: ["Verified listings", "Map integration", "Direct contact"]
  }
};

export function BetaLanding() {
  const { slug } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const app = BETA_APPS[slug as keyof typeof BETA_APPS];

  if (!app) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-heading">App not found</h1>
        <Link to="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      appSlug: slug,
      appTitle: app.title,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      reason: formData.get("reason") as string,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "betaSignups"), data);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "betaSignups");
    }
  };

  return (
    <div className="flex-grow pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className={`w-32 h-32 rounded-3xl ${app.color} flex items-center justify-center mb-6 shadow-sm`}>
              {app.icon}
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-medium leading-tight">
              Be the first to try <span className="text-primary">{app.title}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {app.description}
            </p>
            
            <div className="space-y-4 pt-4">
              {app.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-soft shadow-xl"
          >
            {!submitted ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-heading font-medium">Join the Beta</h2>
                  <p className="text-muted-foreground">We'll let you know as soon as we're ready for testers.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <Input name="name" placeholder="John Doe" required className="rounded-xl h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input name="email" type="email" placeholder="john@example.com" required className="rounded-xl h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Why are you interested?</label>
                    <textarea 
                      name="reason"
                      className="w-full min-h-[100px] rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="I'd love to use this for my local group..."
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 text-lg rounded-xl">
                    Get Early Access <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                
                <p className="text-xs text-center text-muted-foreground">
                  No spam, just updates on this specific project.
                </p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-heading font-medium">You're on the list!</h2>
                  <p className="text-muted-foreground text-lg">
                    Thanks for your interest in {app.title}. We'll reach out soon with next steps.
                  </p>
                </div>
                <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-xl">
                  Back to form
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Artwork / Decorative Icons */}
        <div className="mt-24 grid grid-cols-3 gap-8 opacity-20">
          <div className="flex flex-col items-center gap-4">
            <Zap className="h-12 w-12" />
            <div className="h-1 w-full bg-current rounded-full" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Sparkles className="h-12 w-12" />
            <div className="h-1 w-full bg-current rounded-full" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <ShieldCheck className="h-12 w-12" />
            <div className="h-1 w-full bg-current rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
