import { useCallback, useState } from "react";

import { ApiError, resolveCode } from "../services/api";

type UseRedirectState = {
  url: string | null;
  notFound: boolean;
  loading: boolean;
  error: ApiError | Error | null;
  resolve: (codigo: string) => Promise<string | null>;
};

export function useRedirect(): UseRedirectState {
  const [url, setUrl] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | Error | null>(null);

  const resolve = useCallback(async (codigo: string) => {
    setLoading(true);
    setNotFound(false);
    setError(null);

    try {
      const resolvedUrl = await resolveCode(codigo);
      setUrl(resolvedUrl);
      return resolvedUrl;
    } catch (caught) {
      const currentError = caught instanceof Error ? caught : new Error("Error inesperado.");
      setUrl(null);
      setError(currentError);

      if (currentError instanceof ApiError && currentError.status === 404) {
        setNotFound(true);
      }

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { url, notFound, loading, error, resolve };
}
