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
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto ">
        {/* Main Navigation Links */}
        <div className="flex flex-col items-center justify-center text-center gap-6 md:flex-row md:gap-8 border-b border-gray-700 pb-4 mb-4">
          {links.map(({ id, text, link }) => (
            <Link href={link} key={id}>
              <span className="text-gray-400 hover:text-white px-3 py-2 capitalize transition duration-300 ease-in-out">
                {text}
              </span>
            </Link>
          ))}
        </div>

        {/* Copyright Info */}
        <div className="text-center text-gray-400">
          <p>&copy; {currentYear} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
