"use client";

import { useEffect, useState } from "react";
import { Omega } from "lucide-react";
import { useRouter } from "next/navigation";
import { slugify, useAdminGuardAdmin } from "../../helper/getCommonData";
import { api } from "../apis/apiList";
import {
    getToken,
    removeToken,
    removeUser,
    getUser,
} from "../../helper/getCommonData";

export default function HomeClient({ categories, products }) {
    useAdminGuardAdmin();

    const [user, setUserState] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const u = getUser();
        const token = getToken();
        if (u && token) setUserState(u);
        else setUserState(null);
    }, []);

    const handleLogout = () => {
        removeToken();
        removeUser();
        setUserState(null);
        router.push("/");
    };

    return (
        <section>
            <div className="flex flex-col lg:flex-row min-h-screen max-w-7xl mx-auto">

                {/* SIDEBAR */}
                <aside className="w-full lg:w-[400px] bg-white mt-4 lg:p-4 lg:mt-0">
                    <div className="lg:sticky lg:top-20 max-h-[calc(100vh-80px)] overflow-auto">
                        <div className="p-6 space-y-6 bg-green-800 text-white">

                            {/* LOGIN */}
                            <div className="bg-white text-black p-4 rounded shadow">
                                {!user ? (
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => router.push("/login")}
                                            className="bg-green-600 text-white py-2 rounded hover:bg-green-800 cursor-pointer"
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => router.push("/register")}
                                            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-800 cursor-pointer"
                                        >
                                            Register
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-2">
                                        <p className="font-semibold mt-2">Welcome</p>
                                        <p className="">{user.name}</p>
                                        <button
                                            onClick={handleLogout}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* CATEGORY LIST */}
                            <div>
                                <h3 className="text-2xl font-semibold mb-3">
                                    List of Download Files
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {categories.map((item) => (
                                        <a
                                            key={item.id}
                                            // href={`#${item.id}`}
                                            href={`#${slugify(item.title)}`}
                                            className="text-sm font-semibold border px-2 py-1 rounded bg-white text-black hover:bg-amber-200"
                                        >
                                            ▸ {item.title}
                                        </a>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </aside>

                {/* MAIN */}
                <main className="flex-1 p-2 lg:p-4 mt-4">
                    <h1 className="text-3xl font-semibold text-gray-800 uppercase">
                        Download
                    </h1>

                    {categories.map((cat) => (
                        <Section
                            key={cat.id}
                            id={cat.id}
                            title={cat.title}
                            products={products.filter(
                                (p) => Number(p.category_id) === Number(cat.id)
                            )}
                        />
                    ))}
                </main>

            </div>
        </section>
    );
}

/* ================= SECTION ================= */  ///// Scroll hota hai yeh category list par dabane se products table par scroll hota hai category kai according

function Section({ id, title, products }) {
    return (
        // <div id={id} className="mt-10">
        // <div id={id} className="mt-10 scroll-mt-24">
        <div id={slugify(title)} className="mt-10 scroll-mt-24">
            <h2 className="bg-green-700 text-white p-2">{title}</h2>
            <Table products={products} />
        </div>
    );
}

/* ================= TABLE ================= */

function Table({ products }) {
    const router = useRouter();
    const [modal, setModal] = useState(null); // { type, data, loading, error }
    const [downloading, setDownloading] = useState(false);

    const handleClick = async (type, productId) => {
        const token = getToken();

        if (!token) {
            localStorage.setItem(
                "action_after_login",
                JSON.stringify({ type, productId })
            );
            router.push("/login");
            return;
        }

        // Turant modal open karo loader ke saath
        setModal({ type, data: null, loading: true, error: false });

        try {
            await fetch(api.apiCall.saveProductQuery, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_id: productId,
                    catalogue: type === "catalogue" ? 1 : 0,
                    manual: type === "manual" ? 1 : 0,
                    price: type === "price" ? 1 : 0,
                }),
            });

            const res = await fetch(
                `${api.apiCall.productView}/${type}/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );

            if (res.status === 401) {
                removeToken();
                removeUser();
                router.push("/login");
                return;
            }

            const data = await res.json();
            setModal({ type, data: data.data, loading: false, error: false });
        } catch (err) {
            console.error("Error:", err);
            setModal({ type, data: null, loading: false, error: true });
        }
    };

    useEffect(() => {
        const stored = localStorage.getItem("action_after_login");
        if (stored && getToken()) {
            const action = JSON.parse(stored);
            handleClick(action.type, action.productId);
            localStorage.removeItem("action_after_login");
        }
    }, []);

    const handleDownload = async (id) => {
        const token = getToken();
        setDownloading(true);

        try {
            const res = await fetch(`${api.apiCall.downloadManual}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "product.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <>
            <table className="w-full border text-sm mt-4 mb-12 shadow">
                <thead className="bg-green-200">
                    <tr>
                        <th className="border p-2 text-left">Product</th>
                        <th className="border p-2">Catalogue</th>
                        <th className="border p-2">Manual</th>
                        <th className="border p-2">Price</th>
                    </tr>
                </thead>

                <tbody>
                    {products.length > 0 ? (
                        products.map((item) => (
                            <tr key={item.id}>
                                <td className="border p-2">{item.product_name}</td>

                                <td className="border p-2 cursor-pointer">
                                    <div className="flex justify-center items-center">
                                        <Omega onClick={() => handleClick("catalogue", item.id)} />
                                    </div>
                                </td>

                                <td className="border p-2 cursor-pointer">
                                    <div className="flex justify-center items-center">
                                        <Omega onClick={() => handleClick("manual", item.id)} />
                                    </div>
                                </td>

                                <td className="border p-2 cursor-pointer">
                                    <div className="flex justify-center items-center">
                                        <Omega onClick={() => handleClick("price", item.id)} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center p-3">
                                No products found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* MODAL */}
            {modal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl space-y-4">

                        {modal.loading ? (
                            /* ── LOADER ── */
                            <div className="flex flex-col items-center justify-center py-8 space-y-3">
                                <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
                                <p className="text-sm text-gray-400">Please wait...</p>
                            </div>
                        ) : modal.error ? (
                            /* ── ERROR ── */
                            <div className="text-center py-6 text-red-500">
                                <p>Please Try Again</p>
                            </div>
                        ) : (
                            /* ── DATA ── */
                            <>
                                <h2 className="text-xl font-bold text-green-700">
                                    {modal.data.product_name}
                                </h2>

                                {modal.type === "price" && (
                                    <p className="text-3xl text-green-600 text-center">
                                        ₹{modal.data.price}
                                    </p>
                                )}

                                {modal.type === "catalogue" && (
                                    <a
                                        href={modal.data.catalogue_link}
                                        target="_blank"
                                        onClick={() => setModal(null)}

                                        className="block text-center bg-green-600 text-white px-5 py-2 rounded"
                                    >
                                        View Catalogue →
                                    </a>
                                )}

                                {modal.type === "manual" && (
                                    <button
                                        onClick={() => {
                                            setModal(null);           // 👈 modal close
                                            handleDownload(modal.data.download_id); // 👈 download start
                                        }}

                                        disabled={downloading}
                                        className="w-full bg-green-600 text-white px-5 py-2 rounded"
                                    >
                                        {downloading ? "Downloading..." : "Download Manual"}
                                    </button>
                                )}
                            </>
                        )}

                        {/* Close button hamesha visible */}
                        <button
                            onClick={() => setModal(null)}
                            className="w-full border py-2 rounded text-gray-600"
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}
        </>
    );
}