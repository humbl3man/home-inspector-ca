import heroImage from '../../public/house.jpg';
import expertizeImage from '../../public/expertise.jpg';
import detailImage from '../../public/attention-to-detail.jpg';
import confidenceImage from '../../public/confidence.jpg';
import type { MetaFunction } from '@remix-run/node';
import type { LinksFunction } from '@remix-run/react/dist/routeModules';

type SectionCardParams = {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  text: string;
};

export const meta: MetaFunction = ({ parentsData }) => {
  return {
    title: `${parentsData.root.siteTitle} | About`
  };
};

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: heroImage,
    as: 'image'
  }
];

function SectionCard({ image, title, text }: SectionCardParams) {
  return (
    <section className="relative  p-6 overflow-hidden shadow-lg rounded-md">
      <img className="object-cover w-full h-full absolute inset-0" src={image.src} alt={image.alt} />
      <div className="absolute inset-0 w-full h-full mix-blend-multiply bg-[rgba(21,49,36,0.74)]"></div>
      <div className="relative z-1 max-w-lg mx-auto">
        <h3 className="font-bold mb-4 text-white text-2xl">{title}</h3>
        <div className="text-zinc-50" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </section>
  );
}

export default function AboutRoute() {
  return (
    <div className="max-w-7xl mx-auto px-2">
      <div className="relative mb-16 py-10 px-6 rounded-md shadow-lg overflow-hidden">
        <img className="object-cover w-full h-full absolute inset-0" src={heroImage} alt="" />
        <div className="absolute inset-0 w-full h-full mix-blend-multiply bg-[rgba(21,49,36,0.74)]"></div>
        <div className="mx-auto px-2 max-w-2xl relative">
          <h1 className="font-bold text-4xl text-white mb-4">About Us</h1>
          <p className="text-zinc-50">
            At Home Inspectors California, we are dedicated to setting the standard in affordability, professionalism, and efficiency in the home inspection business. We understand
            that every real estate transaction is different, each property is unique. Our goal is to give you the best price for your property inspection. As certified members of
            the International Association of Certified Home Inspectors, we also believe that educating our clients clearly and transparently about the purchase or sale they are
            considering is a considerable quality. Knowledge only can help to make informed decisions. We will provide you with an honest evaluation of the house or condo so you
            can make the right decision. The home inspection business is very personal. It is based a lot on the individual personalities and abilities of the inspector. We want
            our clients to feel like family, and from our family to yours, we are bringing peace of mind back to your home.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-none sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SectionCard
            image={{ src: detailImage, alt: 'experts' }}
            title="Knowledgeable Home Inspector Experts"
            text="The main purpose of a home inspection is to give you the information needed to make an informed decision on the purchase. <br /> It is critical to choose the right inspector
            for one of the most important emotional decisions and financial investments that you will ever make. Home inspections are an instrumental part of the home buying
            process that can save you a lot of time and money in the long run."
          />

          <SectionCard
            image={{ src: expertizeImage, alt: 'professional' }}
            title="We Notice Little Things"
            text="Our inspections are based upon the International Standards of Practice for Performing a General Home Inspection, provided by InterNachi. <br /> This checklist may be used to
        perform a visual inspection of a home and provide the inspector with a written report identifying the defects that were (1) observed and (2) deemed material."
          />

          <SectionCard
            image={{ src: confidenceImage, alt: 'happy couple' }}
            title="Be Confident In Your Property Transaction"
            text="When you work with us, we provide professional home inspectors that give their full attention to your home. <br />
        We pride ourselves on the high standard we set for our inspections, because we know what a safe home means to you."
          />
        </div>
      </div>
    </div>
  );
}
