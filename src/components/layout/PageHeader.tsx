"use client";

import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";

interface PageHeaderProps {
  showHomeLink?: boolean;
}

export function PageHeader({ showHomeLink = false }: PageHeaderProps) {
  return (
    <header className="py-4">
      <div className="container mx-auto flex items-center justify-between">
        {showHomeLink ? (
          <Link 
            href="/"
            className="text-xl font-medium bg-clip-text text-transparent"
            style={{ backgroundImage: 'var(--gradient-primary)' }}
          >
            Sage
          </Link>
        ) : (
          <div 
            className="text-xl font-medium bg-clip-text text-transparent"
            style={{ backgroundImage: 'var(--gradient-primary)' }}
          >
            Sage
          </div>
        )}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <a 
            href="https://github.com/florian-lup/sage" 
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