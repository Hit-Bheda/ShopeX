import { Route, Routes } from "react-router"
import Layout from "../components/Layout"
import Login from "../pages/Login"
import AuthMiddlware from "../middlewares/AuthMiddleware"
import ForgotPassword from "@/pages/ForgotPassword"
import Dashboard from "@/pages/Dashboard"
import App from "@/App"

interface RoutesType  {
    path: string
    element: React.ReactNode
    isPrivate: boolean
}

const Router = () => {

    const myRoutes: RoutesType[] = [
        {
            path: "/login",
            element: <Login />,
            isPrivate: false
        },{
            path: "/",
            element: <App />,
            isPrivate: false
        },{
            path: "/forgot-password",
            element: <ForgotPassword />,
            isPrivate: false
        },{
            path: "/dashboard",
            element: <Dashboard />,
            isPrivate: true
        },{
          path: "*",
          element: <div className="w-full h-screen flex items-center justify-center"><h1 className="text-xl">404 Page Not Found</h1></div>,
          isPrivate: false
        }
    ]
    return(
        <Routes>
            <Route element={<Layout />}>
                {
                    myRoutes.map((route: RoutesType, index) => (
                        <Route 
                            path={route.path}
                            key={index}
                            element={
                                <AuthMiddlware isPrivate={route.isPrivate}>
                                    {route.element}
                                </AuthMiddlware>
                            }
                        />
                    ))
                }
            </Route>
        </Routes>
    )
}

export default Router