import { NavLink } from '@remix-run/react';

type DesktopNavProps = {
  navLinks: { href: string; label: string; id: number }[];
  isIndexRoute?: boolean;
};
export function DesktopNav({ navLinks, isIndexRoute }: DesktopNavProps) {
  return (
    <nav className={`hidden sm:block`}>
      <ul className="grid gap-4 mt-0 ml-0 grid-flow-col ">
        {navLinks.map((link) => {
          return (
            <NavLink
              prefetch="intent"
              key={link.id}
              className={({ isActive }) => `font-semibold hover:opacity-80 ${isIndexRoute ? 'text-white' : 'text-black'} ${isActive ? 'opacity-100' : 'opacity-70'}`}
              to={link.href}>
              {link.label}
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
}
