"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsLightbulb } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useSearchSuggestions } from "../../hooks";
import { SearchFormProps } from "../../types/components";

export default function SearchForm({ onSearch, disabled = false }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const { suggestions } = useSearchSuggestions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || disabled) return;
    
    await onSearch(query);
  };

  const clearInput = () => {
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className={`overflow-hidden rounded-full border border-[var(--border)] 
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
          transition-all duration-200 backdrop-blur-sm bg-[var(--card)] shadow-[0_2px_4px_rgba(0,0,0,0.05)]`}>
          <div className="flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 py-2.5 sm:py-3 px-4 sm:px-5 border-0 bg-transparent focus:outline-none focus:ring-0 text-[16px] sm:text-base placeholder:text-[var(--muted)]"
              disabled={disabled}
            />
            {query.trim() && !disabled && (
              <button
                type="button"
                onClick={clearInput}
                className="flex items-center justify-center transition-all h-9 sm:h-10 w-9 sm:w-10 cursor-pointer rounded-full text-[var(--muted)] hover:bg-[var(--secondary)]"
                aria-label="Clear input"
              >
                <IoMdClose className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            )}
            <button
              type="submit"
              disabled={!query.trim() || disabled}
              className={`m-1 flex items-center justify-center transition-all h-9 sm:h-10 w-9 sm:w-10 cursor-pointer rounded-full ${
                query.trim() && !disabled
                  ? 'text-[var(--accent)] hover:bg-[var(--secondary)]' 
                  : 'bg-transparent text-[var(--muted)]'
              }`}
              aria-label="Search"
            >
              <BiSearch className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 sm:mt-6">
        <div className="flex items-center mb-2 sm:mb-3 justify-center">
          <BsLightbulb className="text-[var(--accent)] mr-2 h-4 w-4" />
          <p className="text-xs font-medium text-[var(--muted)]">Popular questions</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
          {suggestions.map((suggestion: string) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                setQuery(suggestion);
                onSearch(suggestion);
              }}
              disabled={disabled}
              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] rounded-full text-xs text-[var(--foreground)] transition-colors text-center overflow-hidden text-ellipsis cursor-pointer backdrop-blur-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
} 