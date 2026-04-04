import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { id: 1, text: "Home", link: "/" },
    { id: 2, text: "Dashboard", link: "/dashboard" },
    { id: 3, text: "Recommendations", link: "/recommendations" },
    { id: 6, text: "Sign In / Up", link: "/auth" },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-10 border-b border-slate-700">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="font-bold text-lg text-primary-foreground mb-2">Book Rec</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Discover reads that genuinely match your taste—with a plain-English explanation for every pick.
            </p>
            {/* Powered by badge */}
            <a
              href="https://openlibrary.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-xs text-slate-500 hover:text-slate-300 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              aria-label="Powered by Open Library"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              Powered by Open Library
            </a>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Navigation</p>
            {links.map(({ id, text, link }) => (
              <Link
                href={link}
                key={id}
                className="text-slate-400 hover:text-white text-sm transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded w-fit"
              >
                {text}
              </Link>
            ))}
          </nav>

          {/* Trust note */}
          <div className="max-w-xs">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Our promise</p>
            <ul className="space-y-2">
              {[
                "Free service, no hidden tiers",
                "No data stored or sold",
                "No account required to start",
                "Open catalog, transparent picks",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                  <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-xs">
          <p>&copy; {currentYear} Book Rec. All rights reserved.</p>
          <p>Discover your next read.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
