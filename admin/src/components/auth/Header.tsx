export interface HeaderProps{
    heading: string,
    label: string
}

const Header = ({ heading, label  }: HeaderProps) => {
    return(
        <div>
            <h1 className="text-[1.5rem] text-center">{heading}</h1>
            <p className="text-[.9rem] text-center">{label}</p>
        </div>
    )
}

export default Header