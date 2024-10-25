import Image from "next/legacy/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import logoImage from "../../public/images/logo.png";

const Header = () => {
  const [nav, setNav] = useState(false);

  const baseUrl = process.env.BASE_URL || "";

  const links = [
    { id: 1, text: "home", link: "/" },
    { id: 2, text: "dashboard", link: "/dashboard" },
    { id: 3, text: "recommendations", link: "/recommendations" },
    // { id: 4, text: "about", link: "/about" },
    // { id: 5, text: "contact", link: "/contact" },
    { id: 6, text: "Sign In/Up", link: "/auth" },
  ];

  return (
    <div
      className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed top-0 z-50"
      data-testid="banner"
    >
      {/* Logo Section */}
      <div>
        <h1 className="text-5xl ml-2">
          <a
            className="underline hover:decoration-black"
            href="/"
            rel="noreferrer"
          >
            <Image src={logoImage} height={50} width={50} alt="logo image" />
          </a>
        </h1>
      </div>

      {/* Links - visible on medium+ screens */}
      <ul className="hidden md:flex">
        {links.map(({ id, text, link }, index) => {
          return (
            <li
              key={id}
              className={`px-4 cursor-pointer capitalize font-medium hover:scale-105 hover:text-white duration-200 ${
                index === links.length - 1 ? "font-extrabold" : "text-gray-400"
              }`}
            >
              <Link href={`${baseUrl}${link}`}>{text}</Link>
            </li>
          );
        })}
      </ul>

      {/* Hamburger Menu - visible on small screens */}
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
        role="button"
        tabIndex={0}
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Mobile Menu with transition */}
      <div
        className={`${
          nav ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500 transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-center items-center`}
      >
        <ul className="flex flex-col justify-center items-center">
          {links.map(({ id, link, text }) => (
            <li key={id} className={`px-4 capitalize py-6 text-4xl`}>
              <Link
                onClick={() => setNav(!nav)}
                href={`${baseUrl || "https://spotrec.vercel.app/"}/${link}`}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
