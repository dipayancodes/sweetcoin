import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { fadeInUp } from "@/lib/animations";
import { apiRequest } from "@/lib/queryClient";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeNewsletter = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter/subscribe", { email });
    },
    onSuccess: () => {
      toast({
        title: "🍭 Thanks for subscribing!",
        description: "You'll receive sweet updates soon!",
      });
      setEmail("");
    },
    onError: (error: Error) => {
      toast({
        title: "Subscription failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      subscribeNewsletter.mutate(email);
    } else {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Card className="glass border-0">
            <CardContent className="p-12">
              <motion.h2
                className="text-4xl font-bold text-foreground mb-4"
                variants={fadeInUp}
              >
                Stay Sweet & Informed 💌
              </motion.h2>
              
              <motion.p
                className="text-xl text-muted-foreground mb-8"
                variants={fadeInUp}
              >
                Subscribe to our newsletter for the latest updates, exclusive airdrops, 
                and sweet surprises!
              </motion.p>

              <motion.form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                variants={fadeInUp}
              >
                <Input
                  type="email"
                  placeholder="Enter your sweet email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 glass border-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground"
                  disabled={subscribeNewsletter.isPending}
                />
                <Button
                  type="submit"
                  disabled={subscribeNewsletter.isPending}
                  className="candy-gradient text-white hover:scale-105 transition-transform shadow-lg"
                >
                  {subscribeNewsletter.isPending ? "Subscribing..." : "Subscribe 🍭"}
                </Button>
              </motion.form>

              <motion.p
                className="text-sm text-muted-foreground mt-4"
                variants={fadeInUp}
              >
                No spam, just sweet updates. Unsubscribe anytime.
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
