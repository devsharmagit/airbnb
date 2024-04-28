import { addDays, format, isBefore, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

export const findTwoConsecutiveFutureDays = (blockedDates) => {
  const today = new Date();
  let currentDay = today;

  while (true) {
    const nextDay = addDays(currentDay, 1);
    const formattedCurrentDay = format(currentDay, "yyyy-MM-dd");
    const formattedNextDay = format(nextDay, "yyyy-MM-dd");

    if (
      !blockedDates.includes(formattedCurrentDay) &&
      !blockedDates.includes(formattedNextDay) &&
      isBefore(currentDay, nextDay)
    ) {
      return [formattedCurrentDay, formattedNextDay];
    }

    currentDay = nextDay;
  }
};

export const formatDate = (dateString) => {
  const parsedDate = parseISO(dateString);
  return format(parsedDate, "d MMM yyyy", { locale: enUS });
};

export function getTimeCategory(checkIn, checkOut) {
  // Convert check-in and check-out strings to Date objects
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  // Get the current time
  const currentTime = new Date();

  // Compare current time with check-in and check-out
  if (currentTime < checkInDate) {
    return "Before Check-in";
  } else if (currentTime >= checkInDate && currentTime < checkOutDate) {
    return "Between Check-in and Check-out";
  } else {
    return "After Check-out";
  }
}
