
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Post, { PostData } from "@/components/feed/Post";
import { Card, CardContent } from "@/components/ui/card";

// Sample data for trending hashtags
const trendingTags = [
  "smallbusiness", "handmade", "sustainable", "localbusiness", 
  "startup", "entrepreneur", "craft", "organic", "eco"
];

// Sample data for our explore feed using the same PostData interface
const explorePosts: PostData[] = [
  {
    id: "5",
    businessName: "Eco Friendly Packaging",
    username: "ecopack",
    avatar: "https://i.pravatar.cc/150?img=20",
    timestamp: "4h ago",
    content: "Our new compostable packaging solutions are perfect for food businesses looking to reduce their environmental impact! #sustainable #packaging",
    image: "https://images.unsplash.com/photo-1604401839228-a89e9a8e2b14?q=80&w=1000&auto=format&fit=crop",
    likes: 86,
    comments: 14,
    product: {
      name: "Compostable Food Containers (50pk)",
      price: "$22.99",
      available: true
    },
    tags: ["sustainable", "packaging", "zerowaste", "smallbusiness"]
  },
  {
    id: "6",
    businessName: "Digital Marketing Hub",
    username: "digihub",
    avatar: "https://i.pravatar.cc/150?img=25",
    timestamp: "7h ago",
    content: "We're hosting a free webinar next week on 'Social Media Strategies for Small Businesses'! Limited spots available - sign up through the link in our bio.",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1000&auto=format&fit=crop",
    likes: 42,
    comments: 8,
    tags: ["digitalmarketing", "webinar", "socialmedia", "smallbusiness"]
  },
  {
    id: "7",
    businessName: "Craft Candle Co",
    username: "craftcandle",
    avatar: "https://i.pravatar.cc/150?img=30",
    timestamp: "1d ago",
    content: "Just restocked our bestselling scents! Each candle is hand-poured using 100% soy wax and premium fragrance oils.",
    image: "https://images.unsplash.com/photo-1603006905003-be475563b8ab?q=80&w=1000&auto=format&fit=crop",
    likes: 124,
    comments: 18,
    product: {
      name: "Lavender & Vanilla Soy Candle",
      price: "$18.99",
      available: true
    },
    tags: ["candles", "handmade", "homedecor", "selfcare"]
  },
  {
    id: "8",
    businessName: "Health Nuts",
    username: "healthnuts",
    avatar: "https://i.pravatar.cc/150?img=35",
    timestamp: "2d ago",
    content: "Looking for collaboration opportunities with fitness influencers and wellness coaches! We provide healthy, protein-packed snacks perfect for promoting alongside workout routines.",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1000&auto=format&fit=crop",
    likes: 56,
    comments: 27,
    tags: ["fitness", "health", "collaboration", "protein", "snacks"]
  }
];

const ExplorePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [userType, setUserType] = useState<"personal" | "business">("personal");
  
  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem("bizconnect-auth");
      if (!storedAuth) {
        navigate("/");
        return;
      }
      
      const authData = JSON.parse(storedAuth);
      if (!authData.isLoggedIn) {
        navigate("/");
      } else {
        setUserType(authData.accountType);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would query the backend
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      
      {/* Search Bar with hover effect */}
      <div className="mb-6 group">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 group-hover:text-bizconnect-orange transition-colors duration-300" />
            <Input
              type="search"
              placeholder="Search businesses, products, or hashtags"
              className="pl-9 transition-all duration-300 hover:border-bizconnect-orange focus-visible:ring-bizconnect-orange"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit" className="bg-bizconnect-orange hover:bg-bizconnect-orange/90 btn-hover-slide">
            Search
          </Button>
        </form>
      </div>
      
      {/* Trending Tags with hover effects */}
      <Card className="mb-6 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h2 className="text-lg font-medium mb-2">Trending Tags</h2>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag, i) => (
              <Badge 
                key={i} 
                className="bg-bizconnect-light-orange/20 hover:bg-bizconnect-light-orange/40 text-foreground hover:text-bizconnect-orange cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Content Tabs with hover effects */}
      <Tabs defaultValue="discover">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="discover" className="data-[state=active]:bg-bizconnect-orange data-[state=active]:text-white transition-all">Discover</TabsTrigger>
            <TabsTrigger value="businesses" className="data-[state=active]:bg-bizconnect-orange data-[state=active]:text-white transition-all">Businesses</TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-bizconnect-orange data-[state=active]:text-white transition-all">Products</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" className="hover:bg-secondary/80 transition-colors">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
        
        <TabsContent value="discover" className="mt-0">
          <div className="space-y-4">
            {explorePosts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="businesses" className="mt-0">
          <Card className="animated-border hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-lg">Businesses Directory Coming Soon</h3>
              <p className="text-muted-foreground mt-2">Browse and connect with small businesses in your area and specific industries.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="mt-0">
          <Card className="animated-border hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-lg">Product Marketplace Coming Soon</h3>
              <p className="text-muted-foreground mt-2">Browse products from various small businesses all in one place.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplorePage;
