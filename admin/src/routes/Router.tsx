import { Route, Routes } from "react-router";
import { Suspense, useMemo } from "react";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import ForgotPassword from "@/pages/ForgotPassword";
import Dashboard from "@/pages/Dashboard";
import App from "@/App";
import Overview from "@/components/dashboard/Overview";
import Categories from "@/components/dashboard/Categories";
import Products from "@/components/dashboard/Products";
import Orders from "@/components/dashboard/Orders";
import NotFound from "@/pages/NotFound";
import { LoadingSkeleton } from "@/components/Skeletons";
import HomePageEditor from "@/components/dashboard/HomePageEditor";

const Router = () => {
  const myRoutes = useMemo(
    () => [
      { path: "/login", element: <Login />, isPrivate: false },
      { path: "/", element: <App />, isPrivate: false },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
        isPrivate: false,
      },
      { path: "*", element: <NotFound />, isPrivate: false },
    ],
    [],
  );

  const dashboardRoutes = useMemo(
    () => [
      { path: "", element: <Overview /> },
      {
        path: "categories",
        element: <Categories />,
        suspense: <LoadingSkeleton />,
      },
      { path: "products", element: <Products /> },
      { path: "orders", element: <Orders /> },
      { path: "homepage-editor", element: <HomePageEditor /> },
    ],
    [],
  );

  return (
    <Routes>
      <Route element={<Layout />}>
        {myRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <AuthMiddleware isPrivate={route.isPrivate}>
                {route.element}
              </AuthMiddleware>
            }
          />
        ))}

        <Route
          path="/dashboard"
          element={
            <AuthMiddleware isPrivate={true}>
              <Dashboard />
            </AuthMiddleware>
          }
        >
          {dashboardRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.suspense ? (
                  <Suspense fallback={route.suspense}>{route.element}</Suspense>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
