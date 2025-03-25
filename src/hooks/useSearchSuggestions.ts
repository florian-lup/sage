import { useMemo } from "react";
import { UseSearchSuggestionsResult } from "../types/hooks";

export function useSearchSuggestions(): UseSearchSuggestionsResult {
  // Memoize suggestions to prevent recreating the array on each render
  const suggestions = useMemo(() => [
    "What is artificial intelligence?",
    "What is machine learning?",
    "Places to visit in Romania",
    "Benefits of renewable energy",
    "Mental health practices",
    "Healthy diet recommendations",
  ], []);

  return {
    suggestions
  };
} 