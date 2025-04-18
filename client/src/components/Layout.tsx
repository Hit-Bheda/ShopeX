import { Outlet } from "react-router";
import NavBar from "./NavBar.tsx";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <main className="w-full h-screen flex flex-col font-wfvisuals">
      <NavBar />
      <Outlet />
      <Toaster />
    </main>
  );
};

export default Layout;
