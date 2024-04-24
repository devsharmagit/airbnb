import React from 'react'
import {CalenderSvg} from '../assets/svgs'
import Paragrapgh from './typography/Paragrapgh'
import DatePicker from './DatePicker'
import { formatDate } from '../utils/dateFunctions'

const PlaceDate = ({checkOut, checkIn, blockedDates, setCheckIN, setCheckOut}) => {
  return (
    <div className="grid md:grid-cols-2  gap-4 border-t border-gray-300 pt-8">
    <div className="flex flex-col gap-3">
      <label
        htmlFor="checkInDate"
        className="mont flex gap-3 font-semibold text-xl "
      >
        <CalenderSvg />
        Check In & Check Out
      </label>
      <div className="flex gap-2">
        <div className="bg-gray-300 h-4 w-4 "></div>
        <Paragrapgh
          text={
            "gray boxes are those boxes which are booked or not available"
          }
        />
      </div>
      {checkIn && checkOut && (
        <Paragrapgh
          text={` From ${formatDate(checkIn)} to ${formatDate(
            checkOut
          )}`}
        />
      )}
    </div>
    <div className="flex flex-col gap-3">
      {checkIn && checkOut && (
        <DatePicker
          blockedDates={blockedDates}
          checkIn={checkIn}
          checkOut={checkOut}
          setCheckIN={setCheckIN}
          setCheckOut={setCheckOut}
        />
      )}
    </div>
  </div>
  )
}

export default PlaceDate
