import { Card, CardContent, CardHeader } from "../ui/card"
import Header, { HeaderProps } from "./Header"

interface Props {
    children: React.ReactNode
}

const CardWrapper = ({ heading, label, children }: (HeaderProps & Props)) => {
    return(
        <Card className="w-[400px]">
            <CardHeader>
                <Header heading={heading} label={label}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

export default CardWrapper