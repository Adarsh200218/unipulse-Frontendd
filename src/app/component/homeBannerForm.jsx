"use client";

import { useEffect, useState } from "react";
import { api } from "../apis/apiList";
import { useRouter } from "next/navigation";
import { getToken, useAuthGuard } from "../../helper/getCommonData";
import { toast } from "react-toastify";
import { X } from "lucide-react";

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

        // PREVIEW ARRAY
        const previewArray = files.map((file) =>
            URL.createObjectURL(file)
        );

        setImagePreview((prev) => [
            ...prev,
            ...previewArray
        ]);
    };

    const removeImage = (index) => {

        const imageToRemove = imagePreview[index];

        // OLD DB IMAGE
        if (imageToRemove.id) {

            setRemovedImages((prev) => [
                ...prev,
                imageToRemove.id
            ]);
        }

        const updatedPreview = [...imagePreview];

        updatedPreview.splice(index, 1);

        setImagePreview(updatedPreview);
    };
    // FETCH DATA FOR EDIT
    const fetchBanner = async () => {

        try {

            const res = await fetch(
                api.apiCall.getBanners,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );

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

        // ONLY EDIT / VIEW
        if (id) {

            fetchBanner();
        }

    }, [id]);

    // SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const url = id
                ? api.apiCall.updateBanner
                : api.apiCall.storeBanner;

            const method = "POST";

            const payload = new FormData();

            // UPDATE
            // if (id) {
            //     payload.append("_method", "POST");
            // }

            // IMAGE
            // IMAGE
            if (imageFiles.length > 0) {

                imageFiles.forEach((file) => {
                    payload.append("image[]", file);
                });
            }

            // REMOVED IMAGES
            payload.append(
                "removed_images",
                JSON.stringify(removedImages)
            );

            const res = await fetch(url, {

                method,

                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },

                body: payload,
            });

            const json = await res.json();

            // SUCCESS
            if (res.ok) {

                toast.success(
                    id
                        ? "Banner Updated Successfully!"
                        : "Banner Added Successfully!"
                );

                router.push(
                    "/dashboard/homepage-content"
                );

            } else {

                toast.error(
                    json.message || "Something went wrong"
                );
            }

        } catch (err) {

            toast.error("Server Error!");

        } finally {

            setLoading(false);
        }
    };

    return (

        <section className="min-h-screen flex items-start justify-center bg-gray-100 p-4 pt-12">

            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">

                <h2 className="text-2xl font-bold mb-6 text-center">

                    {id
                        ? "Update Banner Image"
                        : "Add Banner Image"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* IMAGE */}
                    <div>

                        <label className="block mb-2 font-medium">
                            Banner Image
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

                            <div
                                key={index}
                                className="relative"
                            >

                                <img
                                    src={img.image || img}
                                    alt="Preview"
                                    className="w-full h-40 object-cover rounded-xl border border-gray-300"
                                />

                                {/* REMOVE BUTTON */}
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 cursor-pointer"
                                >

                                    <X size={16} />

                                </button>

                            </div>

                        ))}

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 cursor-pointer"
                    >

                        {loading
                            ? "Processing..."
                            : id
                                ? "Update Banner Images"
                                : "Add Banner Image"}

                    </button>

                </form>

            </div>

        </section>
    );
}