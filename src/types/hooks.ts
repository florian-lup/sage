import { SearchResultItem } from "./search";

// Hook result types
export interface UseSearchResult {
  answer: string;
  sources: SearchResultItem[];
  loading: boolean;
  error: string;
  performSearch: (query: string) => Promise<void>;
  abortSearch: () => void;
}

export interface UseFollowUpQuestionResult {
  followUpQuery: string;
  followUpAnswer: string;
  isLoading: boolean;
  setFollowUpQuery: (query: string) => void;
  handleFollowUpQuestion: (e: React.FormEvent) => Promise<void>;
}

export interface UseSearchSuggestionsResult {
  suggestions: string[];
} 