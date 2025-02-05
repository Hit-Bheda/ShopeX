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
    user: userType | null;
    setUser: (data: userType | null) => void;
};

export const useAuthStore = create<Store>((set) => ({
    accessToken: null,
    setAccessToken: (token) => set(() => ({ accessToken: token })),

    isAuth: false,
    setIsAuth: (auth) => set(() => ({ isAuth: auth })),

    isLoading: true,
    setIsLoading: (status) =>
        status === false
            ? setTimeout(() => set(() => ({ isLoading: false })), 500)
            : set(() => ({ isLoading: true })),

    user: null,
    setUser: (data) => set(() => ({ user: data })),
}));
