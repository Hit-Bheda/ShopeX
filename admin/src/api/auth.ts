import * as z from "zod";
import { LoginSchema } from "@/schemas";
import axios from "axios";

type Res = {
    data:{
        accessToken: string
    }
}
export const getToken = async () => {
    try{
        const response: Res = await axios.post("http://localhost:4000/api/v1/admin/auth/access-token",null,{withCredentials:true})
        return response.data.accessToken
    }catch(error){
        console.error(error)
    }
}

export const login = async (data:z.infer<typeof LoginSchema>) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/admin/auth/login",
            data,{
                withCredentials: true
            }
        )
        return response.data
    } catch (error) {
        return {
            error: axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Something went wrong",
        }
    }
}

export const logout = async () => {
    try {
        await axios.post("http://localhost:4000/api/v1/admin/auth/logout",
            null,{
                withCredentials: true
            }
        )
    } catch (error) {
        console.error(error);
        
    }
}

export const verifyAuth = async () => {
    interface resType {
    data: {
        isAuth: boolean
    }
}
    try {
        const res:resType = await axios.post("http://localhost:4000/api/v1/admin/auth/is-auth",null,{withCredentials: true})
        return res.data.isAuth
    } catch (error) {
        console.error(error);
        
    }
}