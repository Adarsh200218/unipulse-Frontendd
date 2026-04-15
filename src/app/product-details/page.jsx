"use client";
import Image from "next/image";

import ProductMenu from "../component/product-menu";

const products = [
  {
    title: "UTM III",
    subtitle: "Slip-ring-less rotating torque meter",
    img: "/images/p1.png",
    desc: [
      "5 times more responsive than UTM II, detect torque and output faster.",
      "Slimmer body & noise resistance digital output added.",
      "New model UTMIII! High functionality with 1/10000 resolution & 500% safe overload!",
    ],
  },
  {
    title: "UTM III (R)(H)",
    subtitle: "Rotary encoder option for UTMIII series",
    img: "/images/p1.png",
    desc: [
      "5 times more responsive than UTM II.",
      "Optical encoder 3600 C/T suitable for torque measurement.",
      "Max rotation speed is 5000 rpm (R), 25000 rpm (H).",
    ],
  },
  {
    title: "UTM III (C)(RC)",
    subtitle: "Centering location type rotating torque meter",
    img: "/images/p1.png",
    desc: [
      "New installation option of UTMIII!",
      "New type for firm usage & fix torque meter!",
    ],
  },
  {
    title: "UTM II / UTM II (R)",
    subtitle: "Slip-ring-less rotating torque meter",
    img: "/images/p1.png",
    desc: [
      "Maintenance-free rotating torque meter.",
      "Analogue bandwidth 1 kHz.",
      "Wide measurement range up to 10000 Nm.",
    ],
  },
];

export default function Page() {
  return (
<section>
      <div className="bg-[#efefef] min-h-screen text-[13px] text-gray-700 mt-14">
      <div className="max-w-7xl mx-auto flex gap-6 py-6 px-4">

        {/* ================= LEFT SIDEBAR ================= */}

        <ProductMenu/>



        {/*<aside className="w-[330px]">

       
          <div className="flex border mb-3 bg-white">
            <input
              type="text"
              placeholder="Product Search"
              className="flex-1 px-2 py-1 outline-none text-xs"
            />
            <button className="px-3 border-l bg-gray-100">🔍</button>
          </div>

     
          <div className="border bg-white">
            <div className="bg-gray-200 px-3 py-2 font-semibold border-b">
              Torque meter
            </div>

            <div className="border-b">
              <div className="px-3 py-2 bg-gray-300 font-medium">
                Shaft type
              </div>
              <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                Coupling
              </div>
              <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                Torque monitor
              </div>
            </div>

            {[
              "Loadcells",
              "Displacement measurement",
              "Weighing measurement",
              "Force measurement",
              "Amplifiers",
              "Peripherals",
              "Others",
            ].map((item, i) => (
              <div
                key={i}
                className="px-3 py-2 border-t hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>

        
          <div className="mt-3">
            <button className="w-full border bg-white py-2 text-xs hover:bg-gray-50">
              Obsolete Products
            </button>
          </div>
        </aside>*/}

        {/* ================= RIGHT CONTENT ================= */}
        <div className="flex-1">

          {/* GREEN TITLE BAR */}
          <div className="bg-[#1f4d1f] text-white px-4 py-2 font-semibold mb-4">
            Shaft type
          </div>

          {/* PRODUCT LIST */}
          <div className="space-y-5">
            {products.map((item, index) => (
              <div
                key={index}
                className="bg-white border p-4 flex gap-5"
              >
                {/* IMAGE */}
                <div className="w-[140px] flex items-center justify-center">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>

                {/* TEXT */}
                <div className="flex-1">
                  <p className="text-[14px] text-gray-500 mb-1">
                    {item.subtitle}
                  </p>

                  <h3 className="text-[20px] font-semibold mb-2 text-gray-800">
                    {item.title}
                  </h3>

                  <ul className="space-y-1 text-[14px] leading-relaxed">
                    {item.desc.map((d, i) => (
                      <li key={i}>＊ {d}</li>
                    ))}
                  </ul>

                  <div className="text-right mt-2">
                    <button className="text-green-700 text-xs hover:underline">
                      › read more
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
</section>
  );
}