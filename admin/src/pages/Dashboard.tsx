import { logout } from "@/api/auth"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/AuthStore"

const Dashboard = () => {
    const setAccessToken = useAuthStore((state) => state.setAccessToken)
    const setIsAuth = useAuthStore((state) => state.setIsAuth)
    const handleClick = async() => {
        await logout()
        setAccessToken("")
        setIsAuth(false)
    }
    return(
        <div>
            <h1>This Is Dashboard</h1>
            <Button onClick={handleClick}>Logout</Button>
        </div>
    )
}

export default Dashboard