import { useEffect, useState } from "react";
import useQueryMake from "./useQueryMake";
import { getAllPlace } from "../services/api/placeApi";
import { useAppSelector } from "./reduxhooks";
import { PlaceDataType } from "../types/place";

function usePlace() {
  const [page, setPage] = useState(1);
  const [places, setPlaces] = useState<PlaceDataType[]>([]);
  const [totalPlaces, setTotalPlaces] = useState(0);
  const [loadig, setLoading] = useState(true);
  const [hasMore, setHasmore] = useState(false);
  const [error, setError] = useState(false);

  const filter = useAppSelector((state) => state.filter.filter);
  const searchString = useAppSelector((state) => state.filter.searchString);

  const queryString = useQueryMake(filter, searchString);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        const response: any = await getAllPlace(page, queryString, signal);
        const result = response?.data?.places || [];
        setPlaces((prev) => [...prev, ...result]);
        setTotalPlaces(response.data.totalPlaces);
      } catch (error: any) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
      setHasmore(false);
      setLoading(true);
      setError(false);
    };
  }, [page, queryString]);

  useEffect(() => {
    if (places.length !== 0 && totalPlaces !== 0) {
      setHasmore(!(places.length === totalPlaces));
    }
  }, [places, totalPlaces]);

  useEffect(() => {
    return () => {
      setPlaces([]);
      setHasmore(true);
      setTotalPlaces(1);
      setPage(1);
      setLoading(true);
      setError(false);
    };
  }, [queryString]);

  return { places, totalPlaces, loadig, hasMore, page, error, setPage };
}

export default usePlace;
