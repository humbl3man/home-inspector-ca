import { NavLink } from '@remix-run/react';
import { motion } from 'framer-motion';
import { MdOutlineClose as CloseIcon } from 'react-icons/md';

type MobileNavProps = {
  navLinks: { href: string; label: string; id: number }[];
  isIndexRoute?: boolean;
  isNavOpen?: boolean;
  offsetTop?: number;
  onLinkClick?: () => void;
};

export default function MobileNav({
  navLinks,
  isNavOpen,
  onLinkClick
}: MobileNavProps) {
  return (
    <motion.nav
      id="site-navigation"
      style={{
        transformOrigin: 'top right'
      }}
      initial={{
        scale: 0
      }}
      animate={{
        scale: isNavOpen ? 1 : 0
      }}
      className={`absolute top-2 right-2 z-[999] min-w-[50vw] rounded-lg bg-lime-50 px-10 pt-16 pb-8 shadow-lg sm:hidden`}
    >
      {/* close navigation icon */}
      <button
        type="button"
        className="absolute top-[20px] right-[20px] sm:hidden"
        aria-label="Close Navigation Menu"
        onClick={onLinkClick}
      >
        <CloseIcon className="text-[30px] text-black" />
      </button>
      <ul className="ml-4 grid grid-flow-row gap-4">
        {navLinks.map((link) => {
          return (
            <li key={link.id}>
              <NavLink
                prefetch="intent"
                onClick={onLinkClick}
                to={link.href}
                className="text-xl text-black"
              >
                {link.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
