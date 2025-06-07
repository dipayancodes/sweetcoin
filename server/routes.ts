import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getNewsletterByEmail(validatedData.email);
      if (existingSubscription) {
        return res.status(400).json({ 
          message: "Email already subscribed to newsletter" 
        });
      }

      const subscription = await storage.subscribeNewsletter(validatedData);
      res.json({ 
        message: "Successfully subscribed to newsletter!",
        subscription: { email: subscription.email, subscribed: subscription.subscribed }
      });
    } catch (error) {
      res.status(400).json({ 
        message: "Invalid email address" 
      });
    }
  });

  // Get news articles endpoint
  app.get("/api/news", async (req, res) => {
    try {
      const articles = await storage.getNewsArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch news articles" 
      });
    }
  });

  // Get single news article endpoint
  app.get("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid article ID" });
      }

      const article = await storage.getNewsArticle(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.json(article);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch article" 
      });
    }
  });

  // Get token data endpoint
  app.get("/api/token", async (req, res) => {
    try {
      const tokenData = await storage.getTokenData();
      if (!tokenData) {
        return res.status(404).json({ message: "Token data not found" });
      }
      res.json(tokenData);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch token data" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
