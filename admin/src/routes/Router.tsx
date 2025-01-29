import { Route, Routes } from "react-router"
import Layout from "../components/Layout"
import Login from "../pages/Login"
import AuthMiddlware from "../middlewares/AuthMiddleware"
import App from "../App"

const Router = () => {
    return(
        <Routes>
            <Route element={<Layout />}>
                <Route 
                    path="/login"
                    element={
                        <AuthMiddlware isPrivate={false}>
                            <Login />
                        </AuthMiddlware>
                    }
                />

                <Route 
                    path="/"
                    element={
                        <AuthMiddlware isPrivate={true}>
                            <App />
                        </AuthMiddlware>
                    }
                />
            </Route>
        </Routes>
    )
}

export default Router