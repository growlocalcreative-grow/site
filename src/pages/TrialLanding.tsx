import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import React, { useState } from "react";
import { 
  Heart, 
  Map, 
  Sparkles, 
  Users, 
  ArrowLeft, 
  Send,
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db, handleFirestoreError, OperationType } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const TRIAL_APPS = {
  "rebalove-ranch": {
    title: "RebaLove Ranch",
    description: "Custom ranch sitting and management app for local livestock owners.",
    icon: <Heart className="h-20 w-20" />,
    color: "bg-red-50 text-red-600",
    features: ["Animal profiles", "Feeding schedules", "Emergency contacts"]
  },
  "gold-country-directory": {
    title: "Gold Country Directory",
    description: "The ultimate resource hub for Georgetown Divide and Foothill communities.",
    icon: <Map className="h-20 w-20" />,
    color: "bg-amber-50 text-amber-600",
    features: ["Local business listings", "Community resources", "Event integration"]
  },
  "the-wedding-elephant": {
    title: "The Wedding Elephant",
    description: "Stress-free wedding planning tool designed for local couples and venues.",
    icon: <Sparkles className="h-20 w-20" />,
    color: "bg-pink-50 text-pink-600",
    features: ["Vendor tracking", "Budget management", "Guest list tools"]
  },
  "sage-and-sand": {
    title: "Sage & Sand",
    description: "A calm, phone-friendly hub for craft makers and market vendors.",
    icon: <Users className="h-20 w-20" />,
    color: "bg-teal-50 text-teal-600",
    features: ["Inventory tracking", "Sales ledger", "Market planning"]
  }
};

export function TrialLanding() {
  const { slug } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const app = TRIAL_APPS[slug as keyof typeof TRIAL_APPS];

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
      businessName: formData.get("businessName") as string,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "trialSignups"), data);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "trialSignups");
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
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <Clock className="h-3 w-3" /> 14-Day Free Trial
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-medium leading-tight">
                Try <span className="text-primary">{app.title}</span> for free
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {app.description}
            </p>
            
            <div className="space-y-4 pt-4">
              {app.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 className="h-4 w-4" />
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
                  <h2 className="text-2xl font-heading font-medium">Start Your Preview</h2>
                  <p className="text-muted-foreground">No credit card required. Get full access for 14 days.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input name="name" placeholder="Sierra Sage" required className="rounded-xl h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input name="email" type="email" placeholder="sierra@example.com" required className="rounded-xl h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Name (Optional)</label>
                    <Input name="businessName" placeholder="My Local Business" className="rounded-xl h-12" />
                  </div>
                  <Button type="submit" className="w-full h-12 text-lg rounded-xl">
                    Start Free Trial <Zap className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                
                <p className="text-xs text-center text-muted-foreground">
                  By signing up, you agree to our terms of service.
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
                  <h2 className="text-3xl font-heading font-medium">Welcome Aboard!</h2>
                  <p className="text-muted-foreground text-lg">
                    Check your email for your login credentials and a quick start guide for {app.title}.
                  </p>
                </div>
                <Link to="/">
                  <Button variant="outline" className="rounded-xl">
                    Back to Home
                  </Button>
                </Link>
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
