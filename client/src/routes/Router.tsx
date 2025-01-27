import Layout from "../components/Layout.tsx"
import AuthMiddlware from "../middlewares/AuthMidleware.tsx";
import Home from "../pages/Home.tsx"
import { Routes, Route } from "react-router";

const Router: React.FC = () => {
  return(
    <Routes>
      <Route element={<Layout />}>
        
        <Route 
          path="/" 
          element={
            <AuthMiddlware isPrivate={false}>
              <Home />
            </AuthMiddlware>
          }
        />

        <Route
          path="/private"
          element={
            <AuthMiddlware isPrivate={true}>
              <h1>This Is Private Route</h1>
            </AuthMiddlware>
          }
        />

      </Route>
    </Routes>
  )
}

export default Router
