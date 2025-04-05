
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Heart, MessageCircle, UserPlus, Share2 } from "lucide-react";

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention" | "share";
  username: string;
  userAvatar: string;
  content: string;
  time: string;
  read: boolean;
}

// Sample notifications data
const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    username: "craftycandles",
    userAvatar: "https://i.pravatar.cc/150?img=28",
    content: "liked your post about sustainable packaging",
    time: "2h ago",
    read: false
  },
  {
    id: "2",
    type: "follow",
    username: "healthmarket",
    userAvatar: "https://i.pravatar.cc/150?img=35",
    content: "started following you",
    time: "5h ago",
    read: false
  },
  {
    id: "3",
    type: "comment",
    username: "organicfoods",
    userAvatar: "https://i.pravatar.cc/150?img=12",
    content: "commented: \"Love your products! Would like to discuss a potential collaboration.\"",
    time: "1d ago",
    read: true
  },
  {
    id: "4",
    type: "share",
    username: "digitalmedia",
    userAvatar: "https://i.pravatar.cc/150?img=42",
    content: "shared your post about marketing tips",
    time: "2d ago",
    read: true
  },
  {
    id: "5",
    type: "mention",
    username: "localcraftmarket",
    userAvatar: "https://i.pravatar.cc/150?img=33",
    content: "mentioned you in a post about the upcoming craft fair",
    time: "3d ago",
    read: true
  }
];

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
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

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case "like":
        return <Heart className="text-red-500" size={16} />;
      case "follow":
        return <UserPlus className="text-blue-500" size={16} />;
      case "comment":
        return <MessageCircle className="text-green-500" size={16} />;
      case "mention":
        return <Bell className="text-purple-500" size={16} />;
      case "share":
        return <Share2 className="text-orange-500" size={16} />;
      default:
        return <Bell className="text-gray-500" size={16} />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2" />
            Your Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`flex items-center p-3 rounded-md transition-colors hover:bg-accent cursor-pointer ${
                    !notification.read ? 'bg-muted/30' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={notification.userAvatar} alt={notification.username} />
                      <AvatarFallback>{notification.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">@{notification.username}</p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.content}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-bizconnect-orange ml-2"></div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No notifications yet</h3>
                <p className="text-muted-foreground mt-1 max-w-sm">
                  When you get notifications, they'll show up here.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
