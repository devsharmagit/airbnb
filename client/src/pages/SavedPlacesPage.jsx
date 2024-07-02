import { useEffect, useState } from "react";
import Place from "../components/Place";
import Heading from "../components/typography/Heading";
import Paragrapgh from "../components/typography/Paragrapgh";
import Skeleton from "../components/ui/Skeleton";
import Error from "../components/Error";
import { GET_SAVED_PLACE } from "../services/api/apiEndpoints";
import useFetchData from "../hooks/useFetchData";


function SavedPlacesPage() {
  const { result, loading, error } = useFetchData(GET_SAVED_PLACE);
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
      <div className="sm:grid-col-2 m-auto my-5 grid w-full max-w-7xl justify-center gap-4 md:grid-cols-3 lg:grid-cols-4">
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
      <div className=" border-t border-gray-300 px-14 py-5">
        <Heading text={"Saved Places"} className={"mb-5 text-center"} />

        {places.length === 0 && !loading && (
          <Paragrapgh text={"You have not saved a Place yet."} className={"text-center"} />
        )}
        <div className="sm:grid-col-2 m-auto grid w-fit max-w-7xl justify-center gap-4 md:grid-cols-3 lg:grid-cols-4">
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
