import { motion } from "motion/react";
import { CheckCircle2, Smartphone, ArrowRight, Layout, Package, Calendar, Menu, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, FormEvent } from "react";

export function SageAndSand() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you'd send this to Firebase
  };

  const features = [
    {
      title: "Dashboard Overview",
      description: "Get a bird's eye view of your items in stock, pending tasks, and recent sales at a glance.",
      icon: Layout,
      image: "/sage-sand-2.png", // Sage & Sand Hub
    },
    {
      title: "Inventory Ledger",
      description: "Manage your products and materials with ease. Track stock levels and profit margins effortlessly.",
      icon: Package,
      image: "/sage-sand-3.png", // Inventory Ledger
    },
    {
      title: "Market Hub",
      description: "Plan your market season. Keep track of festival dates, locations, and contact hosts directly.",
      icon: Calendar,
      image: "/sage-sand-5.png", // Market Hub
    },
    {
      title: "Mobile First Design",
      description: "Designed specifically for the busy maker on the go. Everything you need, right in your pocket.",
      icon: Smartphone,
      image: "/sage-sand-4.png", // Sidebar/Menu
    }
  ];

  return (
    <div className="bg-cream/30 min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase">
                  Coming Soon
                </span>
                <h1 className="font-heading text-6xl md:text-8xl font-medium text-foreground leading-tight">
                  Sage & <span className="text-primary italic">Sand</span>
                </h1>
                <p className="text-2xl text-muted-foreground font-heading">
                  Craft Business Management, Simplified.
                </p>
              </div>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Stop juggling spreadsheets and notebooks. Sage & Sand is the all-in-one hub built specifically for makers, market vendors, and small craft businesses.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 rounded-full px-6 bg-white border-soft focus:ring-primary"
                  />
                  <Button type="submit" size="lg" className="h-14 px-8 rounded-full font-bold">
                    Join Waitlist
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-primary/10 rounded-2xl border border-primary/20 text-primary font-medium flex items-center gap-3"
                >
                  <CheckCircle2 className="h-6 w-6" />
                  Thanks! We'll notify you when we launch.
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto w-[300px] h-[620px] bg-charcoal rounded-[3.5rem] border-[12px] border-charcoal shadow-[0_0_50px_rgba(0,0,0,0.2)] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-charcoal rounded-b-3xl z-20" />
                <img
                  src="/IMG_8209.png"
                  alt="Sage & Sand Login"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/sage-login/600/1200";
                  }}
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 h-40 w-40 bg-secondary/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-primary/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="font-heading text-4xl md:text-5xl font-medium">Everything you need to grow.</h2>
            <p className="text-xl text-muted-foreground">
              Built by a maker, for makers. We've included the tools that actually matter for your daily workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-cream/20 rounded-3xl p-8 border border-soft hover:border-primary/30 transition-all hover:shadow-xl"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="space-y-4 flex-1">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-2xl font-medium">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="w-full lg:w-48 h-96 bg-charcoal rounded-2xl border-4 border-charcoal overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = `https://picsum.photos/seed/sage-${index}/400/800`;
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-10">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-heading text-4xl md:text-6xl font-medium">Ready to simplify your craft?</h2>
            <p className="text-xl text-primary-foreground/80">
              Join the early interest list today and get exclusive early access when we launch.
            </p>
          </div>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 rounded-full px-6 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-white"
              />
              <Button type="submit" size="lg" variant="secondary" className="h-14 px-8 rounded-full font-bold">
                Get Early Access
              </Button>
            </form>
          ) : (
            <div className="text-2xl font-heading italic">See you on the inside!</div>
          )}
        </div>
      </section>
    </div>
  );
}
