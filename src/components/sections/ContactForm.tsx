import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { db, handleFirestoreError, OperationType } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "contactMessages"), data);
      setIsSuccess(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "contactMessages");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-xl border border-soft overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Info Side */}
            <div className="bg-primary p-8 md:p-16 text-primary-foreground space-y-12">
              <div className="space-y-6">
                <h2 className="font-heading text-4xl md:text-5xl font-medium">Let's sit down and talk it through.</h2>
                <p className="text-primary-foreground/70 text-lg leading-relaxed">
                  Got a problem or an idea that's driving you nuts? Whether it's your website, your Google setup, or something I haven't even thought of yet, I'm right here in Cool, helping one neighbor at a time.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/50 uppercase tracking-wider font-bold">Email Me</p>
                    <p className="text-lg font-medium">growlocalcreative@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/50 uppercase tracking-wider font-bold">Call or Text</p>
                    <p className="text-lg font-medium">916-869-4142</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/50 uppercase tracking-wider font-bold">Location</p>
                    <p className="text-lg font-medium">Based in Cool, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-8 md:p-16">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
                    <Send className="h-10 w-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading text-3xl font-medium">Message Sent!</h3>
                    <p className="text-muted-foreground">Thanks for reaching out. I'll get back to you soon, neighbor.</p>
                  </div>
                  <Button variant="outline" onClick={() => setIsSuccess(false)}>Send another message</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" name="name" placeholder="Sierra Sage" required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" name="email" type="email" placeholder="sierra@example.com" required className="rounded-xl" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">What can I help with?</Label>
                    <Input id="subject" name="subject" placeholder="Website Rescue, Google Setup, etc." required className="rounded-xl" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tell me a bit more</Label>
                    <Textarea id="message" name="message" placeholder="Describe your challenge or idea..." className="min-h-[150px] rounded-xl" required />
                  </div>

                  <Button type="submit" className="w-full py-6 text-lg rounded-xl" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
