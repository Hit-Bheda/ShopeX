import { create } from "zustand";

export interface userType {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

type Store = {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    isAuth: boolean;
    setIsAuth: (auth: boolean) => void;
    isLoading: boolean;
    setIsLoading: (status: boolean) => void;
};

export const useAuthStore = create<Store>((set) => ({
    accessToken: null,
    setAccessToken: (token) => set(() => ({ accessToken: token })),

    isAuth: false,
    setIsAuth: (auth) => set(() => ({ isAuth: auth })),

    isLoading: true,
    setIsLoading: (status) => set({isLoading: status})
}));
