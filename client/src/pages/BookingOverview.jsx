import React, {  useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate, getTimeCategory } from "../utils/dateFunctions";
import { differenceInDays } from "date-fns";
import Place from "../components/Place";
import toast from "react-hot-toast";
import useFetchData from "../hooks/useFetchData";
import Button from "../components/ui/Button";
import Heading from "../components/typography/Heading";
import Paragrapgh from "../components/typography/Paragrapgh";
import BookingOverviewSkeleton from "../components/ui/BookingOverviewSkeleton";


const BookingHeading = ({text})=>{
return <Heading text={text} className={"text-lg"} />
}


function BookingOverview() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

const {result, error, loading} = useFetchData(`/api/booking/${bookingId}`)

const bookingDoc = result?.data?.bookingDoc

const whereTime = getTimeCategory(bookingDoc?.checkIn, bookingDoc?.checkOut)

console.log(bookingDoc)


  const handleCancelClick = async () => {
    try {
      const responseData = await axios.get(
        `/api/booking/cancel/${bookingId}`,
        { withCredentials: true }
      );
   if(responseData.status === 200) toast.success("Successfully done !")
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!")
    }
   
  };


 if(loading){
  return <BookingOverviewSkeleton />
 }

 if(error){
  return <Error />
 }

  return (
    <>     
      {bookingDoc && (
        <div className="">
          <div className="max-w-screen-lg m-auto mt-8">
            <Heading text={"Your Booking Details"}  />
          
            <div className="flex gap-7">
              <div className="max-w-xs mt-5">
                <Place
                  id={bookingDoc?.place?._id}
                  title={bookingDoc?.place?.title}
                  description={bookingDoc?.place?.description}
                  photo={bookingDoc?.place?.mainImage}
                  price={bookingDoc?.place?.price}
                  key={bookingDoc?.place?._id}
                />
              </div>
              <div className="grid mt-5 grid-cols-2 h-fit gap-3">
                <BookingHeading text={"Check-In"} />
                <Paragrapgh text={formatDate(bookingDoc?.checkIn)} />
                <BookingHeading text={"Check-Out"} />
                <Paragrapgh text={formatDate(bookingDoc?.checkOut)}  />
                <BookingHeading text={"Nights"} />
                <Paragrapgh text={differenceInDays(bookingDoc?.checkOut, bookingDoc?.checkIn)} />
                <BookingHeading text={"Total Price Paid"} />
                <Paragrapgh text={ `$ ${bookingDoc?.totalPrice}` } />
       
              </div>
            </div>
            <div className=" border-t border-gray-400 mt-4 p-3">
              
              {!bookingDoc.active && <Paragrapgh text={"This Booking is Completed."} className={"!text-gray-700 text-lg text-center"} />}
              {bookingDoc?.active && 

              <>
           {

             whereTime && whereTime === "Before Check-in" &&
          <>
          <Button 
               onClick={handleCancelClick}
               className={`   mx-auto mt-5 `}
               text={"Cancel"}
          />
          <Paragrapgh text={"Cancel the Booking if you have made a mistake."} className={"text-center mt-4"} />
              </>
            }   
        {

          
          whereTime && whereTime === "Between Check-in and Check-out" &&
            <>
            <Button 
             onClick={handleCancelClick}
             className={`   mx-auto mt-5 `}
             text={"Complete"}
            />
         
         <Paragrapgh text={"Completing the Booking means you have checked-out and will not be able to check-in again."} className={"text-center mt-4"} />
                    </>
          }
            </>
              }
              
          
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingOverview;
