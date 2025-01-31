import Layout from "../components/Layout.tsx"
import AuthMiddlware from "../middlewares/AuthMidleware.tsx";
import Home from "../pages/Home.tsx"
import { Routes, Route } from "react-router";

interface RoutesType  {
    path: string
    element: React.ReactNode
    isPrivate: boolean
}

const Router: React.FC = () => {
  const myRoutes: RoutesType[] = [
        {
            path: "/",
            element: <Home />,
            isPrivate: false
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
