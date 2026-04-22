// "use client";

// import { useState } from "react";
// import CategoryListPage from "../category/page";
// import ProductListPage from "../product-page/page";
// import Link from "next/link";
// import Sidebar from "../component/sideBar";
// import { useAuthGuard } from "../../helper/getCommonData";

// export default function Home() {
//     useAuthGuard

//     const [activeTab, setActiveTab] = useState("category");

//     return (
//         <>
//             <section className="bg-gray-100 relative min-h-screen py-30 px-15">

//                 <div className="flex max-w-full mx-auto gap-5">

//                     {/* ================= SIDEBAR ================= */}
//                     <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//                     {/* ================= MAIN ================= */}
//                     <main className="flex-1 p-6">

//                         {/* 🔥 HEADER */}
//                         <div className="flex justify-between items-center mb-2">

//                             <h2 className="text-2xl font-semibold text-white bg-green-700 px-4 py-2">
//                                 {activeTab === "category"
//                                     ? "Category Management"
//                                     : "Product Management"}
//                             </h2>

//                             {activeTab === "category" ? (
//                                 <Link href="/category/add" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow">
//                                     + Add Category
//                                 </Link>
//                             ) : (
//                                 <Link href="/product-page/add"
//                                     className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow">
//                                     + Add Product
//                                 </Link>
//                             )}

//                         </div>

//                         {/* 🔥 CARD WRAPPER */}
//                         <div className="">

//                             {activeTab === "category" && <CategoryListPage />}
//                             {activeTab === "product" && <ProductListPage />}

//                         </div>

//                     </main>

//                 </div>
//             </section>


//         </>
//     );
// }


"use client";

import CategoryListPage from "./category/page";
import { useAuthGuard, useAdminGuard } from "../../helper/getCommonData";

export default function Home() {
    useAuthGuard();
    useAdminGuard();

    return <CategoryListPage />;
}