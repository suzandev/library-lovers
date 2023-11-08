export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-6xl border-t max-xl:px-4">
        <div className="flex items-center justify-between py-4">
          <p className="text-brand-text max-md:text-sm">
            Copyright © {new Date().getFullYear()} library-lovers.com
          </p>
        </div>
      </div>
    </footer>
  );
}
