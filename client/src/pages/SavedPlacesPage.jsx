import { useEffect, useState } from "react";
import Place from "../components/Place";
import useFetchData from "../hooks/useFetchData";
import Heading from "../components/typography/Heading";
import Paragrapgh from "../components/typography/Paragrapgh";
import Skeleton from "../components/ui/Skeleton";
import Error from "../components/Error";

function SavedPlacesPage() {
  const { result, loading, error } = useFetchData("/api/place/fav");
  const [places, setPlaces] = useState(result?.data?.places || []);

  const removeFromSaved = (id) => {
    const newPlaces = places.filter((place) => {
      return place._id !== id;
    });
    setPlaces(newPlaces);
  };

  useEffect(() => {
    if (result?.data?.places) {
      setPlaces(result?.data?.places);
    }
  }, [result]);

  if (loading) {
    return (
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 w-full justify-center sm:grid-col-2 max-w-7xl m-auto my-5">
        {Array.from({ length: 4 }).map((val, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <div className=" px-14 py-5 border-t border-gray-300">
        <Heading text={"Saved Places"} className={"text-center mb-5"} />

        {places.length === 0 && !loading && (
          <Paragrapgh
            text={"You have not saved a Place yet."}
            className={"text-center"}
          />
        )}
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 w-fit justify-center sm:grid-col-2 max-w-7xl m-auto">
          {places.map((obj) => {
            return (
              <Place
                removeFromSaved={removeFromSaved}
                key={obj?._id}
                id={obj?._id}
                title={obj?.title}
                description={obj?.description}
                photo={obj?.mainImage}
                price={obj?.price}
                favourites={obj?.favourites}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SavedPlacesPage;
