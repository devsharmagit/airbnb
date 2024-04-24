import React from 'react'

const BookingOverviewSkeleton = () => {
  return (
    <>
        <div className="h-7 bg-gray-300 rounded-lg w-72 mt-5"></div>
    <div className='flex gap-5'>
    <div
      className="relative overflow-hidden cursor-pointer animate-pulse mt-3 max-w-xs w-full" >
  
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
    <div className=' max-w-xs w-full'>
    <div className=" py-2 flex flex-col gap-3">
    
        <div className="h-6 bg-gray-300 rounded-lg">
        </div>
        <div className="h-6 bg-gray-300 rounded-lg">
        </div>
        <div className="h-6 bg-gray-300 rounded-lg">
        </div>
        <div className="h-6 bg-gray-300 rounded-lg">
        </div>
      </div>
    </div>
    </div>

        </>
  )
}

export default BookingOverviewSkeleton
