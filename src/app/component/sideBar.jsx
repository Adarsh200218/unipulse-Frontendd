// "use client";

// import { removeToken, removeUser, useAuthGuard } from "../../helper/getCommonData";
// import { useRouter } from "next/navigation";

// export default function Sidebar({ activeTab, setActiveTab }) {
//     useAuthGuard();

//     const router = useRouter();


//     const handleLogout = () => {
//         removeToken();
//         removeUser();

//         router.push("/login"); // redirect to login
//     };

//     return (
//         <aside className="w-full lg:w-[400px] mt-4 lg:p-4 lg:mt-0">
//             <div className="p-6 bg-green-800 text-white h-[80vh] flex flex-col justify-between rounded-lg">

//                 {/* TOP */}
//                 <div>
//                     <h1 className="text-2xl font-bold mb-8">
//                         DashBoard
//                     </h1>

//                     <div className="space-y-4">

//                         {/* CATEGORY */}
//                         <div
//                             onClick={() => setActiveTab("category")}
//                             className={`text-sm font-semibold border px-2 py-3 rounded cursor-pointer transition ${activeTab === "category"
//                                 ? "bg-green-600 text-black"
//                                 : "bg-white text-black hover:bg-amber-200"
//                                 }`}
//                         >
//                             ▸ Category
//                         </div>

//                         {/* PRODUCT */}
//                         <div
//                             onClick={() => setActiveTab("product")}
//                             className={`text-sm font-semibold border px-2 py-3 rounded cursor-pointer transition ${activeTab === "product"
//                                 ? "bg-green-600 text-black"
//                                 : "bg-white text-black hover:bg-amber-200"
//                                 }`}
//                         >
//                             ▸ Product
//                         </div>

//                     </div>
//                 </div>

//                 {/* BOTTOM (LOGOUT) */}
//                 <div className="mt-6">
//                     <button
//                         onClick={handleLogout}
//                         className="w-full text-sm font-semibold border border-white/30 px-2 py-3 rounded bg-red-500 hover:bg-red-600 text-white transition"
//                     >
//                         Logout
//                     </button>
//                 </div>

//             </div>
//         </aside>
//     );
// }



// // "use client";

// // import { useRouter, usePathname } from "next/navigation";
// // import { removeToken, removeUser, useAuthGuard } from "../../helper/getCommonData";

// // export default function Sidebar() {
// //     useAuthGuard();

// //     const router = useRouter();
// //     const pathname = usePathname();

// //     const handleLogout = () => {
// //         removeToken();
// //         removeUser();
// //         router.push("/login");
// //     };

// //     const isActive = (path) => pathname.startsWith(path);

// //     return (
// //         <aside className="w-[300px] h-screen sticky top-0 p-4">
// //             <div className="p-6 bg-green-800 text-white h-full flex flex-col justify-between rounded-lg">

// //                 {/* TOP */}
// //                 <div>
// //                     <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

// //                     <div className="space-y-4">

// //                         <div
// //                             onClick={() => router.push("/dashboard/category")}
// //                             className={`px-3 py-2 rounded cursor-pointer transition ${isActive("/dashboard/category")
// //                                     ? "bg-green-600 text-black"
// //                                     : "bg-white text-black hover:bg-amber-200"
// //                                 }`}
// //                         >
// //                             ▸ Category
// //                         </div>

// //                         <div
// //                             onClick={() => router.push("/dashboard/product")}
// //                             className={`px-3 py-2 rounded cursor-pointer transition ${isActive("/dashboard/product")
// //                                     ? "bg-green-600 text-black"
// //                                     : "bg-white text-black hover:bg-amber-200"
// //                                 }`}
// //                         >
// //                             ▸ Product
// //                         </div>

// //                     </div>
// //                 </div>

// //                 {/* LOGOUT */}
// //                 <button
// //                     onClick={handleLogout}
// //                     className="w-full px-3 py-2 bg-red-500 hover:bg-red-600 rounded"
// //                 >
// //                     Logout
// //                 </button>

// //             </div>
// //         </aside>
// //     );
// // }


"use client";

import { removeToken, removeUser, useAuthGuard } from "../../helper/getCommonData";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
    useAuthGuard();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        removeToken();
        removeUser();
        router.push("/");
    };

    return (
        <aside className="w-full lg:w-[400px] mt-4 lg:p-4 lg:mt-0">
            <div className="p-6 bg-green-800 text-white h-[80vh] flex flex-col justify-between rounded-lg">

                <div>
                    <h1 className="text-2xl font-bold mb-8">DashBoard</h1>

                    <div className="space-y-4">

                        <div
                            onClick={() => router.push("/dashboard/category")}
                            className={`text-sm font-semibold border px-2 py-3 rounded cursor-pointer transition ${pathname.startsWith("/dashboard/category")
                                ? "bg-green-600 text-black"
                                : "bg-white text-black hover:bg-amber-200"
                                }`}
                        >
                            ▸ Category
                        </div>

                        <div
                            onClick={() => router.push("/dashboard/product-page")}
                            className={`text-sm font-semibold border px-2 py-3 rounded cursor-pointer transition ${pathname.startsWith("/dashboard/product-page")
                                ? "bg-green-600 text-black"
                                : "bg-white text-black hover:bg-amber-200"
                                }`}
                        >
                            ▸ Product
                        </div>

                        <div
                            onClick={() => router.push("/dashboard/register-user")}
                            className={`text-sm font-semibold border px-2 py-3 rounded cursor-pointer transition ${pathname.startsWith("/dashboard/register-user")
                                ? "bg-green-600 text-black"
                                : "bg-white text-black hover:bg-amber-200"
                                }`}
                        >
                            ▸ Registerd Users
                        </div>

                        <div
                            onClick={() => router.push("/dashboard/product-inquery")}
                            className={`text-sm font-semibold border px-2 py-3 rounded cursor-pointer transition ${pathname.startsWith("/dashboard/product-inquery")
                                ? "bg-green-600 text-black"
                                : "bg-white text-black hover:bg-amber-200"
                                }`}
                        >
                            ▸ Product Inquery
                        </div>

                    </div>
                </div>

                <div className="mt-6 space-y-3">

                    <button
                        onClick={handleLogout}
                        className="w-full text-sm font-semibold border border-white/30 px-2 py-3 rounded bg-red-500 hover:bg-red-600 text-white transition"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </aside>
    );
}