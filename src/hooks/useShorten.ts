import { useCallback, useState } from "react";

import { ApiError, type ShortenResponse, shortenUrl } from "../services/api";

type UseShortenState = {
  result: ShortenResponse | null;
  loading: boolean;
  error: ApiError | Error | null;
  shorten: (url: string) => Promise<void>;
  reset: () => void;
};

export function useShorten(): UseShortenState {
  const [result, setResult] = useState<ShortenResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | Error | null>(null);

  const shorten = useCallback(async (url: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await shortenUrl(url);
      setResult(response);
    } catch (caught) {
      setResult(null);
      setError(caught instanceof Error ? caught : new Error("Error inesperado."));
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, shorten, reset };
}
