import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProjectList } from "./ProjectList";
import * as api from "../api/projectApi"; // Import the module to mock it

// 1. Mock the API module
jest.mock("../api/projectApi");

describe("ProjectList Pagination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("loads page 1 initially and fetches page 2 when Next is clicked", async () => {
    // 2. Setup Mock Data
    const mockResponsePage1 = {
      data: [{ id: "1", name: "Proj A", status: "active" }],
      total: 20, // Implies 2 pages (10 per page)
    };
    const mockResponsePage2 = {
      data: [{ id: "11", name: "Proj B", status: "active" }],
      total: 20,
    };

    // 3. Spy on the fetch function and control its results
    // We use mockResolvedValueOnce to change behavior sequentially
    (api.fetchProjects as jest.Mock)
      .mockResolvedValueOnce(mockResponsePage1) // First call (Mount)
      .mockResolvedValueOnce(mockResponsePage2); // Second call (Page 2)

    render(<ProjectList />);

    // 4. Verify Initial Load (Page 1)
    // Use 'findBy' to wait for the async useEffect
    expect(await screen.findByText("Proj A")).toBeInTheDocument();
    expect(screen.getByText(/Page 1/i)).toBeInTheDocument();

    // 5. Simulate User Interaction (Click Next)
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    // 6. Verify the API was called with the correct arguments
    // This is the CRITICAL check for a Senior Dev
    await waitFor(() => {
      expect(api.fetchProjects).toHaveBeenLastCalledWith(2, 10);
    });

    // 7. Verify UI Update
    expect(await screen.findByText("Proj B")).toBeInTheDocument();
    expect(screen.getByText(/Page 2/i)).toBeInTheDocument();
  });
});
