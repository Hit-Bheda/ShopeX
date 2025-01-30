import { create } from "zustand"

type store = {
    accessToken: string | null
    setAccessToken: (auth: string | null) => void
    isAuth: boolean
    setIsAuth: (auth: boolean) => void
}

export const useAuthStore = create<store>((set) => ({
    accessToken: "",
    setAccessToken: (token) => set({accessToken: token}),

    isAuth: false,
    setIsAuth: (auth) => set({isAuth: auth})
}))