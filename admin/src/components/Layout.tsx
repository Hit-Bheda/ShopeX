import { Outlet } from "react-router"
import { ThemeProvider } from "./ThemeProvider"

const Layout = () => {
    return(
        <ThemeProvider 
            defaultTheme="dark" 
            storageKey="vite-ui-theme">

            <Outlet />
            
        </ThemeProvider>
    )
}

export default Layout