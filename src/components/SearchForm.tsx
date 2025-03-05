"use client";

import { useState, useEffect } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";

interface SearchFormProps {
  onSearch: (query: string) => Promise<void>;
  loading: boolean;
  initialQuery?: string;
  compact?: boolean;
}

export default function SearchForm({ onSearch, loading, initialQuery = "", compact = false }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    await onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="overflow-hidden shadow-md rounded-full border border-[var(--border)] hover:shadow-lg focus-within:shadow-lg transition-shadow duration-200 bg-white dark:bg-[var(--card)]">
          <div className="flex items-center">
            <div className="pl-4 text-[var(--primary)]">
              <RiRobot2Fill className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Introdu întrebarea ta..."
              className="flex-1 py-3 px-3 border-0 bg-transparent focus:outline-none focus:ring-0 text-base"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className={`m-1 rounded-full flex items-center justify-center transition-colors h-10 w-10 ${
                query.trim() 
                  ? 'bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white' 
                  : 'bg-[var(--secondary)] text-[var(--muted)]'
              }`}
              aria-label="Caută"
            >
              {loading ? (
                <ImSpinner8 className="animate-spin h-5 w-5" />
              ) : (
                <FiSearch className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {!compact && !loading && (
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {["Ce este inteligența artificială?", "Cum funcționează un motor de căutare?", "Care sunt beneficiile energiei regenerabile?"].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                setQuery(suggestion);
                onSearch(suggestion);
              }}
              disabled={loading}
              className="btn-secondary"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </form>
  );
} 