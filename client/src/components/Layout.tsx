import { Outlet } from "react-router"
import NavBar from "./NavBar.tsx"

const Layout = () => {
  return(
    <main className="w-full h-screen flex flex-col font-wfvisuals">
      <NavBar />
      <Outlet />
    </main>
  )
}

export default Layout
