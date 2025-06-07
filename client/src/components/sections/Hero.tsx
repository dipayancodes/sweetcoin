import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TokenPriceWidget } from "@/components/ui/token-price-widget";
import { fadeInUp, staggerContainer, floatingAnimation } from "@/lib/animations";

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left space-y-8"
            variants={fadeInUp}
          >
            <motion.h1
              className="text-5xl lg:text-7xl font-bold leading-tight"
              variants={fadeInUp}
            >
              <span className="text-gradient">Sweet</span>
              <span className="text-foreground">Coin</span>
              <motion.div
                className="text-3xl lg:text-4xl mt-2 text-muted-foreground"
                variants={fadeInUp}
              >
                The Sweetest Token in DeFi 🍭
              </motion.div>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground max-w-2xl"
              variants={fadeInUp}
            >
              Join the candy-coated revolution where blockchain meets candyland. 
              Stake, earn, and sweeten your portfolio with SweetCoin.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={fadeInUp}
            >
              <Button
                size="lg"
                className="candy-gradient text-white hover:scale-105 transition-transform shadow-lg"
                onClick={() => scrollToSection("#buy")}
              >
                Buy SweetCoin 🛒
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="glass border-primary text-primary hover:scale-105 transition-transform"
                onClick={() => scrollToSection("#tokenomics")}
              >
                Learn More 📚
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <TokenPriceWidget />
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative flex justify-center"
            variants={fadeInUp}
          >
            <motion.div
              animate={floatingAnimation}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Colorful candy collection"
                className="rounded-3xl shadow-2xl max-w-full h-auto"
              />
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 text-4xl"
              animate={floatingAnimation}
              transition={{ delay: 0.5 }}
            >
              🍭
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 text-4xl"
              animate={floatingAnimation}
              transition={{ delay: 1 }}
            >
              🍪
            </motion.div>
            <motion.div
              className="absolute top-1/2 -right-8 text-3xl"
              animate={floatingAnimation}
              transition={{ delay: 1.5 }}
            >
              🧁
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
