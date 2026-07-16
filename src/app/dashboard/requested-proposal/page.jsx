'use client';
import { useEffect, useState } from 'react';
import { api } from '../../apis/apiList';
import { getToken, useAuthGuard } from '../../../helper/getCommonData';
import Pagination from '../../component/pagination';
import { toast } from 'react-toastify';
import Loader from '@/app/component/Loader';

export default function RequestedProposal() {
    useAuthGuard();

    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    const fetchProposals = async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${api.apiCall.requestPurposalShow}?page=${page}&per_page=${itemsPerPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        Accept: 'application/json',
                    },
                }
            );
            const json = await res.json();
            setProposals(Array.isArray(json.data.data) ? json.data.data : []);
            setTotalPages(json.data.last_page || 1);

        } catch (err) {
            console.log(err);
            setProposals([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProposals(currentPage);
    }, [currentPage]);



    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-white bg-green-700 px-4 py-2 rounded-lg">
                    Requested Proposals
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] border border-gray-300 border-collapse text-sm mt-4 mb-6 shadow">
                    <thead className="bg-[#b3ffd3]">

                        <tr>
                            <th className="border px-2 md:px-2 py-2 text-center w-[5%]">S.No</th>
                            <th className="border px-2 md:px-2 py-2 text-center w-[5%]">Unique ID</th>

                            <th className="border px-2 md:px-2 py-2 text-left w-[20%] md:w-[18%]">
                                Name
                            </th>
                            <th className="border px-2 md:px-2 py-2 text-left w-[20%] md:w-[18%]">
                                Email
                            </th>

                            <th className="border px-2 md:px-2 py-2 text-left w-[15%] md:w-[22%]">
                                Related Product
                            </th>

                            <th className="border px-2 md:px-2 py-2 text-center w-[5%] md:w-[15%]">
                                Requested For
                            </th>

                            <th className="border px-2 md:px-2 py-2 text-center w-[30%] md:w-[12%]">
                                Serial No
                            </th>

                            <th className="border px-2 md:px-2 py-2 text-center w-[1%] md:w-[18%]">
                                Message
                            </th>

                            <th className="border px-2 md:px-2 py-2 text-center w-[25%] md:w-[15%]">
                                Date
                            </th>
                        </tr>


                    </thead>
                    <tbody>
                        {proposals.length > 0 ? (
                            proposals.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="border px-2 py-2 text-center">
                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                    </td>
                                    <td className="border px-2 py-2 whitespace-nowrap">{item.user?.unique_code
                                        ? String(item.user.unique_code).padStart(3, '0')
                                        : "N/A"}
                                    </td>
                                    <td className="border px-2 py-2 whitespace-nowrap">{item.name}</td>
                                    <td className="border px-2 py-2 whitespace-nowrap">{item.user?.email || "N/A"}</td>
                                    <td className="border px-2 py-2">{item.related_product}</td>
                                    <td className="border px-2 py-2 text-center">
                                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                                            {item.request_for}
                                        </span>
                                    </td>
                                    <td className="border px-2 py-2 text-center">{item.serial_no || "N/A"}</td>
                                    <td className="border px-2 py-2 text-center max-w-[200px] truncate">
                                        {item.message}
                                    </td>
                                    <td className="border px-2 py-2 text-center">
                                        <div className="flex flex-col">
                                            <span>
                                                {new Date(item.created_at).toLocaleDateString("en-IN")}
                                            </span>

                                            <span className="text-xs text-gray-500">
                                                {new Date(item.created_at).toLocaleTimeString("en-IN", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        </div>
                                    </td>
                                    {/* <td className="border px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                                    >
                                        Delete
                                    </button>
                                </td> */}

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center p-4">
                                    {loading ? <Loader /> : 'No data found'}
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