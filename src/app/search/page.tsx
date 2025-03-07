"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchForm, SearchResults, ErrorMessage, PageHeader, PageFooter } from "../../components";
import { SearchResultItem } from "../../types";

// Create a separate component that uses useSearchParams
function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState(queryParam);

  // Fetch search results when the query parameter changes
  useEffect(() => {
    if (queryParam) {
      performSearch(queryParam);
      setQuery(queryParam);
    }
  }, [queryParam]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    setError("");
    setAnswer("");
    setSources([]);
    
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
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

  const handleSearch = async (searchQuery: string) => {
    // Update the URL with the new query
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="search-container">
      <div className="mb-6">
        <SearchForm 
          onSearch={handleSearch} 
          loading={loading} 
          initialQuery={query}
          compact={true}
        />
      </div>
      
      <ErrorMessage message={error} />
      
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[var(--primary)] border-t-transparent mb-4"></div>
          <p className="text-[var(--muted)] text-sm">Se caută răspunsul...</p>
        </div>
      )}
      
      {!loading && !error && !answer && sources.length === 0 && queryParam && (
        <div className="text-center py-12">
          <p className="text-[var(--muted)] mb-2">Nu am găsit rezultate pentru căutarea ta.</p>
          <p className="text-sm text-[var(--muted)]">Încearcă o altă întrebare.</p>
        </div>
      )}
      
      <SearchResults answer={answer} sources={sources} query={query} />
    </div>
  );
}

// Main page component with Suspense boundary
export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader showHomeLink={true} />

      <main className="flex-1 container py-4 pt-6">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[var(--primary)] border-t-transparent mb-4"></div>
            <p className="text-[var(--muted)] text-sm">Se încarcă...</p>
          </div>
        }>
          <SearchContent />
        </Suspense>
      </main>

      <PageFooter />
    </div>
  );
} 