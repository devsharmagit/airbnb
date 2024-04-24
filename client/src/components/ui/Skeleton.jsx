import React from 'react'

function Skeleton() {
  return (
    <div
      className="relative overflow-hidden cursor-pointer animate-pulse" >
  
      <div
        className="h-72 bg-gray-300 w-full object-cover rounded-lg"
      
      ></div>
      <div className=" py-2 flex flex-col gap-1">
        <div className="h-7 bg-gray-300 rounded-lg"></div>
        <div className="h-4 bg-gray-300 rounded-lg">
        </div>
        <div className="h-6 bg-gray-300 rounded-lg">
        </div>
      </div>
    </div>
  )
}

export default Skeleton
