"use client";

import React from "react";
import { CountryCard } from "../CountryCard";
import { Pagination } from "../Pagination";
import { CardSkeleton } from "../ui/Skeleton";
import { FiSearch } from "react-icons/fi";
import { useSearch } from "../../_context/SearchProvider";
import { useSearchParams } from "next/navigation";

export const ResultsDisplay = () => {
  const { results, pagination, isLoading, error } = useSearch();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-red-400 mb-2">
          An Error Occurred
        </h2>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  if (results.length > 0) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-[fadeIn_0.5s_ease-in-out]">
          {results.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
        <Pagination pagination={pagination} />
      </>
    );
  }

  return (
    <div className="text-center py-16 flex flex-col items-center animate-[fadeIn_0.5s_ease-in-out]">
      <FiSearch className="text-6xl text-gray-600 mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">No Countries Found</h2>
      <p className="text-gray-500 max-w-sm">
        Your search for `{name}` did not return any results. Please try a
        different query.
      </p>
    </div>
  );
};
