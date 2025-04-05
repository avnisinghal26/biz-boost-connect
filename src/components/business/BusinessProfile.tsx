
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ShoppingBag, Grid, Users, MapPin, Globe, Instagram, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import Post, { PostData } from "../feed/Post";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

interface BusinessData {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  bio: string;
  location: string;
  website: string;
  instagram: string;
  followers: number;
  following: number;
  posts: PostData[];
  verified?: boolean;
}

interface BusinessProfileProps {
  businessId?: string;
  businessUsername?: string;
}

// Demo data for businesses
const businessesData: Record<string, BusinessData> = {
  "organicdelights": {
    id: "1",
    name: "Organic Delights",
    username: "organicdelights",
    avatar: "https://i.pravatar.cc/150?img=1",
    coverImage: "https://images.unsplash.com/photo-1577219491135-ce391e53ba7f?q=80&w=1470&auto=format&fit=crop",
    bio: "Small-batch organic food products made with love. Supporting local farmers since 2018.",
    location: "Portland, Oregon",
    website: "www.organicdelights.com",
    instagram: "@organic_delights",
    followers: 1245,
    following: 652,
    verified: true,
    posts: [
      {
        id: "1",
        businessName: "Organic Delights",
        username: "organicdelights",
        avatar: "https://i.pravatar.cc/150?img=1",
        timestamp: "2h ago",
        content: "Just launched our new organic honey collection! Sourced from local beekeepers and 100% natural.",
        image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?q=80&w=1000&auto=format&fit=crop",
        likes: 42,
        comments: 8,
        product: {
          name: "Premium Organic Honey",
          price: "$12.99",
          available: true
        },
        tags: ["organic", "honey", "natural"]
      },
      {
        id: "2",
        businessName: "Organic Delights",
        username: "organicdelights",
        avatar: "https://i.pravatar.cc/150?img=1",
        timestamp: "3d ago",
        content: "Our best-selling granola now comes in a new recyclable packaging! Same great taste, better for the environment.",
        image: "https://images.unsplash.com/photo-1544621678-7035edb891d1?q=80&w=1000&auto=format&fit=crop",
        likes: 38,
        comments: 5,
        product: {
          name: "Premium Granola Mix",
          price: "$8.99",
          available: true
        },
        tags: ["breakfast", "organic", "sustainable"]
      }
    ]
  },
  "craftedgems": {
    id: "2",
    name: "Handcrafted Gems",
    username: "craftedgems",
    avatar: "https://i.pravatar.cc/150?img=5",
    coverImage: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1470&auto=format&fit=crop",
    bio: "Unique handcrafted jewelry made with love. Each piece tells a story.",
    location: "Austin, Texas",
    website: "www.craftedgems.com",
    instagram: "@crafted_gems",
    followers: 3210,
    following: 287,
    verified: false,
    posts: [
      {
        id: "3",
        businessName: "Handcrafted Gems",
        username: "craftedgems",
        avatar: "https://i.pravatar.cc/150?img=5",
        timestamp: "5h ago",
        content: "Looking for collaboration opportunities with other small businesses! We create handcrafted jewelry and are looking for boutiques to partner with. DM if interested! ✨",
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000&auto=format&fit=crop",
        likes: 28,
        comments: 15,
        tags: ["smallbusiness", "jewelry", "handmade", "collaboration"]
      },
      {
        id: "4",
        businessName: "Handcrafted Gems",
        username: "craftedgems",
        avatar: "https://i.pravatar.cc/150?img=5",
        timestamp: "2d ago",
        content: "New collection of handmade bracelets just launched! Each one is unique and crafted with care.",
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1000&auto=format&fit=crop",
        likes: 56,
        comments: 12,
        product: {
          name: "Artisan Bracelet",
          price: "$24.99",
          available: true
        },
        tags: ["jewelry", "handmade", "accessories"]
      }
    ]
  },
  "sustainliving": {
    id: "3",
    name: "Sustainable Living Shop",
    username: "sustainliving",
    avatar: "https://i.pravatar.cc/150?img=22",
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop",
    bio: "Promoting sustainable living through eco-friendly products. Our mission is to make sustainability accessible to everyone.",
    location: "Seattle, Washington",
    website: "www.sustainableliving.com",
    instagram: "@sustain_living",
    followers: 5432,
    following: 341,
    verified: true,
    posts: [
      {
        id: "5",
        businessName: "Sustainable Living Shop",
        username: "sustainliving",
        avatar: "https://i.pravatar.cc/150?img=22",
        timestamp: "1d ago",
        content: "Join our workshop on creating zero-waste home products this weekend! Limited spots available.",
        image: "https://images.unsplash.com/photo-1584992236310-6aded638d571?q=80&w=1000&auto=format&fit=crop",
        likes: 89,
        comments: 34,
        tags: ["sustainability", "workshop", "zerowaste"]
      }
    ]
  }
};

const BusinessProfile = ({ businessId, businessUsername }: BusinessProfileProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();
  const [business, setBusiness] = useState<BusinessData | null>(null);
  
  useEffect(() => {
    // In a real app, we would fetch the business data based on username or ID
    // For now, we'll use our sample data
    if (businessUsername && businessesData[businessUsername]) {
      setBusiness(businessesData[businessUsername]);
    } else if (businessId) {
      // Find by ID if we had a real API
      // For now just use the first business as default
      setBusiness(businessesData.organicdelights);
    } else {
      // Default case
      setBusiness(businessesData.organicdelights);
    }
  }, [businessId, businessUsername]);
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing ? `You've unfollowed ${business?.name}` : `You're now following ${business?.name}`,
    });
  };
  
  const handleMessage = () => {
    toast({
      title: "Messages coming soon!",
      description: "This feature will be available in the next update."
    });
  };

  if (!business) {
    return <div className="flex items-center justify-center min-h-[70vh]">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Cover Image & Avatar */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden rounded-md">
        <img 
          src={business.coverImage} 
          alt={`${business.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute -bottom-12 left-4 h-24 w-24 rounded-full border-4 border-background overflow-hidden ring-2 ring-primary/20 shadow-xl">
          <img 
            src={business.avatar} 
            alt={business.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="pt-12 px-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mr-2">{business.name}</h1>
              {business.verified && (
                <span className="text-bizconnect-orange">
                  <Sparkles className="h-5 w-5" />
                </span>
              )}
            </div>
            <p className="text-muted-foreground">@{business.username}</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleMessage}
              className="border-border/60 hover:bg-secondary/50"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Message
            </Button>
            <Button 
              size="sm"
              className={isFollowing ? "bg-secondary hover:bg-secondary/80" : "bg-bizconnect-orange hover:bg-bizconnect-orange/90"}
              onClick={handleFollow}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm">{business.bio}</p>
        </div>
        
        <div className="flex flex-wrap gap-y-2 mt-4 text-sm text-muted-foreground">
          {business.location && (
            <div className="flex items-center mr-4">
              <MapPin className="h-4 w-4 mr-1" />
              {business.location}
            </div>
          )}
          {business.website && (
            <div className="flex items-center mr-4">
              <Globe className="h-4 w-4 mr-1" />
              <a href={`https://${business.website}`} target="_blank" rel="noopener noreferrer" className="text-bizconnect-orange hover:underline">
                {business.website}
              </a>
            </div>
          )}
          {business.instagram && (
            <div className="flex items-center">
              <Instagram className="h-4 w-4 mr-1" />
              <span>{business.instagram}</span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-4 mt-4 text-sm">
          <div>
            <span className="font-bold">{business.followers.toLocaleString()}</span> followers
          </div>
          <div>
            <span className="font-bold">{business.following.toLocaleString()}</span> following
          </div>
        </div>
        
        <Separator className="my-4 bg-border/40" />
      </div>
      
      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary/30">
          <TabsTrigger value="posts" className="data-[state=active]:bg-secondary/70">
            <Grid className="h-4 w-4 mr-1" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-secondary/70">
            <ShoppingBag className="h-4 w-4 mr-1" />
            Products
          </TabsTrigger>
          <TabsTrigger value="collaborations" className="data-[state=active]:bg-secondary/70">
            <Users className="h-4 w-4 mr-1" />
            Collaborations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-4">
          <div className="space-y-4">
            {business.posts.map(post => (
              <Post key={post.id} post={post} />
            ))}
            {business.posts.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No posts yet</p>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="mt-4">
          <div className="flex justify-center items-center p-8 bg-secondary/30 rounded-md">
            <div className="text-center">
              <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">Products coming soon</h3>
              <p className="text-muted-foreground mt-1">The full product showcase will be available in our next update.</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="collaborations" className="mt-4">
          <div className="flex justify-center items-center p-8 bg-secondary/30 rounded-md">
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">Collaborations coming soon</h3>
              <p className="text-muted-foreground mt-1">Find and connect with other businesses for collaborations in our next update.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessProfile;
