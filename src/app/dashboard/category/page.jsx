"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../../apis/apiList";
import { getToken, useAuthGuard } from "../../../helper/getCommonData";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Pagination from "../../component/pagination";

export default function CategoryListPage() {
    useAuthGuard();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔥 PAGINATION STATE
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    // 🔥 FETCH CATEGORY
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

    // 🔥 PAGE CHANGE HONE PAR FETCH
    useEffect(() => {
        fetchCategories(currentPage);
    }, [currentPage]);

    // 🔥 DELETE
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

    return (
        <>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-white bg-green-700 px-4 py-2">
                    Category Management
                </h2>
                <Link href="/dashboard/category/add"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow">
                    + Add Category
                </Link>
            </div>

            {/* TABLE */}
            <table className="w-full border border-gray-300 border-collapse text-sm mt-4 mb-6 shadow-lg">

                <thead className="bg-[#b3ffd3]">
                    <tr>
                        <th className="border px-4 py-2 text-center">S.No</th>
                        <th className="border p-2 text-left">Category Title</th>
                        <th className="border p-2">Description</th>
                        {/* <th className="border p-2 text-left">Category Image</th> */}
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.length > 0 ? (
                        categories.map((item, index) => (

                            <tr key={item.id} className="hover:bg-gray-50">

                                <td className="border px-4 py-2 text-center">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                {/* {console.log(item.images)}
                                {console.log(`${api.image.imageURL}${item.images?.[0]?.image_url}`)} */}

                                <td className="border p-2">{item.title}</td>

                                <td className="border p-2 text-center">
                                    {item.description || "-"}
                                </td>

                                {/* <td>
                                    {item.images?.length > 0 && item.images[0]?.image_url ? (
                                        <img
                                            src={`${api.image.imageURL}${item.images[0].image_url}`}
                                            width="60"
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td> */}


                                <td className="border p-2 text-center">
                                    <span className={`px-2 py-1 rounded-full text-xs ${item.status == 1
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-600"
                                        }`}>
                                        {item.status == 1 ? "Active" : "Inactive"}
                                    </span>
                                </td>

                                <td className="border p-2 text-center">
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
                            <td colSpan="5" className="text-center p-4">
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

        </>
    );
}