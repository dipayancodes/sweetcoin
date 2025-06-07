import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { NewsArticle } from "@shared/schema";

export function News() {
  const { data: articles, isLoading } = useQuery<NewsArticle[]>({
    queryKey: ["/api/news"],
  });

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    return d.toLocaleDateString();
  };

  const getCategoryColor = (category: string) => {
    switch (category.toUpperCase()) {
      case "DEX INTEGRATION":
        return "bg-pink-500";
      case "PARTNERSHIP":
        return "bg-purple-500";
      case "GAMIFICATION":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <section id="news" className="py-20 px-4">
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
            Sweet <span className="text-gradient">News</span> 📰
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Stay updated with the latest developments in the SweetCoin ecosystem.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="glass border-0">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : articles && articles.length > 0 ? (
            articles.map((article, index) => (
              <motion.article
                key={article.id}
                className="glass border-0 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={article.imageUrl || "https://images.unsplash.com/photo-1642790106117-e829e14a795f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <Badge className={`${getCategoryColor(article.category)} text-white mb-2`}>
                    {article.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(article.createdAt!)}
                    </span>
                    <button className="text-primary hover:text-primary/80 transition-colors text-sm font-semibold">
                      Read More →
                    </button>
                  </div>
                </CardContent>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No news articles available at the moment.</p>
            </div>
          )}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            size="lg"
            className="glass border-primary text-primary hover:scale-105 transition-transform"
          >
            View All News 📖
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
