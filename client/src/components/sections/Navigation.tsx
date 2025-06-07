import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/hooks/use-theme";
import { Menu, Moon, Sun } from "lucide-react";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#tokenomics", label: "Tokenomics" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#how-to-buy", label: "How to Buy" },
  { href: "#news", label: "News" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = (element as HTMLElement).offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      className="fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`bg-background/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 px-6 sm:px-8 ${
        isScrolled ? "bg-background/30 shadow-3xl" : ""
      }`}>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="text-3xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              🍭
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              SweetCoin
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium hover:scale-105 px-3 py-2 rounded-lg hover:bg-white/5"
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4 text-primary" />
              ) : (
                <Sun className="h-4 w-4 text-amber-400" />
              )}
            </Button>

            {/* Buy Button - Desktop */}
            <Button className="hidden md:block bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Buy Now
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l border-white/10">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className="text-left py-3 text-foreground hover:text-primary transition-all duration-300 font-medium hover:bg-white/5 rounded-lg px-3"
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-white w-full mt-6 shadow-lg">
                    Buy Now
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}