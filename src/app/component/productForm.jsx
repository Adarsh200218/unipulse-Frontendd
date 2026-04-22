"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "../apis/apiList";
import { getToken, useAuthGuard } from "../../helper/getCommonData";
import { toast } from "react-toastify";


export default function ProductForm({ productId = null }) {
    useAuthGuard();

    const router = useRouter();

    const [existingPdf, setExistingPdf] = useState("");
    const [openDropdown, setOpenDropdown] = useState(false);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        category_id: "",
        productName: "",
        productLink: "",
        price: "",
        status: "active",
        catalogueLink: "",
        pdf: null,
    });

    useEffect(() => {

    }, []);

    // 🔥 CATEGORY FETCH
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = getToken();
                if (!token) return;

                const res = await fetch(api.apiCall.categoryList, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                const json = await res.json();
                setCategories(json.data || json || []);
            } catch (err) {
                console.log(err);
                setCategories([]);
            }
        };

        fetchCategories();
    }, []);

    // 🔥 EDIT DATA FETCH (FIXED)
    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            try {
                const res = await fetch(`${api.apiCall.productShow}/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                });

                const json = await res.json();

                const data = json.data || json;

                if (data) {
                    setFormData(prev => ({
                        ...prev,
                        category_id: data.category_id || "",
                        productName: data.product_name || "",
                        productLink: data.product_link || "",
                        catalogueLink: data.catalogue_link || "",
                        price: data.price || "",
                        status: data.status == 1 ? "active" : "inactive",
                        pdf: null,

                    }));
                    setExistingPdf(data.pdf || "");
                }

            } catch (err) {
                console.log(err);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "pdf") {
            setFormData({ ...formData, pdf: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleCategorySelect = (cat) => {
        setFormData({
            ...formData,
            category_id: cat.id,
        });
        setOpenDropdown(false);
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
            const form = new FormData();

            form.append("category_id", formData.category_id);
            form.append("product_name", formData.productName);
            form.append("product_link", formData.productLink);
            form.append("catalogue_link", formData.catalogueLink);
            form.append("price", formData.price);
            form.append("status", formData.status === "active" ? 1 : 0);

            if (formData.pdf) {
                form.append("pdf", formData.pdf);
            }

            const url = productId
                ? `${api.apiCall.productUpdate}/${productId}`
                : api.apiCall.productAdd;

            // 🔥 FIX (IMPORTANT)
            if (productId) {
                form.append("_method", "PUT");
            }

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: "application/json",
                },
                body: form,
            });

            const json = await res.json();

            if (res.ok) {
                toast.success(productId ? "Updated Successfully" : "Added Successfully");
                router.push("/dashboard/product-page");
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
                    {productId ? "Edit Product" : "Add Product"}
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

                    {/* Product Name */}
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Product Name"
                            required
                        />
                    </div>

                    {/* Product Link */}
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">
                            Product Link
                        </label>
                        <input
                            type="text"
                            name="productLink"
                            value={formData.productLink}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Product Link"
                            required
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="relative">
                        <label className="block text-gray-700 mb-2 font-medium">
                            Category
                        </label>

                        <div
                            onClick={() => setOpenDropdown(!openDropdown)}
                            className={`w-full px-4 py-3 border rounded-xl cursor-pointer flex justify-between items-center transition ${openDropdown
                                ? "border-green-500 bg-green-50 ring-2 ring-green-500"
                                : "border-gray-300 bg-white"
                                }`}
                        >
                            <span>
                                {Array.isArray(categories) && categories.length > 0
                                    ? categories.find(c => Number(c.id) === Number(formData.category_id))?.title || "Select Category"
                                    : "Select Category"}
                            </span>

                            <ChevronDown
                                className={`transition-transform duration-300 ${openDropdown ? "rotate-180" : ""
                                    }`}
                            />
                        </div>

                        {openDropdown && (
                            <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                                {categories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        onClick={() => handleCategorySelect(cat)}
                                        className={`px-4 py-3 cursor-pointer transition hover:bg-green-100 ${Number(formData.category_id) === Number(cat.id)
                                            ? "bg-green-50 text-green-600 font-medium"
                                            : ""
                                            }`}
                                    >
                                        {cat.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Catalogue Link */}
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">
                            Catalogue Link
                        </label>
                        <input
                            type="text"
                            name="catalogueLink"
                            value={formData.catalogueLink}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Enter Catalogue Link"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Price"
                            required
                        />
                    </div>

                    {/* Manual Upload */}
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">
                            Upload Manual
                        </label>
                        <input
                            type="file"
                            name="pdf"
                            onChange={handleChange}
                            className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 border border-gray-300 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                        {/* ✅ EXISTING PDF SHOW */}
                        {existingPdf && (
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-sm text-gray-600">Current File:</span>

                                <a
                                    href={``}
                                    target="_blank"
                                    className="text-blue-600 underline"
                                >
                                    View Manual
                                </a>
                            </div>
                        )}
                    </div>



                    {/* Status */}
                    <div>
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
                                className={`relative w-14 h-7 flex items-center rounded-full transition duration-300 ${formData.status === "active"
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                    }`}
                            >
                                <span
                                    className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition duration-300 ${formData.status === "active"
                                        ? "translate-x-7"
                                        : ""
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="col-span-2 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition duration-300 shadow-md font-semibold text-lg"
                    >
                        Submit
                    </button>

                </form>
            </div>
        </section>
    );
}