
import { useCallback, useEffect, useState } from 'react';
import type { ApiError } from '../api/axiosInstance';

export function useAsync<T>(asyncFn: () => Promise<T>, immediate = true) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn();
      setData(result);
      return result;
    } catch (err) {
      const apiErr = err as ApiError;
      setError(apiErr?.message || 'Failed to load data.');
      return null;
    } finally {
      setLoading(false);
    }
  }, [asyncFn]);

  useEffect(() => {
    if (immediate) {
      void execute();
    }
  }, [execute, immediate]);

  return { data, setData, loading, error, refetch: execute };
}
