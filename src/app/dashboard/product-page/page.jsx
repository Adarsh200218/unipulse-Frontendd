"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../../apis/apiList";
import { getToken, useAuthGuard } from "../../../helper/getCommonData";
import { Pencil, Trash2, ChevronUp, ChevronDown, Save } from "lucide-react";
import { toast } from "react-toastify";
import Pagination from "../../component/pagination";
import Loader from "@/app/component/Loader";

export default function ProductListPage() {
    useAuthGuard();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [positions, setPositions] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    useEffect(() => {
        const saved = localStorage.getItem("productCategoryFilter");
        if (saved) setSelectedCategory(saved);
    }, []);

    {/* Product Lists */ }
    const fetchProducts = async (page = 1, search = "", categoryId = "") => {
        setLoading(true);
        try {
            const res = await fetch(
                `${api.apiCall.productList}?status=1&page=${page}&per_page=${itemsPerPage}&search=${search}${categoryId ? `&category_id=${categoryId}` : ""}`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        Accept: "application/json",
                    },
                }
            );
            const json = await res.json();
            setProducts(Array.isArray(json.data) ? json.data : []);
            const posObj = {};

            (json.data || []).forEach((item) => {
                posObj[item.id] = item.sort_order;
            });

            setPositions(posObj);
            setTotalPages(json.last_page || 1);
        } catch (err) {
            console.error(err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            setCurrentPage(1);
            fetchProducts(1, searchTerm, selectedCategory);
        }, 400);
        return () => clearTimeout(delay);
    }, [searchTerm, selectedCategory]);

    useEffect(() => {
        fetchProducts(currentPage, searchTerm, selectedCategory);
    }, [currentPage]);

    {/* Delete Product */ }
    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`${api.apiCall.productDelete}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: "application/json",
                },
            });
            const json = await res.json();
            if (res.ok) {
                toast.success("Product deleted successfully!");
                fetchProducts(currentPage, searchTerm, selectedCategory);
            } else {
                toast.error(json.message || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error!");
        }
    };

    {/* View Manual In Index page */ }
    const handleViewPDF = async (id) => {
        try {
            const res = await fetch(`${api.apiCall.viewManual}/${id}?view=true`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: "application/pdf",
                },
            });
            if (!res.ok) throw new Error();
            const blob = await res.blob();
            const fileURL = window.URL.createObjectURL(blob);
            window.open(fileURL, "_blank");
        } catch (err) {
            toast.error("Manual Not Found / Not Uploaded");
        }
    };

    {/* Category Filter */ }
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${api.apiCall.categoryList}?per_page=100`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                setCategories(Array.isArray(json.data) ? json.data : []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    {/* Products Position Set API */ }
    const handlePositionUpdate = async (id) => {
        try {

            const res = await fetch(
                api.apiCall.productPositionUpdate,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id,
                        position: positions[id],
                    }),
                }
            );

            const json = await res.json();

            if (res.ok) {
                toast.success("Position updated");
                fetchProducts(currentPage, searchTerm, selectedCategory);
            } else {
                toast.error(json.message || "Failed");
            }

        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    // UP / DOWN HANDLER
    // const handleReorder = async (id, direction) => {
    //     try {
    //         const res = await fetch(`${api.apiCall.productReorder}`, {
    //             method: "POST",
    //             headers: {
    //                 Authorization: `Bearer ${getToken()}`,
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ id, direction }),
    //         });

    //         const json = await res.json();

    //         if (res.ok) {
    //             fetchProducts(currentPage, searchTerm);
    //         } else if (res.status === 400) {
    //             toast.info("This product is already at the first or last position within its category.");
    //         } else {
    //             toast.error(json.message || "Failed to update order. Please try again.");
    //         }
    //     } catch (err) {
    //         toast.error("Something went wrong. Please check your connection and try again.");
    //     }
    // };

    return (
        <>
            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                <h2 className="text-xl font-semibold text-white bg-green-700 px-4 py-2 rounded-lg">
                    Product Management
                </h2>
                <div className="flex items-center gap-3 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <input
                        type="text"
                        placeholder="Search by product or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="flex items-center gap-2 flex-col lg:flex-row">
                        {/* Categories filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setCurrentPage(1);
                                if (e.target.value === "") {
                                    localStorage.removeItem("productCategoryFilter");
                                } else {
                                    localStorage.setItem("productCategoryFilter", e.target.value);
                                }
                            }}
                            className="border px-3 py-2 rounded text-sm w-auto max-w-[200px]"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Link href="/dashboard/product-page/add"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow whitespace-nowrap">
                        + Add Product
                    </Link>

                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="w-full border border-gray-300 border-collapse text-sm table-category">

                    {/*<table className="w-full border border-gray-300 border-collapse text-sm mt-4 mb-6 shadow-lg">*/}
                    <thead className="bg-[#b3ffd3]">
                        <tr>
                            <th className="border px-4 py-2 text-center">S.No</th>
                            <th className="border px-4 py-2 text-left ">Product Name</th>
                            <th className="border px-4 py-2 text-left ">Category</th>
                            <th className="border px-4 py-2 text-left">Product Link</th>
                            <th className="border px-4 py-2 text-left">Catalogue Link</th>
                            <th className="border px-4 py-2 text-center">Manual</th>
                            <th className="border px-4 py-2 text-center">Price</th>
                            <th className="border px-4 py-2 text-center">Status</th>
                            <th className="border px-4 py-2 text-center">Order by</th>
                            <th className="border px-4 py-2 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length > 0 ? (
                            products.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">

                                    <td className="border px-4 py-2 text-center">
                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                    </td>

                                    <td className="border px-4 py-2 whitespace-nowrap">{item.product_name}</td>

                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {item.category?.title || "-"}
                                    </td>

                                    <td className="border px-4 py-2">
                                        <Link href={item.product_link} target="_blank"
                                            className="text-blue-600 underline">Visit</Link>
                                    </td>

                                    <td className="border px-4 py-2">
                                        {item.catalogue_link ? (
                                            <Link href={item.catalogue_link} target="_blank"
                                                className="text-blue-600 underline">Visit</Link>
                                        ) : "-"}
                                    </td>

                                    <td className="border px-4 py-2 text-center">
                                        <button onClick={() => handleViewPDF(item.id)}
                                            className="text-blue-600 underline cursor-pointer">
                                            View Manual
                                        </button>
                                    </td>

                                    <td className="border px-4 py-2 text-center">
                                        ₹{Number(item.price).toLocaleString('en-IN')}
                                    </td>

                                    <td className="border px-4 py-2 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs ${item.status == 1
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"}`}>
                                            {item.status == 1 ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    {/* Product Order By */}
                                    <td className="border px-4 py-2 text-center">

                                        <div className="flex flex-col items-center gap-2">

                                            <div className="flex items-center gap-3">

                                                <input
                                                    type="number"
                                                    // min="1"
                                                    // placeholder={`1-${products.length}`}
                                                    onChange={(e) =>
                                                        setPositions({
                                                            ...positions,
                                                            [item.id]: e.target.value,
                                                        })
                                                    }

                                                    className="w-13 border rounded px-2 py-1 text-center"
                                                />

                                                <button
                                                    onClick={() => handlePositionUpdate(item.id)}
                                                    className="bg-green-600 text-white p-2 rounded"
                                                    title="Save Position"
                                                >
                                                    <Save size={18} />
                                                </button>

                                            </div>

                                            {/* <div className="flex justify-center gap-1">

                                                <button
                                                    onClick={() => handleReorder(item.id, "up")}
                                                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                                                >
                                                    <ChevronUp size={16} />
                                                </button>

                                                <button
                                                    onClick={() => handleReorder(item.id, "down")}
                                                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                                                >
                                                    <ChevronDown size={16} />
                                                </button>

                                            </div> */}

                                        </div>

                                    </td>

                                    <td className="border px-2 py-2 text-center">
                                        <div className="flex justify-center gap-2">
                                            <Link href={`/dashboard/product-page/edit/${item.id}`}
                                                className="bg-blue-700 text-white px-3 py-2 rounded">
                                                <Pencil size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-500 text-white px-3 py-2 rounded">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center p-4">
                                    {loading ? <Loader /> : "No products found"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </>
    );
}




