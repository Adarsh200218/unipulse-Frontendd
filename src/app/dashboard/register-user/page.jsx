'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Pencil, Trash2 } from 'lucide-react';
import { api } from '../../apis/apiList';
import { getToken, useAuthGuard } from '../../../helper/getCommonData';
import Pagination from './../../component/pagination';
import Loader from '@/app/component/Loader';

export default function RegisterUser() {
    useAuthGuard();
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const itemsPerPage = 10;

    //  FETCH USERS
    const fetchUsers = async (page = 1, search = '') => {
        setLoading(true);
        try {
            const res = await fetch(
                `${api.apiCall.userList}?page=${page}&per_page=${itemsPerPage}&search=${search}`,
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
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setCurrentPage(1);
        }, 800);

        return () => clearTimeout(timer);
    }, [searchTerm]);
    useEffect(() => {
        fetchUsers(currentPage, debouncedSearchTerm);
    }, [currentPage, debouncedSearchTerm]);

    const toggleStatus = async (id, currentStatus) => {
        try {
            const res = await fetch(`${api.apiCall.userUpdate}${id}`, {
                method: 'PUT', // ya PUT (API ke hisaab se)
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: currentStatus == 1 ? 0 : 1
                })
            });

            const json = await res.json();

            if (res.ok) {
                toast.success('Status updated');
                fetchUsers(currentPage); // reload list
            } else {
                toast.error(json.message || 'Error');
            }
        } catch (err) {
            console.log(err);
            toast.error('Server error');
        }
    };

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
                <h2 className="text-xl font-semibold text-white bg-green-700 px-4 py-2 rounded-lg">
                    Registered Users
                </h2>
                <div className="flex items-center gap-3 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <input
                        type="text"
                        placeholder="Search by name, email or contact"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] border border-gray-300 border-collapse text-sm mt-4 mb-6 shadow">
                    <thead className="bg-[#b3ffd3]">
                        <tr>
                            <th className="border px-4 py-2 text-center">S.No</th>
                            <th className="border px-4 py-2 text-center">Unique ID</th>
                            <th className="border px-4 py-2 text-left">Name</th>
                            <th className="border px-4 py-2 text-left">Email</th>
                            <th className="border px-4 py-2 text-left">Contact No</th>
                            <th className="border px-4 py-2 text-center">Company Name</th>
                            <th className="border px-4 py-2 text-center">Address</th>
                            <th className="border px-4 py-2 text-center">State</th>
                            <th className="border px-4 py-2 text-center">Other Information</th>
                            <th className="border px-4 py-2 text-center">User Verified</th>
                            <th className="border px-4 py-2 text-center">User Status</th>
                            <th className="border px-4 py-2 text-center">Date</th>
                            {/* <th className="border px-4 py-2 text-center">Country</th> */}
                            {/* <th className="border px-4 py-2 text-left">Last Name</th> */}
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
                                    <td className="border px-4 py-2">{String(user.unique_code).padStart(3, '0')}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.phone}</td>
                                    {/* <td className="border px-4 py-2">{user.last_name}</td> */}
                                    <td className="border px-4 py-2 text-center">
                                        {user.company_name ? (
                                            user.company_name
                                        ) : (
                                            <span className="text-gray-600 italic">
                                                Not Provided
                                            </span>
                                        )}
                                    </td>
                                    <td className="border px-4 py-2 text-center"> {user.address ? (
                                        user.address
                                    ) : (
                                        <span className="text-gray-600 italic">
                                            Not Provided
                                        </span>
                                    )}
                                    </td>

                                    <td className="border px-4 py-2">{user.state}</td>

                                    <td className="border px-4 py-2 text-center"> {user.other_info ? (
                                        user.other_info
                                    ) : (
                                        <span className="text-gray-600 italic">
                                            Not Provided
                                        </span>
                                    )}
                                    </td>
                                    {/* <td className="border px-4 py-2 text-center">{user.country}</td> */}
                                    <td className="border px-0 py-2 text-center">
                                        <span className={`px-1 py-1 rounded-full text-xs font-semibold border ${user.email_verified_at
                                            ? 'bg-green-100 text-green-700 border-green-300'
                                            : 'bg-yellow-100 text-yellow-700 border-yellow-300'
                                            }`}>
                                            {user.email_verified_at
                                                ? '✓ Verified'
                                                : '⏳ Pending'}
                                        </span>
                                    </td>

                                    <td className="border px-0 py-2 text-center">
                                        <span
                                            onClick={() => toggleStatus(user.id, user.status)}
                                            title={user.status == 1 ? "Click to deactivate" : "Click to activate"}
                                            className={`cursor-pointer px-1 py-1 rounded-full text-xs font-semibold border transition-all duration-200 hover:opacity-75 active:scale-95 select-none ${user.status == 1
                                                ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'
                                                : 'bg-red-100 text-red-600 border-red-300 hover:bg-red-200'
                                                }`}
                                        >
                                            {user.status == 1 ? '● Active' : '● Inactive'}
                                        </span>
                                    </td>
                                    <td className="border px-0 py-2 text-center ">{new Date(user.created_at).toLocaleString("en-IN")}</td>

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