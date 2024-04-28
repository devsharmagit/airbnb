import React from "react";

const PlaceOverviewSkeleton = () => {
  return (
    <div className="relative m-auto mt-3 w-full max-w-screen-lg animate-pulse cursor-pointer overflow-hidden">
      <div className="h-[500px] w-full rounded-lg bg-gray-300 object-cover"></div>
      <div className=" flex flex-col gap-2 py-2">
        <div className="h-7 w-72 rounded-lg bg-gray-300"></div>
        <div className="h-3 rounded-lg bg-gray-300"></div>
        <div className="h-3 rounded-lg bg-gray-300"></div>
        <div className="h-3 rounded-lg bg-gray-300"></div>
        <div className="h-3 rounded-lg bg-gray-300"></div>
        <div className="h-3 rounded-lg bg-gray-300"></div>
      </div>
      <div className="flex items-center gap-5 py-5">
        <div className="h-12 w-12 rounded-full bg-gray-300"></div>
        <div className="flex w-52 flex-col gap-2">
          <div className="h-3 rounded-lg bg-gray-300"></div>
          <div className="h-3 rounded-lg bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOverviewSkeleton;
