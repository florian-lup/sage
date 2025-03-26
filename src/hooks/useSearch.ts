import { useState, useCallback, useRef } from "react";
import { SearchResultItem, SearchResponse } from "../types/search";
import { UseSearchResult } from "../types/hooks";
import { SearchRequestBody } from "../types/api";
import { useFetch } from "./useFetch";

export function useSearch(): UseSearchResult {
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<SearchResultItem[]>([]);
  const { loading, error, fetchData } = useFetch<SearchResponse>();
  const activeSearchRef = useRef<string>("");

  const performSearch = useCallback(async (query: string) => {
    // If we're already searching for this exact query, don't start a duplicate search
    if (activeSearchRef.current === query) {
      return;
    }
    
    // Track the active search
    activeSearchRef.current = query;
    
    // Reset previous results
    setAnswer("");
    setSources([]);
    
    // Create request body
    const requestBody: SearchRequestBody = {
      query: query
    };
    
    // Make the API call using our fetch hook
    const result = await fetchData("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    
    if (result) {
      setAnswer(result.answer);
      setSources(result.sources);
    }
    
    // Clear active search
    activeSearchRef.current = "";
  }, [fetchData]);

  return {
    answer,
    sources,
    loading,
    error,
    performSearch
  };
} 