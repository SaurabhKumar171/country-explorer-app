"use client";
import React, { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getCountries } from "../../_services/countryService";
import { useSearch } from "../../_context/SearchProvider";
import { SearchHeader } from "../../_components/search/SearchHeader";
import { ResultsDisplay } from "../../_components/search/ResultsDisplay";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setResults, setPagination, setIsLoading, setError } = useSearch();

  // Get search parameters directly from the URL
  const name = searchParams.get("name") || "";
  const continent = searchParams.get("continent") || "";
  const page = searchParams.get("page") || "1";
  const sort = searchParams.get("sort") || "name_asc";

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params: Record<string, string> = { page, sort, limit: "12" };
        if (name) params.name = name;
        if (continent) params.continent = continent;

        const response = await getCountries(params);
        setResults(response.data);
        setPagination(response.pagination || null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, [
    name,
    continent,
    page,
    sort,
    setIsLoading,
    setError,
    setResults,
    setPagination,
  ]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <SearchHeader sortValue={sort} onSortChange={handleSortChange} />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <ResultsDisplay />
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-gray-900 min-h-screen flex items-center justify-center">
          <p className="text-white text-lg">Loading Search Results...</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
