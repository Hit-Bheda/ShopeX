import React, { forwardRef, useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { useAuthStore } from "../store/AuthStore";
import { getCartProducts } from "../api/actions";
import { z } from "zod";
import { ProductResponseSchema } from "../schemas";

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

                if (!product) {
                  // Show loading placeholder for items without product data
                  return (
                    <li
                      key={`${item.productId}-${item.productSize}`}
                      className="py-6 flex items-start gap-4"
                    >
                      <div className="w-24 h-24 bg-gray-200 rounded-md animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-5 w-3/4 bg-gray-200 animate-pulse mb-2 rounded"></div>
                        <div className="h-4 w-1/3 bg-gray-200 animate-pulse mb-2 rounded"></div>
                        <div className="h-4 w-1/4 bg-gray-200 animate-pulse mb-4 rounded"></div>
                        <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li
                    key={`${item.productId}-${item.productSize}`}
                    className="py-6 flex items-start gap-4"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-md flex-shrink-0">
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
                          className="text-gray-400 hover:text-red-500"
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
                      <div className="mt-4 flex items-center">
                        <button
                          onClick={() =>
                            handleQuantityAdjust(
                              item.productId,
                              item.productSize,
                              -1,
                            )
                          }
                          disabled={item.productQuantity <= 1}
                          className={`p-1 border rounded-l ${
                            item.productQuantity <= 1
                              ? "text-gray-300"
                              : "text-gray-600"
                          }`}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>

                        <input
                          type="number"
                          min="1"
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
                          className="w-12 border-t border-b px-2 py-1 text-center"
                        />

                        <button
                          onClick={() =>
                            handleQuantityAdjust(
                              item.productId,
                              item.productSize,
                              1,
                            )
                          }
                          className="p-1 border rounded-r text-gray-600"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
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
                <button className="w-full bg-black text-white py-3 font-medium rounded">
                  Checkout
                </button>

                <button className="w-full bg-white border border-black py-3 font-medium rounded">
                  Continue Shopping
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
