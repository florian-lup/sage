"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsLightbulb } from "react-icons/bs";
import * as Select from "@radix-ui/react-select";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useDomainFilter, useSearchSuggestions } from "../../hooks";
import { SearchFormProps } from "../../types/components";
import { DomainOption } from "../../types/hooks";

export default function SearchForm({ onSearch, disabled = false }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const { 
    selectedDomain, 
    setSelectedDomain, 
    domainOptions, 
    getSelectedLabel,
    getIncludeDomains
  } = useDomainFilter();
  
  const { suggestions } = useSearchSuggestions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || disabled) return;
    
    // Use getIncludeDomains from the hook
    await onSearch(query, getIncludeDomains());
  };

  // Get the selected label using the hook helper
  const selectedLabel = getSelectedLabel();

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className={`overflow-hidden rounded-full border border-[var(--border)] 
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
          transition-all duration-200 backdrop-blur-sm bg-[var(--card)] shadow-[0_2px_4px_rgba(0,0,0,0.05)]`}>
          <div className="flex items-center">
            <div className="pl-2 sm:pl-4">
              <Select.Root 
                value={selectedDomain || "all"}
                onValueChange={(value) => setSelectedDomain(value === "all" ? null : value)}
                disabled={disabled}
              >
                <Select.Trigger 
                  className="flex items-center justify-center text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors focus:outline-none cursor-pointer w-[3.5rem] sm:w-[4rem]"
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
                      {domainOptions.map((domain: DomainOption) => (
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
              placeholder="Ask anything..."
              className="flex-1 py-2.5 sm:py-3 px-2 sm:px-3 border-0 bg-transparent focus:outline-none focus:ring-0 text-sm sm:text-base placeholder:text-[var(--muted)]"
              disabled={disabled}
            />
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
                onSearch(suggestion, getIncludeDomains());
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