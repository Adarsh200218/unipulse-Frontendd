// app/register/page.jsx
"use client";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <section>
       <div className="container mx-auto mt-10">
          <article className="section-wrap page  p-6 ">
      <div className="section-in max-w-3xl mx-auto bg-white shadow-2xl rounded-lg p-6">
        {/* Header */}
        <header className="article-header mb-2  ">
          <h1 className="text-3xl font-bold uppercase  ">
            UNIPULSE Registration
          </h1>
        </header>

        <div className="article-body mb-6 text-gray-700 bg-[#EFEFEF] p-4    ">
          <p className="mb-4">
            By registering with the UNIPULSE group, member-exclusive services will be available. Registration is free.
          </p>
          <ul className="list-disc ml-5 mb-4">
            <li>Download operation manual, external dimensions & application software</li>
            <li>Receive latest info about new products, user cases, and more via newsletter</li>
          </ul>
        </div>


        <form className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              E-mail address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block font-medium mb-1">
              Last name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Your last name"
              required
              className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block font-medium mb-1">
              First name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Your first name"
              required
              className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block font-medium mb-1">
              Company name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Your company"
              required
              className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="6-12 alphanumeric characters"
              required
              className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block font-medium mb-1">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block font-medium mb-1">
              Address (Room / Building / Street) <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Street, Room, Building"
              required
              className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block font-medium mb-1">
              Country <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Your country"
              required
              className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block font-medium mb-1">
              Telephone <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              required
              className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
            >
              REGISTER
            </button>
            <Link
              href="/login"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              CANCEL
            </Link>
          </div>
        </form>
    
        <div className="mt-6 text-gray-600 text-sm">
          <h5 className="font-semibold mb-1">Protection of private information</h5>
          <p className="mb-4">
            We shall carefully manage the private information entered in the Contact form according to our privacy policy. </p>

          <h5 className="font-semibold mb-1">Terms of Service</h5>
          <p className="mb-4">  Please note that we may decline or delete user registration in cases such as ambiguous information, false content, past disqualification, or otherwise deemed inappropriate. 
          </p>
        </div>
        
      </div>
    </article>
       </div>
    </section>
   
  );
}