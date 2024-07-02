const mode = import.meta.env.MODE

let baseUrl = mode === "dev" ? "http://localhost:3500/api/" : "https://bookers-backend.devsharmacode.com/api/";

export const GET_SAVED_PLACE = baseUrl + "place/fav"

export const GET_A_PLACE = baseUrl + "place" // /api/place/placeId

export const GET_MY_PLACES = baseUrl + "place/getAllUserPlaces"

export const GET_ALL_MAP_PLACE = baseUrl + "place/map"

export const GET_ALL_BOOKINGS = baseUrl + "booking" // /api/booing?allBookings=true

export const GET_A_BOOKING = baseUrl + "booking" // /api/booing/bookingId

export const GET_ME = baseUrl + "user/me"