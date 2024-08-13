import axios, { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";

function useFetchData(url: string) {
  const [result, setResult] = useState<null | AxiosResponse>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const abortControllerRef: any = useRef(null);

  const fetchData = async () => {
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    setLoading(true);
    try {
      const responseData: AxiosResponse = await axios.get(url, {
        withCredentials: true,
        signal,
      });
      setResult(responseData);
      setError(false);
    } catch (error: any) {
      if (error.name === "CanceledError") {
        return;
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url]);

  return { result, error, loading, fetchData };
}

export default useFetchData;
