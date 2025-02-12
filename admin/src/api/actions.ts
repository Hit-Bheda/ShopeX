import axios from "axios"


const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000"

export const createCategory = async ({name,description}: {name: string, description?: string | ""},accessToken: string) => {
    try {
        await axios.post(`${BASE_URL}/api/v1/admin/create-category`,{
            name,
            description
        },{
            headers: {
                Authorization: `${accessToken}`
            }
        })
    } catch (error) {
        console.error(String(error))
    }
}

export const getCategories = async (accessToken: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/admin/get-categories`,null,{
            headers: {
                Authorization: `${accessToken}`
            }
        })
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export const deleteCategory = async (id: string,accessToken: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/admin/delete-category/${id}`,null,{
            headers: {
                Authorization: `${accessToken}`
            }
        })
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export const getUser = async (accessToken: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/admin/get-user`, null, {
            headers: {
                Authorization: accessToken
            }
        })

        return res.data
    } catch (error) {
        console.error(error);
        
    }
}

export const uploadSingleFile = async (accessToken: string,image: unknown) => {
    console.log(image);
    
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/admin/image/upload`, {image,msg: "hello"}, {
            headers: {
                Authorization: accessToken,
                "Content-Type": "multipart/form-data"
            }
        })

        return res.data
    } catch (error) {
        console.error(error);
        
    }
}