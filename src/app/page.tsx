"use client";

import { useState, useCallback } from "react";
import { Layout, HomePage, SearchContainer } from "../components";

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async (searchQuery: string) => {
    setLoading(true);
    
    setSearchQuery(searchQuery);
    setIsSearchOpen(true);
    
    setLoading(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  return (
    <Layout showHomeLink={false}>
      <HomePage onSearch={handleSearch} loading={loading} />
      <SearchContainer 
        isOpen={isSearchOpen} 
        onClose={handleClose} 
        initialQuery={searchQuery}
      />
    </Layout>
  );
}
