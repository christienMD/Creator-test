import HomeExplore from "../HomeExplore/HomeExplore";
import HomePageHero from "../HomePageHero/HomePageHero";
import HomePageMain from "../HomePageMain/HomePageMain";
import Sidemenu from "../SideMenu/Sidemenu";

const Home = () => {
  return (
    <div className="lg:px-0 mb-16">
      <div className="w-full px-2 py-6 bg-creator-bg-300">
        <HomePageHero />
      </div>
      <HomeExplore />
      <main className="container mx-auto px-6 flex-grow flex flex-col lg:flex-row mt-4">
        <div className="lg:sticky top-5 lg:w-[280px] lg:flex-shrink-0">
          <Sidemenu />
        </div>
        <div className="flex-grow">
          <HomePageMain />
        </div>
      </main>
    </div>
  );
};


export default Home;
