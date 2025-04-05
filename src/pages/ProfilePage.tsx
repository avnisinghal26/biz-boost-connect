
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Heart, Settings, LogOut, Bell, BookMarked } from "lucide-react";

interface UserData {
  username: string;
  avatar: string;
  accountType: "personal" | "business";
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
        setUser({
          username: authData.username,
          avatar: authData.avatar,
          accountType: authData.accountType
        });
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("bizconnect-auth");
    toast({
      title: "Logged out successfully"
    });
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto animate-in-custom">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{user.username}</CardTitle>
            <p className="text-sm text-gray-500 capitalize">{user.accountType} Account</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="saved">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="saved">
            <BookMarked className="h-4 w-4 mr-1" />
            Saved
          </TabsTrigger>
          <TabsTrigger value="liked">
            <Heart className="h-4 w-4 mr-1" />
            Liked
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-1" />
            Notifications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-gray-500">
                You haven't saved any posts yet. When you save posts from businesses, they'll appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="liked" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Liked Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-gray-500">
                You haven't liked any posts yet. Posts you like will appear here for quick access.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-gray-500">
                You don't have any notifications yet. Stay tuned for updates from businesses you follow.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
