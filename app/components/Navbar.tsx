import { Link, useLocation } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { CgMenuRightAlt as MenuIcon } from 'react-icons/cg';
import { SITE_TITLE } from '~/config/site';
import { DesktopNav } from './DesktopNav';
import MobileNav from './MobileNav';

const navLinks = [
  {
    id: 1,
    href: '/',
    label: 'Home'
  },
  {
    id: 2,
    href: 'services',
    label: 'Services'
  },
  {
    id: 3,
    href: 'about',
    label: 'About'
  },
  {
    id: 4,
    href: 'contact',
    label: 'Contact'
  }
];

type NavbarProps = {
  isIndexRoute?: boolean;
};
export default function Navbar({ isIndexRoute }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobileClose = () => setIsMobileMenuOpen(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`pt-4 sm:py-4 ${
        isIndexRoute ? 'absolute top-0 left-0 z-50 w-full' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-2 py-2">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            prefetch="intent"
            className={`${
              isIndexRoute ? 'text-white' : 'text-lime-900'
            } text-xl sm:text-2xl`}
          >
            {SITE_TITLE}
          </Link>
          <DesktopNav navLinks={navLinks} isIndexRoute={isIndexRoute} />
          <MobileNav
            navLinks={navLinks}
            isNavOpen={isMobileMenuOpen}
            onLinkClick={handleMobileClose}
            isIndexRoute={isIndexRoute}
          />
          {/*mobile menu trigger */}
          <button
            type="button"
            className="sm:hidden"
            aria-label="Open Navigation Menu"
            aria-controls="site-navigation"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prevState) => !prevState)}
          >
            <MenuIcon
              className={`${
                isIndexRoute ? 'text-white' : 'text-lime-800'
              } text-[30px]`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
