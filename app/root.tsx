import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from '@remix-run/react';
import Navbar from './components/Navbar';

import styles from './tailwind.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Home Inspectors California',
  viewport: 'width=device-width,initial-scale=1'
});

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles
  }
];

export default function App() {
  const location = useLocation();
  const isIndexRoute = location.pathname === '/';
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <>
          <Navbar isIndexRoute={isIndexRoute} />
          <Outlet />
          {!isIndexRoute ? <footer>footer goes here</footer> : null}
        </>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
