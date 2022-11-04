import { Link, NavLink } from '@remix-run/react';
import { useState } from 'react';
import { CgMenuRightAlt as MenuIcon } from 'react-icons/cg';
import { MdOutlineClose as CloseIcon } from 'react-icons/md';

type NavbarProps = {
  isIndexRoute: boolean;
};

export default function Navbar({ isIndexRoute }: NavbarProps) {
  const navLinkClass = `text-white text-xl sm:text-base ${isIndexRoute ? '' : 'sm:text-lime-800'}`;
  const activeNavLinkClass = 'underline';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobileOpen = () => setIsMobileMenuOpen(true);
  const handleMobileClose = () => setIsMobileMenuOpen(false);

  return (
    <header className={`py-4 ${isIndexRoute ? 'absolute top-0 left-0 w-full z-50' : 'bg-lime-50'}`}>
      <div className="mx-w-7xl px-2 sm:px-4 py-2">
        <div className="flex justify-between items-center">
          <Link to="/" className={`${isIndexRoute ? 'text-white' : 'text-lime-900'} text-xl sm:text-2xl`}>
            Home Inspectors California
          </Link>
          <nav
            className={`${
              isMobileMenuOpen ? 'opacity-1 z-[100]' : 'opacity-0 z-[-100]'
            } transition-all duration-300 fixed inset-0 w-full h-full bg-lime-500 sm:opacity-100 sm:z-0 sm:visible sm:static sm:w-auto sm:h-auto sm:bg-transparent`}>
            {/* close navigation icon */}
            <button type="button" className="absolute top-[20px] right-[20px] sm:hidden" aria-label="Close Navigation Menu" onClick={handleMobileClose}>
              <CloseIcon className="text-white text-[30px]" />
            </button>
            <ul className="grid grid-flow-row gap-4 mt-14 ml-4 sm:mt-0 sm:ml-0 sm:grid-flow-col sm:gap-4">
              {[
                {
                  id: 1,
                  href: '/',
                  label: 'Home'
                },
                {
                  id: 2,
                  href: 'about',
                  label: 'About Us'
                },
                {
                  id: 3,
                  href: 'contact',
                  label: 'Contact'
                }
              ].map((link) => {
                return (
                  <NavLink
                    prefetch="intent"
                    onClick={handleMobileClose}
                    key={link.id}
                    className={({ isActive }) => (isActive ? `${activeNavLinkClass} ${navLinkClass}` : navLinkClass)}
                    to={link.href}>
                    {link.label}
                  </NavLink>
                );
              })}
            </ul>
          </nav>
          {/*mobile menu trigger */}
          <button type="button" className="sm:hidden" aria-label="Open Navigation Menu" onClick={handleMobileOpen}>
            <MenuIcon className={`${isIndexRoute ? 'text-white' : 'text-lime-800'} text-[30px]`} />
          </button>
        </div>
      </div>
    </header>
  );
}
