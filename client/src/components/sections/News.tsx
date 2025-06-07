import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { NewsArticle } from "@shared/schema";

export function News() {
  const { data: articles, isLoading } = useQuery<NewsArticle[]>({
    queryKey: ["/api/news"],
  });

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "dex integration":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "partnership":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "gamification":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <section
      id="news"
      className="py-20 px-4 bg-gradient-to-br from-background via-background/95 to-primary/5"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6"
          >
            Latest Sweet News
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Stay updated with the latest developments, partnerships, and
            exciting announcements from the SweetCoin ecosystem.
          </motion.p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-48 mb-4" />
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-20 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles?.map((article, index) => (
              <motion.div
                key={article.id}
                variants={fadeInUp}
                custom={index}
                className="group"
              >
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50 bg-card/80 backdrop-blur-sm">
                  {article.imageUrl && (
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <Badge
                        className={`absolute top-4 left-4 ${getCategoryColor(article.category)} border-0 font-semibold`}
                      >
                        {article.category}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.createdAt!)}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <CardDescription className="text-base leading-relaxed line-clamp-3 mb-4">
                      {article.excerpt}
                    </CardDescription>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    >
                      Read More
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {articles && articles.length === 0 && (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <h3 className="text-2xl font-semibold text-muted-foreground mb-4">
              No news articles yet
            </h3>
            <p className="text-lg text-muted-foreground">
              Stay tuned for exciting updates from the SweetCoin team!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
