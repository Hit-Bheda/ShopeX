import { create } from "zustand"


type store = {
    isAuth: boolean;
    setIsAuth: (auth: boolean) => void
}

export const useAuthStore = create<store>((set) => ({
    isAuth: false,
    setIsAuth: (auth) => set({isAuth:auth})
}))