"use client";

import { useEffect, useState } from "react";
import { api } from "../apis/apiList";
import { useRouter } from "next/navigation";
import { getToken, useAuthGuard } from "../../helper/getCommonData";
import { toast } from "react-toastify";

export default function HomeAboutForm() {

    useAuthGuard();

    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        highlight_title: "",
        sub_title: "",
    });

    const [loading, setLoading] = useState(false);

    const inputClass =
        "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500";

    // HANDLE INPUT
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // FETCH ABOUT
    const fetchAbout = async () => {
        try {
            const res = await fetch(
                api.apiCall.getAbout,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );

            const json = await res.json();
            const data = json.data[0];
            if (data) {
                setFormData({
                    title: data.title || "",
                    description: data.description || "",
                    highlight_title: data.highlight_title || "",
                    sub_title: data.sub_title || "",
                });
            }

        } catch (err) {
            toast.error("Fetch Error");
        }
    };

    useEffect(() => {
        fetchAbout();
    }, []);

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(
                api.apiCall.saveAbout,
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${getToken()}`,
                    },

                    body: JSON.stringify({
                        title: formData.title,
                        description: formData.description,
                        highlight_title: formData.highlight_title,
                        sub_title: formData.sub_title,
                    }),
                }
            );

            const json = await res.json();

            // SUCCESS
            if (res.ok) {

                toast.success(
                    "Content Added Successfully!"
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

        <section className="flex items-start justify-center bg-gray-100 p-2 pt-12">

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    HomePage About Content
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                   
                    <div>

                        <label className="block mb-2 font-medium">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />

                    </div>

                    {/* HIGHLIGHTED TEXT */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Hightlihted Text
                        </label>

                        <input
                            type="text"
                            name="highlight_title"
                            value={formData.highlight_title}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* SUB-TITLE */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Subtitle
                        </label>

                        <input
                            type="text"
                            name="sub_title"
                            value={formData.sub_title}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />

                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Description
                        </label>

                        <textarea
                            rows={5}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 cursor-pointer"
                    >

                        {loading
                            ? "Processing..."
                            : "Save Content"}

                    </button>

                </form>

            </div>

        </section>
    );
}