import { users, newsletters, newsArticles, tokenData, type User, type InsertUser, type Newsletter, type InsertNewsletter, type NewsArticle, type InsertNewsArticle, type TokenData, type InsertTokenData } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
  
  getNewsArticles(): Promise<NewsArticle[]>;
  getNewsArticle(id: number): Promise<NewsArticle | undefined>;
  createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle>;
  
  getTokenData(): Promise<TokenData | undefined>;
  updateTokenData(data: InsertTokenData): Promise<TokenData>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private newsletters: Map<number, Newsletter>;
  private newsArticles: Map<number, NewsArticle>;
  private tokenData: TokenData | undefined;
  private currentId: number;
  private newsletterId: number;
  private articleId: number;

  constructor() {
    this.users = new Map();
    this.newsletters = new Map();
    this.newsArticles = new Map();
    this.currentId = 1;
    this.newsletterId = 1;
    this.articleId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Initialize token data
    this.tokenData = {
      id: 1,
      price: "$0.0847",
      change24h: "+12.5%",
      marketCap: "$4.2M",
      volume24h: "$850K",
      totalSupply: "1B",
      holders: "12.5K",
      updatedAt: new Date(),
    };

    // Initialize news articles
    const sampleArticles: (NewsArticle & { id: number })[] = [
      {
        id: 1,
        title: "SweetCoin Now Listed on Jupiter DEX",
        content: "We're excited to announce that SweetCoin is now available for trading on Jupiter, Solana's premier DEX aggregator. This integration opens up new liquidity opportunities and makes it easier than ever for users to swap their tokens for SWEET.",
        excerpt: "We're excited to announce that SweetCoin is now available for trading on Jupiter, Solana's premier DEX aggregator...",
        category: "DEX INTEGRATION",
        imageUrl: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        published: true,
      },
      {
        id: 2,
        title: "Strategic Partnership with Magic Eden",
        content: "SweetCoin partners with Magic Eden to launch exclusive candy-themed NFT collections with special utility features. NFT holders will receive exclusive staking rewards and access to premium features in our ecosystem.",
        excerpt: "SweetCoin partners with Magic Eden to launch exclusive candy-themed NFT collections with special utility features...",
        category: "PARTNERSHIP",
        imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        published: true,
      },
      {
        id: 3,
        title: "Sweet Games Beta Launch",
        content: "Experience our new play-to-earn gaming platform where you can earn SWEET tokens by playing candy-themed mini-games. The beta version includes three exciting games with more coming soon.",
        excerpt: "Experience our new play-to-earn gaming platform where you can earn SWEET tokens by playing candy-themed mini-games...",
        category: "GAMIFICATION",
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        published: true,
      },
    ];

    sampleArticles.forEach(article => {
      this.newsArticles.set(article.id, article);
      this.articleId = Math.max(this.articleId, article.id + 1);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.newsletterId++;
    const newsletter: Newsletter = {
      ...insertNewsletter,
      id,
      subscribed: true,
      createdAt: new Date(),
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email,
    );
  }

  async getNewsArticles(): Promise<NewsArticle[]> {
    return Array.from(this.newsArticles.values())
      .filter(article => article.published)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getNewsArticle(id: number): Promise<NewsArticle | undefined> {
    return this.newsArticles.get(id);
  }

  async createNewsArticle(insertArticle: InsertNewsArticle): Promise<NewsArticle> {
    const id = this.articleId++;
    const article: NewsArticle = {
      ...insertArticle,
      id,
      createdAt: new Date(),
    };
    this.newsArticles.set(id, article);
    return article;
  }

  async getTokenData(): Promise<TokenData | undefined> {
    return this.tokenData;
  }

  async updateTokenData(insertData: InsertTokenData): Promise<TokenData> {
    const updatedData: TokenData = {
      id: this.tokenData?.id || 1,
      ...insertData,
      updatedAt: new Date(),
    };
    this.tokenData = updatedData;
    return updatedData;
  }
}

export const storage = new MemStorage();
