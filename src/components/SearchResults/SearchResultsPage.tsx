"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import SearchResults from "./SearchResults";
import ErrorMessage from "./ErrorMessage";
import { useSearch } from "../../hooks";

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
  
  const [query, setQuery] = useState(queryParam);
  const { answer, sources, loading, error, performSearch } = useSearch();

  // Fetch search results when query or domains change in URL
  useEffect(() => {
    if (queryParam) {
      performSearch(queryParam, initialDomains);
      setQuery(queryParam);
    }
  }, [queryParam, initialDomains, performSearch]);

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