"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
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

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/download" className="hover:text-gray-200">
              Torque Meter
            </Link>
            <Link href="/product-details" className="hover:text-gray-200">
              Electrical Intelligent Assist Balancer
            </Link>
            <Link href="#" className="hover:text-gray-200">
              Loadcells
            </Link>
            <Link href="#" className="hover:text-gray-200">
              Weighing Measurement
            </Link>
            <Link href="#" className="hover:text-gray-200">
              Force Measurement
            </Link>
            <Link href="#" className="hover:text-gray-200">
              Displacement Measurement
            </Link>
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
        <div
          className={`md:hidden bg-green-800 px-6 overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 py-4" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-4 text-sm font-medium">
            <Link href="#" onClick={() => setIsOpen(false)}>Torque Meter</Link>
            <Link href="#" onClick={() => setIsOpen(false)}>Electrical Intelligent Assist Balancer</Link>
            <Link href="#" onClick={() => setIsOpen(false)}>Loadcells</Link>
            <Link href="#" onClick={() => setIsOpen(false)}>Weighing Measurement</Link>
            <Link href="#" onClick={() => setIsOpen(false)}>Force Measurement</Link>
            <Link href="#" onClick={() => setIsOpen(false)}>Displacement Measurement</Link>
          </nav>
        </div>
      </header>

     
    </>
  );
}