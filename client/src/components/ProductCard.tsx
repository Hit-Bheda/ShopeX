import { Link } from "react-router";
import cx from "./cx";

interface Props {
  _id: string;
  name: string;
  price: number;
  type: string;
  image: string;
}

const ProductCard: React.FC<Props> = ({ _id, name, price, type, image }) => {
  const bgColors = [
    "#EE52CB",
    "#00D822",
    "#FFAF14",
    "#7A3DFF",
    "#FF6B01",
    "#EE1D36",
  ];

  const color = bgColors[Math.floor(Math.random() * bgColors.length)];
  return (
    <Link
      to={`/product/${_id}`}
      className={cx(
        "overflow-hidden min-w-[68vw] h-[68vw] md:min-w-[28vw] items-center sm:min-w-[35vw] sm:h-[35vw]  hover:outline-black hover:outline-offset-4 border-separate relative bord border-solid md:h-[28vw] flex flex-col p-4 justify-between bg-[#f1f1f1] cursor-pointer rounded-sm group tranlate duration-300",
      )}
      style={{ "--hover-bg-color": color } as React.CSSProperties}
    >
      <div className="flex z-10 text-[1rem] w-full items-center justify-between translate duration-200 group-hover:-translate-y-10">
        <p>{type}</p>
        <p>{price}$</p>
      </div>
      <img
        src={image}
        className="object-cover w-[60%] h-[70%] md:group-hover:scale-150 duration-200 ease-in-out"
      />
      <h1 className="text-[1.5rem] z-10 font-bold tracking-wider translate  w-full duration-300 group-hover:translate-y-16">
        {name}
      </h1>
    </Link>
  );
};

export default ProductCard;

