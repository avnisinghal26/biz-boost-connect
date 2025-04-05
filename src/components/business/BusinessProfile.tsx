
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ShoppingBag, Grid, Users, MapPin, Globe, Instagram } from "lucide-react";
import { useState } from "react";
import Post, { PostData } from "../feed/Post";
import { useToast } from "@/components/ui/use-toast";

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
}

interface BusinessProfileProps {
  businessId?: string;
}

const sampleBusiness: BusinessData = {
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
};

const BusinessProfile = ({ businessId }: BusinessProfileProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();
  
  // In a real app, we would fetch business data based on businessId
  const business = sampleBusiness;
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing ? `You've unfollowed ${business.name}` : `You're now following ${business.name}`,
    });
  };
  
  const handleMessage = () => {
    toast({
      title: "Messages coming soon!",
      description: "This feature will be available in the next update."
    });
  };

  return (
    <div className="space-y-6 animate-in-custom">
      {/* Cover Image & Avatar */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden rounded-md">
        <img 
          src={business.coverImage} 
          alt={`${business.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-12 left-4 h-24 w-24 rounded-full border-4 border-white overflow-hidden">
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
            <h1 className="text-2xl font-bold">{business.name}</h1>
            <p className="text-gray-500">@{business.username}</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleMessage}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Message
            </Button>
            <Button 
              size="sm"
              className={isFollowing ? "bg-gray-200 hover:bg-gray-300 text-black" : "bg-bizconnect-orange hover:bg-bizconnect-orange/90"}
              onClick={handleFollow}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm">{business.bio}</p>
        </div>
        
        <div className="flex flex-wrap gap-y-2 mt-4 text-sm text-gray-500">
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
            <span className="font-bold">{business.followers}</span> followers
          </div>
          <div>
            <span className="font-bold">{business.following}</span> following
          </div>
        </div>
      </div>
      
      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">
            <Grid className="h-4 w-4 mr-1" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="products">
            <ShoppingBag className="h-4 w-4 mr-1" />
            Products
          </TabsTrigger>
          <TabsTrigger value="collaborations">
            <Users className="h-4 w-4 mr-1" />
            Collaborations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-4">
          <div className="space-y-4">
            {business.posts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="mt-4">
          <div className="flex justify-center items-center p-8 bg-gray-50 rounded-md">
            <div className="text-center">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">Products coming soon</h3>
              <p className="text-gray-500 mt-1">The full product showcase will be available in our next update.</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="collaborations" className="mt-4">
          <div className="flex justify-center items-center p-8 bg-gray-50 rounded-md">
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">Collaborations coming soon</h3>
              <p className="text-gray-500 mt-1">Find and connect with other businesses for collaborations in our next update.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessProfile;
