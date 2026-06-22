"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../../apis/apiList";
import { getToken, useAuthGuard } from "../../../helper/getCommonData";
import { Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import Pagination from "../../component/pagination";

export default function CategoryListPage() {
    useAuthGuard();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    const fetchCategories = async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${api.apiCall.categoryList}?status=1&page=${page}&per_page=${itemsPerPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        Accept: "application/json",
                    },
                }
            );
            const json = await res.json();
            setCategories(Array.isArray(json.data) ? json.data : []);
            setTotalPages(json.last_page || 1);
        } catch (err) {
            console.error(err);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories(currentPage);
    }, [currentPage]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`${api.apiCall.categoryDelete}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: "application/json",
                },
            });
            const json = await res.json();
            if (res.ok) {
                toast.success("Category deleted successfully!");
                fetchCategories(currentPage);
            } else {
                toast.error(json.message || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error!");
        }
    };

    // UP / DOWN HANDLER
    const handleReorder = async (id, direction) => {
        try {
            const res = await fetch(`${api.apiCall.categoryReorder}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, direction }),
            });

            const json = await res.json();

            if (res.ok) {
                fetchCategories(currentPage);
            } else if (res.status === 400) {
                toast.info("This category is already at the first or last position.");
            } else {
                toast.error(json.message || "Failed to update order. Please try again.");
            }
        } catch (err) {
            toast.error("Something went wrong. Please check your connection and try again.");
        }
    };

    return (
        <>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-2 flex-col lg:flex-row gap-3">
                <h2 className="text-xl lg:text-[22px] font-semibold text-white bg-green-700 px-4 py-2 rounded-lg">
                    Category Management
                </h2>
                <Link href="/dashboard/category/add"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow">
                    + Add Category
                </Link>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] border border-gray-300 border-collapse text-sm mt-4 mb-6 shadow">

                    <thead className="bg-[#b3ffd3]">
                        <tr>
                            <th className="border px-2 py-2 text-center">S.No</th>
                            <th className="border px-2 py-2 text-left">Category Title</th>
                            <th className="border px-2 py-2">Description</th>
                            <th className="border px-2 py-2">Status</th>
                            <th className="border px-2 py-2">Order by</th>
                            <th className="border px-2 py-2">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">

                                    <td className="border px-4 py-2 text-center">
                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                    </td>

                                    <td className="border px-2 py-2">{item.title}</td>

                                    <td className="border px-2 py-2 text-center">
                                        {item.description || "-"}
                                    </td>

                                    <td className="border px-2 py-2 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs ${item.status == 1
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-600"
                                            }`}>
                                            {item.status == 1 ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    {/* UP / DOWN BUTTONS */}
                                    <td className="border px-2 py-2 text-center">
                                        <div className="flex justify-center gap-1">
                                            <button
                                                onClick={() => handleReorder(item.id, "up")}
                                                disabled={index === 0 && currentPage === 1}
                                                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded disabled:opacity-30"
                                                title="Move Up"
                                            >
                                                <ChevronUp size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleReorder(item.id, "down")}
                                                disabled={index === categories.length - 1 && currentPage === totalPages}
                                                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded disabled:opacity-30"
                                                title="Move Down"

                                            >
                                                <ChevronDown size={16} />
                                            </button>
                                        </div>
                                    </td>

                                    <td className="border px-2 py-2 text-center">
                                        <div className="flex justify-center gap-2">
                                            <Link href={`/dashboard/category/edit/${item.id}`}>
                                                <button className="bg-blue-700 text-white px-3 py-2 rounded cursor-pointer">
                                                    <Pencil size={16} />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-500 text-white px-3 py-2 rounded"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4">
                                    {loading ? "Loading..." : "No data found"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>



                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </>
    );
}




