import heroImage from '../../public/house.jpg';
import expertizeImage from '../../public/expertise.jpg';
import detailImage from '../../public/attention-to-detail.jpg';
import confidenceImage from '../../public/confidence.jpg';
import type { MetaFunction } from '@remix-run/node';
import type { LinksFunction } from '@remix-run/react/dist/routeModules';

import SectionCard from '~/components/SectionCard';

export const meta: MetaFunction = ({ parentsData }) => {
  return {
    title: `About | ${parentsData.root.siteTitle}`
  };
};

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: heroImage,
    as: 'image'
  }
];

export default function AboutRoute() {
  return (
    <div className="mx-auto max-w-7xl px-2">
      <div className="relative mb-16 overflow-hidden rounded-md py-10 px-6 shadow-lg">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={heroImage}
          alt=""
        />
        <div className="absolute inset-0 h-full w-full bg-[rgba(21,49,36,0.74)] mix-blend-multiply"></div>
        <div className="relative mx-auto max-w-2xl px-2">
          <h1 className="mb-4 text-4xl font-bold text-white">About Us</h1>
          <p className="text-white opacity-80">
            At Home Inspectors California, we are dedicated to setting the
            standard in affordability, professionalism, and efficiency in the
            home inspection business. We understand that every real estate
            transaction is different, each property is unique. Our goal is to
            give you the best price for your property inspection. As certified
            members of the International Association of Certified Home
            Inspectors, we also believe that educating our clients clearly and
            transparently about the purchase or sale they are considering is a
            considerable quality. Knowledge only can help to make informed
            decisions. We will provide you with an honest evaluation of the
            house or condo so you can make the right decision. The home
            inspection business is very personal. It is based a lot on the
            individual personalities and abilities of the inspector. We want our
            clients to feel like family, and from our family to yours, we are
            bringing peace of mind back to your home.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="min-h-[300px]">
            <SectionCard
              image={{ src: detailImage, alt: 'experts' }}
              title="Knowledgeable Home Inspector Experts"
              text="The main purpose of a home inspection is to give you the information needed to make an informed decision on the purchase. <br /> It is critical to choose the right inspector
            for one of the most important emotional decisions and financial investments that you will ever make. Home inspections are an instrumental part of the home buying
            process that can save you a lot of time and money in the long run."
            />
          </div>
          <div className="min-h-[300px]">
            <SectionCard
              image={{ src: expertizeImage, alt: 'professional' }}
              title="We Notice Little Things"
              text="Our inspections are based upon the International Standards of Practice for Performing a General Home Inspection, provided by InterNachi. <br /> This checklist may be used to
        perform a visual inspection of a home and provide the inspector with a written report identifying the defects that were (1) observed and (2) deemed material."
            />
          </div>

          <div className="min-h-[300px] sm:col-span-full lg:col-span-1">
            <SectionCard
              image={{ src: confidenceImage, alt: 'happy couple' }}
              title="Be Confident In Your Property Transaction"
              text="When you work with us, we provide professional home inspectors that give their full attention to your home. <br />
          We pride ourselves on the high standard we set for our inspections, because we know what a safe home means to you."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
