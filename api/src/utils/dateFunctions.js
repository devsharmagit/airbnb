export  function isDateRangeOverlapping(checkin, checkout, existingBookings) {

    const userCheckin = new Date(checkin);
    const userCheckout = new Date(checkout);


const today = new Date().getDate()



// if(userCheckin < today || userCheckout <= today){

if(userCheckin < today ){

    throw new Error("CHECKIN OR CHECKOUT CANT BE SET IN PAST or same as today")
}

    if(userCheckout <= userCheckin){
  
        throw new Error("invalid dates entered")
        
    } 
  
    for (const booking of existingBookings) {
      const bookedCheckin = new Date(booking.checkIn);
      const bookedCheckout = new Date(booking.checkOut);
  
      if (
        (userCheckin >= bookedCheckin && userCheckin < bookedCheckout) ||
        (userCheckout > bookedCheckin && userCheckout <= bookedCheckout) ||
        (userCheckin <= bookedCheckin && userCheckout >= bookedCheckout)
      ) {
        return true; 
      }
    }
  
    return false; 
  }

  export const getBlockedDates = (bookings) => {
    const blockedDates = [];
  
    bookings.forEach((booking) => {
      const checkInDate = new Date(booking.checkIn);
      const checkOutDate = new Date(booking.checkOut);
  
      // Iterate through the date range and add each date to blockedDates
      while (checkInDate <= checkOutDate) {
        blockedDates.push(checkInDate.toISOString().split('T')[0]);
        checkInDate.setDate(checkInDate.getDate() + 1);
      }
    });
  
    return blockedDates;
  };
  
  export function isDatePast(date) {
    
    const currentDate = new Date();
    const inputDate = new Date(date);
  
    return inputDate < currentDate;
  }