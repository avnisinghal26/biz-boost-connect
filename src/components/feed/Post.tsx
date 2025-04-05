
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, Share2, ShoppingCart, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export interface PostData {
  id: string;
  businessName: string;
  username: string;
  avatar: string;
  timestamp: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  product?: {
    name: string;
    price: string;
    available: boolean;
  };
  tags: string[];
}

interface PostProps {
  post: PostData;
}

const Post = ({ post }: PostProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
    toast({
      title: saved ? "Post removed from saved items" : "Post saved successfully",
      duration: 2000,
    });
  };

  const handleComment = () => {
    toast({
      title: "Comments coming soon!",
      description: "This feature will be available in the next update."
    });
  };

  const handleShare = () => {
    toast({
      title: "Share coming soon!",
      description: "This feature will be available in the next update."
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Product page coming soon!",
      description: "This feature will be available in the next update."
    });
  };

  return (
    <Card className="mb-6 overflow-hidden shadow-custom hover:border-border/80 transition-all duration-300">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center space-x-3">
          <Link to={`/business/${post.username}`} className="hover:opacity-90 transition-opacity">
            <Avatar className="ring-2 ring-transparent hover:ring-primary/20 transition-all duration-300">
              <AvatarImage src={post.avatar} alt={post.businessName} />
              <AvatarFallback>{post.businessName[0]}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <Link to={`/business/${post.username}`} className="font-semibold hover-underline group transition-colors">
              {post.businessName}
            </Link>
            <p className="text-sm text-muted-foreground">@{post.username} · {post.timestamp}</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSave}>
            <Bookmark className={`h-4 w-4 transition-all ${saved ? 'fill-primary' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="mb-3">{post.content}</p>
        
        {post.image && (
          <div className="relative rounded-md overflow-hidden mb-3 group">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
        
        {post.product && (
          <div className="bg-secondary/30 rounded-md p-3 mb-3 border border-border hover:bg-secondary/50 transition-colors">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{post.product.name}</h4>
                <p className="text-bizconnect-orange font-bold text-gradient">{post.product.price}</p>
              </div>
              <Button 
                size="sm" 
                className="bg-bizconnect-orange hover:bg-bizconnect-orange/90 btn-hover-slide"
                onClick={handleBuyNow}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Buy Now
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="bg-bizconnect-light-orange/20 hover:bg-bizconnect-light-orange/30 transition-colors cursor-pointer"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-2 pt-0 border-t">
        <div className="flex justify-between w-full">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLike} 
            className={`${liked ? "text-bizconnect-orange" : ""} transition-colors duration-300 hover:bg-bizconnect-orange/10`}
          >
            <Heart className={`h-5 w-5 mr-1 transition-transform hover:scale-110 ${liked ? "fill-bizconnect-orange" : ""}`} />
            <span>{likeCount}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleComment}
            className="transition-colors duration-300 hover:bg-secondary/80"
          >
            <MessageCircle className="h-5 w-5 mr-1 transition-transform hover:scale-110" />
            <span>{post.comments}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleShare}
            className="transition-colors duration-300 hover:bg-secondary/80"
          >
            <Share2 className="h-5 w-5 mr-1 transition-transform hover:scale-110" />
            <span>Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
