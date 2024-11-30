import Footer from '@/components/sections/Footer/Footer';
import SignupHero from '@/components/sections/SignupHero/SignupHero';
import { footerData } from '@/utils/data';

const SignupPage = () => {
  return (
    <>
      <SignupHero />
      <div className="bg-creator-bg-400  text-white py-12 px-2">
        <Footer footerData={footerData} />
      </div>
    </>
  );
};

export default SignupPage;
