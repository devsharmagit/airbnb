import React from "react";

function Skeleton() {
  return (
    <div className="relative animate-pulse cursor-pointer overflow-hidden">
      <div className="h-72 w-full rounded-lg bg-gray-300 object-cover"></div>
      <div className=" flex flex-col gap-1 py-2">
        <div className="h-7 rounded-lg bg-gray-300"></div>
        <div className="h-4 rounded-lg bg-gray-300"></div>
        <div className="h-6 rounded-lg bg-gray-300"></div>
      </div>
    </div>
  );
}

export default Skeleton;
