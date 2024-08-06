import React from "react";

const BookingOverviewSkeleton = () => {
  return (
    <>
      <div className="mt-5 h-7 w-72 rounded-lg bg-gray-300"></div>
      <div className="flex gap-5">
        <div className="relative mt-3 w-full max-w-xs animate-pulse cursor-pointer overflow-hidden">
          <div className="h-72 w-full rounded-lg bg-gray-300 object-cover"></div>
          <div className=" flex flex-col gap-1 py-2">
            <div className="h-7 rounded-lg bg-gray-300"></div>
            <div className="h-4 rounded-lg bg-gray-300"></div>
            <div className="h-6 rounded-lg bg-gray-300"></div>
          </div>
        </div>
        <div className=" w-full max-w-xs">
          <div className=" flex flex-col gap-3 py-2">
            <div className="h-6 rounded-lg bg-gray-300"></div>
            <div className="h-6 rounded-lg bg-gray-300"></div>
            <div className="h-6 rounded-lg bg-gray-300"></div>
            <div className="h-6 rounded-lg bg-gray-300"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingOverviewSkeleton;
