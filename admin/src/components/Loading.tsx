import Spinner from "@/assets/spinner.json"
import Lottie from "lottie-react"

const Loading = () => {
    return(
        <div className="w-full h-screen flex items-center justify-center">
            <Lottie animationData={Spinner} loop={true} className="w-40 h-40"/>
        </div>
    )
}

export default Loading