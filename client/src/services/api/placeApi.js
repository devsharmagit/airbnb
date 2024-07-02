import axiosInstance from "../../utils/axiosInstance";

export const getAllPlace = async (page, queryString, signal)=>{
    try {
        const resonse = await axiosInstance.get(`/api/place?fields=title,description,mainImage,price,favourites&limit=12&page=${page}&${queryString}`, {signal: signal})
    return resonse
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getOnePlace = async (placeId) =>{
try {
    const response = await axiosInstance.get(`/api/place/${placeId}`)
    return response
} catch (error) {
    console.log(error)
    return error
}
}

export const createPlace = async (data)=>{
    try {
        const response = await axiosInstance.post('/api/place', {...data})
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}
export const editPlace = async (data, placeId)=>{
    try {
        const response = await axiosInstance.patch(`/api/place/${placeId}`, {...data})
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}
export const deletePlace = async (placeId)=>{
    try {
        const response = await axiosInstance.delete(`/api/place/${placeId}`)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getSavedPlaces = async(signal)=>{
    try {
        const response = await axiosInstance.get(`/api/place/fav`, {signal: signal})
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const saveAPLace = async (data)=>{
    try {
        const response = await axiosInstance.post(`/api/fav`, data)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const removeSavePlace = async (data)=>{
    try {
        const response = await axiosInstance.post(`/api/fav/remove`, data)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}


export const imagesUpload = async (destination, data)=>{
    try {
        const response = await axiosInstance.post(`/api/upload/${destination}`, data, {headers: { "Content-Type": "multipart/form-data" }})
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}