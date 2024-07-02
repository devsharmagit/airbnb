import Place from "../components/Place";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useFetchData from "../hooks/useFetchData";
import IconButton from "../components/ui/IconButton";
import Heading from "../components/typography/Heading";
import Paragrapgh from "../components/typography/Paragrapgh";
import { EditSvg, TrashSvg } from "../assets/svgs";
import Skeleton from "../components/ui/Skeleton";
import { useState } from "react";
import LoadingModal from "../components/Modal/LoadingModal";
import Error from "../components/Error";
import { GET_MY_PLACES } from "../services/api/apiEndpoints";
import { deletePlace } from "../services/api/placeApi";


function MyPlacesPage() {
  const { result, error, loading, fetchData } = useFetchData(GET_MY_PLACES);

  const [isLoading, setIsLoading] = useState(false);

  const places = result?.data?.places || [];

  const handleClick = async (placeId) => {
    try {
      setIsLoading(true);
      const responseData = await deletePlace(placeId);
      if (responseData.status === 204) {
        toast.success("Successfully deleted.");
        await fetchData();
      }
    } catch (error) {
      toast.error("Something  went worng!");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <Error />;
  }

  return (
    <>
      <LoadingModal isOpen={isLoading} text={"Deleting your place..."} />
      <div className=" border-t border-gray-300 px-14 py-5">
        <Heading text={"My Places"} className={"mb-5 text-center"} />

        {(places?.length === 0) && !loading && (
          <Paragrapgh text={"You have not created a Place yet."} className={"text-center"} />
        )}

        <div className="sm:grid-col-2 m-auto grid max-w-7xl justify-center gap-4 md:grid-cols-3 lg:grid-cols-4">
          {loading && Array.from({ length: 4 }).map((val, index) => <Skeleton key={index} />)}

          {places?.map((obj) => {
            return (
              <div key={obj?._id}>
                <Place id={obj?._id} title={obj?.title} photo={obj?.mainImage}  favourites={obj?.favourites}/>

                <div className="flex justify-center gap-2">
                  <Link
                    to={`/place/${obj?._id}/edit`}
                    className="mont flex items-center gap-1 rounded-md border border-gray-300 bg-gray-100 px-2 py-[2px] text-base font-medium hover:bg-gray-200"
                  >
                    <EditSvg className={"!h-4 !w-4"} />
                    Edit
                  </Link>

                  <IconButton
                    onClick={() => handleClick(obj?.id)}
                    className={
                      "mont flex flex-row-reverse items-center gap-1 rounded-md border border-gray-300 bg-gray-100 px-2 py-[2px] text-base font-medium"
                    }
                    Icon={TrashSvg}
                    text={"Delete"}
                    IconClass={"!w-4 !h-4"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MyPlacesPage;
