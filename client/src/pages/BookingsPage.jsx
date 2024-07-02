import React, { useState } from "react";
import { formatDate } from "../utils/dateFunctions";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetchData";
import Heading from "../components/typography/Heading";
import Button from "../components/ui/Button";
import Paragrapgh from "../components/typography/Paragrapgh";
import Skeleton from "../components/ui/Skeleton";
import { GET_ALL_BOOKINGS } from "../services/api/apiEndpoints";

const BookingsPage = () => {
  const [viewlAll, setViewAll] = useState(false);

  const navigate = useNavigate();

  const { result, loading, error } = useFetch(`${GET_ALL_BOOKINGS}?allBookings=${viewlAll}`);

  const bookings = result?.data?.bookingDoc;

  const handleBookingClick = (bookingId) => {
    navigate(`/booking/${bookingId}`);
  };

  if (error) {
    return <Error />;
  }

  return (
    <div className="ml-auto mr-auto mt-1 max-w-3xl  px-4 pt-5">
      <Heading text={"My Bookings"} className={"mb-5 text-center"} />
      {viewlAll ? (
        <Button
          onClick={() => setViewAll(false)}
          text={"View Active Bookings Only."}
          className={" mb-2 border border-gray-300 !bg-gray-50 text-sm !text-black"}
        />
      ) : (
        <Button
          onClick={() => setViewAll(true)}
          text={"View all Bookings."}
          className={" mb-2 border border-gray-300 !bg-gray-50 text-sm !text-black"}
        />
      )}

      {bookings?.length === 0 && !loading && (
        <p className="mont mb-3 mt-3 text-center text-lg font-semibold">
          You don't have any Active Bookings.
        </p>
      )}

      {loading && Array.from({ length: 4 }).map((val, index) => <Skeleton key={index} />)}
      <div className="mt-5">
        {!loading &&
          bookings?.map((booking) => {
            return (
              <div
                key={booking?._id}
                className="booking  mb-4 flex h-64 cursor-pointer rounded-md border border-gray-200 bg-gray-50 shadow-lg"
                onClick={() => handleBookingClick(booking?._id)}
              >
                <div className="left h-full w-60 flex-none overflow-hidden rounded-md">
                  <img
                    src={`${booking?.place?.mainImage?.url}`}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </div>
                <div className="right flex flex-1 flex-col gap-2 px-4 py-2">
                  <Heading text={booking?.place?.title} />
                  <Paragrapgh text={` ${booking?.place?.address.slice(0, 200)} ...`} />
                  <Paragrapgh text={`Check-in : ${formatDate(booking?.checkIn)}`} />
                  <Paragrapgh text={`Check-out : ${formatDate(booking?.checkOut)}`} />
                  <Paragrapgh text={`Total Price paid - $ ${booking?.totalPrice}`} />
                  <Paragrapgh text={`Booked at - ${formatDate(booking?.createdAt)}`} />
                  <Paragrapgh
                    className={"text-xl !font-bold text-primary"}
                    text={booking?.active === true ? "Active" : "Completed"}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BookingsPage;
