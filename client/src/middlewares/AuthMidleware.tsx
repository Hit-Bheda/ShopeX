import { Navigate } from "react-router-dom"; 
import { useAuthStore } from "../store/AuthStore";

interface Props {
  children: React.ReactNode;
  isPrivate?: boolean; 
}

const AuthMiddleware: React.FC<Props> = ({ children, isPrivate = false }) => {
  const isAuth = useAuthStore((state) => state.isAuth); 

  if (isPrivate && !isAuth) return <Navigate to="/login" replace />;

  if (!isPrivate && isAuth) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default AuthMiddleware;
