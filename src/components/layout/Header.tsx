import { Menu, X, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    { name: "About", href: isHome ? "#about" : "/#about" },
    { name: "Tools", href: isHome ? "#tools" : "/#tools" },
    { name: "Services", href: isHome ? "#services" : "/#services" },
    { name: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/10 transition-transform group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="Grow Local Creative Logo" 
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Fallback if logo.png is not found
                  e.currentTarget.src = "https://picsum.photos/seed/growlocal/100/100";
                }}
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-heading text-xl font-semibold tracking-tight hidden sm:block">Grow Local Creative</span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </a>
          ))}
          <Button variant="default" size="sm" asChild>
            <a href="#contact">Get in Touch</a>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-12">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-heading font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-6 border-t">
                  <p className="text-sm text-muted-foreground mb-4">Contact Info</p>
                  <div className="flex flex-col gap-3">
                    <a href="mailto:growlocalcreative@gmail.com" className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4" /> growlocalcreative@gmail.com
                    </a>
                    <a href="tel:9168694142" className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4" /> 916-869-4142
                    </a>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
