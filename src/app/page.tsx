"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, HomePage } from "../components";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery: string, includeDomains?: string[]) => {
    setLoading(true);
    // Create the base URL with the search query
    let url = `/search?q=${encodeURIComponent(searchQuery)}`;
    
    // Add domain filter to URL if specified
    if (includeDomains && includeDomains.length > 0) {
      url += `&domains=${includeDomains.join(',')}`;
    }
    
    // Redirect to the search page with the query and optional domain filter
    router.push(url);
  };

  return (
    <Layout showHomeLink={false}>
      <HomePage onSearch={handleSearch} loading={loading} />
    </Layout>
  );
}
