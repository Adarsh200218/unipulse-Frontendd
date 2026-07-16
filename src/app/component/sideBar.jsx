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
            <div className="p-4 lg:p-4 bg-green-800 text-white h-100vh flex flex-col justify-between rounded-lg">

                <div>
                    <h1 className="text-2xl font-bold lg:mb-4 mb-4">DashBoard</h1>

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


                        <div
                            onClick={() => router.push("/dashboard/requested-proposal")}
                            className={`text-sm font-semibold border px-2 py-3 rounded cursor-pointer transition ${pathname.startsWith("/dashboard/requested-proposal")
                                ? "bg-green-600 text-black"
                                : "bg-white text-black hover:bg-amber-200"
                                }`}
                        >
                            ▸ Requested Proposal
                        </div>


                        <div
                            onClick={() => router.push("/dashboard/homepage-content")}
                            className={`text-sm font-semibold border px-2 py-3 rounded cursor-pointer transition ${pathname.startsWith("/dashboard/homepage-content")
                                ? "bg-green-600 text-black"
                                : "bg-white text-black hover:bg-amber-200"
                                }`}
                        >
                            ▸ Homepage Content
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