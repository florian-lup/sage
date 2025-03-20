"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, HomePage } from "../components";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    // Redirect to the search page with the query
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <Layout showHomeLink={false}>
      <HomePage onSearch={handleSearch} loading={loading} />
    </Layout>
  );
}
