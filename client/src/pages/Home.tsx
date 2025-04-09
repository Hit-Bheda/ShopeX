import { useEffect, useState } from "react";
import ApparelSection from "../components/ApparelSection";
import Hero from "../components/Hero";
import { getHeroProducts } from "../api/actions";
import { ProductResponseSchema } from "../schemas";
import { z } from "zod";

type productsType = z.infer<typeof ProductResponseSchema>[];

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [heroProducts, setHeroProducts] = useState<productsType>();

  useEffect(() => {
    const initFunction = async () => {
      try {
        setLoading(true);
        const data = await getHeroProducts();
        await setHeroProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initFunction();
  }, []);

  return loading ? (
    <div className="w-full h-full flex items-center justify-center">
      <h1>Loading</h1>
    </div>
  ) : (
    <div className="w-full h-full relative">
      <Hero heroProducts={heroProducts} />
      <ApparelSection />
    </div>
  );
};

export default Home;
