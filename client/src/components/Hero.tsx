import React from "react";
import HeroCard from "./HeroCard";
import { ProductResponseSchema } from "../schemas";
import { z } from "zod";

type productsType = z.infer<typeof ProductResponseSchema>[];

interface Props {
  heroProducts?: productsType;
}

const Hero: React.FC<Props> = ({ heroProducts }) => {
  if (!heroProducts || heroProducts.length === 0) return null;

  return (
    <div className="h-[calc(100%-3.7rem)] mt-[3.7rem] relative">
      <h1 className="absolute x-[50%] z-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white text-[18vw] md:text-[15vw] font-medium">
        CLASSICS
      </h1>

      <div className="w-full h-full flex flex-wrap md:flex-row flex-col justify-between">
        {heroProducts.map((product, index) => (
          <div
            key={product._id}
            className={`w-full md:w-1/2 md:h-full h-1/2 p-6 flex items-${
              index % 2 === 0
                ? "end justify-end bg-[#156EF6]"
                : "start justify-start bg-[#080808]"
            } relative`}
          >
            {/* Optional background image layer */}
            {product.images[1] && (
              <div className="absolute top-0 left-0 w-full -z-1 h-full flex items-center justify-center">
                <img
                  className="object-cover w-[20%] md:w-[55%]"
                  src={product.images[1]}
                  alt={product.name}
                />
              </div>
            )}

            <HeroCard
              price={String(product.price)}
              title={product.name}
              image={product.images[0]}
              id={product._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
