"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme/ThemeToggle";

interface PageHeaderProps {
  showHomeLink?: boolean;
}

export function PageHeader({ showHomeLink = false }: PageHeaderProps) {
  return (
    <header className="py-4">
      <div className="container flex items-center justify-between">
        {showHomeLink ? (
          <Link 
            href="/"
            className="text-xl font-medium bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent"
          >
            AI Search
          </Link>
        ) : (
          <div className="text-xl font-medium bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
            AI Search
          </div>
        )}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <a 
            href="https://github.com/yourusername/ai-search-engine" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
} 