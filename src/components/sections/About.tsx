import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="py-24 bg-cream/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
              <img
                src="/spruce-leaves.jpg"
                alt="Spruce leaves in the Foothills"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://picsum.photos/seed/pinetrees/800/1000";
                }}
              />
            </div>
            {/* Decorative Badge */}
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-secondary flex items-center justify-center text-center p-4 shadow-xl rotate-12">
              <span className="font-heading text-sm font-bold text-secondary-foreground leading-tight">
                A Neighbor, Not a Corporation
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground">
                "Hi, I'm your local professional button pusher."
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full" />
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I live right here in Cool, CA, and I spend a lot of time sitting across the table from good people in the Foothills—makers, small business owners, church volunteers, nonprofit heroes—who just want their tech to work without the headache.
              </p>
              <p>
                That's where I come in. I know about 10% more than you do about this stuff, and honestly, that's usually enough. I'm not here to impress you with jargon or oversell you on things you don't need.
              </p>
              <p className="font-medium text-foreground">
                I'm here to spot the messy patterns, push the right buttons, and help you get back to what you actually love doing.
              </p>
              <p>
                Over the years I've helped local businesses get their websites sorted, set up Google the right way, untangle social media, and generally calm the chaos. More recently, I've started building simple, phone-friendly tools and PWA apps, one neighbor at a time, for the real problems I keep seeing right here in our community.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
