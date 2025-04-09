import { Facebook, Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSingleProduct } from "../api/actions";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { ProductResponseSchema } from "../schemas";

type productType = z.infer<typeof ProductResponseSchema>;

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<productType | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      if (!id) throw new Error("Something went wrong!");
      const res = await getSingleProduct(id);
      console.log("Res:", res);
      if (!res) setData(null);
      await setData(res);
      setLoading(false);
    };

    getProduct();
  }, [id]);

  return loading ? (
    <div className="w-full h-full flex items-center justify-center">
      <h1>Loading</h1>
    </div>
  ) : data ? (
    <div>
      {/* Breadcrumb */}
      <div className="p-6 text-xs">
        <div className="flex items-center space-x-2">
          <Link to="#" className="hover:underline">
            SHOP
          </Link>
          <span>{">"}</span>
          <Link to="#" className="hover:underline">
            CLASSICS
          </Link>
          <span>{">"}</span>
          <span>{data.name}</span>
        </div>
      </div>

      {/* Product Display */}
      <div className="md:flex md:items-center md:justify-center relative gap-8 p-6">
        {/* Product img */}
        <div className="bg-gray-100 rounded-none flex items-center justify-center">
          <img
            src={data.images[0]}
            alt={data.name}
            width={600}
            height={600}
            className="object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="w-[40%] space-y-6">
          <div>
            <h1 className="text-5xl font-bold mb-2">{data.name}</h1>
          </div>

          <p className="text-sm">{data.description}</p>

          <div className="mt-6">
            <span className="text-4xl font-bold">${data.price}</span>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-xs mb-2">SIZE</h3>
            <div className="grid grid-cols-6 gap-2">
              {data.sizes.map((size) => (
                <button
                  key={size}
                  className={`border border-white py-2 px-4 text-xs ${size === "M" ? "bg-white text-black" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-xs mb-2">QUANTITY</h3>
            <div className="flex border border-white w-24">
              <button className="px-3 py-1 border-r border-white">-</button>
              <input
                type="text"
                value="1"
                className="w-full text-center bg-transparent"
                readOnly
              />
              <button className="px-3 py-1 border-l border-white">+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button className="w-full bg-black text-white border border-white py-3 font-medium">
              BUY NOW
            </button>
            <button className="w-full bg-blue-500 text-white py-3 font-medium">
              ADD TO CART
            </button>
          </div>

          {/* Share */}
          <div className="pt-4">
            <h3 className="text-xs mb-3">SHARE</h3>
            <div className="flex items-center space-x-3">
              <button className="p-1">
                <Twitter className="h-4 w-4" />
              </button>
              <button className="p-1">
                <Facebook className="h-4 w-4" />
              </button>
              <button className="p-1">
                <Linkedin className="h-4 w-4" />
              </button>
              <button className="text-xs ml-2">Copy URL</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <h1>404 Product Not Found!</h1>{" "}
    </div>
  );
};

export default ProductPage;
