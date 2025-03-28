import { useUser } from "@/context/UserContext";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

export default function Pagination() {
  const { totalPages, page, setPage } = useUser();

  if (!totalPages || totalPages < 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-white shadow-md rounded-lg sticky bottom-5">
      <button
        className="p-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={page <= 1}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        aria-label="Previous Page"
      >
        <ChevronsLeft className="w-5 h-5" />
      </button>

      <span className="text-sm font-medium text-gray-700">
        Page {page} of {totalPages}
      </span>

      <button
        className="p-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={page >= totalPages}
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        aria-label="Next Page"
      >
        <ChevronsRight className="w-5 h-5" />
      </button>
    </div>
  );
}
