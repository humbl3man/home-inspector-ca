import { Link, NavLink } from '@remix-run/react';

type NavbarProps = {
  isIndexRoute: boolean;
};

export default function Navbar(props: NavbarProps) {
  const navLinkClass = `${props.isIndexRoute ? 'text-white hover:text-lime-200' : 'text-lime-700 hover:text-lime-900'} hover:underline`;
  const activeNavLinkClass = props.isIndexRoute ? 'text-lime-200 underline' : 'underline';
  return (
    <header className={`p-4 ${props.isIndexRoute ? 'absolute top-0 left-0 w-full z-50' : 'bg-lime-50'}`}>
      <div className="mx-w-7xl px-4 py-2">
        <div className="flex justify-between items-center">
          <Link to="/" className={`${props.isIndexRoute ? 'text-white' : 'text-lime-900'} text-2xl`}>
            Home Inspectors California
          </Link>
          <nav>
            <ul className="grid grid-flow-col gap-4">
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
                  <NavLink key={link.id} className={({ isActive }) => (isActive ? `${activeNavLinkClass} ${navLinkClass}` : navLinkClass)} to={link.href}>
                    {link.label}
                  </NavLink>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
