import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="flex items-center justify-between py-3 fixed px-10 z-10 top-0 left-0 w-screen bg-white">
      <Link to="/" className="text-[1.5rem] font-bold">
        ShopeX
      </Link>
      <p className="font-bold">Cart</p>
    </header>
  );
};

export default NavBar;
