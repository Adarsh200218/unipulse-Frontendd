"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "../apis/apiList";
import { ChevronsRight } from "lucide-react";

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

  return (
    <section>
      <div className="flex flex-col lg:flex-row min-h-screen max-w-7xl mx-auto">

        {/* ================= SIDEBAR ================= */}
        <aside className="w-full lg:w-[380px] bg-white mt-4 lg:p-4 lg:mt-0">
          <div className="lg:sticky lg:top-20 h-[calc(100vh-80px)] overflow-hidden">
            <div className="p-6 space-y-6 bg-green-800 text-white rounded h-full flex flex-col">

              {/* DOWNLOAD TEXT */}
              <div>
                <h1 className="text-2xl font-bold">Download</h1>
                <p className="text-sm mt-2">
                  Our most recent catalogue, manuals and external dimension views can be downloaded.
                </p>
              </div>

              <hr className="border-white/30" />

              {/* CATEGORY LIST */}
              <div className="flex flex-col flex-1 min-h-0">
                <h3 className="text-xl font-semibold mb-3">
                  List of Download Files
                </h3>
                <div className="flex flex-col gap-2 overflow-y-auto pr-1 custom-scroll flex-1">
                  {categories?.map((item) => (
                    <Link
                      key={item.id}
                      href="/products-list"
                      className="flex items-center justify-between bg-white text-black px-3 py-1 rounded-lg  
                        border border-gray-200 shadow-sm  hover:shadow-md hover:-translate-y-0.5 transition "
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            item.images?.length > 0 && item.images[0]?.image_url
                              ? `${api.image.imageURL}${item.images[0].image_url}`
                              : "/images/default.png"
                          }
                          alt={item.title}
                          width={80}
                          height={80}
                          className="object-contain rounded w-20 h-auto"
                        />
                        {item.title}
                      </div>

                      <ChevronsRight />
                    </Link>
                  ))}
                </div>
              </div>

              <hr className="border-white/30" />

              {/* AUTH BUTTONS */}
              <div className="bg-white text-black p-4 rounded shadow">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => router.push("/login")}
                    className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => router.push("/register")}
                    className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              </div>

            </div>
          </div>
        </aside>

        {/* ================= REGISTER FORM =================
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          <div className="container mx-auto mt-10">
            <article className="section-wrap page p-6">
              <div className="section-in max-w-3xl mx-auto bg-white shadow-2xl rounded-lg p-6">

                <header className="article-header mb-2">
                  <h1 className="text-3xl font-bold uppercase">UNIPULSE Registration</h1>
                </header>

                <div className="article-body mb-6 text-gray-700 bg-[#EFEFEF] p-4">
                  <p className="mb-4">
                    By registering with the UNIPULSE group, member-exclusive services will be available. Registration is free.
                  </p>
                  <ul className="list-disc ml-5 mb-4">
                    <li>Download operation manual, external dimensions & application software</li>
                    <li>Receive latest info about new products, user cases, and more via newsletter</li>
                  </ul>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner">

                  <div>
                    <label className="block font-medium mb-1">E-mail address <span className="text-red-600">*</span></label>
                    <input type="text" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">First name <span className="text-red-600">*</span></label>
                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Your first name" className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Last name <span className="text-red-600">*</span></label>
                    <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Your last name" className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Company name <span className="text-red-600">*</span></label>
                    <input type="text" name="company_name" value={form.company_name} onChange={handleChange} placeholder="Your company" className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Password <span className="text-red-600">*</span></label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="6-12 characters" className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Confirm Password <span className="text-red-600">*</span></label>
                    <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Address <span className="text-red-600">*</span></label>
                    <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Street, Room, Building" className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Country <span className="text-red-600">*</span></label>
                    <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="Your country" className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Telephone <span className="text-red-600">*</span></label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div className="flex justify-between mt-4">
                    <button type="submit" disabled={loading} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition disabled:opacity-50">
                      {loading ? "Registering..." : "REGISTER"}
                    </button>
                    <Link href="/login" className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">
                      CANCEL
                    </Link>
                  </div>

                </form>

                <div className="mt-6 text-gray-600 text-sm">
                  <h5 className="font-semibold mb-1">Protection of private information</h5>
                  <p className="mb-4">We shall carefully manage the private information entered in the Contact form according to our privacy policy.</p>
                  <h5 className="font-semibold mb-1">Terms of Service</h5>
                  <p className="mb-4">Please note that we may decline or delete user registration in cases such as ambiguous information, false content, past disqualification, or otherwise deemed inappropriate.</p>
                </div>

              </div>
            </article>
          </div>
        </main> */}
        {/* ================= REGISTER FORM ================= */}
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          <div className="container mx-auto mt-10">
            <article className="section-wrap page p-6">
              <div className="section-in max-w-3xl mx-auto bg-white shadow-2xl rounded-lg p-6">

                <header className="article-header mb-2">
                  <h1 className="text-3xl text-center font-bold uppercase">UNIPULSE INDIA</h1>
                </header>

                <div className="article-body mb-6 text-gray-700 bg-[#EFEFEF] p-4">
                  <p className="mb-4 font-bold">
                    ONLINE ENQUIRY, ONLINE OFFER , ONLINE BUY AND DOWNLOAD
                    DOCUMENTS REGISTRATION
                  </p>
                  <ul className="list-disc ml-5 mb-4">
                    <li>User registration is required to download the Manuals.</li>
                    <li>User registration is required to BUY ONLINE , DRAWINGS REQUEST and GET
                      QUOTES.</li>
                    <li>If you have not completed user registration, PRESS user registration page and
                      register as a user.</li>
                  </ul>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex mb-2">
                    {/* <div className={`flex-1 text-center text-sm font-medium pb-2 border-b-2 ${step === 1 ? 'border-green-700 text-green-700' : 'border-gray-300 text-gray-400'}`}>
                      Personal Info
                    </div> */}
                    {/* <div className={`flex-1 text-center text-sm font-medium pb-2 border-b-2 ${step === 2 ? 'border-green-700 text-green-700' : 'border-gray-300 text-gray-400'}`}>
                      Account Details
                    </div> */}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-700 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: step === 1 ? '50%' : '100%' }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{step} / 2</p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner min-h-[500px]">

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

                      <div className="flex justify-end mt-4">
                        <button type="button" onClick={() => setStep(2)}
                          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">
                          NEXT →
                        </button>
                      </div>
                    </>
                  )}

                  {/* ---- PART 2 ---- */}
                  {step === 2 && (
                    <>
                      <div>
                        <label className="block font-medium mb-1">Company name <span className="text-red-600"></span></label>
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

                <div className="mt-6 text-gray-600 text-sm">
                  <h5 className="font-semibold mb-1">
                    Please note that we decline or delete user registration in the following cases:
                  </h5>

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
    </section>
  );
}






// "use client";
// import Link from "next/link";
// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { api } from "../apis/apiList";

// export default function RegisterPage({ categories }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     company_name: '',
//     address: '',
//     phone: '',
//     country: '',
//   });
//   const refs = {
//     firstName: useRef(null),
//     lastName: useRef(null),
//     email: useRef(null),
//     company_name: useRef(null),
//     password: useRef(null),
//     confirmPassword: useRef(null),
//     address: useRef(null),
//     country: useRef(null),
//     phone: useRef(null),
//   };

//   const showError = (message, fieldRef) => {
//     toast.error(message);
//     if (fieldRef?.current) {
//       fieldRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
//       fieldRef.current.focus(); // focus bhi karega field pe
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     e.stopPropagation(); // browser validation rok do
//     if (loading) return;


//     // ─── EMAIL ────────────────────────────────────────────
//     if (!form.email.trim()) {
//       toast.error("Email is required");
//       return;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(form.email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     // ─── FIRST NAME ───────────────────────────────────────
//     if (!form.firstName.trim()) {
//       toast.error("First name is required");
//       return;
//     }
//     if (form.firstName.trim().length < 2) {
//       toast.error("First name must be at least 2 characters");
//       return;
//     }

//     // ─── LAST NAME ────────────────────────────────────────
//     if (!form.lastName.trim()) {
//       toast.error("Last name is required");
//       return;
//     }
//     if (form.lastName.trim().length < 2) {
//       toast.error("Last name must be at least 2 characters");
//       return;
//     }

//     // ─── COMPANY ──────────────────────────────────────────
//     if (!form.company_name.trim()) {
//       toast.error("Company name is required");
//       return;
//     }

//     // ─── PASSWORD ─────────────────────────────────────────
//     if (!form.password) {
//       toast.error("Password is required");
//       return;
//     }
//     if (form.password.length < 6 || form.password.length > 12) {
//       toast.error("Password must be between 6 to 12 characters");
//       return;
//     }

//     // ─── CONFIRM PASSWORD ─────────────────────────────────
//     if (!form.confirmPassword) {
//       toast.error("Please confirm your password");
//       return;
//     }
//     if (form.password !== form.confirmPassword) {
//       toast.error("Confirm Password do not match");
//       return;
//     }

//     // ─── ADDRESS ──────────────────────────────────────────
//     if (!form.address.trim()) {
//       toast.error("Address is required");
//       return;
//     }
//     if (form.address.trim().length < 10) {
//       toast.error("Please enter a complete address (min 10 characters)");
//       return;
//     }

//     // ─── COUNTRY ──────────────────────────────────────────
//     if (!form.country.trim()) {
//       toast.error("Country is required");
//       return;
//     }

//     if (!form.phone.trim()) {
//       showError("Phone number is required", refs.phone);
//       return;
//     }

//     // Sirf digits nikaalo (spaces, dashes, brackets hata ke)
//     const digitsOnly = form.phone.replace(/\D/g, "");
//     if (digitsOnly.length < 10 || digitsOnly.length > 15) {
//       showError("Please enter a valid phone number (10-15 digits)", refs.phone);
//       return;
//     }

//     // const phoneRegex = /^[+]?[0-9\s\-()+]{10,20}$/;
//     // if (!phoneRegex.test(form.phone)) {
//     //   showError("Please enter a valid phone number", refs.phone);
//     //   return;
//     // }

//     // ─── ✅ API CALL ──────────────────────────────────────
//     setLoading(true);
//     try {
//       const res = await fetch(api.apiCall.register, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//         },
//         body: JSON.stringify({
//           first_name: form.firstName,
//           last_name: form.lastName,
//           email: form.email,
//           password: form.password,
//           password_confirmation: form.confirmPassword,
//           phone: form.phone,
//           company_name: form.company_name,
//           address: form.address,
//           country: form.country,
//         }),
//       });

//       let json;
//       try {
//         json = await res.json();
//       } catch {
//         json = {};
//       }

//       if (res.ok) {
//         toast.success("Please check your email to verify your account before logging in");
//         router.push("/login");
//       } else {
//         toast.error(json.message || "Registration failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section>
//       <div className="container mx-auto mt-10">
//         <article className="section-wrap page p-6">
//           <div className="section-in max-w-3xl mx-auto bg-white shadow-2xl rounded-lg p-6">
//             <header className="article-header mb-2">
//               <h1 className="text-3xl font-bold uppercase">UNIPULSE Registration</h1>
//             </header>

//             <div className="article-body mb-6 text-gray-700 bg-[#EFEFEF] p-4">
//               <p className="mb-4">
//                 By registering with the UNIPULSE group, member-exclusive services will be available. Registration is free.
//               </p>
//               <ul className="list-disc ml-5 mb-4">
//                 <li>Download operation manual, external dimensions & application software</li>
//                 <li>Receive latest info about new products, user cases, and more via newsletter</li>
//               </ul>
//             </div>

//             {/* ✅ noValidate — browser validation completely band */}
//             <form onSubmit={handleSubmit} noValidate className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner">

//               <div>
//                 <label className="block font-medium mb-1">E-mail address <span className="text-red-600">*</span></label>
//                 <input
//                   type="text"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   required
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">First name <span className="text-red-600">*</span></label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={form.firstName}
//                   onChange={handleChange}
//                   placeholder="Your first name"
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Last name <span className="text-red-600">*</span></label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={form.lastName}
//                   onChange={handleChange}
//                   placeholder="Your last name"
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Company name <span className="text-red-600">*</span></label>
//                 <input
//                   type="text"
//                   name="company_name"
//                   value={form.company_name}
//                   onChange={handleChange}
//                   placeholder="Your company"
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Password <span className="text-red-600">*</span></label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="6-12 characters"
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Confirm Password <span className="text-red-600">*</span></label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={form.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Confirm your password"
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Address <span className="text-red-600">*</span></label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={form.address}
//                   onChange={handleChange}
//                   placeholder="Street, Room, Building"
//                   className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Country <span className="text-red-600">*</span></label>
//                 <input
//                   type="text"
//                   name="country"
//                   value={form.country}
//                   onChange={handleChange}
//                   placeholder="Your country"
//                   className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Telephone <span className="text-red-600">*</span></label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   placeholder="Enter your phone number"
//                   className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               <div className="flex justify-between mt-4">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition disabled:opacity-50"
//                 >
//                   {loading ? "Registering..." : "REGISTER"}
//                 </button>
//                 <Link href="/login" className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">
//                   CANCEL
//                 </Link>
//               </div>
//             </form>

//             <div className="mt-6 text-gray-600 text-sm">
//               <h5 className="font-semibold mb-1">Protection of private information</h5>
//               <p className="mb-4">We shall carefully manage the private information entered in the Contact form according to our privacy policy.</p>
//               <h5 className="font-semibold mb-1">Terms of Service</h5>
//               <p className="mb-4">Please note that we may decline or delete user registration in cases such as ambiguous information, false content, past disqualification, or otherwise deemed inappropriate.</p>
//             </div>

//           </div>
//         </article>
//       </div>
//     </section>
//   );
// }

