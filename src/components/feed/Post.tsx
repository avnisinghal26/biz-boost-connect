
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, Share2, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
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
    <Card className="mb-6 overflow-hidden animate-in-custom shadow-custom">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center space-x-3">
          <Link to={`/business/${post.username}`}>
            <Avatar>
              <AvatarImage src={post.avatar} alt={post.businessName} />
              <AvatarFallback>{post.businessName[0]}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <Link to={`/business/${post.username}`} className="font-semibold hover:underline">
              {post.businessName}
            </Link>
            <p className="text-sm text-gray-500">@{post.username}</p>
          </div>
          <span className="text-xs text-gray-500">{post.timestamp}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="mb-3">{post.content}</p>
        
        {post.image && (
          <div className="relative rounded-md overflow-hidden mb-2">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        {post.product && (
          <div className="bg-gray-50 rounded-md p-3 mb-2 border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{post.product.name}</h4>
                <p className="text-bizconnect-orange font-bold">{post.product.price}</p>
              </div>
              <Button 
                size="sm" 
                className="bg-bizconnect-orange hover:bg-bizconnect-orange/90"
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
            <Badge key={index} variant="outline" className="bg-bizconnect-light-orange/20 hover:bg-bizconnect-light-orange/30">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-2 pt-0 border-t">
        <div className="flex justify-between w-full">
          <Button variant="ghost" size="sm" onClick={handleLike} className={liked ? "text-bizconnect-orange" : ""}>
            <Heart className={`h-5 w-5 mr-1 ${liked ? "fill-bizconnect-orange" : ""}`} />
            <span>{likeCount}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleComment}>
            <MessageCircle className="h-5 w-5 mr-1" />
            <span>{post.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-5 w-5 mr-1" />
            <span>Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
