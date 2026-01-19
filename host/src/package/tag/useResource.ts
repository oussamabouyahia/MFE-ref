import { useState, useEffect } from "react";

// 1. Define a standard Error shape (Optional but recommended)
interface ApiError {
  message: string;
  code?: number;
}

// 2. The Generic <T> means: "I don't know what the data is yet"
export function useFetch<T>(fetchFunction: () => Promise<T>) {
  // Data is T (Success) or null (Not loaded yet)
  const [data, setData] = useState<T | null>(null);

  // Error is Error (Standard JS object) or null
  const [error, setError] = useState<Error | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchFunction()
      .then((response) => {
        if (isMounted) {
          setData(response); // TypeScript knows this is type T
          setError(null);
        }
      })
      .catch((err: unknown) => {
        // <--- 3. Catch as unknown (Safety)
        if (isMounted) {
          // 4. The "Type Guard": Check if it's a real Error
          if (err instanceof Error) {
            setError(err);
          } else {
            setError(new Error("An unexpected error occurred"));
          }
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [fetchFunction]);

  return { data, error, loading };
}
