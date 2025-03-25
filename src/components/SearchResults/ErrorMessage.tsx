"use client";

import { ErrorMessageProps } from "../../types/components";

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  
  return (
    <div className="mb-6 p-4 backdrop-blur-sm bg-[var(--card)] border border-red-300 rounded-xl shadow-md">
      <div className="flex items-center">
        <svg className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-semibold text-[var(--foreground)]">Error</span>
      </div>
      <p className="mt-2 text-sm text-[var(--foreground)]">{message}</p>
    </div>
  );
} 