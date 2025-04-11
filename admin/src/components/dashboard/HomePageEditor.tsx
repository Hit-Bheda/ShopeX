import HeroProducts from "./HeroProducts";
import HomeCategory from "./HomeCategory";

const HomePageEditor = () => {
  return (
    <div className="flex flex-col gap-5">
      <HeroProducts />
      <HomeCategory />
    </div>
  );
};

export default HomePageEditor;
