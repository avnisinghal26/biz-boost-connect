
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BusinessProfile from "@/components/business/BusinessProfile";

const BusinessProfilePage = () => {
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
    <div>
      <BusinessProfile />
    </div>
  );
};

export default BusinessProfilePage;
