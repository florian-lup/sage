import { useMemo } from "react";
import { UseSearchSuggestionsResult } from "../types/hooks";

export function useSearchSuggestions(): UseSearchSuggestionsResult {
  // Memoize suggestions to prevent recreating the array on each render
  const suggestions = useMemo(() => [
    "What is AI?",
    "Machine learning basics",
    "Romania travel guide",
    "Renewable energy",
    "Mental health tips",
    "Healthy diet plan",
  ], []);

  return {
    suggestions
  };
} 