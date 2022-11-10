import type { MetaFunction, LinksFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

import homeBackgroundImage from '../../public/home-background-image.jpg';

export const meta: MetaFunction = ({ parentsData }) => {
  return {
    title: parentsData.root.siteTitle
  };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: 'preload',
      href: homeBackgroundImage,
      as: 'image'
    }
  ];
};

export default function IndexRoute() {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 flex h-full w-full items-center px-4">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={homeBackgroundImage}
          alt=""
        />
        <div className="relative z-10 mx-auto max-w-7xl px-2">
          <motion.h1
            initial={{
              opacity: 0,
              y: -50
            }}
            animate={{
              opacity: 100,
              y: 0
            }}
            className="mb-8 text-5xl font-bold uppercase leading-none tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Home Inspectors <br /> California
          </motion.h1>
          <motion.div
            initial={{
              opacity: 0,
              y: 50
            }}
            animate={{
              opacity: 100,
              y: 0
            }}
            transition={{
              delay: 0.3
            }}
          >
            <p className="mb-8 text-2xl text-lime-300">
              Bringing Peace Of Mind Back To Your Home.
            </p>
            <Link
              prefetch="intent"
              to="contact"
              className="rounded-md bg-lime-500 px-4 py-3 text-lg text-black transition-colors duration-300 hover:bg-lime-600"
            >
              Request a Quote
            </Link>
          </motion.div>
        </div>
        <div className="absolute inset-0 h-full w-full bg-[rgba(196,99,72,0.71)] mix-blend-multiply" />
      </div>
    </div>
  );
}
