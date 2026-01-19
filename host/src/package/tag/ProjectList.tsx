// /apps/dashboard/src/components/ProjectList.tsx
import React, { useEffect, useState } from "react";
import { fetchProjects, Project } from "../api/projectApi";
// import { Tag } from '@meisterplan/ui-library'; // Use your shared component!

export function ProjectList() {
  // 1. State Management
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const LIMIT = 10;

  // 2. Calculated Value
  const totalPages = Math.ceil(total / LIMIT);

  // 3. The Effect (Data Fetching)
  useEffect(() => {
    // Defines a flag to prevent "Race Conditions" (Senior Move!)
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetchProjects(page, LIMIT);
        if (isMounted) {
          setProjects(response.data);
          setTotal(response.total);
        }
      } catch (error) {
        console.error("Failed to fetch projects");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [page]); // Re-run whenever 'page' changes

  // 4. Handlers
  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-lg">
      <h2 className="text-xl font-bold mb-4">Meisterplan Projects ({total})</h2>

      {/* List Area */}
      <div className="min-h-[300px]">
        {" "}
        {/* Fixed height prevents layout jump */}
        {loading ? (
          <div className="text-gray-500 animate-pulse">Loading data...</div>
        ) : (
          <ul className="space-y-2">
            {projects.map((proj) => (
              <li key={proj.id} className="p-2 border-b flex justify-between">
                <span>{proj.name}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    proj.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100"
                  }`}
                >
                  {proj.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 border-t pt-4">
        <button
          onClick={handlePrev}
          disabled={page === 1 || loading}
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {page} of {totalPages || 1}
        </span>

        <button
          onClick={handleNext}
          disabled={page >= totalPages || loading}
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
}
