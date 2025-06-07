import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TokenPriceWidget() {
  const [animatedPrice, setAnimatedPrice] = useState("$0.0847");
  
  const { data: tokenData, isLoading } = useQuery({
    queryKey: ["/api/token"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Simulate price fluctuations for demo
  useEffect(() => {
    const interval = setInterval(() => {
      const basePrice = 0.0847;
      const variation = (Math.random() - 0.5) * 0.002;
      const newPrice = Math.max(0.01, basePrice + variation);
      setAnimatedPrice(`$${newPrice.toFixed(4)}`);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <Card className="glass border-0">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-8 w-24 mb-2" />
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-4 w-24" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="glass border-0 hover:scale-105 transition-transform duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🍬</div>
              <span className="font-bold text-foreground">STC/SOL</span>
            </div>
            <div className="text-green-500 text-sm font-semibold">
              {tokenData?.change24h || "+12.5% 24h"}
            </div>
          </div>
          
          <motion.div
            className="text-3xl font-bold text-foreground mb-2"
            key={animatedPrice}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {animatedPrice}
          </motion.div>
          
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              Market Cap: {tokenData?.marketCap || "$4.2M"}
            </div>
            <div className="text-sm text-muted-foreground">
              Volume (24h): {tokenData?.volume24h || "$850K"}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
