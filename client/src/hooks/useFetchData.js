import axios from "axios";
import { useEffect, useRef, useState } from "react";

function useFetchData(url) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const abortControllerRef = useRef(null);

  const fetchData = async () => {
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    setLoading(true);
    try {
      const responseData = await axios.get(url, {
        withCredentials: true,
        signal,
      });
      setResult(responseData);
      setError(false);
    } catch (error) {
      if (error.name === "CanceledError") {
        return 
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
