import { motion } from "motion/react";
import { Church, Calendar, FileText, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Future() {
  const upcoming = [
    {
      title: "Church Volunteer Hub",
      description: "Simple signup, scheduling, and coordination.",
      icon: <Church className="h-6 w-6" />,
      slug: "church-volunteer-hub",
    },
    {
      title: "Local Events Board",
      description: "One spot to find what's happening around the Georgetown Divide, no Facebook required.",
      icon: <Calendar className="h-6 w-6" />,
      slug: "local-events-board",
    },
    {
      title: "Nonprofit Intake Tool",
      description: "Calm, simple intake forms and client tracking.",
      icon: <FileText className="h-6 w-6" />,
      slug: "nonprofit-intake-tool",
    },
    {
      title: "Community Directory 2.0",
      description: "An always-fresh, easy-to-update directory for local businesses.",
      icon: <BookOpen className="h-6 w-6" />,
      slug: "community-directory-2-0",
    },
  ];

  return (
    <section className="py-24 bg-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-medium mb-4">What's Coming Next</h2>
          <p className="text-muted-foreground text-lg">Building one neighbor at a time, for the real problems I keep seeing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {upcoming.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={`/beta/${item.slug}`}
                className="bg-white p-8 rounded-3xl border border-soft flex items-start gap-6 group hover:border-primary transition-all hover:shadow-md block"
              >
                <div className="h-12 w-12 shrink-0 rounded-full bg-secondary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  {item.icon}
                </div>
                <div className="space-y-2 flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-2xl font-medium">{item.title}</h3>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  <span className="inline-block text-sm font-medium text-primary pt-2">Join the Beta →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
