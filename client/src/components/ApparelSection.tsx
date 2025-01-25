import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useRef } from "react";

const ApparelSection = () => {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scrollRight = () => {
        if (!scrollRef.current) return
        const scrollAmount = scrollRef.current.offsetWidth * 0.3;
        scrollRef.current?.scrollBy({left:scrollAmount,behavior:"smooth"})
    }

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({left: -300,behavior: "smooth"})
    }
    return(
        <div className="w-full h-screen flex items-center px-10 flex-col justify-center">
            <div className="flex items-center justify-between w-full py-8">
                <h1 className="text-[1.7rem] sm:text-[2.5rem] font-bold">Apparel</h1>
                <div className="flex items-center justify-between gap-2 md:w-[22%]">
                    <p className="text-[1rem] md:text-[1.7rem] font-medium tracking-wider">VIEW ALL</p>
                    <button onClick={scrollLeft}><ArrowLeft size={30} className="w-10 hover:text-[#156EF6] transform duration-300 ease-in-out"/></button>
                    <button onClick={scrollRight}><ArrowRight size={30} className="hover:text-[#156EF6] transform duration-300 ease-in-out"/></button>
                </div>
            </div>
            <div ref={scrollRef} className="w-full snap-start p-4 snap-x flex items-center gap-[3vw] overflow-x-auto scrollbar-hide">
                <ProductCard type="CLASSIC" name="Icon Hoodie" price={65} />
                <ProductCard type="CLASSIC" name="Icon Long Sleeve" price={45} />
                <ProductCard type="CLASSIC" name="Icon Long Sleeve" price={45} />
                <ProductCard type="CLASSIC" name="Icon Long Sleeve" price={45} />
                <ProductCard type="CLASSIC" name="Icon Long Sleeve" price={45} />
                <ProductCard type="CLASSIC" name="Icon Long Sleeve" price={45} />
                <ProductCard type="CLASSIC" name="Icon Long Sleeve" price={45} />
                
            </div>
        </div>
    )
}

export default ApparelSection;