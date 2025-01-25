import cx from "./cx"

interface Props {
    name: string,
    price: number,
    type: string,
}

const ProductCard:React.FC<Props> = ({name,price,type}) => {
    const bgColors = ["#EE52CB","#00D822","#FFAF14","#7A3DFF","#FF6B01","#EE1D36"]

    const color = bgColors[Math.floor(Math.random() * bgColors.length)];
    return(
        <div className={cx("overflow-hidden min-w-[68vw] h-[68vw] md:min-w-[28vw] sm:min-w-[35vw] sm:h-[35vw]  hover:outline-black hover:outline-offset-4 border-separate bord border-solid md:h-[28vw] flex flex-col p-4 justify-between bg-[#f1f1f1] cursor-pointer rounded-sm group tranlate duration-300")} style={{"--hover-bg-color": color} as React.CSSProperties}>
            <div className="flex text-[1rem] w-full items-center justify-between translate duration-200 group-hover:-translate-y-10">
                <p>{type}</p>
                <p>{price}$</p>
            </div>
            <h1 className="text-[1.5rem] font-bold tracking-wider translate duration-300 group-hover:translate-y-16">{name}</h1>
        </div>
    )
}

export default ProductCard;