import { Link } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

const NavBar = () => {
  const cart = useAuthStore((state) => state.cart);
  return (
    <header className="flex items-center z-50 justify-between py-3 fixed px-10 top-0 left-0 w-screen bg-white">
      <Link to="/" className="text-[1.5rem] font-bold">
        ShopeX
      </Link>
      <p className="font-bold">Cart ({cart.length})</p>
    </header>
  );
};

export default NavBar;
