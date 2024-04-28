import axios from "axios";
import { useEffect, useState } from "react";
import useQueryMake from "./useQueryMake";
import { useSelector } from "react-redux";

function usePlace() {
  const [page, setPage] = useState(1);
  const [places, setPlaces] = useState([]);
  const [totalPlaces, setTotalPlaces] = useState(0);
  const [loadig, setLoading] = useState(true);
  const [hasMore, setHasmore] = useState(false);
  const [error, setError] = useState(false);

  const filter = useSelector((state) => state.filter.filter);
  const searchString = useSelector((state) => state.filter.searchString);

  const queryString = useQueryMake(filter, searchString);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        console.log("fetching all places function is called", loadig);
        const response = await axios.get(
          `/api/place?fields=title,description,mainImage,price,favourites&limit=12&page=${page}&${queryString}`,
          { withCredentials: true, signal }
        );
        setPlaces((prev) => [...prev, ...response.data.places]);
        setTotalPlaces(response.data.totalPlaces);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.log(error);
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

  console.log(loadig);

  return { places, totalPlaces, loadig, hasMore, page, error, setPage };
}

export default usePlace;
