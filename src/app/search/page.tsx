"use client";

import { Layout, SearchResultsPage } from "../../components";

export default function SearchPageRoute() {
  return (
    <Layout showHomeLink={true}>
      <SearchResultsPage />
    </Layout>
  );
} 