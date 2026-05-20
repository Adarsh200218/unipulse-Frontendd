"use client";

import { useEffect, useState } from "react";
import { Omega } from "lucide-react";
import { useRouter } from "next/navigation";
import { slugify, useAdminGuardAdmin } from "../../helper/getCommonData";
import { api } from "../apis/apiList";
import Link from "next/link";
import {
    getToken,
    removeToken,
    removeUser,
    getUser,
} from "../../helper/getCommonData";
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
        <section>
            <div className="flex flex-col lg:flex-row min-h-screen max-w-[1400px] mx-auto">

                {/* SIDEBAR */}
                <aside className="w-full lg:w-[380px] bg-white mt-4 lg:p-4 lg:mt-0">
                    <div className="lg:sticky lg:top-20 h-[calc(100vh-80px)] overflow-hidden">

                        <div className="p-6 space-y-6 bg-green-800 text-white rounded h-full flex flex-col">

                            {/* DOWNLOAD TEXT */}
                            <div>
                                <h1 className="text-2xl font-bold">Download</h1>
                                <p className="text-sm mt-2">
                                    Our most recent catalogue, manuals and external dimension views can be downloaded.
                                </p>
                            </div>

                            <hr className="border-white/30" />

                            {/* CATEGORY LIST */}
                            <div className="flex flex-col flex-1 min-h-0">
                                <h3 className="text-xl font-semibold mb-3">
                                    List of Download Files
                                </h3>

                                <div className="flex flex-col gap-2 h-[470px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                    {categories.map((item) => (
                                        <a
                                            key={item.id}
                                            href={`#${slugify(item.title)}`}
                                            className="flex items-center justify-between bg-white text-black px-3 py-1 rounded-lg  
                                                border border-gray-200 shadow-sm  hover:shadow-md hover:-translate-y-0.5 transition"
                                        >
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={
                                                        item.images?.length > 0 && item.images[0]?.image_url
                                                            ? `${api.image.imageURL}${item.images[0].image_url}`
                                                            : "/images/default.png"
                                                    }
                                                    alt={item.title}
                                                    width={80}
                                                    height={80}
                                                    className="object-contain rounded w-20 h-auto"
                                                />
                                                {item.title}
                                            </div>
                                            <ChevronsRight />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-white/30" />

                            {/* AUTH */}
                            <div className="bg-white text-black p-4 rounded shadow">
                                {!user ? (
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => router.push("/login")}
                                            className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => router.push("/register")}
                                            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
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

/* ================= SECTION ================= */
function Section({ id, title, products }) {
    return (
        <div id={slugify(title)} className="mt-10 scroll-mt-24">
            <h2 className="bg-green-700 text-white p-2">{title}</h2>
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

        // ✅ Admin ko seedha dashboard
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

    return (
        <>
            <table className="w-full border text-sm mt-4 mb-12 shadow">
                <thead className="bg-green-200">
                    <tr>
                        <th className="border p-2 w-[18%] text-left">Product</th>
                        <th className="border p-2 w-[17%]">Catalogue</th>
                        <th className="border p-2 w-[14%]">Manual</th>
                        <th className="border p-2 w-[35%]">Price</th>
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

                                <td className="border p-3">
                                    <div className="flex justify-center items-center gap-2 flex-wrap">
                                        <button
                                            onClick={() => handleClick("price", item.id)}
                                            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md transition duration-200 shadow-sm cursor-pointer"
                                        >
                                            Ask Price
                                        </button>

                                        <button
                                            onClick={() => handleProposalClick(item)}
                                            className="bg-white border border-green-600 text-green-600 hover:bg-green-50 text-sm font-medium px-4 py-2 rounded-md transition duration-200 shadow-sm cursor-pointer"
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





// "use client";

// import { useEffect, useState } from "react";
// import { Omega } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { slugify, useAdminGuardAdmin } from "../../helper/getCommonData";
// import { api } from "../apis/apiList";
// import Link from "next/link";
// import {
//     getToken,
//     removeToken,
//     removeUser,
//     getUser,
// } from "../../helper/getCommonData";
// import { ChevronsRight } from "lucide-react";

// export default function HomeClient({ categories, products }) {
//     useAdminGuardAdmin();

//     const [user, setUserState] = useState(null);
//     const router = useRouter();

//     useEffect(() => {
//         const u = getUser();
//         const token = getToken();
//         if (u && token) setUserState(u);
//         else setUserState(null);
//     }, []);

//     const handleLogout = () => {
//         removeToken();
//         removeUser();
//         setUserState(null);
//         router.push("/");
//     };

//     return (
//         <section>
//             <div className="flex flex-col lg:flex-row min-h-screen max-w-[1400px] mx-auto">

//                 {/* SIDEBAR */}
//                 <aside className="w-full lg:w-[380px] bg-white mt-4 lg:p-4 lg:mt-0">
//                     <div className="lg:sticky lg:top-20 h-[calc(100vh-80px)] overflow-hidden">

//                         <div className="p-6 space-y-6 bg-green-800 text-white rounded h-full flex flex-col">

//                             {/* DOWNLOAD TEXT */}
//                             <div>
//                                 <h1 className="text-2xl font-bold">Download</h1>
//                                 <p className="text-sm mt-2">
//                                     Our most recent catalogue, manuals and external dimension views can be downloaded.
//                                 </p>
//                             </div>

//                             <hr className="border-white/30" />

//                             {/* CATEGORY LIST */}
//                             <div className="flex flex-col flex-1 min-h-0">
//                                 <h3 className="text-xl font-semibold mb-3">
//                                     List of Download Files
//                                 </h3>

//                                 <div className="flex flex-col gap-2 h-[470px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
//                                     {categories.map((item) => (
//                                         <a
//                                             key={item.id}
//                                             href={`#${slugify(item.title)}`}
//                                             className="flex items-center justify-between bg-white text-black px-3 py-1 rounded-lg  
//                                                 border border-gray-200 shadow-sm  hover:shadow-md hover:-translate-y-0.5 transition"
//                                         >
//                                             <div className="flex items-center gap-4">
//                                                 <img
//                                                     src={
//                                                         item.images?.length > 0 && item.images[0]?.image_url
//                                                             ? `${api.image.imageURL}${item.images[0].image_url}`
//                                                             : "/images/default.png"
//                                                     }
//                                                     alt={item.title}
//                                                     width={80}
//                                                     height={80}
//                                                     className="object-contain rounded w-20 h-auto"
//                                                 />
//                                                 {item.title}
//                                             </div>

//                                             <ChevronsRight />
//                                         </a>
//                                     ))}
//                                 </div>
//                             </div>

//                             <hr className="border-white/30" />

//                             {/* AUTH — NEECHE FIXED */}
//                             <div className="bg-white text-black p-4 rounded shadow">
//                                 {!user ? (
//                                     <div className="flex flex-col gap-2">
//                                         <button
//                                             onClick={() => router.push("/login")}
//                                             className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
//                                         >
//                                             Login
//                                         </button>
//                                         <button
//                                             onClick={() => router.push("/register")}
//                                             className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
//                                         >
//                                             Register
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     <div className="text-center space-y-2">
//                                         <p className="font-semibold mt-2">Welcome</p>
//                                         <p className="">{user.name}</p>
//                                         <button
//                                             onClick={handleLogout}
//                                             className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 cursor-pointer"
//                                         >
//                                             Logout
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>

//                         </div>
//                     </div>
//                 </aside>

//                 {/* MAIN */}
//                 <main className="flex-1 p-2 lg:p-4 mt-4">
//                     <h1 className="text-3xl font-semibold text-gray-800 uppercase">
//                         Download
//                     </h1>

//                     {categories.map((cat) => (
//                         <Section
//                             key={cat.id}
//                             id={cat.id}
//                             title={cat.title}
//                             products={products.filter(
//                                 (p) => Number(p.category_id) === Number(cat.id)
//                             )}
//                         />
//                     ))}
//                 </main>

//             </div >
//         </section >
//     );
// }

// /* ================= SECTION ================= */
// function Section({ id, title, products }) {
//     return (
//         <div id={slugify(title)} className="mt-10 scroll-mt-24">
//             <h2 className="bg-green-700 text-white p-2">{title}</h2>
//             <Table products={products} />
//         </div>
//     );
// }

// /* ================= TABLE ================= */
// function Table({ products }) {
//     const router = useRouter();
//     const [modal, setModal] = useState(null);
//     const [downloading, setDownloading] = useState(false);

//     const handleClick = async (type, productId) => {
//         const token = getToken();

//         if (!token) {
//             localStorage.setItem(
//                 "action_after_login",
//                 JSON.stringify({ type, productId })
//             );
//             router.push("/login");
//             return;
//         }

//         setModal({ type, data: null, loading: true, error: false });

//         try {
//             // ✅ proposal ke liye saveProductQuery call karo
//             await fetch(api.apiCall.saveProductQuery, {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     product_id: productId,
//                     catalogue: type === "catalogue" ? 1 : 0,
//                     manual: type === "manual" ? 1 : 0,
//                     price: type === "price" ? 1 : 0,

//                 }),
//             });

//             // ✅ proposal ke liye productView call nahi karni
//             if (type === "proposal") {
//                 setModal({ type, data: { success: true }, loading: false, error: false });
//                 return;
//             }

//             const res = await fetch(
//                 `${api.apiCall.productView}/${type}/${productId}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         Accept: "application/json",
//                     },
//                 }
//             );

//             if (res.status === 401) {
//                 removeToken();
//                 removeUser();
//                 router.push("/login");
//                 return;
//             }

//             const data = await res.json();
//             setModal({ type, data: data.data, loading: false, error: false });
//         } catch (err) {
//             console.error("Error:", err);
//             setModal({ type, data: null, loading: false, error: true });
//         }
//     };

//     useEffect(() => {
//         const stored = localStorage.getItem("action_after_login");
//         if (stored && getToken()) {
//             const action = JSON.parse(stored);
//             handleClick(action.type, action.productId);
//             localStorage.removeItem("action_after_login");
//         }
//     }, []);

//     const handleDownload = async (id) => {
//         const token = getToken();
//         setDownloading(true);

//         try {
//             const res = await fetch(`${api.apiCall.downloadManual}/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             const blob = await res.blob();
//             const url = window.URL.createObjectURL(blob);

//             const a = document.createElement("a");
//             a.href = url;
//             a.download = "product.pdf";
//             document.body.appendChild(a);
//             a.click();
//             a.remove();

//             window.URL.revokeObjectURL(url);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setDownloading(false);
//         }
//     };

//     return (
//         <>
//             <table className="w-full border text-sm mt-4 mb-12 shadow">
//                 <thead className="bg-green-200">
//                     <tr>
//                         <th className="border p-2 w-[18%] text-left">Product</th>
//                         <th className="border p-2 w-[17%]">Catalogue</th>
//                         <th className="border p-2 w-[14%]">Manual</th>
//                         <th className="border p-2 w-[35%]">Price</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {products.length > 0 ? (
//                         products.map((item) => (
//                             <tr key={item.id}>
//                                 <td className="border p-2">{item.product_name}</td>

//                                 <td className="border p-2 cursor-pointer">
//                                     <div className="flex justify-center items-center">
//                                         <Omega onClick={() => handleClick("catalogue", item.id)} />
//                                     </div>
//                                 </td>

//                                 <td className="border p-2 cursor-pointer">
//                                     <div className="flex justify-center items-center">
//                                         <Omega onClick={() => handleClick("manual", item.id)} />
//                                     </div>
//                                 </td>

//                                 <td className="border p-3">
//                                     <div className="flex justify-center items-center gap-2 flex-wrap">
//                                         <button
//                                             onClick={() => handleClick("price", item.id)}
//                                             className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md transition duration-200 shadow-sm cursor-pointer"
//                                         >
//                                             Ask Price
//                                         </button>

//                                         <button
//                                             onClick={() => {
//                                                 const token = getToken();
//                                                 if (!token) {
//                                                     localStorage.setItem(
//                                                         "redirect_after_login",
//                                                         `/inquery-form?productName=${encodeURIComponent(item.product_name)}`
//                                                     );
//                                                     router.push("/login");
//                                                     return;
//                                                 }
//                                                 // Yeh line missing thi — logged in hone par directly redirect karo
//                                                 router.push(`/inquery-form?productName=${encodeURIComponent(item.product_name)}`);
//                                             }}
//                                             className="bg-white border border-green-600 text-green-600 hover:bg-green-50 text-sm font-medium px-4 py-2 rounded-md transition duration-200 shadow-sm cursor-pointer"
//                                         >
//                                             Request Proposal
//                                         </button>

//                                         {/* <button
//                                             onClick={() => handleClick("proposal", item.id)}
//                                             className="bg-white border border-green-600 text-green-600 hover:bg-green-50 text-sm font-medium px-4 py-2 rounded-md transition duration-200 shadow-sm"
//                                         >
//                                             Request Proposal
//                                         </button> */}
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4" className="text-center p-3">
//                                 No products found
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>

//             {/* MODAL */}
//             {modal && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//                     <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl space-y-4">

//                         {modal.loading ? (
//                             /* ── LOADER ── */
//                             <div className="flex flex-col items-center justify-center py-8 space-y-3">
//                                 <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
//                                 <p className="text-sm text-gray-400">Please wait...</p>
//                             </div>
//                         ) : modal.error ? (
//                             /* ── ERROR ── */
//                             <div className="text-center py-6 text-red-500">
//                                 <p>Please Try Again</p>
//                             </div>
//                         ) : modal.data === null ? (
//                             /* ── NO DATA ── */
//                             <div className="text-center py-6 text-gray-500">
//                                 <p>No data available</p>
//                             </div>
//                         ) : (
//                             /* ── DATA ── */
//                             <>
//                                 <h2 className="text-xl font-bold text-green-700">
//                                     {modal.data.product_name}
//                                 </h2>

//                                 {modal.type === "price" && (
//                                     <div className="text-lg text-green-600 whitespace-pre-line leading-8">
//                                         {modal.data.price.replace(
//                                             /\b\d+\b/g,
//                                             (num) => `₹${Number(num).toLocaleString("en-IN")}`
//                                         )}
//                                     </div>
//                                 )}

//                                 {modal.type === "catalogue" && (
//                                     <a
//                                         href={modal.data.catalogue_link}
//                                         target="_blank"
//                                         onClick={() => setModal(null)}
//                                         className="block text-center bg-green-600 text-white px-5 py-2 rounded"
//                                     >
//                                         View Catalogue →
//                                     </a>
//                                 )}

//                                 {modal.type === "manual" && (
//                                     <button
//                                         onClick={() => {
//                                             setModal(null);
//                                             handleDownload(modal.data.download_id);
//                                         }}
//                                         disabled={downloading}
//                                         className="w-full bg-green-600 text-white px-5 py-2 rounded"
//                                     >
//                                         {downloading ? "Downloading..." : "Download Manual"}
//                                     </button>
//                                 )}
//                             </>
//                         )}

//                         {/* Close button hamesha visible */}
//                         <button
//                             onClick={() => setModal(null)}
//                             className="w-full border py-2 rounded text-gray-600"
//                         >
//                             Close
//                         </button>

//                     </div>
//                 </div >
//             )
//             }
//         </>
//     );
// }

















































































































// "use client";

// import { useEffect, useState } from "react";
// import { Omega } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { slugify, useAdminGuardAdmin } from "../../helper/getCommonData";
// import { api } from "../apis/apiList";
// import {
//     getToken,
//     removeToken,
//     removeUser,
//     getUser,
// } from "../../helper/getCommonData";

// export default function HomeClient({ categories, products }) {
//     useAdminGuardAdmin();

//     const [user, setUserState] = useState(null);
//     const router = useRouter();

//     useEffect(() => {
//         const u = getUser();
//         const token = getToken();
//         if (u && token) setUserState(u);
//         else setUserState(null);
//     }, []);

//     const handleLogout = () => {
//         removeToken();
//         removeUser();
//         setUserState(null);
//         router.push("/");
//     };

//     return (
//         <section>
//             <div className="flex flex-col lg:flex-row min-h-screen max-w-7xl mx-auto">

//                 {/* SIDEBAR */}
//                 <aside className="w-full lg:w-[380px] bg-white mt-4 lg:p-4 lg:mt-0">
//                     <div className="lg:sticky lg:top-20 h-[calc(100vh-80px)] overflow-hidden">

//                         <div className="p-6 space-y-6 bg-green-800 text-white rounded h-full flex flex-col">

//                             {/* DOWNLOAD TEXT */}
//                             <div>
//                                 <h1 className="text-2xl font-bold">Download</h1>
//                                 <p className="text-sm mt-2">
//                                     Our most recent catalogue, manuals and external dimension views can be downloaded.
//                                 </p>
//                             </div>

//                             <hr className="border-white/30" />

//                             {/* CATEGORY LIST — flex-1 se poora space lega */}
//                             <div className="flex flex-col flex-1 min-h-0">
//                                 <h3 className="text-xl font-semibold mb-3">
//                                     List of Download Files
//                                 </h3>

//                                 <div className="flex flex-col gap-2 overflow-y-auto pr-1 custom-scroll flex-1">
//                                     {categories.map((item) => (
//                                         <a
//                                             key={item.id}
//                                             // href={`#${item.id}`}
//                                             href={`#${slugify(item.title)}`}
//                                             className="text-sm font-semibold border px-2 py-1 rounded bg-white text-black hover:bg-amber-200"
//                                         >
//                                             ▸ {item.title}
//                                         </a>
//                                     ))}
//                                 </div>
//                             </div>

//                             <hr className="border-white/30" />

//                             {/* AUTH — NEECHE FIXED */}
//                             <div className="bg-white text-black p-4 rounded shadow">
//                                 {!user ? (
//                                     <div className="flex flex-col gap-2">
//                                         <button
//                                             onClick={() => router.push("/login")}
//                                             className="bg-green-600 text-white py-2 rounded hover:bg-green-800 cursor-pointer"
//                                         >
//                                             Login
//                                         </button>
//                                         <button
//                                             onClick={() => router.push("/register")}
//                                             className="bg-blue-600 text-white py-2 rounded hover:bg-blue-800 cursor-pointer"
//                                         >
//                                             Register
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     <div className="text-center space-y-2">
//                                         <p className="font-semibold mt-2">Welcome</p>
//                                         <p className="">{user.name}</p>
//                                         <button
//                                             onClick={handleLogout}
//                                             className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 cursor-pointer"
//                                         >
//                                             Logout
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>

//                         </div>
//                     </div>
//                 </aside>

//                 {/* MAIN */}
//                 <main className="flex-1 p-2 lg:p-4 mt-4">
//                     <h1 className="text-3xl font-semibold text-gray-800 uppercase">
//                         Download
//                     </h1>

//                     {categories.map((cat) => (
//                         <Section
//                             key={cat.id}
//                             id={cat.id}
//                             title={cat.title}
//                             products={products.filter(
//                                 (p) => Number(p.category_id) === Number(cat.id)
//                             )}
//                         />
//                     ))}
//                 </main>

//             </div>
//         </section>
//     );
// }

// /* ================= SECTION ================= */  ///// Scroll hota hai yeh category list par dabane se products table par scroll hota hai category kai according

// function Section({ id, title, products }) {
//     return (
//         // <div id={id} className="mt-10">
//         // <div id={id} className="mt-10 scroll-mt-24">
//         <div id={slugify(title)} className="mt-10 scroll-mt-24">
//             <h2 className="bg-green-700 text-white p-2">{title}</h2>
//             <Table products={products} />
//         </div>
//     );
// }

// /* ================= TABLE ================= */

// function Table({ products }) {
//     const router = useRouter();
//     const [modal, setModal] = useState(null); // { type, data, loading, error }
//     const [downloading, setDownloading] = useState(false);

//     const handleClick = async (type, productId) => {
//         const token = getToken();

//         if (!token) {
//             localStorage.setItem(
//                 "action_after_login",
//                 JSON.stringify({ type, productId })
//             );
//             router.push("/login");
//             return;
//         }

//         // Turant modal open karo loader ke saath
//         setModal({ type, data: null, loading: true, error: false });

//         try {
//             await fetch(api.apiCall.saveProductQuery, {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     product_id: productId,
//                     catalogue: type === "catalogue" ? 1 : 0,
//                     manual: type === "manual" ? 1 : 0,
//                     price: type === "price" ? 1 : 0,
//                     proposal: type === "proposal" ? 1 : 0,
//                 }),
//             });
//             if (type === "proposal") {
//                 setModal({ type, data: { success: true }, loading: false, error: false });
//                 return;
//             }


//             const res = await fetch(
//                 `${api.apiCall.productView}/${type}/${productId}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         Accept: "application/json",
//                     },
//                 }
//             );

//             if (res.status === 401) {
//                 removeToken();
//                 removeUser();
//                 router.push("/login");
//                 return;
//             }

//             const data = await res.json();
//             setModal({ type, data: data.data, loading: false, error: false });
//         } catch (err) {
//             console.error("Error:", err);
//             setModal({ type, data: null, loading: false, error: true });
//         }
//     };

//     useEffect(() => {
//         const stored = localStorage.getItem("action_after_login");
//         if (stored && getToken()) {
//             const action = JSON.parse(stored);
//             handleClick(action.type, action.productId);
//             localStorage.removeItem("action_after_login");
//         }
//     }, []);

//     const handleDownload = async (id) => {
//         const token = getToken();
//         setDownloading(true);

//         try {
//             const res = await fetch(`${api.apiCall.downloadManual}/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             const blob = await res.blob();
//             const url = window.URL.createObjectURL(blob);

//             const a = document.createElement("a");
//             a.href = url;
//             a.download = "product.pdf";
//             document.body.appendChild(a);
//             a.click();
//             a.remove();

//             window.URL.revokeObjectURL(url);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setDownloading(false);
//         }
//     };

//     return (
//         <>
//             <table className="w-full border text-sm mt-4 mb-12 shadow">
//                 <thead className="bg-green-200">
//                     <tr>
//                         <th className="border p-2 w-[18%] text-left">Product</th>
//                         <th className="border p-2 w-[17%]">Catalogue</th>
//                         <th className="border p-2  w-[14%]">Manual</th>
//                         <th className="border p-2 w-[35%]">Price</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {products.length > 0 ? (
//                         products.map((item) => (
//                             <tr key={item.id}>
//                                 <td className="border p-2">{item.product_name}</td>

//                                 <td className="border p-2 cursor-pointer">
//                                     <div className="flex justify-center items-center">
//                                         <Omega onClick={() => handleClick("catalogue", item.id)} />
//                                     </div>
//                                 </td>

//                                 <td className="border p-2 cursor-pointer">
//                                     <div className="flex justify-center items-center">
//                                         <Omega onClick={() => handleClick("manual", item.id)} />
//                                     </div>
//                                 </td>


//                                 <td className="border p-3">
//                                     <div className="flex justify-center items-center gap-2 flex-wrap">
//                                         <button
//                                             onClick={() => handleClick("price", item.id)}
//                                             className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md transition duration-200 shadow-sm"
//                                         >
//                                             Ask Price
//                                         </button>

//                                         <button
//                                             onClick={() => handleClick("proposal", item.id)}
//                                             className="bg-white border border-green-600 text-green-600 hover:bg-green-50 text-sm font-medium px-4 py-2 rounded-md transition duration-200 shadow-sm"
//                                         >
//                                             Request Proposal
//                                         </button>
//                                     </div>
//                                 </td>

//                                 {/* <td className="border p-2 cursor-pointer">
//                                     <div className="flex justify-center items-center">
//                                         <button
//                                             onClick={() => handleClick("price", item.id)}
//                                             className="bg-green-600 text-white px-3 py-1 rounded"
//                                         >
//                                             Ask Price
//                                         </button>

//                                         <button
//                                             onClick={() => handleClick("price", item.id)}
//                                             className="bg-green-600 text-white px-3 py-1 rounded"
//                                         >
//                                             Request A Purposal
//                                         </button>
//                                         <Omega onClick={() => handleClick("price", item.id)} /> 
//                                     </div>
//                                 </td> */}
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4" className="text-center p-3">
//                                 No products found
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>

//             {/* MODAL */}
//             {modal && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//                     <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl space-y-4">

//                         {/* {modal.loading ? (

//                             <div className="flex flex-col items-center justify-center py-8 space-y-3">
//                                 <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
//                                 <p className="text-sm text-gray-400">Please wait...</p>
//                             </div>
//                         ) : modal.error ? (

//                             <div className="text-center py-6 text-red-500">
//                                 <p>Please Try Again</p>
//                             </div>
//                         ) : (

//                             <>
//                                 <h2 className="text-xl font-bold text-green-700">
//                                     {modal.data.product_name}
//                                 </h2>

//                                  {modal.type === "price" && (
//                                     <p className="text-3xl text-green-600 text-center">
//                                         ₹{modal.data.price}
//                                     </p>
//                                 )} 
//                                 {modal.type === "price" && (
//                                     <div className="text-lg text-green-600 whitespace-pre-line leading-8">
//                                         {modal.data.price.replace(
//                                             /\b\d+\b/g,
//                                             (num) => `₹${Number(num).toLocaleString("en-IN")}`
//                                         )}
//                                     </div>
//                                 )}

//                                 {modal.type === "catalogue" && (
//                                     <a
//                                         href={modal.data.catalogue_link}
//                                         target="_blank"
//                                         onClick={() => setModal(null)}

//                                         className="block text-center bg-green-600 text-white px-5 py-2 rounded"
//                                     >
//                                         View Catalogue →
//                                     </a>
//                                 )}

//                                 {modal.type === "manual" && (
//                                     <button
//                                         onClick={() => {
//                                             setModal(null);            modal close
//                                             handleDownload(modal.data.download_id); 
//                                         }}

//                                         disabled={downloading}
//                                         className="w-full bg-green-600 text-white px-5 py-2 rounded"
//                                     >
//                                         {downloading ? "Downloading..." : "Download Manual"}
//                                     </button>
//                                 )}
//                             </>
//                         )} */}
//                         {/* MODAL */}
//                         {modal && (
//                             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//                                 <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl space-y-4">

//                                     {modal.loading ? (
//                                         /* ── LOADER ── */
//                                         <div className="flex flex-col items-center justify-center py-8 space-y-3">
//                                             <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
//                                             <p className="text-sm text-gray-400">Please wait...</p>
//                                         </div>
//                                     ) : modal.error ? (
//                                         /* ── ERROR ── */
//                                         <div className="text-center py-6 text-red-500">
//                                             <p>Please Try Again</p>
//                                         </div>
//                                     ) : modal.type === "proposal" ? (
//                                         /* ── PROPOSAL SUCCESS ── */
//                                         <div className="text-center py-6 space-y-3">
//                                             <div className="text-green-500 text-5xl">✓</div>
//                                             <h2 className="text-xl font-bold text-green-700">Request Sent!</h2>
//                                             <p className="text-gray-600">Your request for proposal has been sent successfully.</p>
//                                         </div>
//                                     ) : modal.data === null ? (
//                                         /* ── NO DATA ── */
//                                         <div className="text-center py-6 text-gray-500">
//                                             <p>No data available</p>
//                                         </div>
//                                     ) : (
//                                         /* ── DATA ── */
//                                         <>
//                                             <h2 className="text-xl font-bold text-green-700">
//                                                 {modal.data.product_name}
//                                             </h2>

//                                             {modal.type === "price" && (
//                                                 <div className="text-lg text-green-600 whitespace-pre-line leading-8">
//                                                     {modal.data.price.replace(
//                                                         /\b\d+\b/g,
//                                                         (num) => `₹${Number(num).toLocaleString("en-IN")}`
//                                                     )}
//                                                 </div>
//                                             )}

//                                             {modal.type === "catalogue" && (
//                                                 <a
//                                                     href={modal.data.catalogue_link}
//                                                     target="_blank"
//                                                     onClick={() => setModal(null)}
//                                                     className="block text-center bg-green-600 text-white px-5 py-2 rounded"
//                                                 >
//                                                     View Catalogue →
//                                                 </a>
//                                             )}

//                                             {modal.type === "manual" && (
//                                                 <button
//                                                     onClick={() => {
//                                                         setModal(null);
//                                                         handleDownload(modal.data.download_id);
//                                                     }}
//                                                     disabled={downloading}
//                                                     className="w-full bg-green-600 text-white px-5 py-2 rounded"
//                                                 >
//                                                     {downloading ? "Downloading..." : "Download Manual"}
//                                                 </button>
//                                             )}
//                                         </>
//                                     )}


//                                     {/* Close button hamesha visible */}
//                                     <button
//                                         onClick={() => setModal(null)}
//                                         className="w-full border py-2 rounded text-gray-600"
//                                     >
//                                         Close
//                                     </button>

//                                 </div>
//                             </div>
//                         )}
//                     </>
//                     );
// }
