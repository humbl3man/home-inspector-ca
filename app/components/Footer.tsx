export function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-7xl py-4 px-2">
        <div className="text-center text-xs">
          &copy; {new Date().getFullYear()} Home Inspectors California. All
          Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
