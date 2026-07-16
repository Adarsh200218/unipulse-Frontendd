"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { slugify } from "../../helper/getCommonData";


export default function Header({ categories = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-green-900 text-white shadow-md">
        <div className="max-w-8xl mx-auto flex items-center justify-between px-6 py-3">

          {/* Logo */}
          <div className="flex items-center">

            <Link href="/"><Image
              src="/logo.png"
              alt="logo"
              width={160}
              height={45}
              priority
            /></Link>

          </div>

          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/products-list#${slugify(cat.title)}`}
                className="hover:text-gray-200"
              >
                {cat.title}
              </Link>
            ))}

            <Link href="/contact-us" className="inline-block bg-[#e10c13] text-white text-sm px-4 py-2 rounded-md border border-[#0b3445] shadow-sm hover:bg-[#116459] transition duration-300"> Contact Us</Link>


          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden flex flex-col gap-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-green-800 px-6 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 py-4" : "max-h-0"}`}
        >
          <nav className="flex flex-col gap-4 text-sm font-medium">

            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/products-list#${slugify(cat.title)}`}
                onClick={() => setIsOpen(false)}
              >
                {cat.title}
              </Link>
            ))}

            <Link
              href="/"
              className="hover:text-gray-200">
              Electrical Intelligent
              Assist balancer
            </Link>

          </nav>
        </div>
      </header >

      {/*<ContactButtonright />*/}
    </>
  );
}



