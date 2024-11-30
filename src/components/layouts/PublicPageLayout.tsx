import Footer from '../sections/Footer/Footer';
import { footerData } from '@/utils/data';
import Navbar from '../sections/Navbar/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface Props {
  children: React.ReactNode;
  className?: string;
}
const PublicPageLayout = ({ children, className }: Props) => {
  return (
    <div className={`flex flex-col min-h-screenn border ${className}`}>
      <ToastContainer />
      <Navbar />
      {children}
      <div className="bg-creator-bg-400  text-white py-12 px-2">
        <Footer footerData={footerData} />
      </div>
    </div>
  );
};

export default PublicPageLayout;
