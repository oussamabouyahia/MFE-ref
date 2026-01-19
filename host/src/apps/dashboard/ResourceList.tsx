import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllResources } from "../../store/resources/resourceSelectors";
import { Select } from "@meisterplan/ui";
interface Resource {
  id: string;
  name: string;
  role: "Developer" | "Manager" | "All";
}
interface ResourceListProps {
  resources: Resource[];
}
const ResourceList = () => {
  // Inside ResourceList.tsx
  const resources: Resource[] = useSelector(selectAllResources);
  const [selectedRole, setSelectedRole] = useState<
    "All" | "Developer" | "Manager"
  >("All");
  // 1. Add Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // 2. Reset page when Filter changes (Crucial UX detail!)
  // If I am on Page 5 of "All", and I switch to "Managers" (which only has 2 pages),
  // I must reset to Page 1, or the user sees an empty screen.
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRole]);

  // 3. Calculate the Slice (Derived State)
  // Note: We use the 'filteredResources' from your previous step
  const filteredResources = resources.filter((r) =>
    selectedRole === "All" ? true : r.role === selectedRole
  );
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResources.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredResources, currentPage]);

  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);

  // 4. The UI
  return (
    <div>
      {/* ... Filter Component ... */}

      {/* The List (Now using paginatedData) */}
      <table>
        <tbody>
          {paginatedData.map((r) => (
            <tr key={r.id}>...</tr>
          ))}
        </tbody>
      </table>

      {/* 5. The Controls (Simple Manual Implementation) */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResourceList;
