import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TokenomicsChart } from "@/components/ui/tokenomics-chart";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const tokenDistribution = [
  { label: "Liquidity Pool", percentage: 40, color: "bg-[hsl(340,82%,52%)]" },
  { label: "Community", percentage: 25, color: "bg-[hsl(270,70%,55%)]" },
  { label: "Development", percentage: 20, color: "bg-[hsl(180,65%,55%)]" },
  { label: "Airdrops", percentage: 10, color: "bg-[hsl(50,90%,60%)]" },
  { label: "Marketing", percentage: 5, color: "bg-[hsl(25,95%,53%)]" },
];

const tokenStats = [
  { label: "Total Supply", value: "1B", icon: "🎯" },
  { label: "Burned", value: "100M", icon: "🔥" },
  { label: "Holders", value: "12.5K", icon: "💎" },
  { label: "Locked", value: "50%", icon: "🚀" },
];

export function Tokenomics() {
  return (
    <section id="tokenomics" className="py-20 px-4 bg-muted/20">
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
            Sweet <span className="text-gradient">Tokenomics</span> 📊
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Our carefully crafted tokenomics ensure sustainable growth and maximum 
            sweetness for all holders.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Distribution Details */}
          <div className="space-y-8">
            <motion.div variants={fadeInUp}>
              <Card className="glass border-0">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Token Distribution
                  </h3>
                  
                  <div className="space-y-4">
                    {tokenDistribution.map((item, index) => (
                      <motion.div
                        key={item.label}
                        className="flex items-center justify-between"
                        variants={fadeInUp}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded ${item.color}`} />
                          <span className="text-foreground">{item.label}</span>
                        </div>
                        <span className="font-bold text-foreground">
                          {item.percentage}%
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="glass border-0">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Sweet Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {tokenStats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="text-center p-4 bg-background/10 rounded-xl"
                        variants={fadeInUp}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-3xl mb-2">{stat.icon}</div>
                        <div className="text-2xl font-bold text-primary mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Tokenomics Chart */}
          <motion.div
            className="flex justify-center"
            variants={fadeInUp}
          >
            <TokenomicsChart />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
