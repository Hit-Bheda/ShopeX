import { Link } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import Cart from "./Cart";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const cart = useAuthStore((state) => state.cart);
  const [showCart, setShowCart] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const handleClick = () => {
    if (location.pathname == "/checkout") return;
    setShowCart(!showCart);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCart(false); // Hide cart when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="flex items-center z-50 justify-between py-3 fixed px-10 top-0 left-0 w-screen bg-white">
        <Link to="/" className="text-[1.5rem] font-bold">
          ShopeX
        </Link>
        <p className="font-bold cursor-pointer" onClick={handleClick}>
          Cart ({cart.length})
        </p>
      </header>
      {showCart && (
        <Cart
          className="fixed top-[10%] overflow-auto max-h-[80vh] right-5 bg-white z-50 border-black border-[1px]"
          ref={cartRef}
        />
      )}
    </>
  );
};

export default NavBar;
