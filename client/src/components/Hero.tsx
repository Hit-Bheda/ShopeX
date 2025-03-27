import { useEffect, useState } from "react";
import HeroCard from "./HeroCard";
import { getHeroProducts } from "../api/actions";
import { ProductResponseSchema } from "../schemas";
import { z } from "zod";

type productsType = z.infer<typeof ProductResponseSchema>[];

const Hero = () => {
  const [heroProducts, setHeroProducts] = useState<productsType>();
  const [loading, setLoading] = useState<boolean>(true);

  const initFunction = async () => {
    setLoading(true);
    const data = await getHeroProducts();
    await setHeroProducts(data);
    setLoading(false);
  };
  useEffect(() => {
    initFunction();
  }, []);

  console.log("Hello", heroProducts);
  if (!heroProducts) return;
  const product1 = heroProducts[0];
  const product2 = heroProducts[1];
  if (loading) return <div>Loading...</div>;
  return (
    <div className="h-[calc(100%-3.7rem)] mt-[3.7rem] relative">
      <h1 className="absolute x-[50%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white text-[18vw] md:text-[15vw] font-medium">
        CLASSICS
      </h1>
      <div className="w-full h-[100%] flex items-center md:flex-row flex-col justify-between">
        <div className="w-full md:w-1/2 h-full bg-[#156EF6] p-6 flex items-end justify-end">
          <HeroCard
            price={String(product1.price)}
            title={product1.name}
            image={product1.images[0]}
            id={product1._id}
          />
        </div>
        <div className="w-full md:w-1/2 h-full bg-[#080808] p-6 flex items-start justify-start">
          <HeroCard
            price={String(product2.price)}
            title={product2.name}
            image={product2.images[0]}
            id={product2._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
