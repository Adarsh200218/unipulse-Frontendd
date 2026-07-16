"use client";

import { useEffect, useState } from "react";
import { Omega, SquarePen } from "lucide-react";
import { Lock } from 'lucide-react';
import { useRouter } from "next/navigation";
import { slugify, useAdminGuardAdmin } from "../../helper/getCommonData";
import { api } from "../apis/apiList";
import Link from "next/link";
import ContactButtonright from "./ContactButtonright";

import {
    getToken,
    removeToken,
    removeUser,
    getUser,
} from "../../helper/getCommonData";
import CategorySideBar from "../component/CategorySideBar";
import { ChevronsRight } from "lucide-react";

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
        <>

            <section className="pt-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6  md:grid-cols-12 ">


                        {/* SideBar */}
                        <CategorySideBar categories={categories}
                            hrefFn={(item) => `#${slugify(item.title)}`} />

                        {/* MAIN */}
                        {/*<main className="md:col-span-8 lg:col-span-8 xl:col-span-9 space-y-4 px-4 lg:px-2  lg:p-4  xl:mt-10">
                            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800 uppercase">
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
                        </main>*/}

                        <main
                            className="
        md:col-span-8
        lg:col-span-8
        xl:col-span-8
        
        px-3
        sm:px-4
        lg:px-5
        py-2

        
    "
                        >
                            {/* Header */}
                            <div className="mb-4 xl:mt-12">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <div>
                                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                                            Download
                                        </h1>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Browse and download catalogues, manuals and technical documents.
                                        </p>
                                    </div>

                                    {/*<div className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                {categories.length} Categories
            </div>*/}
                                </div>

                                <div className="h-px bg-gray-200 mt-3" />
                            </div>

                            {/* Categories */}
                            <div className="space-y-3">
                                {categories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        className="
                    bg-white
                    rounded-xl
                    border
                    border-gray-100
                    
                    
                    transition-all
                    duration-300
                "
                                    >
                                        <Section
                                            id={cat.id}
                                            title={cat.title}
                                            products={products.filter(
                                                (p) => Number(p.category_id) === Number(cat.id)
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        </main>

                    </div>
                </div>
            </section>
            <ContactButtonright />



        </>
    );
}

/* ================= SECTION ================= */
function Section({ id, title, products }) {
    return (
        <div id={slugify(title)} className="mt-2 scroll-mt-24">
            <h2 className="bg-green-700 text-white p-1 lg:text-xl px-2 text-[16px] ">{title}</h2>
            <Table products={products} />
        </div>
    );
}

/* ================= TABLE ================= */
function Table({ products }) {
    const router = useRouter();
    const [modal, setModal] = useState(null);
    const [downloading, setDownloading] = useState(false);

    const handleClick = async (type, productId) => {
        const token = getToken();
        const user = getUser();
        // console.log("User:", user);

        if (!token) {
            if (type === "proposal") {
                localStorage.setItem(
                    "redirect_after_login",
                    `/inquery-form?productName=${encodeURIComponent(
                        products.find((p) => p.id === productId)?.product_name || ""
                    )}`
                );
            } else {
                localStorage.setItem(
                    "action_after_login",
                    JSON.stringify({ type, productId })
                );
            }
            router.push("/login");
            return;
        }

        // ✅ Admin hai to seedha dashboard — koi modal/form nahi dikhega
        if (user?.role_id === 1) {
            router.push("/dashboard/product-inquery");
            return;
        }

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

            if (type === "proposal") {
                setModal({ type, data: { success: true }, loading: false, error: false });
                return;
            }

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
            // console.log("Catalogue API response:", data.data);
            setModal({ type, data: data.data, loading: false, error: false });
        } catch (err) {
            console.error("Error:", err);
            setModal({ type, data: null, loading: false, error: true });
        }
    };

    useEffect(() => {
        const stored = localStorage.getItem("action_after_login");
        const user = getUser();

        if (stored && getToken()) {
            // ✅ Admin hai to localStorage clean karo, koi action trigger mat karo
            if (user?.role_id === 1) {
                localStorage.removeItem("action_after_login");
                localStorage.removeItem("redirect_after_login");
                return;
            }

            const action = JSON.parse(stored);
            handleClick(action.type, action.productId);
            localStorage.removeItem("action_after_login");
        }
    }, []);

    const handleProposalClick = (item) => {
        const token = getToken();
        const user = getUser();

        if (!token) {
            localStorage.setItem(
                "redirect_after_login",
                `/inquery-form?productName=${encodeURIComponent(item.product_name)}`
            );
            router.push("/login");
            return;
        }

        // Admin ko seedha dashboard
        if (user?.role_id === 1) {
            router.push("/dashboard/product-inquery");
            return;
        }

        router.push(`/inquery-form?productName=${encodeURIComponent(item.product_name)}`);
    };

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

    const handleCatalogue = () => {

        const currentUser = getUser();
        // console.log("Current User :", currentUser);

        if (!currentUser?.email) {
            window.open(modal.data.catalogue_link, "_blank");
            return;
        }
        const form = document.createElement("form");

        form.method = "POST";
        form.action = `${modal.data.catalogue_link}`;
        form.target = "_blank";

        const fields = {
            emailid: currentUser.email,
            // mobileno: currentUser.phone,
        };

        Object.entries(fields).forEach(([key, value]) => {

            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value;
            form.appendChild(input);

        });

        document.body.appendChild(form);
        form.submit();
        form.remove();
        setModal(null);
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[300px]  border border-gray-300 border-collapse text-sm mt-2  shadow">
                    <thead className="bg-green-200">
                        <tr>
                            <th className="border px-2 py-1 w-[30%] lg:w-[18%] text-left">Product</th>
                            <th className="border p-1 w-[2%] lg:w-[17%]">Catalogue</th>
                            <th className="border p-1 w-[2%] lg:w-[14%]">Manual</th>
                            <th className="border p-1 w-[66%] lg:w-[35%]">Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length > 0 ? (
                            products.map((item) => (
                                <tr key={item.id}>
                                    <td className="border px-2 py-1  lg:px-2">{item.product_name}</td>

                                    <td className="border p-2 lg:p-1 cursor-pointer">
                                        <div className="flex justify-center items-center">
                                            <Omega onClick={() => handleClick("catalogue", item.id)} />
                                        </div>
                                    </td>

                                    <td className="border p-2 lg:p-1 cursor-pointer">
                                        <div className="flex justify-center items-center">
                                            <Omega onClick={() => handleClick("manual", item.id)} />
                                        </div>
                                    </td>

                                    <td className="border p-2 lg:p-1">
                                        <div className="flex justify-around items-center gap-2 flex-wrap">
                                            <button
                                                onClick={() => handleClick("price", item.id)}
                                                className="bg-green-600 hover:bg-green-700 text-white lg:text-sm text-[12px] font-medium px-1 py-1 lg:py-1 lg:px-4  rounded-md transition duration-200 shadow-sm cursor-pointer"
                                            >
                                                Ask Price
                                            </button>

                                            <button
                                                onClick={() => handleProposalClick(item)}
                                                className="bg-white border border-green-600 text-green-600 hover:bg-green-50 lg:text-sm text-[10px] px-2 py-1 rounded-md transition duration-200 shadow-sm cursor-pointer"
                                            >
                                                Request Proposal
                                            </button>
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
            </div>

            {/* MODAL */}
            {modal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl space-y-4">

                        {modal.loading ? (
                            <div className="flex flex-col items-center justify-center py-8 space-y-3">
                                <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
                                <p className="text-sm text-gray-400">Please wait...</p>
                            </div>
                        ) : modal.error ? (
                            <div className="text-center py-6 text-red-500">
                                <p>Please Try Again</p>
                            </div>
                        ) : modal.data === null ? (
                            <div className="text-center py-6 text-gray-500">
                                <p>No data available</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold text-green-700">
                                    {modal.data.product_name}
                                </h2>

                                {modal.type === "price" && (
                                    <div className="text-lg text-green-600 whitespace-pre-line leading-8">
                                        {modal.data.price.replace(
                                            /\b\d+\b/g,
                                            (num) => `₹${Number(num).toLocaleString("en-IN")}`
                                        )}
                                    </div>
                                )}


                                {modal.type === "catalogue" && (
                                    <button
                                        onClick={handleCatalogue}
                                        className="w-full bg-green-600 text-white px-5 py-2 rounded"
                                    >
                                        View Catalogue →
                                    </button>
                                )}

                                {/* {modal.type === "catalogue" && (
                                    <Link
                                        href={modal.data.catalogue_link}
                                        target="_blank"
                                        onClick={() => setModal(null)}
                                        className="block text-center bg-green-600 text-white px-5 py-2 rounded"
                                    >
                                        View Catalogue 
                                    </Link>
                                )} */}

                                {modal.type === "manual" && (
                                    <button
                                        onClick={() => {
                                            setModal(null);
                                            handleDownload(modal.data.download_id);
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