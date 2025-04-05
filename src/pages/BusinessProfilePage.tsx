
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BusinessProfile from "@/components/business/BusinessProfile";
import { useToast } from "@/hooks/use-toast";

const BusinessProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  
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
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (username && !loading) {
      console.log(`Loading profile for business: ${username}`);
      // In a real app, we would fetch business data from an API here
    }
  }, [username, loading]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[70vh]">Loading...</div>;
  }

  return (
    <div>
      <BusinessProfile businessUsername={username} />
    </div>
  );
};

export default BusinessProfilePage;
