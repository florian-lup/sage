import { useMemo } from "react";
import { UseSearchSuggestionsResult } from "../types/hooks";

export function useSearchSuggestions(): UseSearchSuggestionsResult {
  // Memoize suggestions to prevent recreating the array on each render
  const suggestions = useMemo(() => [
    "What is AI?",
    "Romania travel guide",
    "Mental health tips",
    "Healthy diet plan",
  ], []);

  return {
    suggestions
  };
} 