import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Map, Users, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function ToolsGrid() {
  const tools = [
    {
      title: "RebaLove Ranch",
      description: "Custom ranch sitting app for a small local ranch",
      icon: <Heart className="h-6 w-6" />,
      tag: "Custom App",
      trialSlug: "rebalove-ranch",
    },
    {
      title: "Gold Country Directory",
      description: "A resource hub for our foothill communities",
      icon: <Map className="h-6 w-6" />,
      tag: "Community",
      trialSlug: "gold-country-directory",
    },
    {
      title: "The Wedding Elephant",
      description: "Planning tool for couples in the region",
      icon: <Sparkles className="h-6 w-6" />,
      tag: "Planning",
      trialSlug: "the-wedding-elephant",
    },
    {
      title: "Sage & Sand",
      description: "A calm hub for craft makers & market vendors",
      icon: <Users className="h-6 w-6" />,
      tag: "Vendor Tool",
      trialSlug: "sage-and-sand",
    },
  ];

  return (
    <section id="tools" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-heading text-4xl md:text-5xl font-medium">Tools I've Built for Folks Around Here</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Simple, phone-friendly tools designed for the real problems I keep seeing in our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-soft transition-all hover:shadow-lg hover:-translate-y-1 group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {tool.icon}
                  </div>
                  <Badge variant="secondary" className="w-fit mb-2">{tool.tag}</Badge>
                  <CardTitle className="font-heading text-2xl">{tool.title}</CardTitle>
                  <CardDescription className="text-base">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link 
                    to={`/trial/${tool.trialSlug}`}
                    className="inline-flex w-full items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors"
                  >
                    Try for Free <Zap className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
