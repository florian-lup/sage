import { SearchResultItem } from "./search";

// Component prop types
export interface SearchResultsProps {
  answer: string;
  sources: SearchResultItem[];
  query?: string;
}

export interface SearchFormProps {
  onSearch: (query: string) => Promise<void>;
  disabled?: boolean;
}

export interface HomePageProps {
  onSearch: (searchQuery: string) => Promise<void>;
  loading: boolean;
}

export interface ErrorMessageProps {
  message: string;
}

export interface SearchContainerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery: string;
} 