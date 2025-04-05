
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already authenticated
    const storedAuth = localStorage.getItem("bizconnect-auth");
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      if (authData.isLoggedIn) {
        navigate("/feed");
      }
    }
  }, [navigate]);

  return null; // This component just redirects
};

export default Index;
