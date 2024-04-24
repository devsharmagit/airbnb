import React from 'react'

const PlaceOverviewSkeleton = () => {
  return (
    <div
    className="relative overflow-hidden cursor-pointer animate-pulse mt-3 max-w-screen-lg m-auto w-full" >

    <div
      className="h-[500px] bg-gray-300 w-full object-cover rounded-lg"
      
      ></div>
    <div className=" py-2 flex flex-col gap-2">
      <div className="h-7 w-72 bg-gray-300 rounded-lg"></div>
      <div className="h-3 bg-gray-300 rounded-lg"></div>
      <div className="h-3 bg-gray-300 rounded-lg">
      </div>
      <div className="h-3 bg-gray-300 rounded-lg">
      </div>
      <div className="h-3 bg-gray-300 rounded-lg">
      </div>
      <div className="h-3 bg-gray-300 rounded-lg">
      </div>
    </div>
    <div className='flex gap-5 items-center py-5'>
<div className='w-12 bg-gray-300 h-12 rounded-full'></div>
<div className='w-52 flex flex-col gap-2'>
<div className="h-3 bg-gray-300 rounded-lg"></div>
<div className="h-3 bg-gray-300 rounded-lg"></div>

</div>
    </div>
  </div>
  )
}

export default PlaceOverviewSkeleton
