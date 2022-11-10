import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

import housesImage from '../../public/houses.svg';

export const meta: MetaFunction = ({ parentsData }) => {
  return {
    title: `Services | ${parentsData.root.siteTitle}`
  };
};

export default function ServicesRoute() {
  return (
    <div className="mx-auto max-w-7xl px-2">
      <h1 className="mb-8 text-4xl font-bold md:px-4">Services</h1>
      <img
        src={housesImage}
        className="mx-auto mb-10 block w-[36rem] object-fill"
        alt="Houses"
        width={999}
        height={479}
      />
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <section className="transition-colors duration-200 md:p-4 md:hover:bg-lime-50">
          <h2 className="mb-2 text-2xl font-bold">Buyer Inspections</h2>
          <p className="opacity-80">
            A home inspection is a mainly visual evaluation of a home’s
            condition. Home inspectors typically provide inspection services to
            determine the performance of the home. The inspection isn’t just
            about identifying problems with the house. A thorough inspector
            considers the appointment a master class in your new home. We are
            trained to identify all problem areas both small and large that may
            have been unknown to the previous owners and to identify which
            require immediate attention.
          </p>
          <Link
            to="/contact"
            prefetch="intent"
            className="mt-4 block w-max rounded-md border border-lime-700 bg-lime-700 px-3 py-2 leading-none text-white hover:border-lime-800 hover:bg-lime-800"
          >
            Get a Quote
          </Link>
        </section>
        <section className="transition-colors duration-200 md:p-4 md:hover:bg-lime-50">
          <h2 className="mb-2 text-2xl font-bold">Seller Inspections</h2>
          <p className="opacity-80">
            Whether you are selling your home on your own or using a Realtor,
            it’s always a wise idea to have a professional home inspection.
            Knowledge is power and all homes have strengths and weaknesses.
            While an inspection prepared for a seller will not be a substitute
            for a buyer's inspection, it nevertheless serves a useful purpose --
            alerting the seller to potential conditions that could alter or
            delay a sale.
          </p>
          <Link
            to="/contact"
            prefetch="intent"
            className="mt-4 block w-max rounded-md border border-lime-700 bg-lime-700 px-3 py-2 leading-none text-white hover:border-lime-800 hover:bg-lime-800"
          >
            Get a Quote
          </Link>
        </section>
      </div>
    </div>
  );
}
