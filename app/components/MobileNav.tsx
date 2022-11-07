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

export default function MobileNav({ navLinks, isNavOpen, onLinkClick }: MobileNavProps) {
  return (
    <motion.nav
      style={{
        transformOrigin: 'top right'
      }}
      initial={{
        scale: 0
      }}
      animate={{
        scale: isNavOpen ? 1 : 0
      }}
      className={`absolute pt-16 pb-8 px-10 top-2 right-2 min-w-[50vw] z-[999] bg-lime-50 rounded-lg shadow-lg sm:hidden`}>
      {/* close navigation icon */}
      <button type="button" className="absolute top-[20px] right-[20px] sm:hidden" aria-label="Close Navigation Menu" onClick={onLinkClick}>
        <CloseIcon className="text-black text-[30px]" />
      </button>
      <ul className="grid grid-flow-row gap-4 ml-4">
        {navLinks.map((link) => {
          return (
            <NavLink prefetch="intent" onClick={onLinkClick} key={link.id} to={link.href} className="text-black text-xl">
              {link.label}
            </NavLink>
          );
        })}
      </ul>
    </motion.nav>
  );
}
