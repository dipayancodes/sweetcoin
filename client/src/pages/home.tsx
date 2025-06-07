import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { CandyDivider } from "@/components/ui/candy-divider";
import { Tokenomics } from "@/components/sections/Tokenomics";
import { Roadmap } from "@/components/sections/Roadmap";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { News } from "@/components/sections/News";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preload critical resources
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navigation />
        
        <main>
          <Hero />
          <CandyDivider />
          <Tokenomics />
          <CandyDivider className="rotate-180" />
          <Roadmap />
          <CandyDivider />
          <HowToBuy />
          <CandyDivider className="rotate-180" />
          <News />
          <CandyDivider />
          <Newsletter />
        </main>

        <Footer />
      </div>
    </>
  );
}
