import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { id: 1, text: "home", link: "/" },
    { id: 2, text: "dashboard", link: "/dashboard" },
    { id: 3, text: "recommendations", link: "/recommendations" },
    // { id: 4, text: "about", link: "/about" },
    // { id: 5, text: "contact", link: "/contact" },
    { id: 6, text: "Sign In/Up", link: "/auth" },
  ];

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto">
        <nav aria-label="Footer" className="flex flex-col items-center justify-center text-center gap-6 md:flex-row md:gap-8 border-b border-slate-600 pb-6 mb-6">
          {links.map(({ id, text, link }) => (
            <Link
              href={link}
              key={id}
              className="outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded text-slate-300 hover:text-white px-3 py-2 capitalize transition duration-300 ease-in-out min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
            >
              {text}
            </Link>
          ))}
        </nav>

        <div className="text-center text-slate-400">
          <p className="font-semibold text-primary-foreground mb-1">Book Rec</p>
          <p className="text-small">Discover your next read.</p>
          <p className="mt-4">&copy; {currentYear} Book Rec. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
