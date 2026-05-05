// "use client";

// import Link from "next/link";

// export default function CategorySidebar({ categories }) {
//     return (
//         <aside className="w-full lg:w-[380px] bg-white mt-4 lg:p-4 lg:mt-0">
//             <div className="p-6 bg-green-800 text-white rounded">

//                 <h2 className="text-xl font-bold mb-4">Categories</h2>

//                 <div className="flex flex-col gap-2">
//                     {categories.map((item) => (
//                         <Link
//                             key={item.id}
//                             href={`/products/${item.id}`}
//                             className="bg-white text-black px-3 py-2 rounded hover:bg-amber-200"
//                         >
//                             ▸ {item.title}
//                         </Link>
//                     ))}
//                 </div>

//             </div>
//         </aside>
//     );
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "../apis/apiList"; // ✅ FIXED PATH

export default function Home({ categories }) {
    // const [user, setUser] = useState(null);

    // const handleLogin = () => {
    //     setUser({ name: "Pooja" });
    // };

    // const handleRegister = () => {
    //     setUser({ name: "New User" });
    // };

    // const handleLogout = () => {
    //     setUser(null);
    // };

    return (
        <section>
            <div className="flex flex-col lg:flex-row min-h-screen max-w-7xl mx-auto">

                {/* ================= SIDEBAR ================= */}
                <aside className="w-full lg:w-[380px] bg-white mt-4 lg:p-4 lg:mt-0">
                    <div className="lg:sticky lg:top-20 max-h-[calc(100vh-80px)] overflow-auto">

                        <div className="p-6 space-y-6 bg-green-800 text-white rounded">

                            {/* AUTH */}
                            {/* <div className="bg-white text-black p-4 rounded shadow">
                                {!user ? (
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={handleLogin}
                                            className="bg-green-600 text-white py-2 rounded hover:bg-green-800"
                                        >
                                            Login
                                        </button>

                                        <button
                                            onClick={handleRegister}
                                            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-800"
                                        >
                                            Register
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-2">
                                        <p className="font-semibold">{user.name}</p>

                                        <button
                                            onClick={handleLogout}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div> */}

                            {/* DOWNLOAD TEXT */}
                            <div>
                                <h1 className="text-2xl font-bold">Download</h1>
                                <p className="text-sm mt-2">
                                    Our most recent catalogue, manuals and external dimension views can be downloaded.
                                </p>
                            </div>

                            <hr className="border-white/30" />

                            {/* CATEGORY LIST */}
                            <div>
                                <h3 className="text-xl font-semibold mb-3">
                                    List of Download Files
                                </h3>

                                <div className="grid grid-cols-1 gap-2">
                                    {categories.map((item) => (
                                        <Link
                                            key={item.id}
                                            // href={`/product/${item.id}`}
                                            href="/products-list"
                                            className="text-sm font-semibold border border-white/30 px-2 py-1 rounded flex items-center gap-1 bg-white text-black hover:bg-amber-200 transition"
                                        >
                                            ▸ {item.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </aside>

                {/* ================= MAIN CONTENT ================= */}
                <main className="flex-1 p-4 mt-16">

                    <div className="border border-gray-300 rounded bg-white p-6">

                        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                            Product Information
                        </h2>

                        <div className="bg-gray-200 px-4 py-2 mb-6 border-l-4 border-green-700">
                            <h3 className="text-lg font-semibold text-gray-700">
                                Product category
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-14 text-center">

                            {categories.map((item) => (
                                <Link
                                    key={item.id}
                                    // href={`/product/${item.id}`}
                                    href="/products-list"
                                    className="group flex flex-col items-center cursor-pointer border border-gray-200 p-5 rounded-md transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                                >
                                    <img
                                        src={
                                            item.images?.length > 0 && item.images[0]?.image_url
                                                ? `${api.image.imageURL}${item.images[0].image_url}`
                                                : "/images/default.png"
                                        }
                                        alt={item.title}
                                        className="h-20 object-contain mb-4 transition-all duration-300 ease-in-out group-hover:scale-110"
                                    />

                                    <p className="text-sm font-semibold text-green-800 transition-all duration-300 group-hover:text-red-800">
                                        {item.title}
                                    </p>
                                </Link>
                            ))}

                        </div>

                    </div>

                </main>

            </div>
        </section>
    );
}