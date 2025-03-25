"use client";

export function PageFooter() {
  return (
    <footer className="py-4 border-t border-[var(--border)]">
      <div className="max-w-[95%] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-[var(--muted)]">
            Sage © {new Date().getFullYear()}
          </p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a 
              href="https://github.com/florian-lup/sage" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 