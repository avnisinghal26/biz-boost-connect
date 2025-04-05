
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "@/components/feed/PostList";

const FeedPage = () => {
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
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Feed</h1>
      <PostList />
    </div>
  );
};

export default FeedPage;
