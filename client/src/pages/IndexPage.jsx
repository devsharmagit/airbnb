import { useEffect } from "react";
import Place from "../components/Place.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import usePlace from "../hooks/usePlace.js";
import Skeleton from "../components/ui/Skeleton.jsx";
import { useDispatch, useSelector } from "react-redux";
import { removeAllFilter } from "../slice/filterSlice.js";
import Paragrapgh from "../components/typography/Paragrapgh.jsx";
import { CircleExlamanation } from "../assets/svgs";
import Error from "../components/Error.jsx";
import { Link } from "react-router-dom";
import { MapSvg } from "../assets/svgs";

function LoadingSkeleton({ loadig }) {
  return (
    <div className="grid grid-cols-1 items-center justify-center gap-x-[24px] gap-y-[30px] py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loadig && Array.from({ length: 4 }).map((val, index) => <Skeleton key={index} />)}
    </div>
  );
}

function IndexPage() {
  const filter = useSelector((state) => state.filter.filter);
  const dispatch = useDispatch();

  const { places, totalPlaces, hasMore, loadig, error, setPage } = usePlace();

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
  }, [filter]);

  if (error) {
    return (
      <>
        <Error />
      </>
    );
  }

  return (
    <>
      <div className="relative m-auto max-w-7xl px-4 pb-20 pt-12">
        {
          <>
            <Paragrapgh text={`Showing ${places?.length} results out of ${totalPlaces}.`} />
            {filter && (
              <Paragrapgh text={"Filter is applied. Please remove filter to get more results."} />
            )}

            {filter && (
              <button
                onClick={handleClearClick}
                className="mont absolute right-1 top-4 rounded-full  border border-gray-300 px-2 py-1 text-xs font-semibold text-primary shadow-sm"
              >
                Clear All Filters
              </button>
            )}

            <div className="mt-4 text-center">
              <InfiniteScroll
                dataLength={places.length}
                hasMore={hasMore}
                loader={<LoadingSkeleton loadig={loadig} />}
                next={updateData}
                className="text-center"
              >
                <div className="grid items-center justify-center gap-x-[34px] gap-y-[40px] py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                  <CircleExlamanation className={"m-auto h-8 w-8"} />
                  <Paragrapgh text={" No Places found. Try Removing filter or clearing search."} />
                </div>
              )}
            </div>
          </>
        }
      </div>
      <div className="fixed bottom-5 m-auto flex w-full justify-center">
        <Link
          to={"/map-place"}
          className="flex gap-2 rounded-full bg-primary px-4 py-2 font-semibold text-white"
        >
          <MapSvg /> Map View
        </Link>
      </div>
    </>
  );
}

export default IndexPage;
