"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import SearchResults from "./SearchResults";
import ErrorMessage from "./ErrorMessage";
import { SearchResultItem } from "../../types";

export const SearchPage = () => {
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
        throw new Error(errorData.error || "A apărut o eroare în timpul căutării.");
      }
      
      const data = await response.json();
      setAnswer(data.answer);
      setSources(data.sources);
    } catch (err) {
      setError(err instanceof Error ? err.message : "A apărut o eroare în timpul căutării.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 container py-4 pt-6">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-8 px-6 backdrop-blur-sm bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[var(--primary)] border-t-transparent mb-4"></div>
          <p className="text-[var(--muted)] text-sm">Se încarcă...</p>
        </div>
      }>
        <div className="search-container">
          <ErrorMessage message={error} />
          
          {loading && (
            <div className="flex flex-col items-center justify-center py-8 px-6 backdrop-blur-sm bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-[var(--primary)] border-t-transparent mb-4"></div>
              <p className="text-[var(--muted)] text-sm">Se caută răspunsul...</p>
            </div>
          )}
          
          {!loading && !error && !answer && sources.length === 0 && queryParam && (
            <div className="text-center py-8 px-6 backdrop-blur-sm bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md">
              <p className="text-[var(--muted)] mb-2">Nu am găsit rezultate pentru căutarea ta.</p>
              <p className="text-sm text-[var(--muted)]">Încearcă o altă întrebare.</p>
            </div>
          )}
          
          <SearchResults answer={answer} sources={sources} query={query} />
        </div>
      </Suspense>
    </div>
  );
}; 