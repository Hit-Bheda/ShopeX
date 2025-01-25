const Hero = () => {
  return (
    <div className="h-[calc(100%-3.7rem)] mt-[3.7rem] relative">
        
      <h1 className="absolute x-[50%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white text-[18vw] md:text-[15vw] font-medium">
        CLASSICS
      </h1>
      <div className="w-full h-[100%] flex items-center md:flex-row flex-col justify-between">
        <div className="w-full md:w-1/2 h-full bg-[#156EF6] p-6 flex items-end justify-end">
          <div
            className="w-[220px] h-[220px] transform duration-300 rounded-sm cursor-pointer text-white font-medium tracking-wider bg-[#222222] md:hover:text-black md:hover:bg-white md:hover:w-[400px] md:hover:h-[400px] ease-in-out
                                                         origin-bottom-right p-4 flex  justify-between flex-col"
          >
            <div className="flex items-center justify-between">
              <p className="text-[1rem]">CLASSIC</p>
              <p>50$</p>
            </div>

            <p className="text-[1.6rem] md:hover:text-black text-bold">
              Logo Swetshirt
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full bg-[#080808] p-6 flex items-start justify-start">
          <div
            className="w-[220px] h-[220px] transform duration-300 cursor-pointer rounded-sm bg-[#222222] text-white md:hover:text-black p-4 md:hover:bg-white md:hover:w-[400px] md:hover:h-[400px] ease-in-out
                                                 origin-top-left flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <p className="text-[1rem]">CLASSIC</p>
              <p>55$</p>
            </div>

            <p className="text-[1.6rem] md:hover:text-black font-bold">
              Contaner Beggu Tote
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
