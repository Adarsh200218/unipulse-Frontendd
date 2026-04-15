"use client";

import Link from "next/link";
import { Omega } from "lucide-react";

export default function Home() {
  const categories = [
    { name: "Torque meter", id: "torque" },
    { name: "Loadcells", id: "loadcell" },
    { name: "Displacement measurement", id: "displacement" },
    { name: "Amplifier", id: "amplifier" },
    { name: "Force measurement", id: "force" },
    { name: "UNISERVO", id: "uniservo" },
    { name: "Others", id: "others" },
  ];

  
  return (
    <>
     
      <section>
        <div className="flex flex-col lg:flex-row min-h-screen max-w-7xl mx-auto">

          {/* ================= SIDEBAR ================= */}
          <aside className="w-full lg:w-[400px] bg-white mt-4 lg:p-4 lg:mt-0">
            <div className="lg:sticky lg:top-20 max-h-[calc(100vh-80px)] overflow-auto">
              <div className="p-6 space-y-6 bg-green-800 text-white">

                <div>
                  <h1 className="text-2xl font-bold">Download</h1>
                  <p className="text-sm mt-2">
                    Our most recent catalogue, operation manuals and External dimensions views can be downloaded.
                  </p>
                </div>

                <hr className="border-white/30" />

                <div>
                  <h3 className="text-2xl font-semibold mb-3">
                    List of Download Files
                  </h3>

                  <div className="grid grid-cols-1 gap-2">
                    {categories.map((item, i) => (
                      <a
                        key={i}
                        href={`#${item.id}`}
                        className="text-sm font-semibold border border-white/30 px-2 py-1 rounded flex items-center gap-1 bg-white text-black hover:bg-amber-200 transition"
                      >
                        ▸ {item.name}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </aside>

          {/* ================= MAIN CONTENT ================= */}
          <main className="flex-1 p-2 lg:p-4 mt-4">

            <h1 className="text-3xl font-semibold text-gray-800 uppercase">
              Download
            </h1>

           
            <h2
              id="torque"
              className="text-2xl bg-green-700 text-white font-bold px-3 py-2 border rounded mt-4 uppercase"
            >
              Torque meter
            </h2>

            <Table />

            {/* ================= LOAD CELL ================= */}
            <h2
              id="loadcell"
              className="text-2xl bg-green-700 text-white font-bold px-3 py-2 border rounded mt-8 uppercase"
            >
              Load Cell
            </h2>

            <Table />

            {/* Dummy Sections (for scroll demo) */}
            <Section id="displacement" title="Displacement measurement" />
            <Section id="amplifier" title="Amplifier" />
            {/*<Section id="force" title="Force measurement" />*/}
            {/*<Section id="uniservo" title="UNISERVO" />*/}
            {/*<Section id="others" title="Others" />*/}

          </main>
        </div>
      </section>
    </>
  );
}

function Table() {
  return (
    <table className="w-full border border-gray-300 border-collapse text-sm mt-4 mb-12 shadow-lg">
      <thead className="bg-[#b3ffd3]">
        <tr>
          <th className="border p-2 text-left">Product</th>
          <th className="border p-2">Catalogue</th>
          <th className="border p-2">Manual</th>
          <th className="border p-2">Price</th>
        </tr>
      </thead>

      <tbody>
        {["UTMⅢ", "UTMⅢ-10K", "UTMⅢ(C)(RC)", "UTMⅡ/UTMⅡ(R)", "UTMⅡ(W)(WR)"].map(
          (item, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <th className="border p-2 text-left">
                <Link
                  href="/login"
                  className="hover:underline hover:text-red-500 text-gray-800"
                >
                  {item}
                </Link>
              </th>

              <td className="border p-2 text-center">
                <Omega className="inline-block" />
              </td>
              <td className="border p-2 text-center">
                <Omega className="inline-block" />
              </td>
              <td className="border p-2 text-center">
                <Omega className="inline-block" />
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}


function Section({ id, title }) {
  return (
    <div id={id} className="mt-10">
      <h2 className="text-2xl bg-green-700 text-white font-bold px-3 py-2 rounded uppercase">
        {title}
      </h2>
     <table className="w-full border border-gray-300 border-collapse text-sm mt-4 mb-12 shadow-lg">
      <thead className="bg-[#b3ffd3]">
        <tr>
          <th className="border p-2 text-left">Product</th>
          <th className="border p-2">Catalogue</th>
          <th className="border p-2">Manual</th>
          <th className="border p-2">Price</th>
        </tr>
      </thead>
      
      <tbody>
        {["UTMⅢ", "UTMⅢ-10K", "UTMⅢ(C)(RC)", "UTMⅡ/UTMⅡ(R)", "UTMⅡ(W)(WR)"].map(
          (item, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <th className="border p-2 text-left">
                <Link
                  href="/login"
                  className="hover:underline hover:text-red-500 text-gray-800"
                >
                  {item}
                </Link>
              </th>

              <td className="border p-2 text-center">
                <Omega className="inline-block" />
              </td>
              <td className="border p-2 text-center">
                <Omega className="inline-block" />
              </td>
              <td className="border p-2 text-center">
                <Omega className="inline-block" />
              </td>
            </tr>
          )
        )}
        
      </tbody>


    </table>
    </div>
  );
}

