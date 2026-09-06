import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const THEME_KEY = "oreo-theme";

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * @param {{ inline?: boolean }} props - inline=true วางในแนว flex ปกติ, false (default) ลอย fixed มุมจอ
 */
export default function ThemeToggle({ inline = false }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  const positionClass = inline
    ? "relative w-9 h-9"
    : "absolute top-4 left-4 z-40 w-10 h-10";

  return (
    <button
      onClick={toggleTheme}
      className={`${positionClass} rounded-full glass-card flex items-center justify-center btn-press`}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}