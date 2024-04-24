import axios from "axios";
import Place from "../components/Place";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useFetchData from "../hooks/useFetchData";
import IconButton from "../components/ui/IconButton";
import Heading from "../components/typography/Heading";
import Paragrapgh from "../components/typography/Paragrapgh";
import {EditSvg, TrashSvg} from "../assets/svgs"
import Skeleton from "../components/ui/Skeleton";

function MyPlacesPage() {
  const { result, error, loading, fetchData } = useFetchData(
    `/api/place/getAllUserPlaces`
  );

  const places = result?.data?.places || []

  const handleClick = async (placeId) => {
    try {
      const responseData = await axios.delete(`/api/place/${placeId}`, {
        withCredentials: true,
      });
      if (responseData.status === 204) {
        toast.success("Successfully deleted.");
        await fetchData()
      }
    } catch (error) {
      toast.error("Something  went worng!");
    }
  };


  if(error){
    return <Error />
  }

  return (
    <>
      <div className=" px-14 py-5 border-t border-gray-300">
        <Heading text={"My Places"} className={"text-center mb-5"} />

        {places?.length === 0 && !loading && (
          <Paragrapgh text={"You have not created a Place yet."} />
        )}

        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 justify-center sm:grid-col-2 max-w-7xl m-auto">

        {loading &&
        Array.from({ length: 4 }).map((val, index) => <Skeleton key={index} />)}

          {places?.map((obj) => {
            return (
              <div key={obj?._id}>
                <Place
                  id={obj?._id}
                  title={obj?.title}
                  photo={obj?.mainImage}
                />

                <div className="flex justify-center gap-2">
                  <Link
                    to={`/place/${obj?._id}/edit`}
                    className="hover:bg-gray-200 bg-gray-100 flex gap-1 items-center px-2 py-[2px] rounded-md border border-gray-300 mont text-base font-medium"
                  >
                    <EditSvg className={"!w-4 !h-4"} />
                    Edit
                  </Link>

                  <IconButton
                    onClick={() => handleClick(obj?.id)}
                    className={
                      "bg-gray-100 flex flex-row-reverse gap-1 items-center px-2 py-[2px] rounded-md border border-gray-300 mont text-base font-medium"
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
