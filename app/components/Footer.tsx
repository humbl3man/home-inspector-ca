import { SITE_TITLE } from '../config/site';

type FooterProps = {
  isIndexRoute: boolean;
};
export function Footer({ isIndexRoute }: FooterProps) {
  return (
    <footer
      className={
        isIndexRoute
          ? 'absolute bottom-0 left-0 w-full bg-transparent'
          : 'bg-orange-50'
      }
    >
      <div className="mx-auto max-w-7xl py-4 px-2">
        <div
          className={`text-center text-sm ${
            isIndexRoute ? 'text-white opacity-60' : 'text-orange-900'
          }`}
        >
          &copy; {new Date().getFullYear()} {SITE_TITLE}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
