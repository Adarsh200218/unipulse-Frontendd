"use client";
import { useState } from "react";
import Link from "next/link";
import { api } from "../apis/apiList";
import { ChevronsRight, Mail, Phone, MapPin, } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";
import { Omega, SquarePen } from "lucide-react";
import { Lock } from 'lucide-react';
import CategorySideBar from "../component/CategorySideBar";

import ContactButtonright from "../component/ContactButtonright";


export default function ContactUsClient({ categories = [] }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!form.name.trim()) {
            setErrors({ name: true });
            toast.error("Name is required");
            return;
        }
        if (form.name.trim().length < 2) {
            setErrors({ name: true });
            toast.error("Name must be at least 2 characters");
            return;
        }
        if (!form.email.trim()) {
            setErrors({ email: true });
            toast.error("Email is required");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setErrors({ email: true });
            toast.error("Please enter a valid email address");
            return;
        }
        if (!form.phone.trim()) {
            setErrors({ phone: true });
            toast.error("Phone number is required");
            return;
        }
        const digitsOnly = form.phone.replace(/\D/g, "");
        if (digitsOnly.length < 10 || digitsOnly.length > 15) {
            setErrors({ phone: true });
            toast.error("Please enter a valid phone number (10-15 digits)");
            return;
        }
        if (!form.message.trim()) {
            setErrors({ message: true });
            toast.error("Message is required");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(api.apiCall.contactUs, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    message: form.message,
                }),
            });
            if (res.ok) {
                toast.success("Form Submitted Successfully");
                setForm({ name: "", email: "", phone: "", message: "" });
            } else {
                const json = await res.json();
                toast.error(json.message || "Submission Failed");
            }
        } catch (error) {
            console.log(error);
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputBase =
        "w-full h-11 bg-gray-50 border rounded-xl px-4 text-sm outline-none transition";
    const inputNormal =
        "border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-100";
    const inputError =
        "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100";
    const [user, setUser] = useState(null);
    const handleLogout = () => {
        removeToken();
        removeUser();
        setUser(null);
        router.Push("/");
    };

    return (
        <>

            <section className="pt-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6  md:grid-cols-12">

                        {/* ================= SIDEBAR ================= */}

                        <CategorySideBar categories={categories} />

                        {/* ================= CONTACT PAGE ================= */}
                        <main className="md:col-span-8 lg:col-span-8 xl:col-span-9 space-y-6 p-4 mt-2 xl:mt-10">
                            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-200 overflow-hidden">

                                {/* HEADER */}
                                <div className="bg-gradient-to-r from-green-800 to-green-600 px-7 py-2">
                                    <h1 className="text-xl font-bold text-white">Contact Us</h1>
                                    <p className="text-green-100 mt-1.5 text-sm">
                                        We're here to help and answer your questions.
                                    </p>
                                </div>

                                {/* CONTENT */}
                                <div className="p-3 lg:p-4 space-y-6">

                                    {/* CONTACT INFO */}
                                    <div className="">

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                            {/* ADDRESS */}
                                            <div className="bg-white border border-gray-200 rounded-xl p-5">
                                                <div className="flex items-center gap-2.5 mb-3">
                                                    <div className="bg-green-100 p-2 rounded-full">
                                                        <MapPin className="text-green-700" size={16} />
                                                    </div>

                                                    <h2 className="text-[18px] font-bold text-gray-800">
                                                        Corporate Address
                                                    </h2>
                                                </div>

                                                <div className="text-gray-600 leading-7 text-sm lg:text-[15px]">
                                                    <h4 className="pb-2 font-bold">
                                                        UNIPULSE INSTRUMENTS PVT LTD
                                                    </h4>

                                                    <p>
                                                        948, Level 9 (Inside Regus business center)<br />
                                                        Spaze I-Tech Park, A1 Tower<br />
                                                        Sector - 49, Sohna Road<br />
                                                        Gurgaon - 122018, Haryana, India
                                                    </p>
                                                </div>
                                            </div>

                                            {/* CONTACT */}
                                            <div className="bg-white border border-gray-200 rounded-xl p-5">
                                                <div className="flex items-center gap-2.5 mb-3">
                                                    <div className="bg-green-100 p-2 rounded-full">
                                                        <Phone className="text-green-700" size={16} />
                                                    </div>

                                                    <h2 className="text-[18px] font-bold text-gray-800">
                                                        Contact
                                                    </h2>
                                                </div>

                                                <div className="space-y-2 text-sm text-gray-600">
                                                    <Link href="tel:+911246769140" className="flex items-center gap-2 hover:text-green-700 text-sm lg:text-[15px]">
                                                        <Phone size={13} />
                                                        +91 (124) 676 9140
                                                    </Link>
                                                    <Link href="tel:+919810605510" className="flex items-center gap-2 hover:text-green-700 text-sm lg:text-[15px]">
                                                        <Phone size={13} />
                                                        ( Board)M: +91-9810605510/9311141480

                                                    </Link>

                                                    <Link href="mailto:marketing@unipulseinstruments.com" className="flex items-center gap-2 hover:text-green-700 text-sm lg:text-[15px]">
                                                        <Mail size={13} />
                                                        marketing@unipulseinstruments.com
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* SALES OFFICE */}
                                            <div className="bg-white border border-gray-200 rounded-xl p-5">
                                                <div className="flex items-center gap-2.5 mb-3">
                                                    <div className="bg-green-100 p-2 rounded-full">
                                                        <MapPin className="text-green-700" size={16} />
                                                    </div>

                                                    <h2 className="text-base lg:text-[18px] font-bold text-gray-800">
                                                        Address
                                                    </h2>
                                                </div>

                                                <div className="text-gray-600 leading-7 text-sm lg:text-[15px]">
                                                    <h4 className="font-bold pb-2">
                                                        BANGALORE BRANCH OFFICE UNIPULSE INDIA
                                                    </h4>
                                                    Bangalore Tejas Arcade
                                                    3rd Floor, Tejas Arcade,, 527/B, 528/A, 529/A-9/1,
                                                    1st main road block, Subramanyanagar, Ward no. 9, Bangalore, 560010
                                                </div>
                                                <br />

                                                <Link href="tel:+91-8398020505" className="flex items-center gap-2 hover:text-green-700 text-sm lg:text-[15px] pb-2 hover:text-green-700 text-sm lg:text-[15px] pb-2">
                                                    <Phone size={15} />
                                                    +91-8398020505
                                                </Link>
                                                <Link href="mailto:bangalore@unipulseindia.com" className="flex items-center text-sm gap-2 hover:text-green-700  lg:text-[15px]">
                                                    <Mail size={15} />
                                                    bangalore@unipulseindia.com
                                                </Link>
                                            </div>

                                            {/* SUPPORT */}
                                            <div className="bg-white border border-gray-200 rounded-xl p-5">
                                                <div className="flex items-center gap-2.5 mb-3">
                                                    <div className="bg-green-100 p-2 rounded-full">
                                                        <Phone className="text-green-700" size={16} />
                                                    </div>

                                                    <h2 className="text-base lg:text-[18px] font-bold text-gray-800">
                                                        Service Support
                                                    </h2>
                                                </div>

                                                <div className="space-y-2 text-gray-600  leading-8 text-sm lg:text-[15px]">
                                                    <Link href="tel:+919311141480" className="flex items-center gap-2 hover:text-green-700">
                                                        <Phone size={15} />
                                                        +91-9311141480
                                                    </Link>
                                                    <Link
                                                        href="tel:+919971996309"
                                                        className="flex items-center gap-2 hover:text-green-700"
                                                    >
                                                        <FaWhatsapp size={15} className="text-green-600" />
                                                        +91-9971996309
                                                    </Link>

                                                    <Link href="mailto:service@unipulseinstruments.com" className="flex items-center gap-2 hover:text-green-700">
                                                        <Mail size={15} />
                                                        service@unipulseinstruments.com
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* CONTACT FORM */}
                                    <div className="bg-white border border-gray-200 rounded-2xl p-5 lg:p-7 shadow-sm">

                                        <div className="mb-5">
                                            <h2 className="text-xl font-bold text-gray-800">Send Us a Message</h2>
                                            <div className="w-16 h-0.5 bg-green-700 rounded-full mt-2"></div>
                                            <p className="text-gray-600  leading-8 text-sm lg:text-[15px]">
                                                Fill out the form below and our team will contact you shortly.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">

                                            {/* NAME + EMAIL */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                                                        Your Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={form.name}
                                                        onChange={handleChange}
                                                        placeholder="Enter your name"
                                                        className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                                                        Your Email
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        value={form.email}
                                                        onChange={handleChange}
                                                        placeholder="Enter your email"
                                                        className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                                                    />
                                                </div>
                                            </div>

                                            {/* PHONE */}
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                                                    Mobile Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    placeholder="Enter your phone number"
                                                    className={`${inputBase} ${errors.phone ? inputError : inputNormal}`}
                                                />
                                            </div>

                                            {/* MESSAGE */}
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                                                    Your Message
                                                </label>
                                                <textarea
                                                    rows={5}
                                                    name="message"
                                                    value={form.message}
                                                    onChange={handleChange}
                                                    placeholder="Write your message here..."
                                                    className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm outline-none transition resize-none ${errors.message ? inputError : inputNormal}`}
                                                />
                                            </div>

                                            {/* SUBMIT */}
                                            <div>
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="bg-green-700 hover:bg-green-800 transition-all duration-300 text-white px-7 h-11 rounded-xl font-semibold text-sm shadow hover:shadow-md cursor-pointer disabled:opacity-50"
                                                >
                                                    {loading ? "Submitting..." : "Submit Message"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    {/* MAP */}
                                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white p-4">
                                        <div className="mb-3">
                                            <h2 className="text-xl font-bold text-gray-800">Find Us On Map</h2>
                                            <p className="text-gray-500 text-sm lg:text-[15px] mt-1">
                                                Visit our office location directly through Google Maps.
                                            </p>
                                        </div>
                                        <div className="rounded-xl overflow-hidden">
                                            <iframe
                                                src="https://www.google.com/maps?q=Spaze%20I-Tech%20Park%20Sector%2049%20Gurgaon&output=embed"
                                                width="100%"
                                                height="380"
                                                style={{ border: 0 }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            <ContactButtonright />


        </>
    );
}
