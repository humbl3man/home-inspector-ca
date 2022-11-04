import { Link } from '@remix-run/react';
import homeBackgroundImage from '../../public/home-background-image.jpg';

export default function IndexRoute() {
  return (
    <div className="relative overflow-hidden h-screen">
      <div className="absolute w-full h-full inset-0 px-4 flex items-center">
        <img className="w-full h-full absolute inset-0 object-cover" src={homeBackgroundImage} alt="" />
        <div className="relative z-10 max-w-7xl px-2">
          <h1 className="uppercase leading-none tracking-tight text-white text-5xl sm:text-6xl md:text-7xl mb-8 font-bold">
            Home Inspectors <br /> California
          </h1>
          <p className="text-lime-300 text-2xl mb-8">Bringing Peace Of Mind Back To Your Home</p>
          <Link prefetch="intent" to="contact" className="bg-lime-500 text-lg transition-colors duration-300 text-black px-4 py-3 hover:bg-lime-600 rounded-md">
            Request a Quote
          </Link>
        </div>
        <div className="absolute w-full h-full inset-0 mix-blend-multiply bg-[rgba(196,99,72,0.71)]" />
      </div>
    </div>
  );
}
