import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "@/components/feed/PostList";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Sparkles, Filter, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface AuthData {
  isLoggedIn: boolean;
  accountType: "personal" | "business";
  username: string;
  avatar: string;
}

const FeedPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<AuthData | null>(null);
  
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
        setAuth(authData);
      }
    };
    
    checkAuth();
  }, [navigate]);

  if (!auth) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 bg-card p-4 rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl font-bold">Your Feed</h1>
          <p className="text-muted-foreground">Latest updates from businesses and connections</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="border-border/60 hover:bg-secondary/50">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>

          {auth.accountType === "business" && (
            <Button size="sm" className="bg-bizconnect-orange hover:bg-bizconnect-orange/90" asChild>
              <Link to="/create">
                <PlusCircle className="h-4 w-4 mr-2" /> Create Post
              </Link>
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Featured post card with hover effect */}
          <Card className="bg-gradient-to-r from-bizconnect-orange/20 to-background overflow-hidden border-bizconnect-orange/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <Sparkles className="h-5 w-5 text-bizconnect-orange mr-2" />
                <span className="text-sm font-medium">Featured Post</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Link to="/business/sustainliving" className="flex items-center hover:opacity-90 transition-opacity">
                    <Avatar className="h-10 w-10 ring-2 ring-primary/20 hover:ring-primary/30 transition-all">
                      <AvatarImage src="https://i.pravatar.cc/150?img=22" alt="Featured business" />
                      <AvatarFallback>FB</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <h3 className="font-medium hover:text-primary transition-colors">Sustainable Living Shop</h3>
                      <p className="text-xs text-muted-foreground">@sustainliving</p>
                    </div>
                  </Link>
                </div>
                <p>Join our workshop on creating zero-waste home products this weekend! Limited spots available.</p>
                <div className="overflow-hidden rounded-md">
                  <img 
                    src="https://images.unsplash.com/photo-1584992236310-6aded638d571?q=80&w=1000&auto=format&fit=crop" 
                    alt="Zero waste workshop" 
                    className="w-full h-48 object-cover rounded-md transform group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="text-sm text-muted-foreground flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-bizconnect-light-orange/20 hover:bg-bizconnect-light-orange/30 transition-colors cursor-pointer">
                    #sustainability
                  </Badge>
                  <Badge variant="outline" className="bg-bizconnect-light-orange/20 hover:bg-bizconnect-light-orange/30 transition-colors cursor-pointer">
                    #workshop
                  </Badge>
                  <Badge variant="outline" className="bg-bizconnect-light-orange/20 hover:bg-bizconnect-light-orange/30 transition-colors cursor-pointer">
                    #zerowaste
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Regular feed posts */}
          <PostList />
        </div>
        
        <div className="hidden md:block">
          <div className="sticky top-20">
            <Card className="mb-6 hover:shadow-md transition-shadow bg-card">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-primary" />
                  Suggested For You
                </h3>
                <Separator className="mb-3 bg-border/40" />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/40 transition-colors">
                      <Link to={`/business/business${i}`} className="flex items-center">
                        <Avatar className="h-8 w-8 ring-1 ring-primary/20">
                          <AvatarImage src={`https://i.pravatar.cc/150?img=${i+40}`} />
                          <AvatarFallback>SB</AvatarFallback>
                        </Avatar>
                        <div className="ml-2">
                          <p className="text-sm font-medium hover:text-primary transition-colors">Business Name {i}</p>
                          <p className="text-xs text-muted-foreground">@business{i}</p>
                        </div>
                      </Link>
                      <Button variant="outline" size="sm" className="h-8 hover:bg-secondary/70">Follow</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow bg-card">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                  Trending Topics
                </h3>
                <Separator className="mb-3 bg-border/40" />
                <div className="space-y-2">
                  {["#smallbusiness", "#sustainable", "#localbusiness", "#handmade", "#entrepreneur"].map((tag) => (
                    <div key={tag} className="text-sm p-1.5 hover:bg-secondary/50 rounded-md cursor-pointer transition-colors flex">
                      <span className="text-primary mr-1">#</span>
                      <span>{tag.substring(1)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
