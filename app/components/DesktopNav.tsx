import { NavLink } from '@remix-run/react';

type DesktopNavProps = {
  navLinks: { href: string; label: string; id: number }[];
  isIndexRoute?: boolean;
};
export function DesktopNav({ navLinks, isIndexRoute }: DesktopNavProps) {
  return (
    <nav className={`hidden sm:block`}>
      <ul className="mt-0 ml-0 grid grid-flow-col gap-4 ">
        {navLinks.map((link) => {
          return (
            <li key={link.id}>
              <NavLink
                prefetch="intent"
                className={({ isActive }) =>
                  `font-semibold hover:opacity-80 ${
                    isIndexRoute ? 'text-white' : 'text-black'
                  } ${isActive ? 'opacity-100' : 'opacity-70'}`
                }
                to={link.href}
              >
                {link.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
