"use client";

import { SearchResultItem } from "../types";

interface SearchResultsProps {
  answer: string;
  sources: SearchResultItem[];
}

export default function SearchResults({ answer, sources }: SearchResultsProps) {
  if (!answer && sources.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {answer && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Răspuns:</h2>
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg whitespace-pre-line">
            {answer}
          </div>
        </div>
      )}

      {sources.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Surse:</h2>
          <div className="space-y-4">
            {sources.map((source, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium mb-1">
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {source.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {source.url}
                </p>
                <p className="text-sm">{source.content.substring(0, 200)}...</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 