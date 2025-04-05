
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Home, Search, MessageSquare, PlusSquare, User, LogOut, Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface AuthData {
  isLoggedIn: boolean;
  accountType: "personal" | "business";
  username: string;
  avatar: string;
}

const NavBar = () => {
  const [auth, setAuth] = useState<AuthData | null>(null);
  const location = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem("bizconnect-auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bizconnect-auth");
    setAuth(null);
    toast({
      title: "Logged out successfully"
    });
    navigate("/");
  };

  if (!auth?.isLoggedIn) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 md:top-0 md:bottom-auto w-full bg-white border-t md:border-b md:border-t-0 border-gray-200 z-10">
      <div className="container flex justify-between items-center h-16 px-4 md:px-6">
        <div className="hidden md:flex items-center">
          <Link to="/feed" className="flex items-center">
            <h1 className="text-2xl font-bold text-bizconnect-orange">BizConnect</h1>
          </Link>
        </div>

        <div className="flex justify-around md:justify-center w-full md:w-auto space-x-1 md:space-x-2">
          <NavItem icon={Home} to="/feed" active={location.pathname === "/feed"} label="Feed" />
          <NavItem icon={Search} to="/explore" active={location.pathname === "/explore"} label="Explore" />
          <NavItem icon={PlusSquare} to="/create" active={location.pathname === "/create"} label="Post" />
          <NavItem icon={MessageSquare} to="/messages" active={location.pathname === "/messages"} label="Messages" />
          <NavItem icon={Bell} to="/notifications" active={location.pathname === "/notifications"} label="Notifications" />
        </div>

        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full" size="icon">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={auth.avatar} />
                  <AvatarFallback>{auth.username?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  to: string;
  active: boolean;
  label: string;
}

const NavItem = ({ icon: Icon, to, active, label }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
        active 
          ? "text-bizconnect-orange" 
          : "text-gray-500 hover:text-bizconnect-orange"
      }`}
    >
      <Icon className="h-6 w-6" />
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default NavBar;
