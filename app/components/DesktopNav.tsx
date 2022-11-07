import { NavLink } from '@remix-run/react';

type DesktopNavProps = {
  navLinks: { href: string; label: string; id: number }[];
  isIndexRoute?: boolean;
};
export function DesktopNav({ navLinks, isIndexRoute }: DesktopNavProps) {
  const navLinkClass = `text-base ${isIndexRoute ? 'text-white' : 'text-lime-800'}`;
  const activeNavLinkClass = 'underline';

  return (
    <nav className={`hidden sm:block`}>
      <ul className="grid gap-4 mt-0 ml-0 grid-flow-col ">
        {navLinks.map((link) => {
          return (
            <NavLink prefetch="intent" key={link.id} className={({ isActive }) => (isActive ? `${activeNavLinkClass} ${navLinkClass}` : navLinkClass)} to={link.href}>
              {link.label}
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
}
