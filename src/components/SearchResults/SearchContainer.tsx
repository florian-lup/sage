"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import SearchResults from "./SearchResults";
import ErrorMessage from "./ErrorMessage";
import { useSearch } from "../../hooks";
import { IoMdClose } from "react-icons/io";
import { SearchContainerProps } from "../../types/components";

export const SearchContainer = ({ 
  isOpen, 
  onClose, 
  initialQuery
}: SearchContainerProps) => {
  const { answer, sources, loading, error, performSearch, abortSearch } = useSearch();
  const [query, setQuery] = useState(initialQuery);
  const prevQueryRef = useRef<string>("");
  const hasSearched = useRef(false);

  // Handle closing the search container with abort functionality
  const handleClose = useCallback(() => {
    // Abort any ongoing API calls
    abortSearch();
    // Call the parent's onClose handler
    onClose();
  }, [abortSearch, onClose]);

  useEffect(() => {
    // Only perform search when:
    // 1. Dialog is opened
    // 2. We have a query
    // 3. Either we haven't searched yet OR the query has changed
    if (isOpen && initialQuery) {
      const queryChanged = prevQueryRef.current !== initialQuery;
      
      if (!hasSearched.current || queryChanged) {
        setQuery(initialQuery);
        performSearch(initialQuery);
        
        // Update refs to track what we've searched for
        prevQueryRef.current = initialQuery;
        hasSearched.current = true;
      }
    }
    
    // Reset tracking when dialog closes
    if (!isOpen) {
      hasSearched.current = false;
    }
    // performSearch is intentionally omitted from the dependency array
    // to prevent unnecessary API calls on re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialQuery]);

  // Prevent unnecessary re-renders
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-[var(--background)]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-2 sm:p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-[var(--card)] rounded-lg w-full max-w-[98%] h-[95vh] sm:h-[90vh] md:h-[85vh] lg:h-[80vh] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] flex flex-col relative border border-[var(--border)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4 border-b border-[var(--border)]">
              <h2 className="text-sm sm:text-base font-medium text-[var(--foreground)] truncate max-w-[90%]">{initialQuery}</h2>
              <button
                onClick={handleClose}
                className="p-1 sm:p-1.5 hover:bg-[var(--secondary)] rounded-md transition-colors flex-shrink-0 cursor-pointer"
                aria-label="Close search results"
              >
                <IoMdClose className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--muted)]" />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 space-y-3 sm:space-y-4 overflow-y-auto scrollbar-hide">
              <ErrorMessage message={error} />
              
              {loading && (
                <div className="flex flex-col items-center justify-center py-6 sm:py-8 backdrop-blur-sm bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 border-2 border-[var(--primary)] border-t-transparent mb-3 sm:mb-4"></div>
                  <p className="text-[var(--muted)] text-xs sm:text-sm">Searching for the answer...</p>
                </div>
              )}
              
              {!loading && !error && !answer && sources.length === 0 && initialQuery && (
                <div className="text-center py-6 sm:py-8 backdrop-blur-sm bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md">
                  <p className="text-[var(--muted)] mb-1 sm:mb-2 text-sm sm:text-base">No results found for your search.</p>
                  <p className="text-xs sm:text-sm text-[var(--muted)]">Try another question.</p>
                </div>
              )}
              
              <SearchResults answer={answer} sources={sources} query={query} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}; 