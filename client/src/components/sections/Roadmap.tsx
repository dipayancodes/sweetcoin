import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const roadmapPhases = [
  {
    phase: "Phase 1: Sweet Launch 🚀",
    description: "Token launch, initial liquidity, and community building",
    status: "COMPLETED",
    statusColor: "bg-green-500",
    icon: "🍭",
    gradient: "candy-gradient",
    side: "left",
  },
  {
    phase: "Phase 2: Candy Store 🏪", 
    description: "NFT marketplace, staking rewards, and partnership announcements",
    status: "IN PROGRESS",
    statusColor: "bg-yellow-500",
    icon: "🍬",
    gradient: "candy-gradient-2",
    side: "right",
  },
  {
    phase: "Phase 3: Sweet Ecosystem 🌍",
    description: "Multi-chain expansion, governance token, and DAO launch",
    status: "Q2 2024",
    statusColor: "bg-blue-500",
    icon: "🧁",
    gradient: "bg-gradient-to-r from-blue-400 to-cyan-400",
    side: "left",
  },
  {
    phase: "Phase 4: Candy Empire 👑",
    description: "Global expansion, institutional partnerships, and major exchange listings",
    status: "Q3 2024",
    statusColor: "bg-purple-500",
    icon: "🍰",
    gradient: "bg-gradient-to-r from-purple-400 to-pink-400",
    side: "right",
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="py-20 px-4">
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
            Sweet <span className="text-gradient">Roadmap</span> 🗺️
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Our journey to make DeFi sweeter, one milestone at a time.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 candy-gradient h-full rounded-full hidden lg:block" />

          <motion.div
            className="space-y-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {roadmapPhases.map((phase, index) => (
              <motion.div
                key={index}
                className={`flex items-center ${
                  phase.side === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
                } flex-col lg:justify-between`}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
              >
                {/* Content Card */}
                <div className={`w-full lg:w-5/12 ${
                  phase.side === "left" ? "lg:pr-8" : "lg:pl-8"
                } mb-4 lg:mb-0`}>
                  <Card className="glass border-0 hover:scale-105 transition-transform duration-300">
                    <CardContent className="p-6">
                      <Badge className={`${phase.statusColor} text-white mb-3`}>
                        {phase.status}
                      </Badge>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {phase.phase}
                      </h3>
                      <p className="text-muted-foreground">
                        {phase.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Icon */}
                <motion.div
                  className={`flex-shrink-0 w-16 h-16 ${phase.gradient} rounded-full flex items-center justify-center text-2xl relative z-10 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  {phase.icon}
                </motion.div>

                {/* Spacer for alignment */}
                <div className="w-full lg:w-5/12 hidden lg:block" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
