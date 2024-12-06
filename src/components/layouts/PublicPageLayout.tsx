import Footer from '../sections/Footer/Footer';
import { footerData } from '@/utils/data';
import Navbar from '../sections/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthToast } from '@/hooks/useAuthToast';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const PublicPageLayout = ({ children, className }: Props) => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useAuthToast();

  return (
    <div
      className={`flex flex-col min-h-screen w-full overflow-x-hidden ${className}`}
    >
      <ToastContainer />
      <Navbar />

      <main className="flex-grow w-full">{children}</main>

      <footer className="bg-creator-bg-400 text-white py-12 px-2 w-full">
        <Footer footerData={footerData} />
      </footer>
    </div>
  );
};

export default PublicPageLayout;
