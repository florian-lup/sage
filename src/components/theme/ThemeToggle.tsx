"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center bg-[var(--secondary)] rounded-full p-0.5 shadow-sm">
      <button
        onClick={() => mounted && setTheme("light")}
        className={`p-1.5 rounded-full transition-colors ${mounted ? "cursor-pointer" : "cursor-default"} ${
          mounted && theme === "light" 
            ? "bg-[var(--secondary-hover)] text-[var(--foreground)]" 
            : "text-[var(--muted)] hover:text-[var(--foreground)]"
        }`}
        aria-label="Light theme"
        disabled={!mounted}
      >
        <FiSun className="w-3.5 h-3.5" />
      </button>
      
      <button
        onClick={() => mounted && setTheme("dark")}
        className={`p-1.5 rounded-full transition-colors ${mounted ? "cursor-pointer" : "cursor-default"} ${
          mounted && theme === "dark" 
            ? "bg-[var(--secondary-hover)] text-[var(--foreground)]" 
            : "text-[var(--muted)] hover:text-[var(--foreground)]"
        }`}
        aria-label="Dark theme"
        disabled={!mounted}
      >
        <FiMoon className="w-3.5 h-3.5" />
      </button>
      
      <button
        onClick={() => mounted && setTheme("system")}
        className={`p-1.5 rounded-full transition-colors ${mounted ? "cursor-pointer" : "cursor-default"} ${
          mounted && theme === "system" 
            ? "bg-[var(--secondary-hover)] text-[var(--foreground)]" 
            : "text-[var(--muted)] hover:text-[var(--foreground)]"
        }`}
        aria-label="System theme"
        disabled={!mounted}
      >
        <FiMonitor className="w-3.5 h-3.5" />
      </button>
    </div>
  );
} 