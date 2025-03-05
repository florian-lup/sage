"use client";

import { useState } from "react";
import { SearchForm, SearchResults, ErrorMessage } from "../components";
import { SearchResultItem } from "../types";

export default function Home() {
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query: string) => {
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
        body: JSON.stringify({ query }),
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
    <div className="min-h-screen p-8 flex flex-col">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Motor de Căutare AI</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Caută informații în limba română și primește răspunsuri concise
        </p>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full">
        <SearchForm onSearch={handleSearch} loading={loading} />
        <ErrorMessage message={error} />
        <SearchResults answer={answer} sources={sources} />
      </main>

      <footer className="mt-12 text-center text-sm text-gray-500">
        Motor de Căutare AI cu Tavily © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
