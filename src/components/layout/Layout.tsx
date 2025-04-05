
import { ReactNode } from "react";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!isAuthPage && <NavBar />}
      <main className={`container mx-auto px-4 ${!isAuthPage ? "pt-4 pb-20 md:pt-20 md:pb-4" : ""}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
