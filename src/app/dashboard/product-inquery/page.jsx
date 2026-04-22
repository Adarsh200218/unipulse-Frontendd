'use client';

import { useEffect, useState } from "react";
import { api } from "../../apis/apiList";
import { getToken } from "../../../helper/getCommonData";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Pagination from "../../component/pagination";

export default function ProductQueryPage() {
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const [loading, setLoading] = useState(true);

    // ✅ FETCH with page param
    const fetchLogs = async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetch(`${api.apiCall.productQueryList}?page=${page}&per_page=${itemsPerPage}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: "application/json",
                },
            });
            const data = await res.json();
            setLogs(Array.isArray(data.data) ? data.data : []);
            setTotalPages(data.last_page || 1); // Laravel pagination
        } catch (err) {
            console.log("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Page change hone par refetch
    useEffect(() => {
        fetchLogs(currentPage);
    }, [currentPage]);

    // ✅ DELETE
    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`${api.apiCall.deleteQuery}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: "application/json",
                },
            });
            const json = await res.json();
            if (res.ok) {
                toast.success("Deleted successfully!");

                //  UI se turant remove karo (no reload)
                setLogs((prevLogs) => prevLogs.filter((item) => item.id !== id));
                // 
            } else {
                toast.error(json.message || "Delete failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error!");
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-white bg-green-700 px-4 py-2">
                    Product Inquiry
                </h2>
            </div>

            <table className="w-full border border-gray-300 border-collapse text-sm mt-4 mb-6 shadow-lg">
                <thead className="bg-[#b3ffd3]">
                    <tr>
                        <th className="border px-4 py-2 text-center">S.No</th>
                        <th className="border px-4 py-2 text-left">Visited User</th>
                        <th className="border px-4 py-2 text-left">Product Name</th>
                        <th className="border px-4 py-2 text-center">Catalogue</th>
                        <th className="border px-4 py-2 text-center">Manual</th>
                        <th className="border px-4 py-2 text-center">Price</th>
                        <th className="border px-4 py-2 text-center">Date</th>
                        <th className="border px-4 py-2 text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="8" className="text-center p-4">Loading...</td>
                        </tr>
                    ) : logs.length > 0 ? (
                        logs.map((log, i) => (
                            <tr key={log.id} className="hover:bg-gray-50">

                                {/* S.No — pagination aware */}
                                <td className="border px-4 py-2 text-center">
                                    {(currentPage - 1) * itemsPerPage + i + 1}
                                </td>

                                {/* Visited Client */}
                                <td className="border px-4 py-2">
                                    <p className="font-semibold">{log.user?.name || "—"}</p>
                                </td>

                                {/* Product Name */}
                                <td className="border px-4 py-2">
                                    {log.product?.product_name || "—"}
                                </td>

                                {/* Catalogue */}
                                <td className="border px-4 py-2 text-center">
                                    {log.catalogue ? (
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                                            ✓ Yes
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">—</span>
                                    )}
                                </td>

                                {/* Manual */}
                                <td className="border px-4 py-2 text-center">
                                    {log.manual ? (
                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                                            ✓ Yes
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">—</span>
                                    )}
                                </td>

                                {/* Price */}
                                <td className="border px-4 py-2 text-center">
                                    {log.price ? (
                                        <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-semibold">
                                            ✓ Yes
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">—</span>
                                    )}
                                </td>

                                {/* Date */}
                                <td className="border px-4 py-2 text-center text-xs text-gray-500">
                                    {new Date(log.created_at).toLocaleString("en-IN")}
                                </td>

                                {/* Action */}
                                <td className="border p-2 text-center">
                                    <button
                                        onClick={() => handleDelete(log.id)}
                                        className="bg-red-500 text-white px-3 py-2 rounded"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center p-4">No Inquiry found</td>
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