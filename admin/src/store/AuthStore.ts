import { create } from "zustand"

export interface userType {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
}

type store = {
    accessToken: string | null
    setAccessToken: (auth: string | null) => void
    isAuth: boolean
    setIsAuth: (auth: boolean) => void
    isLoading: boolean
    setIsLoading: (status: boolean) => void
    user: userType | null
    setUser: (data: userType) => void
}

export const useAuthStore = create<store>((set) => ({
    accessToken: "",
    setAccessToken: (token) => set({accessToken: token}),

    isAuth: false,
    setIsAuth: (auth) => set({isAuth: auth}),

    isLoading: true,
    setIsLoading: (status) => {
        if(status == false){ setTimeout(() => {
            set({isLoading: status})
        },500)
    } else {
        set({isLoading:status})
    }
    },
    user: null,
    setUser: (data) => set({user: data})
}))