
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Home, Search, MessageSquare, PlusSquare, User, LogOut, Bell, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface AuthData {
  isLoggedIn: boolean;
  accountType: "personal" | "business";
  username: string;
  avatar: string;
}

const NavBar = () => {
  const [auth, setAuth] = useState<AuthData | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem("bizconnect-auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bizconnect-auth");
    setAuth(null);
    toast({
      title: "Logged out successfully"
    });
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!auth?.isLoggedIn) {
    return null;
  }

  return (
    <>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-background/95 z-50 md:hidden flex flex-col items-center pt-20">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4" 
            onClick={toggleMobileMenu}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <div className="flex flex-col items-center space-y-6 w-full px-8">
            {auth.accountType === "personal" ? (
              <>
                <MobileNavItem icon={Home} to="/feed" active={location.pathname === "/feed"} onClick={toggleMobileMenu} label="Feed" />
                <MobileNavItem icon={Search} to="/explore" active={location.pathname === "/explore"} onClick={toggleMobileMenu} label="Explore" />
                <MobileNavItem icon={MessageSquare} to="/messages" active={location.pathname === "/messages"} onClick={toggleMobileMenu} label="Messages" />
                <MobileNavItem icon={Bell} to="/notifications" active={location.pathname === "/notifications"} onClick={toggleMobileMenu} label="Notifications" />
                <MobileNavItem icon={User} to="/profile" active={location.pathname === "/profile"} onClick={toggleMobileMenu} label="Profile" />
              </>
            ) : (
              <>
                <MobileNavItem icon={Home} to="/feed" active={location.pathname === "/feed"} onClick={toggleMobileMenu} label="Feed" />
                <MobileNavItem icon={Search} to="/explore" active={location.pathname === "/explore"} onClick={toggleMobileMenu} label="Explore" />
                <MobileNavItem icon={PlusSquare} to="/create" active={location.pathname === "/create"} onClick={toggleMobileMenu} label="Create Post" />
                <MobileNavItem icon={MessageSquare} to="/messages" active={location.pathname === "/messages"} onClick={toggleMobileMenu} label="Messages" />
                <MobileNavItem icon={Bell} to="/notifications" active={location.pathname === "/notifications"} onClick={toggleMobileMenu} label="Notifications" />
                <MobileNavItem icon={User} to="/business-dashboard" active={location.pathname === "/business-dashboard"} onClick={toggleMobileMenu} label="Dashboard" />
              </>
            )}
            
            <div className="border-t border-border w-full my-4"></div>
            
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
            
            <div className="flex items-center justify-center w-full mt-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    
      {/* Main navigation */}
      <nav className={`fixed bottom-0 md:top-0 md:bottom-auto w-full md:border-b border-t md:border-t-0 z-20 transition-all duration-300 ${
        isScrolled ? "md:bg-background/80 md:backdrop-blur-md md:shadow-md" : "bg-background"
      }`}>
        <div className="container flex justify-between items-center h-16 px-4 md:px-6">
          <div className="hidden md:flex items-center">
            <Link to="/feed" className="flex items-center">
              <h1 className="text-2xl font-bold text-bizconnect-orange">BizConnect</h1>
            </Link>
          </div>

          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden absolute left-4"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <div className="flex justify-center md:justify-center w-full md:w-auto space-x-1 md:space-x-4">
            {auth.accountType === "personal" ? (
              <>
                <NavItem icon={Home} to="/feed" active={location.pathname === "/feed"} label="Feed" />
                <NavItem icon={Search} to="/explore" active={location.pathname === "/explore"} label="Explore" />
                <NavItem icon={MessageSquare} to="/messages" active={location.pathname === "/messages"} label="Messages" />
                <NavItem icon={Bell} to="/notifications" active={location.pathname === "/notifications"} label="Notifications" />
              </>
            ) : (
              <>
                <NavItem icon={Home} to="/feed" active={location.pathname === "/feed"} label="Feed" />
                <NavItem icon={Search} to="/explore" active={location.pathname === "/explore"} label="Explore" />
                <NavItem icon={PlusSquare} to="/create" active={location.pathname === "/create"} label="Post" />
                <NavItem icon={MessageSquare} to="/messages" active={location.pathname === "/messages"} label="Messages" />
                <NavItem icon={Bell} to="/notifications" active={location.pathname === "/notifications"} label="Notifications" />
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
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
                  <Link to={auth.accountType === "personal" ? "/profile" : "/business-dashboard"} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>{auth.accountType === "personal" ? "Profile" : "Dashboard"}</span>
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
    </>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  to: string;
  active: boolean;
  label: string;
  onClick?: () => void;
}

const NavItem = ({ icon: Icon, to, active, label }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={`hidden md:flex items-center justify-center p-2 rounded-md transition-colors ${
        active 
          ? "text-bizconnect-orange" 
          : "text-muted-foreground hover:text-bizconnect-orange"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="ml-2">{label}</span>
    </Link>
  );
};

// For mobile menu only
const MobileNavItem = ({ icon: Icon, to, active, label, onClick }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center w-full p-3 rounded-md transition-colors ${
        active 
          ? "bg-accent text-bizconnect-orange" 
          : "text-foreground hover:bg-accent hover:text-bizconnect-orange"
      }`}
      onClick={onClick}
    >
      <Icon className="h-6 w-6 mr-3" />
      <span className="text-lg">{label}</span>
    </Link>
  );
};

export default NavBar;
