import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ToolsGrid } from "@/components/sections/ToolsGrid";
import { Services } from "@/components/sections/Services";
import { Spotlight } from "@/components/sections/Spotlight";
import { Future } from "@/components/sections/Future";
import { ContactForm } from "@/components/sections/ContactForm";
import { SageAndSand } from "@/pages/SageAndSand";
import { BetaLanding } from "@/pages/BetaLanding";
import { TrialLanding } from "@/pages/TrialLanding";
import { ScrollToTop } from "@/components/ScrollToTop";

function HomePage() {
  return (
    <main className="flex-grow">
      <Hero />
      <About />
      <ToolsGrid />
      <Services />
      <Spotlight />
      <Future />
      <ContactForm />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sage-and-sand" element={<SageAndSand />} />
          <Route path="/beta/:slug" element={<BetaLanding />} />
          <Route path="/trial/:slug" element={<TrialLanding />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
