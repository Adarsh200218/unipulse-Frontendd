'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronsRight } from 'lucide-react';
import { Omega, SquarePen } from "lucide-react";
import { Lock } from 'lucide-react';
import { api } from '../apis/apiList';
import { useAuthGuard, getToken, getUser, removeToken, removeUser } from '../../helper/getCommonData';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import CategorySideBar from '../component/CategorySideBar';

export default function InqueryForm({ categories }) {
    useAuthGuard();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [checking, setChecking] = useState(true); // ✅ flicker rok
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        requestFor: 'technical_support',
        relatedProduct: '',
        serialNo: '',
        firstName: '',
        email: '',
        phone: '',
        company: '',
        message: '',
    });

    const searchParams = useSearchParams();
    const productName = searchParams.get("productName");

    const REQUEST_OPTIONS = [
        { label: 'Technical Support', value: 'technical_support' },
        // { label: 'Local Distributor', value: 'local_distributor' },
        { label: 'Quotation', value: 'quotation' },
        { label: 'Operation Manual', value: 'operation_manual' },
        { label: 'Others', value: 'others' },
    ];

    // ✅ Admin check — agar admin hai to form bilkul nahi dikhega
    useEffect(() => {
        const u = getUser();
        const token = getToken();

        if (u?.role_id === 1) {
            localStorage.removeItem("redirect_after_login");
            router.replace("/dashboard/product-inquery");
            return; // checking true rahega = null return hoga = koi flicker nahi
        }

        if (u && token) setUser(u);
        else setUser(null);

        setChecking(false); // sirf normal user ke liye form render karo
    }, []);

    useEffect(() => {
        const u = getUser();
        if (u) {
            setForm(prev => ({ ...prev, firstName: u.name || '' }));
        }
    }, []);

    useEffect(() => {
        if (productName) {
            setForm(prev => ({ ...prev, relatedProduct: decodeURIComponent(productName) }));
        }
    }, [productName]);

    useEffect(() => {
        if (checking) return;

        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            setTimeout(() => {
                const form = document.getElementById("inquery-form");
                if (form) {
                    const y = form.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({ top: y, behavior: "smooth" });
                }
            }, 200);
        }
    }, [checking]);

    // ✅ Jab tak admin check chal raha hai — screen blank rahegi, koi flicker nahi
    if (checking) return null;

    // const handleLogout = () => {
    //     removeToken();
    //     removeUser();
    //     setUser(null);
    //     router.push("/");
    // };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors(prev => ({ ...prev, [e.target.name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!form.requestFor.trim()) newErrors.requestFor = 'Request For is required';
        if (!form.relatedProduct.trim()) newErrors.relatedProduct = 'Related Product is required';
        if (!form.serialNo.trim()) newErrors.serialNo = 'Serial No is required';
        if (!form.firstName.trim()) newErrors.firstName = 'Name is required';
        if (!form.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (form.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            const token = getToken();
            const res = await fetch(api.apiCall.requestPurposalAdd, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    request_for: form.requestFor,
                    related_product: form.relatedProduct,
                    serial_no: form.serialNo,
                    name: form.firstName,
                    message: form.message,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Submitted Successfully!');
                setTimeout(() => { router.back(); }, 1500);
            } else {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    toast.error(data.message || 'Something went wrong. Please try again.');
                }
            }
        } catch (err) {
            console.error(err);
            toast.error('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="pt-2">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6  md:grid-cols-12">

                    {/* SIDEBAR */}
                    <CategorySideBar categories={categories} />

                    {/* FORM */}
                    <main id="inquery-form" className="md:col-span-8 lg:col-span-8 xl:col-span-9 space-y-4 p-4  xl:mt-10">
                        <div className="container mx-auto mt-10">
                            <article className="section-wrap page ">
                                <div className="section-in  mx-auto bg-white shadow-2xl border-1 border-gray-200 rounded-lg p-4">

                                    <header className="article-header mb-2">
                                        <h1 className="text-3xl text-center font-bold uppercase">Submit Your Query</h1>
                                    </header>

                                    <div className="article-body mb-6 text-center text-gray-700 bg-[#EFEFEF] p-4">
                                        <p>Please fill in the form below and we will get back to you as soon as possible.</p>
                                    </div>

                                    {success && (
                                        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded text-center">
                                            ✅ Your query has been submitted successfully! We will get back to you soon.
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} noValidate className="bg-gray-50 p-4 rounded-lg shadow-inner">

                                        {/* Request for */}
                                        <div className="flex border border-gray-300 mb-[-1px]">
                                            <div className="w-40 min-w-[160px] bg-gray-200 flex items-center px-4 py-3 text-sm font-medium border-r border-gray-300">
                                                Request for<span className="text-red-600 ml-1">*</span>
                                            </div>
                                            <div className="flex-1 px-4 py-3 bg-white space-y-1">
                                                {REQUEST_OPTIONS.map((option) => (
                                                    <label key={option.value} className="flex items-center gap-2 text-sm cursor-pointer">
                                                        <input type="radio" name="requestFor" value={option.value} checked={form.requestFor === option.value} onChange={handleChange} className="accent-green-700" />
                                                        {option.label}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Related Product */}
                                        <div className="flex border border-gray-300 mb-[-1px]">
                                            <div className="w-40 min-w-[160px] bg-gray-200 flex items-center px-4 py-3 text-sm font-medium border-r border-gray-300">
                                                Related product<span className="text-red-600 ml-1">*</span>
                                            </div>
                                            <div className="flex-1 bg-white px-4 py-3">
                                                <input type="text" name="relatedProduct" value={form.relatedProduct} onChange={handleChange} placeholder="Enter related product"
                                                    className={`w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 
                                                    ${!!productName ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                                                    ${errors.relatedProduct ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                            </div>
                                        </div>

                                        {/* Serial No */}
                                        <div className="flex border border-gray-300 mb-[-1px]">
                                            <div className="w-40 min-w-[160px] bg-gray-200 flex items-center px-4 py-3 text-sm font-medium border-r border-gray-300 leading-5">
                                                <span>
                                                    Existing Serial No. / Product Specification
                                                </span>
                                                <span className="text-red-600 ml-1 text-base leading-none">*</span>
                                            </div>

                                            <div className="flex-1 bg-white px-4 py-3">
                                                <input
                                                    type="text"
                                                    name="serialNo"
                                                    value={form.serialNo}
                                                    onChange={handleChange}
                                                    placeholder="Enter serial number"
                                                    className={`w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${errors.serialNo ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                />

                                                {errors.serialNo && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.serialNo}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {/* <div className="flex border border-gray-300 mb-[-1px]">
                                        <div className="w-40 min-w-[160px] bg-gray-200 flex items-center px-4 py-3 text-sm font-medium border-r border-gray-300">
                                            Existing serial no of product specification<span className="text-red-600 ml-1">*</span>
                                        </div>
                                        <div className="flex-1 bg-white px-4 py-3">
                                            <input type="text" name="serialNo" value={form.serialNo} onChange={handleChange} placeholder="Enter serial number"
                                                className={`w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${errors.serialNo ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.serialNo && <p className="text-red-500 text-xs mt-1">{errors.serialNo}</p>}
                                        </div>
                                    </div> */}

                                        {/* Name */}
                                        <div className="flex border border-gray-300 mb-[-1px]">
                                            <div className="w-40 min-w-[160px] bg-gray-200 flex items-center px-4 py-3 text-sm font-medium border-r border-gray-300">
                                                Name <span className="text-red-600 ml-1">*</span>
                                            </div>
                                            <div className="flex-1 bg-white px-4 py-3">
                                                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Your name"
                                                    className={`w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="flex border border-gray-300">
                                            <div className="w-40 min-w-[160px] bg-gray-200 flex items-start px-4 py-3 text-sm font-medium border-r border-gray-300 pt-4">
                                                Message <span className="text-red-600 ml-1">*</span>
                                            </div>
                                            <div className="flex-1 bg-white px-4 py-3">
                                                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Enter your message" rows={5} maxLength={1000}
                                                    className={`w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                                <p className="text-xs text-gray-400 text-right mt-1">{form.message?.length || 0} / 500</p>
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex justify-between mt-6">
                                            <button type="button" onClick={() => router.back()} className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition uppercase font-medium">
                                                Back
                                            </button>
                                            <button type="submit" disabled={loading} className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition disabled:opacity-50 uppercase font-medium">
                                                {loading ? "Sending..." : "SEND"}
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </article>
                        </div>
                    </main>

                </div>
            </div>
        </section>
    );
}

