import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const socialLinks = [
  { icon: "📱", label: "Telegram", href: "https://t.me/sweetcoin" },
  { icon: "🐦", label: "Twitter", href: "https://twitter.com/sweetcoin" },
  { icon: "💬", label: "Discord", href: "https://discord.gg/sweetcoin" },
  { icon: "🔗", label: "Solana Explorer", href: "#" },
];

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "How to Buy", href: "#buy" },
];

const resources = [
  { label: "Whitepaper", href: "#" },
  { label: "Audit Report", href: "#" },
  { label: "Brand Kit", href: "#" },
  { label: "Documentation", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <footer className="py-16 px-4 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div className="space-y-4" variants={fadeInUp}>
            <div className="flex items-center space-x-2">
              <motion.div
                className="text-3xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                🍬
              </motion.div>
              <span className="text-2xl font-bold text-gradient">SweetCoin</span>
            </div>
            <p className="text-muted-foreground">
              The sweetest token in DeFi, bringing joy and profits to every holder.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-2xl hover:scale-110 transition-transform"
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-foreground font-bold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-foreground font-bold text-lg mb-4">Resources</h3>
            <div className="space-y-2">
              {resources.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-foreground font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-muted-foreground">
              <div>partnerships@sweetcoin.com</div>
              <div>support@sweetcoin.com</div>
              <div>
                Solana Explorer:{" "}
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  View Contract
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-border pt-8"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 SweetCoin. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <motion.div
            className="mt-8 p-4 bg-muted/50 rounded-xl"
            variants={fadeInUp}
          >
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              <strong>Disclaimer:</strong> SweetCoin is a meme token created for entertainment purposes.
              Cryptocurrency investments carry high risk and you should only invest what you can afford to lose.
              This is not financial advice. Please do your own research before investing.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
