"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "../apis/apiList";

import CategorySideBar from "../component/CategorySideBar";
import ContactButtonright from "../component/ContactButtonright";

export default function RegisterPage({ categories }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    email: '',
    name: '',
    phone: '',
    company_name: '',
    state: '',
    address: '',
    password: '',
    confirmPassword: '',
    other_info: '',
    // lastName: '',
    // country: '',
  });

  const refs = {
    email: useRef(null),
    name: useRef(null),
    phone: useRef(null),
    company_name: useRef(null),
    state: useRef(null),
    address: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    other_info: useRef(null),
    // country: useRef(null),

  };

  const showError = (message, fieldRef) => {
    toast.error(message);
    if (fieldRef?.current) {
      fieldRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      fieldRef.current.focus();
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const form = document.getElementById("register-form");
      if (form) {
        setTimeout(() => {
          const y = form.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100); // thoda wait karo taaki page render ho jaye
      }
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;

    if (!form.email.trim()) { toast.error("Email is required"); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) { toast.error("Please enter a valid email address"); return; }

    if (!form.name.trim()) { toast.error(" Name is required"); return; }
    if (form.name.trim().length < 2) { toast.error("Name must be at least 2 characters"); return; }

    if (!form.phone.trim()) { showError("Phone number is required", refs.phone); return; }
    const digitsOnly = form.phone.replace(/\D/g, "");
    if (digitsOnly.length < 10 || digitsOnly.length > 15) { showError("Please enter a valid phone number (10-15 digits)", refs.phone); return; }

    if (!form.company_name.trim()) { toast.error("Please enter your company name"); return; }

    if (!form.state.trim()) { toast.error("Please Select State"); return; }

    if (!form.password) { toast.error("Password is required"); return; }
    if (form.password.length < 6 || form.password.length > 12) { toast.error("Password must be between 6 to 12 characters"); return; }
    if (!form.confirmPassword) { toast.error("Please confirm your password"); return; }
    if (form.password !== form.confirmPassword) { toast.error("Confirm Password do not match"); return; }

    setLoading(true);
    try {
      const res = await fetch(api.apiCall.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          phone: form.phone,
          company_name: form.company_name,
          state: form.state,
          address: form.address,
          password: form.password,
          password_confirmation: form.confirmPassword,
          other_info: form.other_info,
          // country: form.country,
        }),
      });

      let json;
      try { json = await res.json(); } catch { json = {}; }

      if (res.ok) {
        toast.success("Please check your email to verify your account before logging in");
        router.push("/login");
      } else {
        toast.error(json.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const indianStates = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ].sort();
  // const [user, setUser] = useState(null);
  // const handleLogout = () => {
  //   removeToken();
  //   removeUser();
  //   setUser(null);
  //   router.Push("/");
  // };

  return (

    <>
      <section className="pt-6">

        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2  md:grid-cols-12">

            {/* ================= SIDEBAR ================= */}
            <CategorySideBar categories={categories} />



            <main id="register-form" className="md:col-span-8 lg:col-span-8 xl:col-span-9 space-y-6 p-4 mt-2 xl:mt-4 !flex items-center justify-center">
              <div className="container mx-auto ">
                <article className="section-wrap page p-0 lg:p-4">
                  <div className="section-in  mx-auto bg-white shadow border-1 border-gray-300 rounded-lg py-4 px-2">

                    <header className="article-header mb-2">
                      <h1 className="text-2xl text-center font-bold uppercase">UNIPULSE INDIA</h1>
                    </header>

                    <div className="article-body mb-2 text-gray-700  p-2 rounded">
                      <p className="mb-4 font-bold">
                        ONLINE ENQUIRY, ONLINE OFFER , ONLINE BUY AND DOWNLOAD
                        DOCUMENTS REGISTRATION
                      </p>
                      <ul className="list-disc ml-5 mb-2">
                        <li className="text-[15px] leading-7 ">User registration is required to download the Manuals.</li>
                        <li className="text-[15px] leading-7 ">User registration is required to BUY ONLINE , DRAWINGS REQUEST and GET
                          QUOTES.</li>
                        <li className="text-[15px] leading-7 "> If you have not completed user registration, PRESS user registration page and
                          register as a user.</li>
                      </ul>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3 px-2">
                      <div className="flex mb-2">

                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-green-700 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: step === 1 ? '50%' : '100%' }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{step} / 2</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4 bg-gray-50 p-4 rounded-lg shadow ">

                      {/* ---- PART 1 ---- */}
                      {step === 1 && (
                        <>
                          <div>
                            <label className="block font-medium mb-1">E-mail address <span className="text-red-600">*</span></label>
                            <input type="text" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email"
                              className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                          </div>

                          <div>
                            <label className="block font-medium mb-1">Name <span className="text-red-600">*</span></label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your first name"
                              className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                          </div>

                          <div>
                            <label className="block font-medium mb-1">Telephone <span className="text-red-600">*</span></label>
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number"
                              className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                          </div>

                          <div className="flex justify-end mt-2">
                            <button type="button" onClick={() => setStep(2)}
                              className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 transition">
                              NEXT →
                            </button>
                          </div>
                        </>
                      )}

                      {/* ---- PART 2 ---- */}
                      {step === 2 && (
                        <>
                          <div>
                            <label className="block font-medium mb-1">Company name <span className="text-red-600">*</span></label>
                            <input type="text" name="company_name" value={form.company_name} onChange={handleChange} placeholder="Your company"
                              className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                          </div>

                          <div>
                            <label className="block font-medium mb-1">Address <span className="text-red-600"></span></label>
                            <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Street, Room, Building"
                              className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                          </div>

                          <div>
                            <label className="block font-medium mb-1">
                              State <span className="text-red-600">*</span>
                            </label>

                            <select
                              name="state"
                              value={form.state}
                              onChange={handleChange}
                              size={1}
                              className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                              style={{ direction: "ltr" }}
                            >
                              <option value="">Select State</option>

                              {indianStates.map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block font-medium mb-1">Password <span className="text-red-600">*</span></label>
                            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="6-12 characters"
                              className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                          </div>

                          <div>
                            <label className="block font-medium mb-1">Confirm Password <span className="text-red-600">*</span></label>
                            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password"
                              className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                          </div>

                          <div>
                            <label className="block font-medium mb-1">Any Other Information <span className="text-red-600"></span></label>
                            <textarea name="other_info" value={form.other_info} onChange={handleChange} placeholder="Any Other Information"
                              className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                          </div>

                          <div className="flex justify-between mt-4">
                            <button type="button" onClick={() => setStep(1)}
                              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">
                              ← PREVIOUS
                            </button>
                            <button type="submit" disabled={loading}
                              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition disabled:opacity-50">
                              {loading ? "Registering..." : "REGISTER"}
                            </button>
                          </div>
                        </>
                      )}

                    </form>

                    <div className="mt-6 text-gray-600 text-sm px-2">
                      <h3 className="font-semibold mb-1 text-[18px] lg:textxl pb-2 text-red-800">
                        Please note that we decline or delete user registration in the following cases:
                      </h3>

                      <ol className="list-decimal pl-5">
                        <li className="mb-2">
                          Where entered information is significantly ambiguous.
                        </li>

                        <li className="mb-2">
                          Where there is false application in registered content.
                        </li>

                        <li className="mb-2">
                          Where disqualified in the past.
                        </li>

                        <li className="mb-2">
                          Where we otherwise judge inappropriate as a user.
                        </li>
                      </ol>
                    </div>

                  </div>
                </article>
              </div>
            </main>

          </div>
        </div>
      </section>

      <ContactButtonright />



    </>
  );
}





