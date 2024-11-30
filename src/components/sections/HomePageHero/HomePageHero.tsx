import Banner from "../Banner/Banner";
import HeroDescription from "../HeroDescription/HeroDescription";

const HomePageHero = () => {
  return (
    <section className="mt-4 section-container pt-6 pb-10 text-white">
      <div className="grid md:grid-cols-2 gap-7 md:gap-1">
        {/* hero description */}
        <HeroDescription />

        {/* hero Banner*/}
        <Banner />
      </div>
    </section>
  );
};

export default HomePageHero;
