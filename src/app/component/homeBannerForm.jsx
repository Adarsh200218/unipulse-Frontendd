"use client";

import { useEffect, useState } from "react";
import { api } from "../apis/apiList";
import { useRouter } from "next/navigation";
import { getToken, useAuthGuard } from "../../helper/getCommonData";
import { toast } from "react-toastify";
import { X, ChevronUp, ChevronDown } from "lucide-react";

export default function HomeBannerForm({ id = null }) {

    useAuthGuard();

    const router = useRouter();
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const inputClass =
        "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500";

    // IMAGE HANDLE
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        setImageFiles(files);
        const previewArray = files.map((file) => URL.createObjectURL(file));
        setImagePreview((prev) => [...prev, ...previewArray]);
    };

    const removeImage = (index) => {
        const imageToRemove = imagePreview[index];
        if (imageToRemove.id) {
            setRemovedImages((prev) => [...prev, imageToRemove.id]);
        }
        const updatedPreview = [...imagePreview];
        updatedPreview.splice(index, 1);
        setImagePreview(updatedPreview);
    };

    // UP / DOWN HANDLER
    const handleReorder = async (bannerId, direction) => {
        try {
            const res = await fetch(`${api.apiCall.bannerReorder}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: bannerId, direction }),
            });

            const json = await res.json();

            if (res.ok) {
                fetchBanner();
            } else if (res.status === 400) {
                toast.info("This banner is already at the first or last position.");
            } else {
                toast.error(json.message || "Failed to update order. Please try again.");
            }
        } catch (err) {
            toast.error("Something went wrong. Please check your connection and try again.");
        }
    };

    // FETCH BANNERS
    const fetchBanner = async () => {
        try {
            const res = await fetch(api.apiCall.getBanners, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            const json = await res.json();
            const data = json.data;

            if (data.length > 0) {
                const oldImages = data.map((item) => ({
                    id: item.id,
                    image: `${api.image.imageURL}${item.image}`,
                }));
                setImagePreview(oldImages);
            }
        } catch (err) {
            toast.error("Fetch Error");
        }
    };

    useEffect(() => {
        if (id) {
            fetchBanner();
        }
    }, [id]);

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = id ? api.apiCall.updateBanner : api.apiCall.storeBanner;
            const payload = new FormData();

            if (imageFiles.length > 0) {
                imageFiles.forEach((file) => {
                    payload.append("image[]", file);
                });
            }

            payload.append("removed_images", JSON.stringify(removedImages));

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: payload,
            });

            const json = await res.json();

            if (res.ok) {
                toast.success(id ? "Banner Updated Successfully!" : "Banner Added Successfully!");
                router.push("/dashboard/homepage-content");
            } else {
                toast.error(json.message || "Something went wrong");
            }
        } catch (err) {
            toast.error("Server Error!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className=" flex items-start justify-center bg-gray-100 p-4 pt-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    {id ? "Update Banner Image" : "Add Banner Image"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* IMAGE */}
                    <div>
                        <label className="block mb-2 font-medium">
                            HomePage Banner Image
                        </label>

                        <input
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            onChange={handleImageChange}
                            className={inputClass}
                            required={!id}
                        />

                        {imagePreview.map((img, index) => (
                            <div key={index} className="relative mt-3 border border-gray-200 rounded-xl overflow-hidden">

                                <img
                                    src={img.image || img}
                                    alt="Preview"
                                    className="w-full h-40 object-cover"
                                />

                                {/* REMOVE BUTTON */}
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 cursor-pointer"
                                >
                                    <X size={16} />
                                </button>

                                {/* UP / DOWN BUTTONS - sirf saved images par */}
                                {img.id && (
                                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                                        <button
                                            type="button"
                                            onClick={() => handleReorder(img.id, "up")}
                                            disabled={index === 0}
                                            className="bg-white border border-gray-300 hover:bg-gray-100 px-2 py-1 rounded disabled:opacity-30"
                                            title="Move Up"
                                        >
                                            <ChevronUp size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleReorder(img.id, "down")}
                                            disabled={index === imagePreview.length - 1}
                                            className="bg-white border border-gray-300 hover:bg-gray-100 px-2 py-1 rounded disabled:opacity-30"
                                            title="Move Down"

                                        >
                                            <ChevronDown size={16} />
                                        </button>
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 cursor-pointer"
                    >
                        {loading ? "Processing..." : id ? "Update Banner Images" : "Add Banner Image"}
                    </button>

                </form>
            </div>
        </section>
    );
}

