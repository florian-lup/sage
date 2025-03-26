import { useState, useCallback, useRef } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string;
  fetchData: (url: string, options?: RequestInit) => Promise<T | null>;
  abortRequest: () => void;
}

/**
 * Custom hook for making fetch requests with loading and error states
 */
export function useFetch<T>(): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);

  const abortRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
    }
  }, []);

  const fetchData = useCallback(async (url: string, options?: RequestInit) => {
    // Abort any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController
    abortControllerRef.current = new AbortController();
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: abortControllerRef.current.signal,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status}`);
      }
      
      const result = await response.json() as T;
      setData(result);
      return result;
    } catch (err) {
      // Don't set error state if the request was aborted
      if (err instanceof DOMException && err.name === 'AbortError') {
        return null;
      }

      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    fetchData,
    abortRequest
  };
} 