import React, {  useState } from "react";
import { formatDate } from "../utils/dateFunctions";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetchData";
import Heading from "../components/typography/Heading";
import Button from "../components/ui/Button";
import Paragrapgh from "../components/typography/Paragrapgh";
import Skeleton from "../components/ui/Skeleton";

const BookingsPage = () => {
  const [viewlAll, setViewAll] = useState(false);

  const navigate = useNavigate();

  const { result, loading, error } = useFetch(
    `/api/booking?allBookings=${viewlAll}`
  );

  const bookings = result?.data?.bookingDoc;

  const handleBookingClick = (bookingId) => {
    navigate(`/booking/${bookingId}`);
  };

  if(error){
    return <Error />
  }

  return (
    <div className="mt-1 mr-auto ml-auto max-w-3xl  pt-5 px-4">
      <Heading text={"My Bookings"} className={"text-center mb-5"} />
      {viewlAll ? (
        <Button onClick={() => setViewAll(false)} text={"View Active Bookings Only."} className={" !bg-gray-50 mb-2 text-sm border border-gray-300 !text-black"} />
      ) : (
        <Button onClick={()=> setViewAll(true)} text={"View all Bookings."} className={" !bg-gray-50 mb-2 text-sm border border-gray-300 !text-black"} />
      )}
     
      {bookings?.length === 0 && !loading && (
        <p className="mont text-lg text-center font-semibold mt-3 mb-3">
          You don't have any Active Bookings.
        </p>
      )}

      
      
      {loading &&
        Array.from({ length: 4 }).map((val, index) => <Skeleton key={index} />)}
      <div className="mt-5">

        {!loading && bookings?.map((booking) => {
          return (
            <div
              key={booking?._id}
              className="bg-gray-50  h-64 shadow-lg booking flex mb-4 border border-gray-200 cursor-pointer rounded-md"
              onClick={() => handleBookingClick(booking?._id)}
            >
              <div className="left w-60 rounded-md overflow-hidden h-full flex-none">
                <img
                  src={`${booking?.place?.mainImage?.url}`}
                  className="w-full object-cover h-full"
                  alt=""
                />
              </div>
              <div className="right px-4 py-2 flex flex-col flex-1 gap-2">
                <Heading text={booking?.place?.title} />
                <Paragrapgh text={` ${booking?.place?.address.slice(0, 200)} ...`} />
                <Paragrapgh text={`Check-in : ${formatDate(booking?.checkIn)}`} />
                <Paragrapgh text={`Check-out : ${formatDate(booking?.checkOut)}`} />
                <Paragrapgh text={  `Total Price paid - $ ${booking?.totalPrice}`} />
                <Paragrapgh text={`Booked at - ${formatDate(booking?.createdAt)}`} />
                <Paragrapgh className={"text-xl !font-bold text-primary"} text={booking?.active === true ? "Active" : "Completed"} />

            
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingsPage;
