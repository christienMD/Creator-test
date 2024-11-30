import Footer from '@/components/sections/Footer/Footer';
import LoginHero from '@/components/sections/LoginHero/LoginHero';
import { footerData } from '@/utils/data';

function LoginPage() {
  return (
    <>
      <LoginHero />
      <div className="bg-creator-bg-400  text-white py-12 px-2">
        <Footer footerData={footerData} />
      </div>
    </>
  );
}

export default LoginPage;
