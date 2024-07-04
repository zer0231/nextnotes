import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() => {
        if (theme === "dark") {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      }}
    >
      <Sun className="dark:scale-0 dark:-rotate-90 scale-100 rotate-0 transition-all"/>
      <Moon className="dark:scale-100 scale-0 dark:rotate-0 rotate-90 transition-all"/>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
