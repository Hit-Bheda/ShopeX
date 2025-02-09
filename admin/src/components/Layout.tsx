import { Outlet } from "react-router"
import { ThemeProvider } from "./ThemeProvider"
import { Toaster } from "./ui/toaster"

const Layout = () => {
    return(
        <ThemeProvider 
            defaultTheme="dark" 
            storageKey="vite-ui-theme">

            <Outlet />
            <Toaster />
        </ThemeProvider>
    )
}

export default Layout