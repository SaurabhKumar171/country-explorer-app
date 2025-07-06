"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/Button";
import { PaginationInfo } from "../_types/country";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface PaginationProps {
  pagination: PaginationInfo | null;
}

export const Pagination: React.FC<PaginationProps> = ({ pagination }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!pagination || pagination.totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 mt-12">
      <Button
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={pagination.currentPage === 1}
        className="!bg-gray-800/50 hover:!bg-gray-700/70 border border-gray-700 flex items-center gap-2 transition-all duration-200"
        aria-label="Go to previous page"
      >
        <FiArrowLeft />
        {/* The text is hidden on extra-small screens and shown on small screens and up */}
        <span className="hidden sm:inline">Previous</span>
      </Button>

      <span className="font-semibold text-gray-400 text-sm sm:text-base whitespace-nowrap">
        Page {pagination.currentPage} of {pagination.totalPages}
      </span>

      <Button
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={pagination.currentPage === pagination.totalPages}
        className="!bg-gray-800/50 hover:!bg-gray-700/70 border border-gray-700 flex items-center gap-2 transition-all duration-200"
        aria-label="Go to next page"
      >
        {/* The text is hidden on extra-small screens and shown on small screens and up */}
        <span className="hidden sm:inline">Next</span>
        <FiArrowRight />
      </Button>
    </div>
  );
};
