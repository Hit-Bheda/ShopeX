import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { getToken, verifyAuth } from "@/api/auth";

interface Props {
    children: React.ReactNode;
    isPrivate: boolean;
}


const AuthMiddleware: React.FC<Props> = ({ children, isPrivate = false }) => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const setIsAuth = useAuthStore((state) => state.setIsAuth)

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const checkAuthentication = async () => {
            setLoading(true)
            try {
                const authResponse = await verifyAuth()
                const authenticated = !!authResponse
                setIsAuth(authenticated)

                if(!authenticated)return setAccessToken(null)
                    
                const token = await getToken();
                setAccessToken(token ? String(token) : null)
            } catch (error) {
                console.log("Auth Initialization Failed! ",error);
                setIsAuth(false)
                setAccessToken(null)
            } finally{
                setLoading(false)
            }
        }

        checkAuthentication()
    }, [ setAccessToken, setIsAuth]);

    if (loading) return <div>Loading...</div>; // Prevent premature redirects

    if (isPrivate && !accessToken) return <Navigate to="/login" replace />;
    if (!isPrivate && accessToken) return <Navigate to="/dashboard" replace />;

    return <> {children} </>;
};

export default AuthMiddleware;
