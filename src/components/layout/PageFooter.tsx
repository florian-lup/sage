"use client";

export function PageFooter() {
  return (
    <footer className="py-4 border-t border-[var(--border)]">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-[var(--muted)]">
            AI Search Engine © {new Date().getFullYear()}
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              Termeni
            </a>
            <a href="#" className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              Confidențialitate
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 