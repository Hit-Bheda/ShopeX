import { create } from "zustand"

type store = {
    accessToken: string
    setAccessToken: (auth: string) => void
    isAuth: boolean
    setIsAuth: (auth: boolean) => void
}

export const useAuthStore = create<store>((set) => ({
    accessToken: "",
    setAccessToken: (token) => set({accessToken: token}),

    isAuth: false,
    setIsAuth: (auth) => set({isAuth: auth})
}))