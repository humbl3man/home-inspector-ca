import type {
  LinksFunction,
  MetaFunction,
  LoaderFunction
} from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLocation
} from '@remix-run/react';
import { Footer } from './components/Footer';
import Navbar from './components/Navbar';

import favIcon from '../public/favicon.png';
import notFoundImage from '../public/construction.svg';

import styles from './tailwind.css';
import { SITE_TITLE } from './config/site';

export const loader: LoaderFunction = () => {
  return json({
    siteTitle: SITE_TITLE
  });
};

export const meta: MetaFunction = () => {
  return {
    charset: 'utf-8',
    title: SITE_TITLE,
    viewport: 'width=device-width,initial-scale=1'
  };
};

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    href: favIcon
  },
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
        <div
          className={
            isIndexRoute
              ? ''
              : 'grid h-screen grid-rows-[auto_minmax(auto,_1fr)_auto]'
          }
        >
          <Navbar isIndexRoute={isIndexRoute} />
          {isIndexRoute ? (
            <Outlet />
          ) : (
            <main className="mt-8 mb-16">
              <Outlet />
            </main>
          )}
          {!isIndexRoute ? <Footer /> : null}
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <html lang="en">
      <head>
        <Links />
        <title>{`${
          caught.status === 404 ? 'Page Not Found' : 'Error'
        } | ${SITE_TITLE}`}</title>
      </head>
      <body className="min-h-screen">
        <div className="grid h-screen grid-rows-[auto_minmax(auto,_1fr)_auto]">
          <div>
            <Navbar isIndexRoute={false} />
          </div>
          <main className="mt-8 mb-16">
            {caught.status === 404 ? (
              <div className="mx-auto max-w-xl px-2">
                <img
                  className="mx-auto my-12 block w-96 object-fill"
                  src={notFoundImage}
                  alt="Page Not Found"
                />
                <h1 className="mb-4 text-center text-2xl font-bold">
                  404 Page Not Found
                </h1>
                <p className="text-center opacity-80">
                  We are sorry, but the page you are looking for is not found.
                </p>
              </div>
            ) : (
              <div>We are sorry, but we encountered an error.</div>
            )}
          </main>
          <div>
            <Footer />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  console.error(error);
  return (
    <html lang="en">
      <head>
        <title>Error</title>
        <Links />
      </head>
      <body className="min-h-screen">
        <div className="grid h-screen grid-rows-[auto_minmax(auto,_1fr)_auto]">
          <div>
            <Navbar isIndexRoute={false} />
          </div>
          <main className="mt-8 mb-16">
            <div className="mx-auto max-w-7xl px-2">
              <h1 className="mb-4 text-2xl font-bold text-red-600">
                Oops, we encountered an error!
              </h1>
              {error instanceof Error ? <pre>{error.message}</pre> : null}
            </div>
          </main>
          <div>
            <Footer />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
