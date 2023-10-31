import { useEffect, type FC, useState } from "react";
import { Select, SelectContent, SelectTrigger } from "./select";
import { SelectItem, SelectValue } from "@radix-ui/react-select";
import { Moon, Sun, SunMoon } from "lucide-react";

export const ThemeSwitcher: FC = () => {
  const [theme, setTheme] = useState<string | undefined>();

  useEffect(() => {
    const initialValue = localStorage.getItem("theme");

    if (initialValue) {
      setTheme(initialValue);
    }
  }, []);

  const handleThemeChange = (theme: string) => {
    document.documentElement.dataset["theme"] = theme;
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  return (
    <Select onValueChange={handleThemeChange} value={theme}>
      <SelectTrigger className="border-0 bg-transparent outline-none">
        <SelectValue placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">
          {theme === "dark" && (
            <Moon className="inline text-violet-700 w-6 h-6 mr-1" />
          )}
          {theme === "light" && (
            <Sun className="inline text-yellow-600 w-6 h-6 mr-1" />
          )}
          {theme === "system" && (
            <SunMoon className="inline text-foreground w-6 h-6 mr-1" />
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="p-2 gap-2">
        <SelectItem
          value="system"
          className="cursor-pointer p-2 flex items-center content-center outline-none hover:bg-foreground/5 rounded-lg"
        >
          <SunMoon className="inline w-5 h-5 mr-2" />
          System
        </SelectItem>
        <SelectItem
          value="dark"
          className="cursor-pointer p-2 flex items-center content-center outline-none hover:bg-foreground/5 rounded-lg"
        >
          <Moon className="inline w-5 h-5 mr-2" />
          Dark
        </SelectItem>
        <SelectItem
          value="light"
          className="cursor-pointer p-2 flex items-center content-center outline-none hover:bg-foreground/5 rounded-lg"
        >
          <Sun className="inline w-5 h-5 mr-2" />
          Light
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
