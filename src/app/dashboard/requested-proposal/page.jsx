'use client';
import { useEffect, useState } from 'react';
import { api } from '../../apis/apiList';
import { getToken, useAuthGuard } from '../../../helper/getCommonData';
import Pagination from '../../component/pagination';
import { toast } from 'react-toastify';

export default function RequestedProposal() {
    useAuthGuard();

    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(false);
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

    // const handleDelete = async (id) => {
    //     if (!confirm('Are you sure you want to delete?')) return;

    //     try {
    //         const res = await fetch(`${api.apiCall.requestPurposalDelete}${id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 Authorization: `Bearer ${getToken()}`,
    //                 Accept: 'application/json',
    //             },
    //         });

    //         const json = await res.json();

    //         if (res.ok) {
    //             toast.success('Deleted successfully!');
    //             fetchProposals(currentPage); // list reload
    //         } else {
    //             toast.error(json.message || 'Error');
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         toast.error('Server error');
    //     }
    // };

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-white bg-green-700 px-4 py-2">
                    Requested Proposals
                </h2>
            </div>

            <table className="w-full border border-gray-300 border-collapse text-sm mt-4 mb-6 shadow-lg">
                <thead className="bg-[#b3ffd3]">
                    <tr>
                        <th className="border px-4 py-2 text-center">S.No</th>
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">Related Product</th>
                        <th className="border px-4 py-2 text-center">Requested For</th>
                        <th className="border px-4 py-2 text-center">Serial No</th>
                        <th className="border px-4 py-2 text-center">Message</th>
                        {/* <th className="border px-4 py-2 text-center">Action</th> */}

                    </tr>
                </thead>
                <tbody>
                    {proposals.length > 0 ? (
                        proposals.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2 text-center">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                <td className="border px-4 py-2">{item.name}</td>
                                <td className="border px-4 py-2">{item.related_product}</td>
                                <td className="border px-4 py-2 text-center">
                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                                        {item.request_for}
                                    </span>
                                </td>
                                <td className="border px-4 py-2 text-center">{item.serial_no}</td>
                                <td className="border px-4 py-2 text-center max-w-[200px] truncate">
                                    {item.message}
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
                            <td colSpan="6" className="text-center p-4">
                                {loading ? 'Loading...' : 'No data found'}
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