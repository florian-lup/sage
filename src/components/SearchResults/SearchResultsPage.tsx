"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import SearchResults from "./SearchResults";
import ErrorMessage from "./ErrorMessage";
import { SearchResultItem } from "../../types";

// Create a separate client component for search functionality
const SearchResultsContent = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  // Get domains from URL if present
  const domainsParam = searchParams.get("domains") || "";
  
  // Memoize initialDomains to prevent re-renders
  const initialDomains = useMemo(() => {
    return domainsParam ? domainsParam.split(',') : undefined;
  }, [domainsParam]);
  
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState(queryParam);

  // Fetch search results when query or domains change in URL
  useEffect(() => {
    if (queryParam) {
      performSearch(queryParam, initialDomains);
      setQuery(queryParam);
    }
  }, [queryParam, initialDomains]);

  const performSearch = async (searchQuery: string, includeDomains?: string[]) => {
    setLoading(true);
    setError("");
    setAnswer("");
    setSources([]);
    
    try {
      // Create request body with optional includeDomains parameter
      const requestBody: { query: string; includeDomains?: string[] } = {
        query: searchQuery
      };
      
      // Only add includeDomains if it exists and has values
      if (includeDomains && includeDomains.length > 0) {
        requestBody.includeDomains = includeDomains;
      }
      
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred during the search.");
      }
      
      const data = await response.json();
      setAnswer(data.answer);
      setSources(data.sources);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during the search.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <ErrorMessage message={error} />
      
      {loading && (
        <div className="flex flex-col items-center justify-center py-8 px-6 backdrop-blur-sm bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[var(--primary)] border-t-transparent mb-4"></div>
          <p className="text-[var(--muted)] text-sm">Searching for the answer...</p>
        </div>
      )}
      
      {!loading && !error && !answer && sources.length === 0 && queryParam && (
        <div className="text-center py-8 px-6 backdrop-blur-sm bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md">
          <p className="text-[var(--muted)] mb-2">No results found for your search.</p>
          <p className="text-sm text-[var(--muted)]">Try another question.</p>
        </div>
      )}
      
      <SearchResults answer={answer} sources={sources} query={query} />
    </div>
  );
};

export const SearchResultsPage = () => {
  return (
    <div className="flex-1 container py-4 pt-6">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-8 px-6 backdrop-blur-sm bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[var(--primary)] border-t-transparent mb-4"></div>
          <p className="text-[var(--muted)] text-sm">Loading...</p>
        </div>
      }>
        <SearchResultsContent />
      </Suspense>
    </div>
  );
}; 