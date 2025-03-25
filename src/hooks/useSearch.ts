import { useState, useCallback } from "react";
import { SearchResultItem, SearchResponse } from "../types/search";
import { UseSearchResult } from "../types/hooks";
import { SearchRequestBody } from "../types/api";

export function useSearch(): UseSearchResult {
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const performSearch = useCallback(async (query: string, includeDomains?: string[]) => {
    setLoading(true);
    setError("");
    setAnswer("");
    setSources([]);
    
    try {
      // Create request body with optional includeDomains parameter
      const requestBody: SearchRequestBody = {
        query: query
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
      
      const data = await response.json() as SearchResponse;
      setAnswer(data.answer);
      setSources(data.sources);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during the search.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    answer,
    sources,
    loading,
    error,
    performSearch
  };
} 