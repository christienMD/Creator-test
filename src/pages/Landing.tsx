import BuyComponent from '../components/sections/BuySection/BuySection';
import CreatorQuote from '../components/sections/CreatorsQuote/CreatorQuote';
import CreatorsComponent from '../components/sections/Creators/Creators';
import FaqsComponent from '../components/sections/Faqs/Faqs';
import Hero from '../components/sections/Hero/Hero';

import PublicPageLayout from '../components/layouts/PublicPageLayout';
import SellComponent from '../components/sections/SellSection/SellSection';
import Testimonials from '../components/sections/Testimonials/Testimonials';

import { sampleTestimonials, faqs, creatorLinks, quotes } from '../utils/data';
import ExploreComponent from '../components/sections/Explore/Explore';
import AccessedProducts from '@/components/sections/AccessedProducts/AccessedProducts';

function LandingPage() {
  return (
    <>
      <PublicPageLayout>
        <div className="bg-creator-bg-100 w-full p-14">
          <Hero />
        </div>
        <div className="bg-white py-16 ">
          <Testimonials testimonials={sampleTestimonials} />
        </div>
        <div className="py-12 px-10 sm:px-6 lg:px-8 bg-creator-bg-100">
          <AccessedProducts />
        </div>
        <div className="bg-white">
          <CreatorQuote quotes={quotes} />
        </div>

        <div className="bg-creator-bg-100 w-full p-14">
          <CreatorsComponent creators={creatorLinks} />
        </div>
        <div className="bg-white w-full">
          <BuyComponent />
        </div>

        <div className="bg-creator-bg-100 w-full p-6">
          <SellComponent />
        </div>
        <div className="bg-white">
          <ExploreComponent />
        </div>
        <div className="bg-white p-6">
          <FaqsComponent faqs={faqs} />
        </div>
      </PublicPageLayout>
    </>
  );
}

export default LandingPage;
