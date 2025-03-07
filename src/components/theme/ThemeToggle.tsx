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

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center bg-[var(--secondary)] rounded-full p-0.5 shadow-sm">
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full transition-colors cursor-pointer ${
          theme === "light" 
            ? "bg-[var(--secondary-hover)] text-[var(--foreground)]" 
            : "text-[var(--muted)] hover:text-[var(--foreground)]"
        }`}
        aria-label="Light theme"
      >
        <FiSun className="w-3.5 h-3.5" />
      </button>
      
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full transition-colors cursor-pointer ${
          theme === "dark" 
            ? "bg-[var(--secondary-hover)] text-[var(--foreground)]" 
            : "text-[var(--muted)] hover:text-[var(--foreground)]"
        }`}
        aria-label="Dark theme"
      >
        <FiMoon className="w-3.5 h-3.5" />
      </button>
      
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-full transition-colors cursor-pointer ${
          theme === "system" 
            ? "bg-[var(--secondary-hover)] text-[var(--foreground)]" 
            : "text-[var(--muted)] hover:text-[var(--foreground)]"
        }`}
        aria-label="System theme"
      >
        <FiMonitor className="w-3.5 h-3.5" />
      </button>
    </div>
  );
} 