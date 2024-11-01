// src/hooks/useApi.ts
import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

type ApiResult<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  request: (config: AxiosRequestConfig) => Promise<void>;
};

function useApi<T = any>(): ApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const request = useCallback(async (config: AxiosRequestConfig): Promise<void> => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await axios({
        baseURL: "/api",
        ...config,
      });
      setData(response.data);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : 'Network error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, request };
}

export default useApi;
