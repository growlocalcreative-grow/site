import { motion } from "motion/react";
import { CheckCircle2, LifeBuoy, Search, Share2, Terminal, Palette, Smartphone } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "Website Rescues",
      description: "Something's broken, outdated, or just... embarrassing. Let's fix it. No judgement, I've seen it all around here.",
      icon: <LifeBuoy className="h-6 w-6" />,
    },
    {
      title: "Google Setup & Local SEO",
      description: "Your Google Business Profile is either helping you or hiding you. Let's make sure folks around the Divide can actually find you.",
      icon: <Search className="h-6 w-6" />,
    },
    {
      title: "Social Media Help",
      description: "Posting without a plan is exhausting. I'll help you figure out what actually makes sense for your kind of business.",
      icon: <Share2 className="h-6 w-6" />,
    },
    {
      title: "Quick Tech & Tutorials",
      description: "Stuck on something? We sit down together, I walk you through it, and you leave knowing how to do it yourself.",
      icon: <Terminal className="h-6 w-6" />,
    },
    {
      title: "Custom Business Apps",
      description: "Got a recurring headache in your business? I build calm, phone-friendly tools (PWAs) that fix exactly that. From inventory to client portals.",
      icon: <Smartphone className="h-6 w-6" />,
      badge: "POPULAR",
    },
    {
      title: "White-Label Solutions",
      description: "I build the tech, you own the brand. Perfect for makers who want to offer their own specialized tools to their community.",
      icon: <Palette className="h-6 w-6" />,
      badge: "AGENCY",
    },
  ];

  return (
    <section id="services" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <h2 className="font-heading text-4xl md:text-6xl font-medium mb-6">Web Help & Simple Tools</h2>
          <p className="text-primary-foreground/70 text-xl leading-relaxed">
            I'm not here to impress you with jargon. I'm here to help you get back to what you actually love doing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center transition-transform group-hover:scale-110">
                  {service.icon}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-heading text-2xl font-medium">{service.title}</h3>
                    {service.badge && (
                      <span className="bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-primary-foreground/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}