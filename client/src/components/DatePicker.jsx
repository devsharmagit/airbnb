import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function DatePicker({ blockedDates, setCheckIN, checkIn, checkOut, setCheckOut }) {
  const [date, setDate] = useState({
    startDate: checkIn,
    endDate: checkOut,
    key: "selection",
  });

  const handleDateChange = (range) => {
    setDate(range.selection);
    setCheckIN(format(range?.selection?.startDate, "yyyy-MM-dd"));
    setCheckOut(format(range?.selection?.endDate, "yyyy-MM-dd"));
  };

  return (
    <div>
      <DateRangePicker
        ranges={[date]}
        onChange={handleDateChange}
        disabledDates={blockedDates}
        minDate={new Date()}
      />
    </div>
  );
}

export default DatePicker;
