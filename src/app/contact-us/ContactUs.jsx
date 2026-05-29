"use client";
import { useState } from "react";
import Link from "next/link";
import { api } from "../apis/apiList";
import { ChevronsRight, Mail, Phone, MapPin, } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";

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

    return (
        <section className="pt-20 pb-24">
            <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto gap-5 px-4">

                {/* ================= SIDEBAR ================= */}
                <aside className="w-full lg:w-[340px] bg-white mt-4 lg:p-4 lg:mt-0">
                    <div className="lg:sticky lg:top-20 h-[calc(100vh-80px)] overflow-hidden">
                        <div className="p-5 space-y-5 bg-green-800 text-white rounded-xl h-full flex flex-col">

                            <div>
                                <h1 className="text-3xl font-bold">Download</h1>
                                <p className="text-sm mt-2 leading-6 text-green-100">
                                    Our most recent catalogue, manuals and external dimension views can be downloaded.
                                </p>
                            </div>

                            <hr className="border-white/20" />

                            <div className="flex flex-col flex-1 min-h-0">
                                <h3 className="text-xl font-semibold mb-3">List of Download Files</h3>
                                <div className="flex flex-col gap-2.5 overflow-y-auto pr-1 custom-scroll flex-1">
                                    {categories?.map((item, index) => (
                                        <Link
                                            key={`${item.id}-${index}`}
                                            href="/products-list"
                                            className="flex items-center justify-between bg-white text-black px-3 py-2.5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={
                                                        item.images?.length > 0 && item.images[0]?.image_url
                                                            ? `${api.image.imageURL}${item.images[0].image_url}`
                                                            : "/images/default.png"
                                                    }
                                                    alt={item.title}
                                                    width={56}
                                                    height={56}
                                                    className="object-contain rounded w-12 h-12"
                                                />
                                                <span className="text-[14px] font-medium leading-5">{item.title}</span>
                                            </div>
                                            <ChevronsRight size={18} className="text-gray-500 shrink-0" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-white/20" />

                            <div className="bg-white text-black p-3.5 rounded-xl shadow">
                                <div className="flex flex-col gap-2.5">
                                    <button
                                        onClick={() => router.push("/login")}
                                        className="bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition cursor-pointer font-medium text-sm"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => router.push("/register")}
                                        className="bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition cursor-pointer font-medium text-sm"
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </aside>

                {/* ================= CONTACT PAGE ================= */}
                <main className="flex-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                        {/* HEADER */}
                        <div className="bg-gradient-to-r from-green-800 to-green-600 px-7 py-6">
                            <h1 className="text-2xl font-bold text-white">Contact Us</h1>
                            <p className="text-green-100 mt-1.5 text-sm">
                                We're here to help and answer your questions.
                            </p>
                        </div>

                        {/* CONTENT */}
                        <div className="p-5 lg:p-8 space-y-6">

                            {/* CONTACT INFO */}
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    {/* ADDRESS */}
                                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                                        <div className="flex items-center gap-2.5 mb-3">
                                            <div className="bg-green-100 p-2 rounded-full">
                                                <MapPin className="text-green-700" size={16} />
                                            </div>

                                            <h2 className="text-base font-bold text-gray-800">
                                                Address
                                            </h2>
                                        </div>

                                        <p className="text-gray-600 text-sm leading-6">
                                            <strong>UNIPULSE INSTRUMENTS PVT LTD</strong><br />
                                            948, Level 9 (Inside Regus business center)<br />
                                            Spaze I-Tech Park, A1 Tower<br />
                                            Sector - 49, Sohna Road<br />
                                            Gurgaon - 122018, Haryana, India
                                        </p>
                                    </div>

                                    {/* CONTACT */}
                                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                                        <div className="flex items-center gap-2.5 mb-3">
                                            <div className="bg-green-100 p-2 rounded-full">
                                                <Phone className="text-green-700" size={16} />
                                            </div>

                                            <h2 className="text-base font-bold text-gray-800">
                                                Contact
                                            </h2>
                                        </div>

                                        <div className="space-y-2 text-sm text-gray-600">
                                            <a href="tel:+911246769140" className="flex items-center gap-2 hover:text-green-700">
                                                <Phone size={13} />
                                                +91 (124) 676 9140
                                            </a>
                                            <a href="tel:+919810605510" className="flex items-center gap-2 hover:text-green-700">
                                                <Phone size={13} />
                                                ( Board)M: +91-9810605510/9311141480

                                            </a>

                                            <a href="mailto:marketing@unipulseinstruments.com" className="flex items-center gap-2 hover:text-green-700">
                                                <Mail size={13} />
                                                marketing@unipulseinstruments.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* SALES OFFICE */}
                                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                                        <div className="flex items-center gap-2.5 mb-3">
                                            <div className="bg-green-100 p-2 rounded-full">
                                                <MapPin className="text-green-700" size={16} />
                                            </div>

                                            <h2 className="text-base font-bold text-gray-800">
                                                Corporate address
                                            </h2>
                                        </div>

                                        <p className="text-gray-600 text-sm leading-6">
                                            <strong>BANGALORE BRANCH OFFICE UNIPULSE INDIA</strong> <br />
                                            Bangalore Tejas Arcade<br />
                                            3rd Floor, Tejas Arcade,, 527/B, 528/A, 529/A-9/1,<br />
                                            1st main road block, Subramanyanagar, Ward no. 9, <br />Bangalore, 560010
                                        </p>
                                        <br />

                                        <a href="tel:+91-8398020505" className="flex text-const { mutate } = useSWRConfig()
                                         items-center gap-2 hover:text-green-700">
                                            <Phone size={13} />
                                            +91-8398020505
                                        </a>
                                        <a href="mailto:bangalore@unipulseindia.com" className="flex items-center text-sm gap-2 hover:text-green-700">
                                            <Mail size={13} />
                                            bangalore@unipulseindia.com
                                        </a>
                                    </div>

                                    {/* SUPPORT */}
                                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                                        <div className="flex items-center gap-2.5 mb-3">
                                            <div className="bg-green-100 p-2 rounded-full">
                                                <Phone className="text-green-700" size={16} />
                                            </div>

                                            <h2 className="text-base font-bold text-gray-800">
                                                Service Support :
                                            </h2>
                                        </div>

                                        <div className="space-y-2 text-sm text-gray-600">
                                            <a href="tel:+919311141480" className="flex items-center gap-2 hover:text-green-700">
                                                <Phone size={13} />
                                                +91-9311141480
                                            </a>
                                            <a
                                                href="tel:+919971996309"
                                                className="flex items-center gap-2 hover:text-green-700"
                                            >
                                                <FaWhatsapp size={13} className="text-green-600" />
                                                +91-9971996309
                                            </a>

                                            <a href="mailto:service@unipulseinstruments.com" className="flex items-center gap-2 hover:text-green-700">
                                                <Mail size={13} />
                                                service@unipulseinstruments.com
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* CONTACT FORM */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-5 lg:p-7 shadow-sm">

                                <div className="mb-5">
                                    <h2 className="text-2xl font-bold text-gray-800">Send Us a Message</h2>
                                    <div className="w-16 h-0.5 bg-green-700 rounded-full mt-2"></div>
                                    <p className="text-gray-500 mt-2 text-sm">
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
                                    <h2 className="text-2xl font-bold text-gray-800">Find Us On Map</h2>
                                    <p className="text-gray-500 text-sm mt-1">
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
        </section>
    );
}





// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { api } from "../apis/apiList";
// import { ChevronsRight, Mail, Phone, MapPin } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

// export default function ContactUsClient({ categories = [], }) {

//     const router = useRouter();
//     const [loading, setLoading] = useState(false);
//     const [errors, setErrors] = useState({});
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         message: "",
//     });

//     const handleChange = (e) => {
//         setForm({
//             ...form, [e.target.name]: e.target.value,
//         });
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrors({});

//         if (!form.name.trim()) {
//             setErrors({
//                 name: true,
//             });
//             toast.error("Name is required");
//             return;
//         }
//         if (form.name.trim().length < 2) {
//             setErrors({
//                 name: true,
//             });
//             toast.error("Name must be at least 2 characters");
//             return;
//         }

//         if (!form.email.trim()) {
//             setErrors({
//                 email: true,
//             });
//             toast.error("Email is required");
//             return;
//         }
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(form.email)) {
//             setErrors({
//                 email: true,
//             });
//             toast.error("Please enter a valid email address");
//             return;
//         }

//         if (!form.phone.trim()) {
//             setErrors({
//                 phone: true,
//             });
//             toast.error("Phone number is required");
//             return;
//         }
//         const digitsOnly = form.phone.replace(/\D/g, "");
//         if (digitsOnly.length < 10 || digitsOnly.length > 15) {
//             setErrors({
//                 phone: true,
//             });
//             toast.error("Please enter a valid phone number (10-15 digits)");
//             return;
//         }
//         if (!form.message.trim()) {
//             setErrors({
//                 message: true,
//             });
//             toast.error("Message is required");
//             return;
//         }


//         setLoading(true);
//         try {
//             const res = await fetch(api.apiCall.contactUs, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json",
//                 },
//                 body: JSON.stringify({
//                     name: form.name,
//                     email: form.email,
//                     phone: form.phone,
//                     message: form.message,

//                 }),
//             });
//             if (res.ok) {

//                 toast.success("Form Submitted Successfully");
//                 // RESET FORM
//                 setForm({
//                     name: "",
//                     email: "",
//                     phone: "",
//                     message: "",
//                 });
//             } else {
//                 toast.error(json.message || "Submission Failed");
//             }

//         } catch (error) {
//             console.log(error);
//             toast.error("Network error. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (

//         <section className="pt-24 pb-32">

//             <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto gap-6 px-4">

//                 {/* ================= SIDEBAR ================= */}
//                 <aside className="w-full lg:w-[360px] bg-white mt-4 lg:p-4 lg:mt-0">
//                     <div className="lg:sticky lg:top-20 h-[calc(100vh-80px)] overflow-hidden">
//                         <div className="p-6 space-y-6 bg-green-800 text-white rounded h-full flex flex-col">

//                             {/* DOWNLOAD TEXT */}
//                             <div>
//                                 <h1 className="text-4xl font-bold">
//                                     Download
//                                 </h1>
//                                 <p className="text-sm mt-3 leading-7">
//                                     Our most recent catalogue, manuals and external dimension views can be downloaded.
//                                 </p>
//                             </div>

//                             <hr className="border-white/30" />
//                             {/* CATEGORY LIST */}
//                             <div className="flex flex-col flex-1 min-h-0">

//                                 <h3 className="text-2xl font-semibold mb-4">
//                                     List of Download Files
//                                 </h3>

//                                 <div className="flex flex-col gap-3 overflow-y-auto pr-1 custom-scroll flex-1">
//                                     {categories?.map((item, index) => (
//                                         <Link
//                                             key={`${item.id}-${index}`}
//                                             href="/products-list"
//                                             className="flex items-center justify-between bg-white text-black px-4 py-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
//                                         >
//                                             <div className="flex items-center gap-4">

//                                                 <img
//                                                     src={
//                                                         item.images?.length > 0 &&
//                                                             item.images[0]?.image_url
//                                                             ? `${api.image.imageURL}${item.images[0].image_url}`
//                                                             : "/images/default.png"
//                                                     }
//                                                     alt={item.title}
//                                                     width={80}
//                                                     height={80}
//                                                     className="object-contain rounded w-16 h-16"
//                                                 />
//                                                 <span className="text-[15px] font-medium leading-6">
//                                                     {item.title}
//                                                 </span>
//                                             </div>
//                                             <ChevronsRight className="text-gray-600" />
//                                         </Link>
//                                     ))}

//                                 </div>

//                             </div>

//                             <hr className="border-white/30" />

//                             {/* AUTH BUTTONS */}

//                             <div className="bg-white text-black p-4 rounded-xl shadow">

//                                 <div className="flex flex-col gap-3">

//                                     <button
//                                         onClick={() => router.push("/login")}
//                                         className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition cursor-pointer font-medium"
//                                     >
//                                         Login
//                                     </button>

//                                     <button
//                                         onClick={() => router.push("/register")}
//                                         className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer font-medium"
//                                     >
//                                         Register
//                                     </button>

//                                 </div>

//                             </div>

//                         </div>

//                     </div>

//                 </aside>

//                 {/* ================= CONTACT PAGE ================= */}

//                 <main className="flex-1 bg-[#f5f5f5]">

//                     <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

//                         {/* HEADER */}

//                         <div className="bg-gradient-to-r from-green-800 to-green-600 px-8 py-8">

//                             <h1 className="text-3xl font-bold text-white">
//                                 Contact Us
//                             </h1>

//                             <p className="text-green-100 mt-3 text-base">
//                                 We're here to help and answer your questions.
//                             </p>

//                         </div>

//                         {/* CONTENT */}

//                         <div className="p-5 lg:p-10 space-y-10">

//                             {/* CONTACT INFO — single horizontal band */}

//                             <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

//                                 <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200 items-stretch">

//                                     {/* ADDRESS */}

//                                     <div className="flex-1 p-6">

//                                         <div className="flex items-center gap-3 mb-4">

//                                             <div className="bg-green-100 p-2.5 rounded-full">
//                                                 <MapPin className="text-green-700" size={20} />
//                                             </div>

//                                             <h2 className="text-lg font-bold text-gray-800">
//                                                 Address
//                                             </h2>

//                                         </div>

//                                         <div className="space-y-4 text-gray-600 text-sm leading-6">

//                                             <div>
//                                                 {/* <p className="font-semibold text-gray-800 text-[13px] uppercase tracking-wide mb-1">
//                                                     Gurgaon Office
//                                                 </p> */}
//                                                 <p>
//                                                     UNIPULSE INSTRUMENTS PVT LTD<br />
//                                                     948, Level 9 (Inside Regus business center)<br />
//                                                     Spaze I-Tech Park, A1 Tower<br />
//                                                     Sector - 49, Sohna Road<br />
//                                                     Gurgaon - 122018, (State - Haryana), India
//                                                 </p>
//                                             </div>
//                                         </div>

//                                     </div>

//                                     {/* CONTACT DETAILS */}
//                                     <div className="flex-1 p-6">
//                                         <div className="flex items-center gap-3 mb-4">
//                                             <div className="bg-green-100 p-2.5 rounded-full">
//                                                 <Phone className="text-green-700" size={20} />
//                                             </div>

//                                             <h2 className="text-lg font-bold text-gray-800">
//                                                 Contact
//                                             </h2>

//                                         </div>

//                                         <div className="space-y-4 text-gray-600 text-sm">

//                                             <div>

//                                                 <p className="font-semibold text-gray-800 text-[13px] uppercase tracking-wide mb-2">
//                                                     Phone Numbers
//                                                 </p>

//                                                 <div className="space-y-1.5">

//                                                     <a
//                                                         href="tel:+911246769140"
//                                                         className="flex items-center gap-2 hover:text-green-700 transition"
//                                                     >
//                                                         <Phone size={14} className="shrink-0" />
//                                                         +91 (124) 676 9140 (Board)
//                                                     </a>

//                                                     <a
//                                                         href="tel:+919810605510"
//                                                         className="flex items-center gap-2 hover:text-green-700 transition"
//                                                     >
//                                                         <Phone size={14} className="shrink-0" />
//                                                         +91-9810605510
//                                                     </a>

//                                                     <a
//                                                         href="tel:+919311141480"
//                                                         className="flex items-center gap-2 hover:text-green-700 transition"
//                                                     >
//                                                         <Phone size={14} className="shrink-0" />
//                                                         +91-9311141480
//                                                     </a>

//                                                 </div>

//                                             </div>

//                                             <div>

//                                                 <p className="font-semibold text-gray-800 text-[13px] uppercase tracking-wide mb-2">
//                                                     Email Address
//                                                 </p>

//                                                 <a
//                                                     href="mailto:marketing@unipulseinstruments.com"
//                                                     className="flex items-center gap-2 hover:text-green-700 transition"
//                                                 >
//                                                     <Mail size={14} className="shrink-0" />
//                                                     marketing@unipulseinstruments.com
//                                                 </a>

//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* CONTACT FORM */}

//                             {/* CONTACT FORM */}

//                             <div className="bg-white border border-gray-200 rounded-3xl p-6 lg:p-10 shadow-sm">

//                                 <div className="mb-8">

//                                     <h2 className="text-4xl font-bold text-gray-800">
//                                         Send Us a Message
//                                     </h2>

//                                     <div className="w-24 h-1 bg-green-700 rounded-full mt-3"></div>

//                                     <p className="text-gray-500 mt-4 text-sm">
//                                         Fill out the form below and our team will contact you shortly.
//                                     </p>

//                                 </div>

//                                 <form
//                                     onSubmit={handleSubmit}
//                                     className="space-y-6"
//                                 >

//                                     {/* NAME + EMAIL */}
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                                         <div>
//                                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                                 Your Name
//                                             </label>

//                                             <input
//                                                 type="text"
//                                                 name="name"
//                                                 value={form.name}
//                                                 onChange={handleChange}
//                                                 placeholder="Enter your name"
//                                                 className={`w-full h-14 bg-gray-50 border rounded-2xl px-5 outline-none transition
// ${errors.name
//                                                         ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
//                                                         : "border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-100"
//                                                     }`}
//                                             />

//                                         </div>

//                                         <div>
//                                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                                 Your Email
//                                             </label>

//                                             <input
//                                                 type="text"
//                                                 name="email"
//                                                 value={form.email}
//                                                 onChange={handleChange}
//                                                 placeholder="Enter your name"
//                                                 className={`w-full h-14 bg-gray-50 border rounded-2xl px-5 outline-none transition
// ${errors.email
//                                                         ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
//                                                         : "border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-100"
//                                                     }`}
//                                             />

//                                         </div>

//                                     </div>

//                                     {/* MOBILE */}

//                                     <div>

//                                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                             Mobile Number
//                                         </label>
//                                         <input
//                                             type="tel"
//                                             name="phone"
//                                             value={form.phone}
//                                             onChange={handleChange}
//                                             placeholder="Enter your name"
//                                             className={`w-full h-14 bg-gray-50 border rounded-2xl px-5 outline-none transition
// ${errors.phone
//                                                     ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
//                                                     : "border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-100"
//                                                 }`}
//                                         />


//                                     </div>

//                                     {/* MESSAGE */}

//                                     <div>

//                                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                             Your Message
//                                         </label>

//                                         <textarea
//                                             rows={6}
//                                             name="message"
//                                             value={form.message}
//                                             onChange={handleChange}
//                                             placeholder="Write your message here..."
//                                             className={`w-full bg-gray-50 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100 transition resize-none
// ${errors.name
//                                                     ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
//                                                     : "border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-100"
//                                                 }`}
//                                         ></textarea>

//                                     </div>

//                                     {/* BUTTON */}
//                                     <div>
//                                         <button
//                                             type="submit"
//                                             disabled={loading}
//                                             className="w-full md:w-auto bg-green-700 hover:bg-green-800 transition-all duration-300 text-white px-8 h-14 rounded-2xl font-semibold shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
//                                         >
//                                             {loading ? "Submitting..." : "Submit"}
//                                         </button>
//                                     </div>
//                                 </form>

//                             </div>

//                             {/* MAP */}

//                             <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white p-4">

//                                 <div className="mb-4">

//                                     <h2 className="text-3xl font-bold text-gray-800 mb-2">
//                                         Find Us On Map
//                                     </h2>

//                                     <p className="text-gray-600">
//                                         Visit our office location directly through Google Maps.
//                                     </p>

//                                 </div>

//                                 <div className="rounded-2xl overflow-hidden">

//                                     <iframe
//                                         src="https://www.google.com/maps?q=Spaze%20I-Tech%20Park%20Sector%2049%20Gurgaon&output=embed"
//                                         width="100%"
//                                         height="450"
//                                         style={{ border: 0 }}
//                                         allowFullScreen=""
//                                         loading="lazy"
//                                         referrerPolicy="no-referrer-when-downgrade"
//                                     ></iframe>

//                                 </div>

//                             </div>

//                         </div>
//                     </div>

//                 </main>

//             </div>

//         </section>

//     );
// }