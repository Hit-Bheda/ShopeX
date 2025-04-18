import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api/actions";
import { z } from "zod";
import { ProductResponseSchema } from "../schemas";
import ProductCard from "../components/ProductCard";

type ProductType = z.infer<typeof ProductResponseSchema>[];

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<ProductType>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const initCategory = async () => {
      const data = await getProducts(category);
      setProducts(data.products);
    };
    initCategory();
    setLoading(false);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5 p-5 mt-[5%]">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : products ? (
        products.map((product) => (
          <ProductCard
            type="CLASSIC"
            _id={product._id}
            name={product.name}
            price={product.price}
            image={product.images[0]}
          />
        ))
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p>Product Not Found!</p>
        </div>
      )}
    </div>
  );
};

export default Category;
