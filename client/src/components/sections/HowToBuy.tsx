import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";

const buySteps = [
  {
    step: 1,
    title: "Setup Wallet",
    description: "Install Phantom, Solflare, or any Solana-compatible wallet and create your account",
    icon: "👛",
    gradient: "candy-gradient",
  },
  {
    step: 2,
    title: "Buy SOL", 
    description: "Purchase SOL from exchanges like Binance, Coinbase, or directly through your wallet",
    icon: "💰",
    gradient: "bg-gradient-to-r from-purple-500 to-blue-500",
  },
  {
    step: 3,
    title: "Transfer SOL",
    description: "Send SOL to your Solana wallet address",
    icon: "🔄",
    gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
  },
  {
    step: 4,
    title: "Swap for SWEET",
    description: "Use Jupiter or Raydium DEX to swap SOL for SweetCoin tokens",
    icon: "🍬",
    gradient: "bg-gradient-to-r from-cyan-500 to-green-500",
  },
];

export function HowToBuy() {
  const { toast } = useToast();
  const contractAddress = "SWEETxKg2vN8XC9PqWx3sM2nJ4aZ8bHQT5pLqR9kD3mN";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    toast({
      title: "Copied!",
      description: "Contract address copied to clipboard 🍭",
    });
  };

  return (
    <section id="buy" className="py-20 px-4 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
            variants={fadeInUp}
          >
            How to Buy <span className="text-gradient">SweetCoin</span> 🛒
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Get your sweet tokens in just 4 simple steps!
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {buySteps.map((step, index) => (
            <motion.div
              key={step.step}
              className="text-center group"
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass border-0 hover:scale-105 transition-transform duration-300 h-full">
                <CardContent className="p-8">
                  <motion.div
                    className="text-6xl mb-4 group-hover:animate-bounce"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.icon}
                  </motion.div>
                  
                  <div className={`${step.gradient} text-white text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4`}>
                    {step.step}
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Contract Address */}
        <motion.div
          className="text-center mt-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Card className="glass border-0 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Contract Address
              </h3>
              <div className="flex items-center justify-center space-x-3 bg-background/10 p-4 rounded-lg mb-4">
                <code className="text-sm font-mono break-all text-foreground">
                  {contractAddress}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="candy-gradient text-white border-0 hover:scale-105 transition-transform"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Always verify the contract address on official channels
              </p>
            </CardContent>
          </Card>

          <motion.div className="mt-8" variants={fadeInUp}>
            <Button
              size="lg"
              className="candy-gradient text-white hover:scale-105 transition-transform shadow-lg"
            >
              Start Buying Now 🚀
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
