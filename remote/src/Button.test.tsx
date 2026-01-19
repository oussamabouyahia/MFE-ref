import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Button from "./Button";
import { describe, it, expect, vi } from "vitest"; // Import from vitest

// 1. DEFINE THE MOCK STORE FACTORY
// We create a fresh store for every test to avoid state leaking between tests.
const createMockStore = (initialValue = 0) => {
  return configureStore({
    reducer: {
      // We manually mock the 'counter' slice that the Remote expects
      counter: (state = { value: initialValue }, action) => {
        return state; // We don't need real reducer logic, just the state
      },
    },
  });
};

describe("Remote Button Component", () => {
  it("renders correctly and reads from the Global Store", () => {
    // A. Setup: Create a store with a specific value (e.g., 99)
    const store = createMockStore(99);

    // B. Render wrapped in Provider
    render(
      <Provider store={store}>
        <Button label="Test Me" />
      </Provider>
    );

    // C. Assertion: Does it display the value from our mock store?
    // "Global Store Value: 99"
    expect(screen.getByText(/Global Store Value: 99/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Test Me/i })
    ).toBeInTheDocument();
  });

  it('dispatches the correct "protocol" action when clicked', () => {
    const store = createMockStore(0);
    // D. Spy on the dispatch function
    const dispatchSpy = vi.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <Button />
      </Provider>
    );

    // E. Act: Click the button
    fireEvent.click(screen.getByRole("button"));

    // F. Assert: Did we send the correct signal?
    // We check the TYPE string, because that is the "Contract" with the Host.
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "counter/increment" });
  });
});
