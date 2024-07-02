import axiosInstance from "../../utils/axiosInstance";

export const getAllBookings = async (viewlAll)=>{
    try {
        const response = await axiosInstance.get(`/api/booking?allBookings=${viewlAll}`)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getOneBooking = async (bookingId) =>{
    try {
        const response = await axiosInstance.get(`/api/booking/${bookingId}`)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const cancelBooking = async (bookingId) => {
    try {
        const response = await axiosInstance.get(`/api/booking/cancel/${bookingId}`)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const placeBooking = async (data)=>{
    try {
        const response = await axiosInstance.post(`/api/booking`, data)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}