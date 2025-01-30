import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { auth, getToken } from "@/api/auth";

interface Props {
    children: React.ReactNode;
    isPrivate: boolean;
}


const AuthMiddleware: React.FC<Props> = ({ children, isPrivate = false }) => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const isAuth = useAuthStore((state) => state.isAuth)
    const setIsAuth = useAuthStore((state) => state.setIsAuth)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const res = await auth()
                
                if(res) setIsAuth(res)
                
            } catch (error) {
                console.log(error);
                
            }
        }
        verifyAuth()
        const initialize = async () => {
            try {
                const token = await getToken();
                if (token) {
                    setAccessToken(String(token));
                }
            } catch (error) {
                console.error("Error fetching token:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isAuth && !accessToken) initialize();
        else setLoading(false);
    }, [accessToken, setAccessToken, isAuth, setIsAuth]);

    if (loading) return <div>Loading...</div>; // Prevent premature redirects

    if (isPrivate && !accessToken) return <Navigate to="/login" replace />;
    if (!isPrivate && accessToken) return <Navigate to="/dashboard" replace />;

    return <> {children} </>;
};

export default AuthMiddleware;
