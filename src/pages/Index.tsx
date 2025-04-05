
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already authenticated
    const storedAuth = localStorage.getItem("bizconnect-auth");
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        if (authData && authData.isLoggedIn) {
          navigate("/feed");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to parse auth data:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
};

export default Index;
