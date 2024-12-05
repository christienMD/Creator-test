import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { navLinks } from '@/utils/data';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import CartIcon from '../CartIcon/CartIcon';
import { UserProfile } from '../UserProfile/UserProfile';
import AnnouncementAlert from '../AnnouncementAlert/AnnouncementAlert';

const Navbar = () => {
  const location = useLocation();

  const checkAuth = () => {
    try {
      const token = localStorage.getItem('auth_token');
      const userDataString = localStorage.getItem('userData');

      if (!token || !userDataString) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  const isAuthenticated = checkAuth();

  const NavigationLinks = ({
    className = 'navbar-center mb-4 md:mb-0 font-bold text-xl',
  }) => (
    <ul
      className={`flex flex-col md:flex-row space-y-2 fond-bold text-xl md:space-y-0 md:space-x-4 ${className}`}
    >
      {navLinks.map((link) => (
        <li key={link.label} className="relative">
          <Link
            to={link.to}
            className={`text-lg font-bold hover:text-gray-400 transition-colors 
              ${
                location.pathname === link.to
                  ? 'md:text-black md:border-b-8 md:border-b-creator-bg-300 md:pb-4 text-white'
                  : 'md:text-black text-white'
              }`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
  const AuthButtons = ({ className = '' }) => (
    <div
      className={`flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 ${className}`}
    >
      <div className="flex items-center gap-2">
        <Link to="/cart">
          <CartIcon />
        </Link>
      </div>
      <Button
        variant="outline"
        className="bg-creator-bg-400 text-white px-6 w-full md:w-auto hover:text-creator-bg-400"
      >
        <Link to="/login" className="w-full">
          Login
        </Link>
      </Button>
      <Button
        className="bg-white text-creator-bg-400 border px-6 border-creator-bg-400 w-full md:w-auto hover:bg-creator-bg-400 hover:text-white"
        variant="outline"
      >
        <Link to="/signup">Sign Up</Link>
      </Button>
    </div>
  );

  return (
    <>
      <AnnouncementAlert month="October" percentageDiscount={20} />
      <nav className="fixed top-6 left-0 right-0 bg-white z-30 shadow-sm">
        <div className="px-4 md:px-11">
          <div className="flex items-center h-16 md:h-20">
            {/* Mobile Menu Layout */}
            <div className="md:hidden flex items-center w-full">
              {/* Menu Icon on the Left */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] bg-creator-bg-400 text-white"
                >
                  <div className="h-full flex flex-col p-6">
                    <SheetHeader className="mb-6">
                      <h2 className="text-3xl font-bold">
                        <Link to="/home" className="text-white">
                          CREATORS
                        </Link>
                      </h2>
                    </SheetHeader>

                    <div className="flex flex-col flex-1 text-white">
                      <NavigationLinks className="space-y-4 mb-8" />

                      <div className="mt-auto">
                        {/* Conditional rendering in mobile menu */}
                        {!isAuthenticated ? (
                          <AuthButtons />
                        ) : (
                          <div className="flex flex-col space-y-4">
                            <div className="flex items-center gap-2">
                              <CartIcon />
                            </div>
                            <UserProfile />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* CREATORS Logo Centered */}
              <div className="flex-1  font-bold">
                <h1 className="text-2xl font-bold text-creator-bg-400">
                  <Link to="/home">CREATORS</Link>
                </h1>
              </div>

              {/* Cart and Profile on the Right */}
              <div className="flex items-center space-x-2">
                {!isAuthenticated ? null : (
                  <>
                    <Link to="/cart">
                      <CartIcon />
                    </Link>
                    <UserProfile />
                  </>
                )}
              </div>
            </div>

            {/* Desktop Navigation (Updated) */}
            <div className="hidden md:flex items-center w-full">
              {/* Logo */}
              <div className="flex-shrink-0 font-bold">
                <h1 className="text-2xl md:text-4xl font-bold text-creator-bg-400">
                  <Link to="/home">CREATORS</Link>
                </h1>
              </div>

              {/* Desktop Navigation - Centered */}
              <div className="flex-1 flex justify-center">
                <NavigationLinks className="space-x-8 text-xl" />
              </div>

              {/* Right Section: Auth, Cart, Profile */}
              <div className="flex items-center space-x-4">
                {!isAuthenticated ? (
                  <div>
                    <AuthButtons />
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Link to="/cart">
                      <CartIcon />
                    </Link>
                    <UserProfile />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navbar;
