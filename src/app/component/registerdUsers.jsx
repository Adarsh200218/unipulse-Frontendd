"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "../apis/apiList";
import { getToken, useAuthGuard } from "../../helper/getCommonData";
import { toast } from "react-toastify";

export default function UserForm({ userId = null }) {
    useAuthGuard();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        email: "",
        phone: "",
        company_name: "",
        address: "",
        country: "",
        status: "active",
    });

    // 🔥 EDIT DATA FETCH
    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            try {
                const res = await fetch(`${api.apiCall.userShow}${userId}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        Accept: "application/json",
                    },
                });

                const json = await res.json();
                const data = json.data || json;

                if (data) {
                    setFormData({
                        name: data.name || "",
                        last_name: data.last_name || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        company_name: data.company_name || "",
                        address: data.address || "",
                        country: data.country || "",
                        status: data.status == 1 ? "active" : "inactive",
                    });
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleStatus = () => {
        setFormData({
            ...formData,
            status: formData.status === "active" ? "inactive" : "active",
        });
    };

    // 🔥 SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = userId
                ? `${api.apiCall.userUpdate}${userId}`
                : api.apiCall.userList;

            const res = await fetch(url, {
                method: userId ? "PUT" : "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    last_name: formData.last_name,
                    email: formData.email,
                    phone: formData.phone,
                    company_name: formData.company_name,
                    address: formData.address,
                    country: formData.country,
                    status: formData.status === "active" ? 1 : 0,
                }),
            });

            const json = await res.json();

            if (res.ok) {
                toast.success(userId ? "Updated Successfully" : "Added Successfully");
                router.push("/dashboard/users");
            } else {
                toast.error(json.message || "Error");
            }
        } catch (err) {
            console.log(err);
            toast.error("Server error");
        }
    };

    const inputClass =
        "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500";

    return (
        <section className="flex-1 flex justify-center items-center min-h-full p-4">
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-200 w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-7 text-center">
                    {userId ? "Edit User" : "Add User"}
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

                    {/* First Name */}
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="First Name"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Last Name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Phone Number"
                        />
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">
                            Company Name
                        </label>
                        <input
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Company Name"
                            required
                        />
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">
                            Country
                        </label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Country"
                            required
                        />
                    </div>

                    {/* Address - Full Width */}
                    <div className="col-span-2">
                        <label className="block text-gray-700 mb-2 font-medium">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Street, Building, Area"
                            required
                        />
                    </div>

                    {/* Status Toggle */}
                    <div className="col-span-2">
                        <label className="block text-gray-700 mb-2 font-medium">
                            Status
                        </label>
                        <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-xl border">
                            <span className="flex items-center gap-2 text-gray-700 font-medium">
                                {formData.status === "active" ? "🟢 Active" : "🔴 Inactive"}
                            </span>
                            <button
                                type="button"
                                onClick={toggleStatus}
                                className={`relative w-14 h-7 flex items-center rounded-full transition duration-300 ${formData.status === "active" ? "bg-green-500" : "bg-gray-400"
                                    }`}
                            >
                                <span
                                    className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition duration-300 ${formData.status === "active" ? "translate-x-7" : ""
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="col-span-2 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition duration-300 shadow-md font-semibold text-lg"
                    >
                        {userId ? "Update User" : "Add User"}
                    </button>

                </form>
            </div>
        </section>
    );
}