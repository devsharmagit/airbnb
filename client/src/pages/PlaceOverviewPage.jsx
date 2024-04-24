import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Perks from "../components/Perks";
import { differenceInDays } from "date-fns";
import { findTwoConsecutiveFutureDays } from "../utils/dateFunctions";
import PlacePhotos from "../components/PlacePhotos";
import LocationMap from "../components/LocationMap";
import {MoneySvg, GuestSvg} from "../assets/svgs"
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useFetchData from "../hooks/useFetchData";
import Button from "../components/ui/Button";
import Heading from "../components/typography/Heading";
import Paragrapgh from "../components/typography/Paragrapgh";
import PlaceOwner from "../components/PlaceOwner";
import PlaceDate from "../components/PlaceDate";
import PlaceOverviewSkeleton from "../components/ui/PlaceOverviewSkeleton";

function PlaceOverviewPage() {
  const { placeId } = useParams();
  const navigate = useNavigate();

  const [checkIn, setCheckIN] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const user = useSelector((state) => state.user.user);

  const { result, loading, error } = useFetchData(`/api/place/${placeId}`);
  const place = result?.data?.place;

  const handleBookClick = async () => {
    if (!checkIn || !checkOut)
      return toast.error("check in and check out are not set");
    try {
      const data = await axios.post(
        "/api/booking",
        { checkIn, totalPrice: price, checkOut, place: placeId },
        { withCredentials: true }
      );
      
      if (data.status === 201) toast.success("Successfully Booked !");
      navigate(`/booking/${data.data.booking._id}`);
    } catch (error) {
      toast.error("Something went wrong! Please try again later.");
    }
  };

  const totalDays = useMemo(() => {
    return differenceInDays(checkOut, checkIn);
  }, [checkIn, checkOut]);
  const price = place?.price * totalDays || 0;

  useEffect(() => {
    if (result?.data?.blockedDates) {
      const nearestAllowedDates = findTwoConsecutiveFutureDays(
        result?.data?.blockedDates
      );
      setCheckIN(nearestAllowedDates[0]);
      setCheckOut(nearestAllowedDates[1]);
    }
  }, [result]);

  if(loading){
    return <PlaceOverviewSkeleton />
  }
  if(error){
    return <Error />
  }

  return (
    <div className="px-4 py-4 ">
 
      {place && (
        <>
          <div className="max-w-screen-lg m-auto">
            <PlacePhotos photos={place?.photos} />
            <div className="py-8">
              <Heading text={place?.title} />
              <Paragrapgh text={place?.description} />
            </div>
            <PlaceOwner place={place} />
            <div className="py-8">
              <Heading text={"Perks"} />
              <div className="perks grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-3">
                <Perks forDisplay={true} allowedPerks={place?.perks} />
              </div>
            </div>

            <LocationMap
              coordinates={place?.location?.coordinates}
              title={place?.title}
            />

            <div className="additional-information border-t border-gray-300 py-8">
              <Heading text={"Additional Information"} />
              <Paragrapgh text={place?.extraInfo} />
            </div>
            <div className="grid md:grid-cols-2 border-t border-gray-300 py-8 ">
              <div>
                <div className="flex items-center gap-1">
                  <GuestSvg />
                  <Heading text={"Maximum Guests"} />
                </div>
                <Paragrapgh
                  className={"!font-semibold !text-black !text-xl mt-4"}
                  text={place?.maxGuests}
                />
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <MoneySvg />
                  <Heading text={"Price"} />
                </div>
                <Paragrapgh
                  className={"!font-semibold !text-black !text-xl mt-4"}
                  text={`${place?.price} $ per night`}
                />
              </div>
            </div>
            <PlaceDate
              checkIn={checkIn}
              checkOut={checkOut}
              blockedDates={result?.data?.blockedDates}
              setCheckIN={setCheckIN}
              setCheckOut={setCheckOut}
              key={"date-place-picker"}
            />

            <div className="mt-5 border-t border-gray-300 grid md:grid-cols-2 py-8">
              <Paragrapgh
                className={"!font-semibold !text-black !text-2xl"}
                text={"Total"}
              />
              <Paragrapgh
                className={"!font-semibold !text-black !text-2xl"}
                text={`${price} $ - for ${totalDays} ${
                  totalDays > 1 ? "nights" : "night"
                }`}
              />
            </div>

            <Button
              onClick={handleBookClick}
              disabled={
                !user || user?._id === place?.owner?._id || totalDays === 0
              }
              text={"Book"}
              className={`disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 !mt-0`}
            />
            <Paragrapgh
              className={"block text-center mt-5"}
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
