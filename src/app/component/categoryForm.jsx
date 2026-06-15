"use client";

import { useEffect, useState } from "react";
import { api } from "../apis/apiList";
import { useRouter } from "next/navigation";
import { getToken, useAuthGuard } from "../../helper/getCommonData";
import { toast } from "react-toastify";


export default function CategoryForm({ id = null }) {
    useAuthGuard();

    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: 1,
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    //  HANDLE INPUT
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // IMAGE HANDLE
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };


    //  FETCH DATA FOR EDIT
    const fetchCategory = async () => {
        if (!id) return;

        try {
            const res = await fetch(`${api.apiCall.categoryShow}/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            const json = await res.json();

            const data = json;

            if (data) {
                setFormData({
                    title: data.title || "",
                    description: data.description || "",
                    status: data.status ?? 1,
                });

                // OLD IMAGE SET KARO
                if (data.images && data.images.length > 0) {
                    setImagePreview(
                        `${api.image.imageURL}${data.images[0].image_url}`
                    );
                }
            }

        } catch (err) {
            toast.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [id]);

    // 🔥 SUBMIT (ADD / UPDATE)
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const url = id
                ? `${api.apiCall.categoryUpdate}/${id}`
                : api.apiCall.categoryADD;

            const method = "POST"; // 🔥 always POST

            const payload = new FormData();
            payload.append("title", formData.title);
            payload.append("description", formData.description);
            payload.append("status", formData.status);

            if (id) {
                payload.append("_method", "PUT");
            }

            if (imageFile) {
                payload.append("image", imageFile);
            }

            const res = await fetch(url, {
                method: method,
                headers: {
                    // "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: payload,
                // body: JSON.stringify({
                //     id: id,
                //     ...formData,
                // }),
            });

            const json = await res.json();
            // ✅ SUCCESS CHECK
            if (res.ok) {
                toast.success(id ? "Category updated successfully!" : "Category added successfully!");
                router.push("/dashboard/category");
            } else {
                alert(json.message || "Something went wrong");
            }

            // alert(json.message || "Success");

        } catch (err) {
            toast.error("Server error!");
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500";

    return (
        <section className=" flex items-start justify-center bg-gray-100 p-2 ">

            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    {id ? "Update Category" : "Add Category"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* TITLE */}
                    <div>
                        <label className="block mb-2 font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/*  IMAGE FIELD */}
                    <div>
                        <label className="block mb-2 font-medium">Image</label>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            onChange={handleImageChange}
                            className={inputClass}
                            required={!id}

                        />

                        {/* 👇 PREVIEW */}
                        {imagePreview && (
                            <div className="mt-3">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-xl border border-gray-300"
                                />
                            </div>
                        )}
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* STATUS */}
                    <div>
                        <label className="block mb-2 font-medium">Status</label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className={inputClass}
                        >
                            <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
                        </select>
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
                    >
                        {loading
                            ? "Processing..."
                            : id
                                ? "Update Category"
                                : "Add Category"}
                    </button>

                </form>

            </div>
        </section>
    );
}