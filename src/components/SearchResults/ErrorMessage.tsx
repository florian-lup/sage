"use client";

import { BiErrorCircle } from "react-icons/bi";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="mb-6 rounded-lg backdrop-blur-sm border border-red-200 dark:border-red-900/30 bg-red-50/90 dark:bg-red-900/20 p-4 shadow-sm">
      <div className="flex items-start">
        <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-2 flex-shrink-0">
          <BiErrorCircle className="h-4 w-4 text-red-500 dark:text-red-400" />
        </div>
        <div>
          <p className="text-sm text-red-600 dark:text-red-400">{message}</p>
        </div>
      </div>
    </div>
  );
} 