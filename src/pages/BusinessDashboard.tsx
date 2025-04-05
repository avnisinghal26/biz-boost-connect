
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, Users, DollarSign, BarChart2, ShoppingCart, Grid, Settings, PlusCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface Stats {
  followers: number;
  engagement: number;
  revenue: number;
  orders: number;
}

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    followers: 584,
    engagement: 15.7,
    revenue: 1245,
    orders: 28
  });
  
  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem("bizconnect-auth");
      if (!storedAuth) {
        navigate("/");
        return;
      }
      
      const authData = JSON.parse(storedAuth);
      if (!authData.isLoggedIn || authData.accountType !== "business") {
        navigate("/");
      }
    };
    
    checkAuth();
  }, [navigate]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Business Dashboard</h1>
          <p className="text-muted-foreground">Manage your business, track performance, and grow your audience</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button asChild>
            <Link to="/create">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Total Followers</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              {stats.followers}
              <span className="text-xs text-green-500 ml-2 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+24 this week</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Engagement Rate</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              {stats.engagement}%
              <span className="text-xs text-green-500 ml-2 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.3%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Based on likes & comments</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Monthly Revenue</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              ${stats.revenue}
              <span className="text-xs text-green-500 ml-2 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.5%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">From sales & promotions</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Recent Orders</CardDescription>
            <CardTitle className="text-2xl">{stats.orders}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">4 pending fulfillment</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1 lg:col-span-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
            <CardDescription>
              Manage your social presence and engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link to="/feed" className="block">
                <div className="group flex items-center justify-between p-3 rounded-md bg-accent/50 hover:bg-accent">
                  <div className="flex items-center">
                    <div className="bg-bizconnect-orange/20 rounded-md p-2.5 mr-3">
                      <Grid className="h-5 w-5 text-bizconnect-orange" />
                    </div>
                    <div>
                      <h3 className="font-medium">Feed</h3>
                      <p className="text-xs text-muted-foreground">View your social feed and interact with customers</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
              
              <Link to="/explore" className="block">
                <div className="group flex items-center justify-between p-3 rounded-md bg-accent/50 hover:bg-accent">
                  <div className="flex items-center">
                    <div className="bg-purple-500/20 rounded-md p-2.5 mr-3">
                      <Users className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Explore</h3>
                      <p className="text-xs text-muted-foreground">Discover businesses and opportunities for collaboration</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
              
              <Link to="/messages" className="block">
                <div className="group flex items-center justify-between p-3 rounded-md bg-accent/50 hover:bg-accent">
                  <div className="flex items-center">
                    <div className="bg-green-500/20 rounded-md p-2.5 mr-3">
                      <Users className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Messages</h3>
                      <p className="text-xs text-muted-foreground">Chat with customers and business partners</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="secondary" className="w-full justify-start" asChild>
              <Link to="/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Post
              </Link>
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Manage Products
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Posts
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <BarChart2 className="mr-2 h-4 w-4" />
              Analytics Reports
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="analytics">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>
                Your business metrics for the past 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center border-t">
              <div className="text-center">
                <BarChart2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">Analytics Dashboard Coming Soon</h3>
                <p className="text-muted-foreground mt-1">
                  Track engagement, views, and conversions in one place
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
              <CardDescription>
                Plan and schedule your upcoming content
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center border-t">
              <div className="text-center">
                <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">Content Calendar Coming Soon</h3>
                <p className="text-muted-foreground mt-1">
                  Plan, create, and schedule your posts in advance
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Database</CardTitle>
              <CardDescription>
                Manage your customer relationships
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center border-t">
              <div className="text-center">
                <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">Customer Management Coming Soon</h3>
                <p className="text-muted-foreground mt-1">
                  Track customer interactions and manage your audience
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessDashboard;
