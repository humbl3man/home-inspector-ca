export function Footer() {
  return (
    <footer className="bg-orange-100">
      <div className="mx-auto max-w-7xl py-4 px-2">
        <div className="text-center text-xs text-orange-900">
          &copy; {new Date().getFullYear()} Home Inspectors California. All
          Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
