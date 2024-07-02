import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Perks from "../components/Perks";
import { differenceInDays } from "date-fns";
import { findTwoConsecutiveFutureDays } from "../utils/dateFunctions";
import PlacePhotos from "../components/PlacePhotos";
import LocationMap from "../components/LocationMap";
import { MoneySvg, GuestSvg } from "../assets/svgs";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useFetchData from "../hooks/useFetchData";
import Button from "../components/ui/Button";
import Heading from "../components/typography/Heading";
import Paragrapgh from "../components/typography/Paragrapgh";
import PlaceOwner from "../components/PlaceOwner";
import PlaceDate from "../components/PlaceDate";
import PlaceOverviewSkeleton from "../components/ui/PlaceOverviewSkeleton";
import LoadingModal from "../components/Modal/LoadingModal";
import Error from "../components/Error.jsx"
import { GET_A_PLACE } from "../services/api/apiEndpoints.js";
import { placeBooking } from "../services/api/bookingApi.js";


function PlaceOverviewPage() {
  const { placeId } = useParams();
  const navigate = useNavigate();

  const [checkIn, setCheckIN] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user.user);

  const { result, loading, error } = useFetchData(`${GET_A_PLACE}/${placeId}`);
  const place = result?.data?.place;
const blockedDates = result?.data?.blockedDates

  const handleBookClick = async () => {
    if (!checkIn || !checkOut) return toast.error("check in and check out are not set");
    try {
      setIsLoading(true);
      const data = await placeBooking({ checkIn, totalPrice: price, checkOut, place: placeId })

      if (data.status === 201) toast.success("Successfully Booked !");
      navigate(`/booking/${data.data.booking._id}`);
    } catch (error) {
      toast.error("Something went wrong! Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const totalDays = useMemo(() => {
    return differenceInDays(checkOut, checkIn);
  }, [checkIn, checkOut]);
  const price = place?.price * totalDays || 0;

  useEffect(() => {
    if (blockedDates) {
      const nearestAllowedDates = findTwoConsecutiveFutureDays(blockedDates);
      setCheckIN(nearestAllowedDates[0]);
      setCheckOut(nearestAllowedDates[1]);
    }
  }, [place]);

  if (loading) {
    return <PlaceOverviewSkeleton />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="px-4 py-4 ">
      <LoadingModal isOpen={isloading} text={"Booking this place for you..."} />
      {place && (
        <>
          <div className="m-auto max-w-screen-lg">
            <PlacePhotos photos={place?.photos} />
            <div className="py-8">
              <Heading text={place?.title} />
              <Paragrapgh text={place?.description} />
            </div>
            <PlaceOwner place={place} />
            <div className="py-8">
              <Heading text={"Perks"} />
              <div className="perks grid grid-cols-2 gap-3 py-3 md:grid-cols-3 lg:grid-cols-4">
                <Perks forDisplay={true} allowedPerks={place?.perks} />
              </div>
            </div>

            <LocationMap coordinates={place?.location?.coordinates} title={place?.title} />

            <div className="additional-information border-t border-gray-300 py-8">
              <Heading text={"Additional Information"} />
              <Paragrapgh text={place?.extraInfo} />
            </div>
            <div className="grid border-t border-gray-300 py-8 md:grid-cols-2 ">
              <div>
                <div className="flex items-center gap-1">
                  <GuestSvg />
                  <Heading text={"Maximum Guests"} />
                </div>
                <Paragrapgh
                  className={"mt-4 !text-xl !font-semibold !text-black"}
                  text={place?.maxGuests}
                />
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <MoneySvg />
                  <Heading text={"Price"} />
                </div>
                <Paragrapgh
                  className={"mt-4 !text-xl !font-semibold !text-black"}
                  text={`${place?.price} $ per night`}
                />
              </div>
            </div>
            <PlaceDate
              checkIn={checkIn}
              checkOut={checkOut}
              blockedDates={blockedDates}
              setCheckIN={setCheckIN}
              setCheckOut={setCheckOut}
              key={"date-place-picker"}
            />

            <div className="mt-5 grid border-t border-gray-300 py-8 md:grid-cols-2">
              <Paragrapgh className={"!text-2xl !font-semibold !text-black"} text={"Total"} />
              <Paragrapgh
                className={"!text-2xl !font-semibold !text-black"}
                text={`${price} $ - for ${totalDays} ${totalDays > 1 ? "nights" : "night"}`}
              />
            </div>

            <Button
              onClick={handleBookClick}
              disabled={!user || user?._id === place?.owner?._id || totalDays === 0}
              text={"Book"}
              className={"!mt-0 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50"}
            />
            <Paragrapgh
              className={"mt-5 block text-center"}
              text={
                user
                  ? user?._id === place?.owner?._id
                    ? "Owner can't book his/her place"
                    : "Make a Booing."
                  : "Please Login to book this place."
              }
            />
          </div>
        </>
      )}
    </div>
  );
}

export default PlaceOverviewPage;
