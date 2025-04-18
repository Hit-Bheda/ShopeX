import React, { forwardRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAuthStore } from "../store/AuthStore";
import { getCartProducts } from "../api/actions";
import { z } from "zod";
import { ProductResponseSchema } from "../schemas";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type ProductType = z.infer<typeof ProductResponseSchema>;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string; // Made optional to avoid errors when not provided
}

const Cart = forwardRef<HTMLDivElement, Props>(
  ({ className = "", ...props }, ref) => {
    // Default value for className
    const { cart, updateCartItem, removeFromCart } = useAuthStore();
    const [cartProducts, setCartProducts] = useState<
      Record<string, ProductType>
    >({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchCartProducts = async () => {
        setLoading(true);

        try {
          if (!cart.length) {
            setCartProducts({});
            return;
          }

          const productIds = cart.map((item) => item.productId);
          const res = await getCartProducts(productIds);

          // Normalize response into a map: { [id]: product }
          const productsMap: Record<string, ProductType> = {};

          const productsArray = Array.isArray(res)
            ? res
            : res?.products || Object.values(res) || [];

          productsArray.forEach((p: ProductType) => {
            if (p?._id) productsMap[p._id] = p;
          });

          setCartProducts(productsMap);
        } catch (err) {
          console.error("Failed to fetch cart products:", err);
          setError("Failed to load cart products.");
        } finally {
          setLoading(false);
        }
      };

      fetchCartProducts();
    }, []);

    const handleQuantityChange = (
      productId: string,
      productSize: string,
      newQuantity: number,
    ) => {
      // Validate quantity is at least 1
      if (newQuantity < 1) return;

      const item = cart.find(
        (item) =>
          item.productId === productId && item.productSize === productSize,
      );

      if (item) {
        updateCartItem({
          ...item,
          productQuantity: newQuantity,
        });
      }
    };

    const handleQuantityAdjust = (
      productId: string,
      productSize: string,
      amount: number,
    ) => {
      const item = cart.find(
        (item) =>
          item.productId === productId && item.productSize === productSize,
      );

      if (item) {
        const newQuantity = item.productQuantity + amount;
        if (newQuantity >= 1) {
          updateCartItem({
            ...item,
            productQuantity: newQuantity,
          });
        }
      }
    };

    const calculateSubtotal = () => {
      return cart
        .reduce((total, item) => {
          const product = cartProducts[item.productId];
          return total + (product?.price || 0) * item.productQuantity;
        }, 0)
        .toFixed(2);
    };

    const handleCheckout = () => {
      if (location.pathname == "/checkout") return;
      navigate("/checkout");
    };
    return (
      <div className={`p-4 space-y-6 ${className}`} ref={ref} {...props}>
        <h2 className="text-2xl font-bold">Your Cart</h2>

        {loading ? (
          <div className="flex items-center justify-center w-full h-32">
            <h1>Loading...</h1>
          </div>
        ) : error ? (
          <div className="py-4 text-red-500">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-blue-500 underline"
            >
              Try again
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <ul className="divide-y">
              {cart.map((item) => {
                const product = cartProducts[item.productId];

                console.log(cartProducts);
                if (!product) toast.error("Fuck Bro!");
                return (
                  <li
                    key={`${item.productId}-${item.productSize}`}
                    className="py-6 flex items-start gap-4"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 p-3 bg-gray-100 rounded-md flex-shrink-0">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium">{product.name}</h3>
                        <button
                          onClick={() =>
                            removeFromCart(item.productId, item.productSize)
                          }
                          className="text-gray-400 hover:text-red-500 m-2"
                          aria-label="Remove item"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <p className="text-sm text-gray-500">
                        Size: {item.productSize}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        ${product.price?.toFixed(2) || "0.00"}
                      </p>

                      {/* Quantity Controls */}

                      <div>
                        <h3 className="text-xs mb-2">QUANTITY</h3>
                        <div className=" gap-3">
                          <button
                            className="px-3 py-1 border border-rounded"
                            onClick={() =>
                              handleQuantityAdjust(
                                item.productId,
                                item.productSize,
                                -1,
                              )
                            }
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.productQuantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                handleQuantityChange(
                                  item.productId,
                                  item.productSize,
                                  value,
                                );
                              }
                            }}
                            className="w-12 text-center bg-transparent"
                            readOnly
                          />
                          <button
                            className="px-3 py-1 border border-rounded"
                            onClick={() =>
                              handleQuantityAdjust(
                                item.productId,
                                item.productSize,
                                1,
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-2 text-sm text-right font-medium">
                        Total: $
                        {((product.price || 0) * item.productQuantity).toFixed(
                          2,
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Cart Summary */}
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-medium">
                <span>Subtotal</span>
                <span>${calculateSubtotal()}</span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                Shipping and taxes calculated at checkout
              </p>

              <div className="mt-6 space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-3 font-medium rounded"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  },
);

Cart.displayName = "Cart";

export default Cart;
