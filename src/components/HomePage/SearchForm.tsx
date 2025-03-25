"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsLightbulb } from "react-icons/bs";
import * as Select from "@radix-ui/react-select";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface SearchFormProps {
  onSearch: (query: string, includeDomains?: string[]) => Promise<void>;
  disabled?: boolean;
}

export default function SearchForm({ onSearch, disabled = false }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  
  const domainOptions = [
    { value: null, label: "Toate" },
    // Popular TLDs
    { value: ".com", label: ".com" },
    { value: ".org", label: ".org" },
    { value: ".net", label: ".net" },
    { value: ".io", label: ".io" },
    { value: ".info", label: ".info" },
    { value: ".edu", label: ".edu" },
    { value: ".gov", label: ".gov" },
    { value: ".ai", label: ".ai" },
    { value: ".app", label: ".app" },
    { value: ".dev", label: ".dev" },
    { value: ".co", label: ".co" },
    { value: ".tech", label: ".tech" },
    { value: ".me", label: ".me" },
    { value: ".biz", label: ".biz" },
    { value: ".shop", label: ".shop" },
    { value: ".blog", label: ".blog" },
    { value: ".cloud", label: ".cloud" },
    { value: ".online", label: ".online" },
    { value: ".site", label: ".site" },
    // Country-specific domains
    { value: ".ro", label: ".ro" },
    { value: ".co.uk", label: ".co.uk" },
    { value: ".eu", label: ".eu" },
    { value: ".de", label: ".de" },
    { value: ".fr", label: ".fr" },
    { value: ".es", label: ".es" },
    { value: ".it", label: ".it" },
    { value: ".us", label: ".us" },
    { value: ".ca", label: ".ca" },
    { value: ".au", label: ".au" },
    { value: ".nz", label: ".nz" },
    { value: ".jp", label: ".jp" },
    { value: ".cn", label: ".cn" },
    { value: ".in", label: ".in" },
    { value: ".br", label: ".br" },
    { value: ".mx", label: ".mx" },
    { value: ".za", label: ".za" },
    { value: ".ru", label: ".ru" },
    { value: ".nl", label: ".nl" },
    { value: ".se", label: ".se" },
    { value: ".ch", label: ".ch" },
    { value: ".at", label: ".at" },
    { value: ".pl", label: ".pl" },
    { value: ".be", label: ".be" },
    { value: ".dk", label: ".dk" },
    { value: ".fi", label: ".fi" },
    { value: ".gr", label: ".gr" },
    { value: ".hu", label: ".hu" },
    { value: ".ie", label: ".ie" },
    { value: ".no", label: ".no" },
    { value: ".pt", label: ".pt" },
    { value: ".cz", label: ".cz" },
    { value: ".ua", label: ".ua" },
    { value: ".hr", label: ".hr" },
    { value: ".bg", label: ".bg" },
    { value: ".sk", label: ".sk" },
    { value: ".si", label: ".si" },
    { value: ".lt", label: ".lt" },
    { value: ".lv", label: ".lv" },
    { value: ".ee", label: ".ee" },
    { value: ".lu", label: ".lu" },
    { value: ".cy", label: ".cy" },
    { value: ".mt", label: ".mt" },
    { value: ".tr", label: ".tr" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || disabled) return;
    
    // Pass selected domain as an array if it exists, otherwise don't pass it
    if (selectedDomain) {
      await onSearch(query, [selectedDomain]);
    } else {
      await onSearch(query);
    }
  };

  // Find the label for the currently selected domain value
  const selectedLabel = domainOptions.find(option => option.value === selectedDomain)?.label || "Toate";

  // Flattened list of suggestions for a more compact display
  const suggestions = [
    "Ce este inteligența artificială?",
    "Cat de des sa mergi la sala?",
    "Ce este machine learning?",
    "Locuri de vizitat în România",
    "Beneficiile energiei regenerabile",
    "Practici pentru sănătate mentală"
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className={`overflow-hidden rounded-full border border-[var(--border)] 
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
          transition-all duration-200 backdrop-blur-sm bg-[var(--card)] shadow-[0_2px_4px_rgba(0,0,0,0.05)]`}>
          <div className="flex items-center">
            <div className="pl-4">
              <Select.Root 
                value={selectedDomain || "all"}
                onValueChange={(value) => setSelectedDomain(value === "all" ? null : value)}
                disabled={disabled}
              >
                <Select.Trigger 
                  className="flex items-center justify-center text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors focus:outline-none cursor-pointer w-[4rem]"
                  aria-label="Domain extensions"
                >
                  <Select.Value>
                    <span className="text-xs font-medium mr-1 flex items-center truncate">{selectedLabel}</span>
                  </Select.Value>
                  <Select.Icon className="flex items-center">
                    <IoChevronDown className="h-3 w-3" />
                  </Select.Icon>
                </Select.Trigger>
                
                <Select.Portal>
                  <Select.Content 
                    position="popper" 
                    className="z-50 min-w-[8rem] max-h-[250px] overflow-hidden bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-md"
                    sideOffset={5}
                  >
                    <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-[var(--card)] cursor-default sticky top-0 z-10 border-b border-[var(--border)]">
                      <IoChevronUp />
                    </Select.ScrollUpButton>
                    
                    <Select.Viewport className="overflow-auto">
                      {domainOptions.map((domain) => (
                        <Select.Item
                          key={domain.label}
                          value={domain.value === null ? "all" : domain.value}
                          className="relative flex items-center h-8 px-4 py-2 text-xs hover:bg-[var(--secondary)] text-[var(--foreground)] transition-colors cursor-pointer outline-none"
                        >
                          <Select.ItemText>{domain.label}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                    
                    <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-[var(--card)] cursor-default sticky bottom-0 z-10 border-t border-[var(--border)]">
                      <IoChevronDown />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Intreaba orice..."
              className="flex-1 py-3 px-3 border-0 bg-transparent focus:outline-none focus:ring-0 text-base placeholder:text-[var(--muted)]"
              disabled={disabled}
            />
            <button
              type="submit"
              disabled={!query.trim() || disabled}
              className={`m-1 flex items-center justify-center transition-all h-10 w-10 cursor-pointer rounded-full ${
                query.trim() && !disabled
                  ? 'text-[var(--accent)] hover:bg-[var(--secondary)]' 
                  : 'bg-transparent text-[var(--muted)]'
              }`}
              aria-label="Caută"
            >
              <BiSearch className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex items-center mb-3 justify-center">
          <BsLightbulb className="text-[var(--accent)] mr-2 h-4 w-4" />
          <p className="text-xs font-medium text-[var(--muted)]">Întrebări populare</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                setQuery(suggestion);
                // Handle suggestion click with current domain selection
                if (selectedDomain) {
                  onSearch(suggestion, [selectedDomain]);
                } else {
                  onSearch(suggestion);
                }
              }}
              disabled={disabled}
              className="px-3 py-1.5 bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] rounded-full text-xs text-[var(--foreground)] transition-colors text-center overflow-hidden text-ellipsis cursor-pointer backdrop-blur-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
} 