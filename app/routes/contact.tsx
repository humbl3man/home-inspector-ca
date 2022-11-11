import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getEnv } from '~/env.server';

function formatPhone(phoneNum: string | number) {
  return String(phoneNum).replace(/(\d{3,})(\d{3,})(\d{4,})/g, '($1)-$2-$3');
}

export const meta: MetaFunction = ({ parentsData }) => {
  return {
    title: `Contact | ${parentsData.root.siteTitle}`
  };
};

type LoaderData = ReturnType<typeof getEnv>;

export const loader: LoaderFunction = () => {
  return json<LoaderData>(getEnv());
};

export default function ContactRoute() {
  const { CONTACT_EMAIL, CONTACT_PHONE } = useLoaderData<LoaderData>();

  return (
    <div className="mx-auto max-w-lg px-2">
      <h1 className="mb-8 text-4xl font-bold">Contact Us</h1>
      <p className="opacity-70">
        Contact us for a quote. We can work with your budget.
      </p>
      <div className="mt-8 border-t border-gray-300 pt-8">
        <p className="opacity-70">
          Email:{' '}
          <a
            className="text-blue-700 hover:underline focus:underline"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="opacity-70">
          Phone:{' '}
          <a
            className="text-blue-700 hover:underline focus:underline"
            href={`tel:${CONTACT_PHONE}`}
          >
            {formatPhone(CONTACT_PHONE)}
          </a>
        </p>
      </div>
      <div className="mt-8 border-t border-gray-300 pt-8">
        <Outlet />
      </div>
    </div>
  );
}
