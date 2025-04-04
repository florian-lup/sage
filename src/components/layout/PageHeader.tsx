"use client";

import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";

interface PageHeaderProps {
  showHomeLink?: boolean;
}

export function PageHeader({ showHomeLink = false }: PageHeaderProps) {
  return (
    <header className="py-4">
      <div className="max-w-[95%] mx-auto flex items-center justify-between">
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
        </div>
      </div>
    </header>
  );
} 