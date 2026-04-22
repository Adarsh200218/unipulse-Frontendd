"use client";
import { useState } from "react";

const menuData = [
  {
    title: "Torque meter",
    children: ["Shaft type", "Coupling", "Torque monitor"],
  },
  {
    title: "Loadcells",
    children: [
      "High Accuracy Type",
      "Compact Compression Type",
      "Compression Type",
      "Press Fitting Type",
      "Tension / Compression Type",
      "Tension Type",
      "Beam Type",
      "Single Point Type",
      "Multi Axis Force Sensor",
    ],
  },
  {
    title: "Displacement measurement",
    children: [
      "Electrostatic capacitive",
      "FIBER OPTICS",
      "Digital Contact Sensor",
    ],
  },
  {
    title: "Weighing measurement",
    children: [
      "Standard Type",
      "Control Function Type",
      "Loadcell Interface for PLC",
    ],
  },
  {
    title: "Force measurement",
    children: [
      "NUMERICAL DISPLAY TYPE",
      "Waveform Display Type",
      "PORTABLE TYPE",
    ],
  },
  {
    title: "Amplifiers",
    children: [
      "DC Amplifiers",
      "Loadcell Converters",
    ],
  },
  {
    title: "Peripherals",
    children: ["Printers", "External Displays", "Junction box"],
  },
  {
    title: "Others",
    children: [],
  },
];

export default function Sidebar() {
  const [openIndex, setOpenIndex] = useState(0); // default open
  const [activeItem, setActiveItem] = useState("Shaft type");

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <aside className="w-[330px]">

      {/* SEARCH */}
      <div className="flex border mb-3 bg-white">
        <input
          type="text"
          placeholder="Product Search"
          className="flex-1 px-2 py-1 outline-none text-xs "
        />
        <button className="px-3 border-l bg-gray-100">🔍</button>
      </div>

      {/* MENU */}
      <div className="bg-white border">

        {menuData.map((menu, index) => (
          <div key={index} className="border-b">

            {/* PARENT */}
            <div
              onClick={() => toggleMenu(index)}
              className={`flex justify-between items-center px-3 py-2 cursor-pointer font-bold
              ${openIndex === index ? "bg-gray-300" : "bg-gray-200"}`}
            >
              {menu.title}
              <span className="text-xs">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>

            {/* CHILDREN */}
            {openIndex === index && menu.children.length > 0 && (
              <div className="bg-white">
                {menu.children.map((child, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveItem(child)}
                    className={`px-4 py-2 text-sm cursor-pointer border-t
                    ${activeItem === child
                        ? "bg-green-100 text-green-700 font-medium"
                        : "hover:bg-gray-100"
                      }`}
                  >
                    {child}
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}

      </div>

      {/* BUTTON */}
      <div className="mt-3">
        <button className="w-full border bg-white py-2 text-xs hover:bg-gray-50">
          Obsolete Products
        </button>
      </div>
    </aside>
  );
}