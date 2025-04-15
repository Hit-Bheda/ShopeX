import Layout from "../components/Layout.tsx";
import AuthMiddlware from "../middlewares/AuthMidleware.tsx";
import Home from "../pages/Home.tsx";
import { Routes, Route } from "react-router";
import ProductPage from "../pages/ProductPage.tsx";
import { useEffect } from "react";
import { useAuthStore } from "../store/AuthStore.ts";

interface RoutesType {
  path: string;
  element: React.ReactNode;
  isPrivate: boolean;
}

const Router: React.FC = () => {
  const myRoutes: RoutesType[] = [
    {
      path: "/",
      element: <Home />,
      isPrivate: false,
    },
    {
      path: "/product/:id",
      element: <ProductPage />,
      isPrivate: false,
    },
    {
      path: "*",
      element: (
        <div className="w-full h-screen flex items-center justify-center">
          <h1 className="text-xl">404 Page Not Found</h1>
        </div>
      ),
      isPrivate: false,
    },
  ];

  const cart = useAuthStore((state) => state.cart);
  const setCartFromLocal = useAuthStore((state) => state.setCartFromLocal);

  // Load cart from localStorage on app load
  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      setCartFromLocal(JSON.parse(localCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <Routes>
      <Route element={<Layout />}>
        {myRoutes.map((route: RoutesType, index) => (
          <Route
            path={route.path}
            key={index}
            element={
              <AuthMiddlware isPrivate={route.isPrivate}>
                {route.element}
              </AuthMiddlware>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
