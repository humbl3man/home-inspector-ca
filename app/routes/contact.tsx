import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = ({ parentsData }) => {
  return {
    title: `${parentsData.root.siteTitle} | Contact`
  };
};

export default function ContactRoute() {
  return (
    <main>
      <h1>Contact Us</h1>
    </main>
  );
}
