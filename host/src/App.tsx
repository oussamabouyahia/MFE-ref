import React, { Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector, useDispatch } from "react-redux"; // <--- Import Redux
import { store, RootState } from "./store"; // ✅ Store setup
import { increment } from "./features/counter/counterSlice"; // ✅ Actions
import ErrorBoundary from "./ErrorBoundary";
import "./index.css";

// @ts-ignore
const RemoteButton = React.lazy(() => import("remote/Button"));

// Create a component to consume the store (AppContent)
// We need this separation because we can't use 'useSelector' inside the same component that creates the Provider
const AppContent = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="p-10 border-4 border-red-500 rounded-xl m-10 bg-white">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">HOST (Shell)</h1>

        {/* Redux Counter Display */}
        <div className="bg-purple-900 text-white px-5 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
          🧠 Redux Store: <span>{count}</span>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={() => dispatch(increment())}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Host Increment (+)
        </button>
      </div>

      <div className="border-2 border-dashed border-blue-400 p-8 rounded-lg bg-blue-50">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Remote MFE Area
        </h2>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <RemoteButton />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(<App />);
