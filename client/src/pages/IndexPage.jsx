import { useEffect } from "react";
import Place from "../components/Place.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import usePlace from "../hooks/usePlace.js";
import Skeleton from "../components/ui/Skeleton.jsx";
import { useDispatch, useSelector } from "react-redux";
import { removeAllFilter } from "../slice/filterSlice.js";
import Paragrapgh from "../components/typography/Paragrapgh.jsx";
import {CircleExlamanation} from "../assets/svgs";
import Error from "../components/Error.jsx";
import { Link } from "react-router-dom";
import {MapSvg} from "../assets/svgs";
import LoadingModal from "../components/Modal/LoadingModal.jsx";

function LoadingSkeleton({ loadig }) {
  return (
    <div className="grid gap-x-[24px] gap-y-[30px] lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 py-2 justify-center items-center">
      {loadig &&
        Array.from({ length: 4 }).map((val, index) => <Skeleton key={index} />)}
    </div>
  );
}

function IndexPage() {
  const filter = useSelector((state) => state.filter.filter);
  const dispatch = useDispatch();

  const { places, totalPlaces, hasMore, loadig, error,setPage } = usePlace();

  const updateData = () => {
    setPage((prev) => prev + 1);
  };

  const handleClearClick = () => {
    dispatch(removeAllFilter());
  };

  useEffect(() => {
    return () => {
      setPage(1);
    };
  }, []);

  if(error){
    return <>
    <Error />
    </>
  }

  return (
    <>
    <div className="px-4 pt-12 max-w-7xl m-auto relative pb-20">
      {
        <>
          <Paragrapgh
            text={`Showing ${places?.length} results out of ${totalPlaces}.`}
          />
          {
            filter && <Paragrapgh text={"Filter is applied. Please remove filter to get more results."} />
          }
     
          {filter && (
            <button
              onClick={handleClearClick}
              className="mont absolute top-4 right-1 text-primary  border border-gray-300 shadow-sm text-xs font-semibold py-1 px-2 rounded-full"
            >
              Clear All Filters
            </button>
          )}

        
          <div className="text-center mt-4">
            <InfiniteScroll
              dataLength={places.length}
              hasMore={hasMore}
              loader={<LoadingSkeleton loadig={loadig} />}
              next={updateData}
              className="text-center"
            >
             
              <div className="grid gap-x-[34px] gap-y-[40px] lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 py-2 justify-center items-center">
                {places.map((obj) => (
                  <Place
                    key={obj?._id}
                    id={obj?._id}
                    title={obj?.title}
                    description={obj?.description}
                    photo={obj?.mainImage}
                    price={obj?.price}
                    favourites={obj?.favourites}
                  />
                ))}

               
              </div>
              {loadig && <LoadingSkeleton loadig={loadig} />}
            </InfiniteScroll>

            {!totalPlaces && !loadig && (
              <div>
             <CircleExlamanation className={"w-8 h-8 m-auto"} />
                <Paragrapgh
                  text={
                    " No Places found. Try Removing filter or clearing search."
                  }
                />
              </div>
            )}
          </div>
        </>
      }
    </div>
    <div className="fixed bottom-5 w-full m-auto flex justify-center" >
      <Link to={"/map-place"} className="bg-primary flex gap-2 px-4 py-2 rounded-full font-semibold text-white" >
 <MapSvg  />  Map View
      </Link>
    </div>
    </>
  );
}

export default IndexPage;
