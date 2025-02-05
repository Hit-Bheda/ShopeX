import { Navigate } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "../store/AuthStore";
import { getToken , verifyAuth } from "@/api/auth";
import Loading from "@/components/Loading";

interface Props {
    children: React.ReactNode;
    isPrivate: boolean;
}



const AuthMiddleware: React.FC<Props> = ({ children, isPrivate = false }) => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const setIsAuth = useAuthStore((state) => state.setIsAuth)
    const loading = useAuthStore((state) => state.isLoading)
    const setLoading = useAuthStore((state) => state.setIsLoading)
    const setUser = useAuthStore((state) => state.setUser)


    useEffect(() => {

        const checkAuthentication = async () => {
            setLoading(true)
            try {
                const authResponse = await verifyAuth()
                const authenticated = !!authResponse
                setIsAuth(authenticated)
                console.log(authenticated);
                

                if(!authenticated)return setAccessToken(null)
                    
                const tokenData = await getToken();
                if(tokenData?.accessToken) setAccessToken(tokenData?.accessToken ? String(tokenData.accessToken) : null)
                if(tokenData?.user) setUser(tokenData.user)
            } catch (error) {
                console.log("Auth Initialization Failed! ",error);
                setIsAuth(false)
                setAccessToken(null)
            } finally{
                setLoading(false)
            }
        }

        checkAuthentication()
    }, [ setAccessToken, setIsAuth, setLoading, setUser]);

    if (loading) return <Loading />; // Prevent premature redirects

    if (isPrivate && !accessToken) return <Navigate to="/login" replace />;
    if (!isPrivate && accessToken) return <Navigate to="/dashboard" replace />;

    return <> {children} </>;
};

export default AuthMiddleware;
