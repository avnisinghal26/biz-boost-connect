
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const AuthPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem("bizconnect-auth");
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        if (authData.isLoggedIn) {
          if (authData.accountType === "business") {
            navigate("/business-dashboard");
          } else {
            navigate("/feed");
          }
        }
      }
    };
    
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Brand Section */}
      <div className="bg-bizconnect-black md:w-1/2 p-8 flex flex-col justify-center items-center">
        <div className="max-w-md mx-auto text-center">
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-bizconnect-orange mb-4">BizConnect</h1>
          <p className="text-gray-300 text-xl mb-8">
            Connect, Collaborate, and Grow your Small Business
          </p>
          <div className="space-y-6 text-left text-gray-300">
            <div className="flex items-start">
              <div className="bg-bizconnect-orange rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Market Your Products</h3>
                <p className="text-sm">Showcase your products to targeted customers interested in supporting small businesses.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-bizconnect-orange rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Find Collaborations</h3>
                <p className="text-sm">Connect with other business owners for partnerships and collaborative opportunities.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-bizconnect-orange rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Grow Your Audience</h3>
                <p className="text-sm">Build a loyal following and direct connections with customers who love your products.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Section */}
      <div className="md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
