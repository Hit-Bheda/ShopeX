import { Route, Routes } from "react-router"
import Layout from "../components/Layout"
import Login from "../pages/Login"
import AuthMiddlware from "../middlewares/AuthMiddleware"
import App from "../App"
import ForgotPassword from "@/pages/ForgotPassword"
import Dashboard from "@/pages/Dashboard"

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
            isPrivate: true
        },{
            path: "/forgot-password",
            element: <ForgotPassword />,
            isPrivate: false
        },{
            path: "/dashboard",
            element: <Dashboard />,
            isPrivate: true
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