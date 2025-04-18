import { Facebook, Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSingleProduct } from "../api/actions";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { ProductResponseSchema } from "../schemas";
import { useAuthStore } from "../store/AuthStore";
import toast from "react-hot-toast";

type productType = z.infer<typeof ProductResponseSchema>;

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<productType | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1); // Start with 1 instead of 0
  const setCart = useAuthStore((state) => state.setCart);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        if (!id) throw new Error("Product ID is missing!");
        const res = await getSingleProduct(id);

        if (!res) {
          setData(null);
        } else {
          setData(res);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const addToCart = () => {
    // Error handling for missing data
    if (!data?._id) {
      toast.error("Product data is unavailable");
      return;
    }

    if (!size) {
      toast.error("Please select a size");
      return;
    }

    if (quantity < 1) {
      toast.error("Please select a valid quantity");
      return;
    }

    // Add to cart
    setCart({
      productId: data._id,
      productQuantity: quantity,
      productSize: size,
    });

    // Show success feedback
    toast.success("Product Added To Cart!");
    // Reset form after successful add (optional)
    // setSize("");
    // setQuantity(1);
  };

  return loading ? (
    <div className="w-full h-full flex items-center justify-center">
      <h1>Loading...</h1>
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
              {data.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`border border-zinc-400 py-2 px-4 text-xs ${s === size ? "bg-black text-white" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-xs mb-2">QUANTITY</h3>
            <div className=" gap-3">
              <button
                className="px-3 py-1 border border-zinc-400"
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                className="w-12 text-center bg-transparent"
                readOnly
              />
              <button
                className="px-3 py-1 border border-zinc-400"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              className="w-full bg-blue-500 text-white py-3 font-medium"
              onClick={addToCart}
            >
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
