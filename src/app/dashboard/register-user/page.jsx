'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Pencil, Trash2 } from 'lucide-react';
import { api } from '../../apis/apiList';
import { getToken, useAuthGuard } from '../../../helper/getCommonData';
import Pagination from './../../component/pagination';

export default function RegisterUser() {
    useAuthGuard();
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    // 🔥 FETCH USERS
    const fetchUsers = async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${api.apiCall.userList}?page=${page}&per_page=${itemsPerPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        Accept: 'application/json',
                    },
                }
            );
            const json = await res.json();
            setUsers(Array.isArray(json.data) ? json.data : []);
            setTotalPages(json.last_page || 1);
        } catch (err) {
            console.log(err);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    // 🔥 DELETE
    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            const res = await fetch(`${api.apiCall.userDelete}${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: 'application/json',
                },
            });

            const json = await res.json();

            if (res.ok) {
                toast.success('User deleted successfully');
                fetchUsers(currentPage);
            } else {
                toast.error(json.message || 'Error');
            }
        } catch (err) {
            console.log(err);
            toast.error('Server error');
        }
    };

    return (
        <>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-white bg-green-700 px-4 py-2">
                    Registered Users
                </h2>
                {/* <button
                    onClick={() => router.push('/dashboard/users/add')}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
                >
                    + Add User
                </button> */}
            </div>

            {/* TABLE */}
            <table className="w-full border border-gray-300 border-collapse text-sm mt-4 mb-6 shadow-lg">
                <thead className="bg-[#b3ffd3]">
                    <tr>
                        <th className="border px-4 py-2 text-center">S.No</th>
                        <th className="border px-4 py-2 text-left">First Name</th>
                        <th className="border px-4 py-2 text-left">Last Name</th>
                        <th className="border px-4 py-2 text-left">Email</th>
                        <th className="border px-4 py-2 text-left">Contact No</th>
                        <th className="border px-4 py-2 text-center">Company Name</th>
                        <th className="border px-4 py-2 text-center">Address</th>
                        <th className="border px-4 py-2 text-center">Country</th>
                        <th className="border px-4 py-2 text-center">Status</th>
                        {/* <th className="border px-4 py-2 text-center">Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2 text-center">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.last_name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.phone}</td>
                                <td className="border px-4 py-2 text-center">{user.company_name}</td>
                                <td className="border px-4 py-2 text-center">{user.address}</td>
                                <td className="border px-4 py-2 text-center">{user.country}</td>

                                {/* Status */}
                                <td className="border px-4 py-2 text-center">
                                    <span className={`px-2 py-1 rounded-full text-xs ${user.status == 1
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-600'
                                        }`}>
                                        {user.status == 1 ? 'Active' : 'Inactive'}
                                    </span>
                                </td>

                                {/* Action */}
                                {/* <td className="border px-4 py-2 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => router.push(`/dashboard/users/edit/${user.id}`)}
                                            className="bg-blue-700 text-white px-3 py-2 rounded"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="bg-red-500 text-white px-3 py-2 rounded"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td> */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="text-center p-4">
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