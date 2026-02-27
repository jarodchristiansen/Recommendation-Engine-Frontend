import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import HeaderIcon from '../../public/images/icons/book-open-svgrepo-com.svg'

const Header = () => {
  const [nav, setNav] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // TODO: Move to centralized location for prefetching client side routes
  useEffect(() => {
    router.prefetch("/recommendations");
    router.prefetch("/auth");
    router.prefetch("/dashboard");
  }, [router]);

  const baseUrl = process.env.BASE_URL || "";

  const links = [
    { id: 1, text: "dashboard", link: "/dashboard" },
    { id: 2, text: "recommendations", link: "/recommendations" },
    // { id: 4, text: "about", link: "/about" },
    // { id: 5, text: "contact", link: "/contact" },
    { id: 3, text: "Sign In/Up", link: "/auth" },
  ];

  return (
    <div
      className="flex justify-between items-center w-full h-20 px-4 text-white bg-primary fixed top-0 z-50"
      data-testid="banner"
    >
      {/* Logo - open book icon for Book Rec */}
      <div>
        <h1 className="text-2xl ml-2">
          <a
            href="/"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
            aria-label="Book Rec home"
          >
            <Image src={HeaderIcon} alt="book icon" />
          </a>
        </h1>
      </div>

      {/* Links - visible on medium+ screens */}
      <ul className="hidden md:flex">
        {links.map(({ id, text, link }, index) => {
          return (
            <li
              key={id}
              className={`px-4 cursor-pointer capitalize font-medium hover:text-accent duration-200 ${index === links.length - 1 ? "font-bold" : "text-gray-400"
                }`}
            >
              <Link
                href={`${baseUrl}${link}`}
                className="outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
              >
                {text}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Hamburger Menu - visible on small screens */}
      <div
        onClick={() => setNav(!nav)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setNav((prev) => !prev);
          }
        }}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
        role="button"
        tabIndex={0}
        aria-expanded={nav}
        aria-label={nav ? "Close menu" : "Open menu"}
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Mobile Menu with transition */}
      <div
        className={`${nav ? "translate-x-0" : "translate-x-full"
          } fixed top-0 right-0 w-full h-screen bg-gradient-to-b from-primary to-slate-900 text-slate-300 transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-center items-center`}
      >
        <nav aria-label="Main">
          <ul className="flex flex-col justify-center items-center">
            {links.map(({ id, link, text }) => {
              const isActive = pathname === link || (link !== "/" && pathname?.startsWith(link));
              return (
                <li key={id} className="px-4 capitalize py-6 text-4xl">
                  <Link
                    onClick={() => setNav(!nav)}
                    href={`${baseUrl}${link}`}
                    className={`outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded ${isActive ? "text-accent font-semibold" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
