"use client";

import { useState } from "react";
import { RiRobot2Fill, RiCompass4Line } from "react-icons/ri";
import { BsLightbulb } from "react-icons/bs";

interface SearchFormProps {
  onSearch: (query: string) => Promise<void>;
  disabled?: boolean;
}

export default function SearchForm({ onSearch, disabled = false }: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || disabled) return;
    await onSearch(query);
  };

  // Flattened list of suggestions for a more compact display
  const suggestions = [
    "Ce este inteligența artificială?",
    "Cum funcționează un motor de căutare?",
    "Ce este machine learning?",
    "Cum să învăț programare?",
    "Locuri de vizitat în România",
    "Beneficiile energiei regenerabile",
    "Cum funcționează blockchain?",
    "Practici pentru sănătate mentală"
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className={`overflow-hidden shadow-md rounded-full border border-[var(--border)] 
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg focus-within:shadow-lg'} 
          transition-shadow duration-200 backdrop-blur-sm bg-[var(--card)]`}>
          <div className="flex items-center">
            <div className="pl-4 text-[var(--primary)]">
              <RiRobot2Fill className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Intreaba orice..."
              className="flex-1 py-3 px-3 border-0 bg-transparent focus:outline-none focus:ring-0 text-base"
              disabled={disabled}
            />
            <button
              type="submit"
              disabled={!query.trim() || disabled}
              className={`m-1 rounded-full flex items-center justify-center transition-colors h-10 w-10 cursor-pointer backdrop-blur-sm ${
                query.trim() && !disabled
                  ? 'hover:opacity-90 text-white' 
                  : 'bg-[var(--secondary)] text-[var(--muted)]'
              }`}
              style={query.trim() && !disabled ? { background: 'var(--gradient-primary)' } : {}}
              aria-label="Caută"
            >
              <RiCompass4Line className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex items-center mb-3 justify-center">
          <BsLightbulb className="text-[var(--accent)] mr-2 h-4 w-4" />
          <p className="text-xs font-medium text-[var(--muted)]">Întrebări populare</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                setQuery(suggestion);
                onSearch(suggestion);
              }}
              disabled={disabled}
              className="px-3 py-1.5 bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] rounded-full text-xs text-[var(--foreground)] transition-colors whitespace-nowrap cursor-pointer backdrop-blur-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
} 