interface Props {
  price: string;
  title: string;
  id: string;
  image: string;
}

const HeroCard: React.FC<Props> = ({ price, title, id, image }) => {
  console.log(id, image);
  return (
    <div
      className="w-[220px] h-[220px] transform duration-300 rounded-sm cursor-pointer text-white font-medium tracking-wider bg-[#222222] md:hover:text-black md:hover:bg-white md:hover:w-[400px] md:hover:h-[400px] ease-in-out
                                                         origin-bottom-right p-4 flex  justify-between flex-col"
    >
      <div className="flex items-center justify-between">
        <p className="text-[1rem]">CLASSIC</p>
        <p>{price}$</p>
      </div>

      <div className="transform duration-300 w-full h-full flex opacity-0 md:hover:opacity-100 items-center justify-center overflow-hidden">
        <img
          src={image}
          className="transform duration-300 origin-center  md:hover:scale-1"
        />
      </div>
      <p className="text-[1.6rem] md:hover:text-black text-bold">{title}</p>
    </div>
  );
};

export default HeroCard;
