import axiosInstance from "../../utils/axiosInstance";


export const signUp = async (data)=>{
    try {
        const response = await axiosInstance.post('/api/user/signup', {...data})
        return response
        
    } catch (error) {
        console.log(error)
        return error
    }
}

export const logIn = async (data)=>{
    try {
        const response = await axiosInstance.post('/api/user/login', {...data})
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}
export const logout = async (data)=>{
    try {
        const response = await axiosInstance.post('/api/user/logout', {})
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

