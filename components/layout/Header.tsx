// import { link } from "fs";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [nav, setNav] = useState(false);

  const baseUrl = process.env.BASE_URL || "";

  const links = [
    { id: 1, text: "home", link: "/" },
    { id: 2, text: "about", link: "/about" },
    { id: 3, text: "dashboard", link: "/dashboard" },
    { id: 4, text: "recommendations", link: "/recommendations" },
    { id: 5, text: "contact", link: "/contact" },
    { id: 6, text: "Sign In/Up", link: "/auth" },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed top-0 z-50">
      {/* Logo Section */}
      <div>
        <h1 className="text-5xl ml-2">
          <a
            className="underline hover:decoration-black"
            href="#"
            target="_blank"
            rel="noreferrer"
          >
            Logo
          </a>
        </h1>
      </div>

      {/* Links - visible on medium+ screens */}
      <ul className="hidden md:flex">
        {links.map(({ id, text, link }) => {
          console.log({ baseUrl, link });
          return (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200"
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
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>
      {/* Mobile Menu */}
      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link, text }) => (
            <li key={id} className="px-4 capitalize py-6 text-4xl">
              <Link
                onClick={() => setNav(!nav)}
                href={`${baseUrl || "https://spotrec.vercel.app/"}/${link}`}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Header;
