import type { MetaFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

export const meta: MetaFunction = ({ parentsData }) => {
  return {
    title: `Contact | ${parentsData.root.siteTitle}`
  };
};

export default function ContactRoute() {
  return (
    <div className="mx-auto max-w-lg px-2">
      <h1 className="mb-8 text-4xl font-bold">Contact Us</h1>
      <p className="opacity-70">
        Contact us for a quote. We can work with your budget.
      </p>
      <div className="mt-8 border-t border-gray-300 pt-8">
        <Outlet />
      </div>
    </div>
  );
}
