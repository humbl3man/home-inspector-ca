import type { LinksFunction, MetaFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from '@remix-run/react';
import { Footer } from './components/Footer';
import Navbar from './components/Navbar';

import styles from './tailwind.css';

export const loader: LoaderFunction = () => {
  return json({
    siteTitle: 'Home Inspectors California'
  });
};

export const meta: MetaFunction = ({ data }) => {
  return {
    charset: 'utf-8',
    title: data.siteTitle,
    viewport: 'width=device-width,initial-scale=1'
  };
};

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
          {isIndexRoute ? (
            <Outlet />
          ) : (
            <main className="mt-8 mb-16">
              <Outlet />
            </main>
          )}
          {!isIndexRoute ? <Footer /> : null}
        </>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
