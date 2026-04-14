import { motion } from "motion/react";
import { CheckCircle2, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Spotlight() {
  const features = [
    "Inventory Tracking",
    "Market Calendar",
    "Pack Lists",
    "Sales Tracking",
    "Production Tasks",
    "Planning Tools",
  ];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="bg-secondary/10 rounded-[3rem] p-8 md:p-16 lg:p-24 relative">
          {/* Decorative Background Icon */}
          <Smartphone className="absolute -top-12 -right-12 h-64 w-64 text-secondary/10 rotate-12" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <div className="space-y-4">
                <span className="text-sm font-bold tracking-widest text-primary uppercase">Latest Tool Spotlight</span>
                <h2 className="font-heading text-5xl md:text-7xl font-medium text-foreground">Sage & Sand</h2>
              </div>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I kept watching market vendors and craft makers juggling a dozen different apps, notebooks, and half-remembered spreadsheets every time market weekend rolled around.
                </p>
                <p className="font-medium text-foreground italic">
                  The prep stress was real.
                </p>
                <p>
                  So I built Sage & Sand, a calm, phone-friendly hub that brings everything into one place.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button size="lg" className="rounded-full px-8 group" asChild>
                  <Link to="/sage-and-sand">
                    See the Full App
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative mx-auto w-[280px] h-[580px] bg-charcoal rounded-[3rem] border-[8px] border-charcoal shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-charcoal rounded-b-2xl z-20" />
                <img
                  src="/IMG_8209.png"
                  alt="Sage & Sand App Interface"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/app-ui/560/1160";
                  }}
                />
              </div>
              {/* Floating Element */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl border border-soft max-w-[200px]">
                <p className="text-sm font-medium text-muted-foreground italic">
                  "Finally, I can just focus on my craft instead of my spreadsheets."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
