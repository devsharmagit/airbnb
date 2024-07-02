import axiosInstance from "../../utils/axiosInstance";

const getMe = async ()=>{
    try {
        const response = await axiosInstance.get('/api/user/me')
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

const updateUser = async (data) =>{
    try {
        const response = await axiosInstance.patch('/api/user', {...data})
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export {getMe, updateUser}