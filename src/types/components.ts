import { SearchResultItem } from "./search";

// Component prop types
export interface SearchResultsProps {
  answer: string;
  sources: SearchResultItem[];
  query?: string;
}

export interface SearchFormProps {
  onSearch: (query: string, includeDomains?: string[]) => Promise<void>;
  disabled?: boolean;
}

export interface HomePageProps {
  onSearch: (searchQuery: string, includeDomains?: string[]) => Promise<void>;
  loading: boolean;
}

export interface ErrorMessageProps {
  message: string;
} 