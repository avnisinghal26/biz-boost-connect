
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const MessagesPage = () => {
  const navigate = useNavigate();
  
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
      }
    };
    
    checkAuth();
  }, [navigate]);

  return (
    <div className="max-w-xl mx-auto animate-in-custom">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <MessageSquare className="h-12 w-12 text-gray-400" />
            <div>
              <h3 className="text-lg font-medium">No messages yet</h3>
              <p className="text-gray-500 max-w-sm mx-auto mt-1">
                Connect with businesses and collaborate on projects. Your conversations will appear here.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesPage;
