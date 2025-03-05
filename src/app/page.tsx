"use client";

import { useState } from "react";
import { SearchForm, SearchResults, ErrorMessage, ThemeToggle } from "../components";
import { SearchResultItem } from "../types";

export default function Home() {
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setError("");
    setAnswer("");
    setSources([]);
    setSearchPerformed(true);
    setQuery(searchQuery);
    
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

  return (
    <div className="min-h-screen flex flex-col">
      {!searchPerformed && (
        <header className="py-4">
          <div className="container flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <a 
                href="https://github.com/yourusername/ai-search-engine" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-sm"
              >
                GitHub
              </a>
            </div>
          </div>
        </header>
      )}

      <main className={`flex-1 container py-4 ${searchPerformed ? 'pt-6' : ''}`}>
        <div className={`transition-all duration-500 ${searchPerformed ? 'search-container' : 'flex flex-col items-center justify-center min-h-[70vh]'}`}>
          {!searchPerformed && (
            <div className="text-center mb-8">
              <h1 className="text-5xl font-medium mb-6 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                AI Search
              </h1>
              <p className="text-[var(--muted)] mb-12 max-w-md mx-auto">
                Caută informații în limba română și primește răspunsuri concise
              </p>
            </div>
          )}
          
          <div className={`${searchPerformed ? 'mb-6' : 'w-full max-w-2xl'}`}>
            <SearchForm 
              onSearch={handleSearch} 
              loading={loading} 
              initialQuery={searchPerformed ? query : ""}
              compact={searchPerformed}
            />
          </div>
          
          <ErrorMessage message={error} />
          
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-[var(--primary)] border-t-transparent mb-4"></div>
              <p className="text-[var(--muted)] text-sm">Se caută răspunsul...</p>
            </div>
          )}
          
          {!loading && searchPerformed && !error && !answer && sources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--muted)] mb-2">Nu am găsit rezultate pentru căutarea ta.</p>
              <p className="text-sm text-[var(--muted)]">Încearcă o altă întrebare.</p>
            </div>
          )}
          
          <SearchResults answer={answer} sources={sources} query={query} />
        </div>
      </main>

      <footer className="py-4 border-t border-[var(--border)]">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-[var(--muted)]">
              AI Search Engine © {new Date().getFullYear()}
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                Termeni
              </a>
              <a href="#" className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                Confidențialitate
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
