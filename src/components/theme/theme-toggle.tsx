
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full hover:bg-secondary/80 transition-all duration-300"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 hover:text-bizconnect-orange transition-colors duration-300" />
      ) : (
        <Moon className="h-5 w-5 hover:text-bizconnect-orange transition-colors duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
