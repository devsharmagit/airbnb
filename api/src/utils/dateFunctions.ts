export interface Booking {
  checkIn: string | Date; // ISO string representing the date
  checkOut: string | Date; // ISO string representing the date
}

export function isDateRangeOverlapping(
  checkin: string,
  checkout: string,
  existingBookings: Booking[]
): boolean {
  const userCheckin = new Date(checkin);
  const userCheckout = new Date(checkout);

  const today = new Date().getDate();

  if (userCheckin.getDate() < today) {
    throw new Error("CHECKIN OR CHECKOUT CAN'T BE SET IN THE PAST or same as today");
  }

  if (userCheckout <= userCheckin) {
    throw new Error("Invalid dates entered");
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

export const getBlockedDates = (bookings: Booking[]): string[] => {
  const blockedDates: string[] = [];

  bookings.forEach((booking) => {
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);

    // Iterate through the date range and add each date to blockedDates
    while (checkInDate <= checkOutDate) {
      blockedDates.push(checkInDate.toISOString().split("T")[0]);
      checkInDate.setDate(checkInDate.getDate() + 1);
    }
  });

  return blockedDates;
};

export function isDatePast(date: string | Date): boolean {
  const currentDate = new Date();
  const inputDate = new Date(date);

  return inputDate < currentDate;
}
