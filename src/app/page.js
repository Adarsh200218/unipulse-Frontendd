// "use client";
 
// import { useEffect, useState } from "react";
// import { Omega } from "lucide-react";
// import { api } from "./apis/apiList";
// import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import {
//   getToken,
//   removeToken,
//   removeUser,
//   getUser,
// } from "../helper/getCommonData";
 
// export default function Home() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [user, setUserState] = useState(null);
//   const router = useRouter();
// const pathname = usePathname();
//   useEffect(() => {
//     const u = getUser();
//     const token = getToken();
//     if (u && token) {
//       setUserState(u);
//     } else {
//       setUserState(null);
//     }
//   }, []);
 
//   const handleLogout = () => {
//     removeToken();
//     removeUser();
//     setUserState(null);
//     router.push("/");
//   };
 
//  useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const catRes = await fetch(api.apiCall.categoryList, {
//         cache: "no-store",
//         headers: { Accept: "application/json" },
//       });
//       const catData = await catRes.json();
 
//       const prodRes = await fetch(api.apiCall.productList, {
//         cache: "no-store",
//         headers: { Accept: "application/json" },
//       });
//       const prodData = await prodRes.json();
 
//       if (catRes.ok) setCategories(catData.data || []);
//       if (prodRes.ok) setProducts(prodData.data || []);
//     } catch (err) {
//       console.log("Error:", err);
//     }
//   };
 
//   fetchData();
//  }, [pathname]);
 
//   useEffect(() => {
//   const handlePageShow = (event) => {
//     if (event.persisted) {
//       // 🔥 Page BFCache se aaya hai
//       window.location.reload();
//     }
//   };
 
//   window.addEventListener("pageshow", handlePageShow);
 
//   return () => {
//     window.removeEventListener("pageshow", handlePageShow);
//   };
// }, []);
 
//   return (
//     <section>
//       <div className="flex flex-col lg:flex-row min-h-screen max-w-7xl mx-auto">
 
//         {/* SIDEBAR */}
//         <aside className="w-full lg:w-[400px] bg-white mt-4 lg:p-4 lg:mt-0">
//           <div className="lg:sticky lg:top-20 max-h-[calc(100vh-80px)] overflow-auto">
//             <div className="p-6 space-y-6 bg-green-800 text-white">
 
//               <div className="bg-white text-black p-4 rounded shadow">
//                 {!user ? (
//                   <div className="flex flex-col gap-2">
//                     <button
//                       onClick={() => router.push("/login")}
//                       className="bg-green-600 text-white py-2 rounded hover:bg-green-800"
//                     >
//                       Login
//                     </button>
//                     <button
//                       onClick={() => router.push("/register")}
//                       className="bg-blue-600 text-white py-2 rounded hover:bg-blue-800"
//                     >
//                       Register
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="text-center space-y-2">
//                     <p className="font-semibold">{user.name}</p>
//                     <button
//                       onClick={handleLogout}
//                       className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
 
//               <div>
//                 <h1 className="text-2xl font-bold">Download</h1>
//                 <p className="text-sm mt-2">
//                   Our most recent catalogue, manuals and dimensions can be downloaded.
//                 </p>
//               </div>
 
//               <hr className="border-white/30" />
 
//               <div>
//                 <h3 className="text-2xl font-semibold mb-3">
//                   List of Download Files
//                 </h3>
//                 <div className="grid grid-cols-1 gap-2">
//                   {categories.map((item) => (
//                     <a
//                       key={item.id}
//                       href={`#${item.id}`}
//                       className="text-sm font-semibold border border-white/30 px-2 py-1 rounded bg-white text-black hover:bg-amber-200"
//                     >
//                       ▸ {item.title}
//                     </a>
//                   ))}
//                 </div>
//               </div>
 
//             </div>
//           </div>
//         </aside>
 
//         {/* MAIN */}
//         <main className="flex-1 p-2 lg:p-4 mt-4">
//           <h1 className="text-3xl font-semibold text-gray-800 uppercase">
//             Download
//           </h1>
 
//           {categories.map((cat) => (
//             <Section
//               key={cat.id}
//               id={cat.id}
//               title={cat.title}
//               products={products.filter(
//                 (p) => Number(p.category_id) === Number(cat.id)
//               )}
//             />
//           ))}
//         </main>
 
//       </div>
//     </section>
//   );
// }
 
// /* ================= TABLE ================= */
 
// function Table({ products = [] }) {
//   const router = useRouter();
//   const [modal, setModal] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [downloading, setDownloading] = useState(false);
 
//   const handleClick = async (type, productId) => {
//     const token = getToken();
 
//     if (!token) {
//       localStorage.setItem(
//         "action_after_login",
//         JSON.stringify({ type, productId })
//       );
//       router.push("/login");
//       return;
//     }
 
//     setLoading(true);
//     try {
//       await fetch(api.apiCall.saveProductQuery, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           product_id: productId,
//           catalogue: type === "catalogue" ? 1 : 0,
//           manual: type === "manual" ? 1 : 0,
//           price: type === "price" ? 1 : 0,
//         }),
//       });
 
//       const res = await fetch(
//         `${api.apiCall.productView}/${type}/${productId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       );
 
//       if (res.status === 401) {
//         removeToken();
//         removeUser();
//         router.push("/login");
//         return;
//       }
 
//       const data = await res.json();
//       setModal({ type, data: data.data });
//     } catch (err) {
//       console.error("Error:", err);
//       // alert("Kuch galat hua, dobara try karo");
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   useEffect(() => {
//     const stored = localStorage.getItem("action_after_login");
//     if (stored && getToken()) {
//       const action = JSON.parse(stored);
//       handleClick(action.type, action.productId);
//       localStorage.removeItem("action_after_login");
//     }
//   }, []);
 
//   const handleDownload = async (id) => {
//     const token = getToken();
//     setDownloading(true);
//     try {
//       const res = await fetch(`${api.apiCall.download}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
 
//       if (res.status === 401) {
//         removeToken();
//         removeUser();
//         router.push("/login");
//         return;
//       }
 
//       if (!res.ok) {
//         alert("Download failed");
//         return;
//       }
 
//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "product.pdf";
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("Download error:", err);
//       alert("Download failed, dobara try karo");
//     } finally {
//       setDownloading(false);
//     }
//   };
 
//   return (
//     <>
//       <table className="w-full border text-sm mt-4 mb-12 shadow">
//         <thead className="bg-green-200">
//           <tr>
//             <th className="border p-2 text-left">Product</th>
//             <th className="border p-2">Catalogue</th>
//             <th className="border p-2">Manual</th>
//             <th className="border p-2">Price</th>
//           </tr>
//         </thead>
 
//         <tbody>
//           {products.length > 0 ? (
//             products.map((item) => (
//               <tr key={item.id}>
//                 <td className="border p-2">{item.product_name}</td>
 
//                 <td className="border p-2">
//                   <div className="flex justify-center items-center">
//                     <Omega
//                       onClick={() => handleClick("catalogue", item.id)}
//                       className={loading ? "opacity-50 pointer-events-none" : "cursor-pointer"}
//                     />
//                   </div>
//                 </td>
 
//                 <td className="border p-2">
//                   <div className="flex justify-center items-center">
//                     <Omega
//                       onClick={() => handleClick("manual", item.id)}
//                       className={loading ? "opacity-50 pointer-events-none" : "cursor-pointer"}
//                     />
//                   </div>
//                 </td>
 
//                 <td className="border p-2">
//                   <div className="flex justify-center items-center">
//                     <Omega
//                       onClick={() => handleClick("price", item.id)}
//                       className={loading ? "opacity-50 pointer-events-none" : "cursor-pointer"}
//                     />
//                   </div>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="text-center p-3">
//                 No products found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
 
//       {/* MODAL */}
//       {modal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl space-y-4">
 
//             <h2 className="text-xl font-bold text-green-700">
//               {modal.data.product_name}
//             </h2>
 
//             {modal.type === "price" && (
//               <p className="text-3xl text-green-600 font-semibold text-center">
//                 ₹{modal.data.price}
//               </p>
//             )}
 
//             {modal.type === "catalogue" && (
//               <a
//                 href={modal.data.catalogue_link}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="block text-center bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
//               >
//                 View Catalogue →
//               </a>
//             )}
 
//             {modal.type === "manual" && (
//               <button
//                 onClick={() => handleDownload(modal.data.download_id)}
//                 disabled={downloading}
//                 className="w-full bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition disabled:opacity-50"
//               >
//                 {downloading ? "Downloading..." : "⬇ Download Manual PDF"}
//               </button>
//             )}
 
//             <button
//               onClick={() => setModal(null)}
//               className="w-full border border-gray-300 hover:bg-gray-100 py-2 rounded-lg transition"
//             >
//               Close
//             </button>
 
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
 
// /* ================= SECTION ================= */
 
// function Section({ id, title, products }) {
//   return (
//     <div id={id} className="mt-10">
//       <h2 className="bg-green-700 text-white p-2">{title}</h2>
//       <Table products={products} />
//     </div>
//   );
// }
 
 
// import { api } from "./apis/apiList";
// import HomeClient from "./component/HomeClient";
 
// export const dynamic = "force-dynamic";
 
// export default async function Home() {
//   const catRes = await fetch(api.apiCall.categoryList, {
//     cache: "no-store",
//   });
//   const catData = await catRes.json();
 
//   const prodRes = await fetch(api.apiCall.productList, {
//     cache: "no-store",
//   });
//   const prodData = await prodRes.json();
 
//   return (
//     <HomeClient
//       categories={catData.data || []}
//       products={prodData.data || []}
//     />
//   )
// }
// import { api } from "./apis/apiList";
// import HomeClient from "./component/HomeClient";
 
// export default async function Home() {
//   const catRes = await fetch(api.apiCall.categoryList, { cache: "no-store" });
//   const catData = await catRes.json();
 
//   const prodRes = await fetch(api.apiCall.productList, { cache: "no-store" });
//   const prodData = await prodRes.json();
 
//   return (
//     <HomeClient
//       categories={catData.data || []}
//       products={prodData.data || []}
//     />
//   );
// }

// import { api } from "./apis/apiList";
// import CategorySidebar from "../app/component/homePageSideBar";

// export default async function Home() {
//   const catRes = await fetch(api.apiCall.categoryList, { cache: "no-store" });
//   const catData = await catRes.json();

//   return (
//     <div className="flex max-w-7xl mx-auto">

//       {/* LEFT */}
//       <CategorySidebar categories={catData.data || []} />

//       {/* RIGHT */}
//       <div className="flex-1 p-6">
//         <h2 className="text-2xl mb-4">Product Categories</h2>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {(catData.data || []).map((item) => (
//             <a
//               key={item.id}
//               href={`/products/${item.id}`}
//               className="border p-4 text-center hover:shadow"
//             >
//               <img
//                 src={item.image || "/images/default.png"}
//                 className="h-20 mx-auto mb-2"
//               />
//               <p>{item.title}</p>
//             </a>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }

import { api } from "./apis/apiList";
import Home from "../app/component/home";

export default async function Page() {
  const res = await fetch(api.apiCall.categoryList, {
    cache: "no-store",
  });

  const data = await res.json();

  return <Home categories={data.data || []} />;
}