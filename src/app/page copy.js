"use client";
import Link from "next/link";

import { Omega } from 'lucide-react';


export default function Home() {
  return (

    <>
       <section>
       <div className="flex flex-col lg:flex-row min-h-screen max-w-7xl mx-auto ">

        {/* ================= SIDEBAR ================= */}
        <aside className="w-full lg:w-[400px] bg-white mt-4 lg:p-4 lg:mt-0">
          
          {/* Sticky wrapper */}
          <div className="lg:sticky lg:top-20 max-h-[calc(100vh-80px)] overflow-auto">

            <div className="p-6 space-y-6 bg-green-800 text-white">

              {/* Header */}
              <div>
                <h1 className="text-2xl font-bold">Download</h1>
                <p className="text-sm mt-2">
                 Our most recent catalogue, operation manuals and External dimensions views can be downloaded.
                </p>
              </div>

              <hr className="border-white/30" />

              {/* Categories */}
              <div>
                <h3 className="text-2xl font-semibold mb-3">List of Download Files</h3>

                <div className="grid grid-cols-1 gap-2">
                  {[
                    "Torque meter",
                    "Loadcells",
                    "Displacement measurement",
                  
                    " Amplifier",
                    " Force measurement",
                    "UNISERVO",
                    "Others"

                  ].map((item, i) => (
                    <a
                      key={i}
                      href="#"
                      className="text-sm font-semibold border border-white/30 px-2 py-1 rounded flex items-center gap-1 bg-white text-black transition"
                    >
                      ▸ {item}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        
        <main className="flex-1 p-2 lg:p-4 mt-4">

          <div className="overflow-x-auto">

            {/* Page Heading */}
            <h1 className="text-3xl font-semibold text-gray-800 uppercase ">
              Download
            </h1>

            {/* Section Heading */}
            <h2 className="text-2xl color-green text-white   font-bold px-3 py-2 border border-gray-300 rounded mt-4 uppercase ">
              Torque meter
            </h2>

            {/* TABLE */}
            <table className="w-full border border-gray-300 border-collapse text-sm mt-4 mb-12 shadow-lg ">
              
              {/* HEADER */}
              <thead className="bg-[#b3ffd3]">
                <tr>
                  <th rowSpan="2" className="border p-2 text-left">Product</th>
                  <th rowSpan="2" className="border p-2">Catalogue</th>
                  <th rowSpan="2" className="border p-2">Manual</th>
                  <th colSpan="2" className="border p-2">Price</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>

                {/* Row 1 */}
                <tr className="hover:bg-gray-50">
                  <th className="border p-2 text-left">
                    <Link href="/login" className="hover:underline hover:text-red-500 text-gray-800">
                        UTMⅢ
                    </Link>
                  </th>

                <td className="border p-2 text-center "><Omega className="inline-block" /></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>

                
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-gray-50">
                  <th className="border p-2 text-left">
                    <Link
                      href="/login"
                      className="hover:underline hover:text-red-500 text-gray-800"
                    >
                      UTMⅢ-10K
                    </Link>
                  </th>

                  <td className="border p-2 text-center "><Omega className="inline-block" /></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                 
                </tr>
                  {/* Row 3 */}
                <tr className="hover:bg-gray-50">
                  <th className="border p-2 text-left">
                    <Link
                     href="/login"
                      className="hover:underline hover:text-red-500 text-gray-800"
                    >
                      UTMⅢ(C)(RC)
                    </Link>
                  </th>

                  <td className="border p-2 text-center "><Omega className="inline-block" /></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                 
                </tr>

                  {/* Row 4 */}
                <tr className="hover:bg-gray-50">
                  <th className="border p-2 text-left">
                    <Link
                   href="/login"
                      className="hover:underline hover:text-red-500 text-gray-800"
                    >
                      UTMⅡ/UTMⅡ(R)
                    </Link>
                  </th>

                  <td className="border p-2 text-center "><Omega className="inline-block" /></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                 
                </tr>

                   {/* Row 5 */}
                <tr className="hover:bg-gray-50">
                  <th className="border p-2 text-left">
                    <a
                      href="#"
                      className="hover:underline hover:text-red-500 text-gray-800"
                    >
                      UTMⅡ(W)(WR)
                    </a>
                  </th>

                  <td className="border p-2 text-center "><Omega className="inline-block" /></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                 
                </tr>

              </tbody>
            </table>

               {/* Section Heading */}
            <h2 className="text-2xl font-bold color-green text-white px-3 py-2 border border-gray-300 rounded mt-4">
            LOAD CELL
            </h2>

            {/* TABLE */}
            <table className="w-full border border-gray-300 border-collapse text-sm mt-4 mb-12 shadow-lg ">
              
              {/* HEADER */}
              <thead className="bg-[#b3ffd3]">
                <tr>
                  <th rowSpan="2" className="border p-2 text-left">Product</th>
                  <th rowSpan="2" className="border p-2">Catalogue</th>
                  <th rowSpan="2" className="border p-2">Manual</th>
                  <th colSpan="2" className="border p-2">Price</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>

                {/* Row 1 */}
                <tr className="hover:bg-gray-50">
                  <th className="border p-2 text-left">

                    <Link href="/login" className="hover:underline hover:text-red-500 text-gray-800">
                      UTMⅢ
                    </Link>

                  </th>

             <td className="border p-2 text-center "><Omega className="inline-block" /></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>

                
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-gray-50">
                  <th className="border p-2 text-left">
                    <a
                      href="#"
                      className="hover:underline hover:text-red-500 text-gray-800"
                    >
                      UTMⅢ-10K
                    </a>
                  </th>

                  <td className="border p-2 text-center "><Omega className="inline-block" /></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                 
                </tr>
                  {/* Row 3 */}
                <tr className="hover:bg-gray-50">
                  <th className="border p-2 text-left">
                    <a
                      href="#"
                      className="hover:underline hover:text-red-500 text-gray-800"
                    >
                      UTMⅢ(C)(RC)
                    </a>
                  </th>

                  <td className="border p-2 text-center "><Omega className="inline-block" /></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                 
                </tr>

                  {/* Row 4 */}
                <tr className="hover:bg-gray-50">
                  <th className="border p-2 text-left">
                    <a
                      href="#"
                      className="hover:underline hover:text-red-500 text-gray-800"
                    >
                      UTMⅡ/UTMⅡ(R)
                    </a>
                  </th>

                  <td className="border p-2 text-center "><Omega className="inline-block" /></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                 
                </tr>

                   {/* Row 5 */}
                <tr className="hover:bg-gray-50">
                  <th className="border p-2 text-left">
                    <a href="#"  className="hover:underline hover:text-red-500 text-gray-800" >  UTMⅡ(W)(WR) </a>
                  </th>

                  <td className="border p-2 text-center "><Omega className="inline-block" /></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                  <td className="border p-2 text-center"><Omega  className="inline-block"/></td>
                 
                </tr>

              </tbody>
            </table>
          </div>

        </main>
      </div>
   </section>
    
    </>
 
  );
}
