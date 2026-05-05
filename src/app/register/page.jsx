// "use client";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { api } from "../apis/apiList";

// export default function RegisterPage() {
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

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.firstName.trim()) {
//       toast.error("First name is required");
//       return;
//     }

//     if (!form.lastName.trim()) {
//       toast.error("Last name is required");
//       return;
//     }

//     if (!form.email.trim()) {
//       toast.error("Email is required");
//       return;
//     }

//     if (!form.address.trim()) {
//       toast.error("Address is required");
//       return;
//     }

//     if (!form.confirmPassword) {
//       toast.error("Please confirm your password");
//       return;
//     }

//     if (form.password !== form.confirmPassword) {
//       toast.error("Confirm Password do not match");
//       return;
//     }
//     if (!form.country) {
//       toast.error("Please select a country");
//       return;
//     }


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

//       const json = await res.json();

//       if (res.ok) {
//         toast.success("Registration Successfull! Please Login");
//         router.push("/login");
//       } else {
//         toast.error(json.message || "Registration failed");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("Network error. Please try again");
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

//             <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner">

//               <div>
//                 <label className="block font-medium mb-1">E-mail address <span className="text-red-600">*</span></label>
//                 <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Last name <span className="text-red-600">*</span></label>
//                 <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Your last name" required
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">First name <span className="text-red-600">*</span></label>
//                 <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Your first name" required
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Company name <span className="text-red-600">*</span></label>
//                 <input type="text" name="company_name" value={form.company_name} onChange={handleChange} placeholder="Your company" required
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Password <span className="text-red-600">*</span></label>
//                 <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="6-12 alphanumeric characters" required
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Confirm Password <span className="text-red-600">*</span></label>
//                 <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Address <span className="text-red-600">*</span></label>
//                 <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Street, Room, Building" required
//                   className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Country <span className="text-red-600">*</span></label>
//                 <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="Your country" required
//                   className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Telephone <span className="text-red-600">*</span></label>
//                 <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" required
//                   className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div className="flex justify-between mt-4">
//                 <button type="submit" disabled={loading}
//                   className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition disabled:opacity-50">
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

// "use client";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { api } from "../apis/apiList";

// export default function RegisterPage() {
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

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;

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
//     // if (!/[a-zA-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
//     //   toast.error("Password must contain letters and numbers (alphanumeric)");
//     //   return;
//     // }

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
//       toast.error("Please enter a complete address");
//       return;
//     }

//     // ─── COUNTRY ──────────────────────────────────────────
//     if (!form.country.trim()) {
//       toast.error("Country is required");
//       return;
//     }

//     // ─── PHONE ────────────────────────────────────────────
//     if (!form.phone.trim()) {
//       toast.error("Phone number is required");
//       return;
//     }
//     const phoneRegex = /^[+]?[0-9\s\-()\+]{7,15}$/;
//     if (!phoneRegex.test(form.phone)) {
//       toast.error("Please enter a valid phone number");
//       return;
//     }

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

//             <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner">

//               <div>
//                 <label className="block font-medium mb-1">E-mail address <span className="text-red-600">*</span></label>
//                 <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">First name <span className="text-red-600">*</span></label>
//                 <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Your first name" required
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Last name <span className="text-red-600">*</span></label>
//                 <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Your last name" required
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>


//               <div>
//                 <label className="block font-medium mb-1">Company name <span className="text-red-600">*</span></label>
//                 <input type="text" name="company_name" value={form.company_name} onChange={handleChange} placeholder="Your company" required
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Password <span className="text-red-600">*</span></label>
//                 <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="6-12 alphanumeric characters" required
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Confirm Password <span className="text-red-600">*</span></label>
//                 <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required
//                   className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Address <span className="text-red-600">*</span></label>
//                 <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Street, Room, Building" required
//                   className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Country <span className="text-red-600">*</span></label>
//                 <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="Your country" required
//                   className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Telephone <span className="text-red-600">*</span></label>
//                 <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" required
//                   className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>

//               <div className="flex justify-between mt-4">
//                 <button type="submit" disabled={loading}
//                   className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition disabled:opacity-50">
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

"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "../apis/apiList";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company_name: '',
    address: '',
    phone: '',
    country: '',
  });
  const refs = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    company_name: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    address: useRef(null),
    country: useRef(null),
    phone: useRef(null),
  };

  const showError = (message, fieldRef) => {
    toast.error(message);
    if (fieldRef?.current) {
      fieldRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      fieldRef.current.focus(); // focus bhi karega field pe
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // browser validation rok do
    if (loading) return;


    // ─── EMAIL ────────────────────────────────────────────
    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // ─── FIRST NAME ───────────────────────────────────────
    if (!form.firstName.trim()) {
      toast.error("First name is required");
      return;
    }
    if (form.firstName.trim().length < 2) {
      toast.error("First name must be at least 2 characters");
      return;
    }

    // ─── LAST NAME ────────────────────────────────────────
    if (!form.lastName.trim()) {
      toast.error("Last name is required");
      return;
    }
    if (form.lastName.trim().length < 2) {
      toast.error("Last name must be at least 2 characters");
      return;
    }

    // ─── COMPANY ──────────────────────────────────────────
    if (!form.company_name.trim()) {
      toast.error("Company name is required");
      return;
    }

    // ─── PASSWORD ─────────────────────────────────────────
    if (!form.password) {
      toast.error("Password is required");
      return;
    }
    if (form.password.length < 6 || form.password.length > 12) {
      toast.error("Password must be between 6 to 12 characters");
      return;
    }

    // ─── CONFIRM PASSWORD ─────────────────────────────────
    if (!form.confirmPassword) {
      toast.error("Please confirm your password");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Confirm Password do not match");
      return;
    }

    // ─── ADDRESS ──────────────────────────────────────────
    if (!form.address.trim()) {
      toast.error("Address is required");
      return;
    }
    if (form.address.trim().length < 10) {
      toast.error("Please enter a complete address (min 10 characters)");
      return;
    }

    // ─── COUNTRY ──────────────────────────────────────────
    if (!form.country.trim()) {
      toast.error("Country is required");
      return;
    }

    if (!form.phone.trim()) {
      showError("Phone number is required", refs.phone);
      return;
    }

    // Sirf digits nikaalo (spaces, dashes, brackets hata ke)
    const digitsOnly = form.phone.replace(/\D/g, "");
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      showError("Please enter a valid phone number (10-15 digits)", refs.phone);
      return;
    }

    // const phoneRegex = /^[+]?[0-9\s\-()+]{10,20}$/;
    // if (!phoneRegex.test(form.phone)) {
    //   showError("Please enter a valid phone number", refs.phone);
    //   return;
    // }

    // ─── ✅ API CALL ──────────────────────────────────────
    setLoading(true);
    try {
      const res = await fetch(api.apiCall.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          password: form.password,
          password_confirmation: form.confirmPassword,
          phone: form.phone,
          company_name: form.company_name,
          address: form.address,
          country: form.country,
        }),
      });

      let json;
      try {
        json = await res.json();
      } catch {
        json = {};
      }

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

  return (
    <section>
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

            {/* ✅ noValidate — browser validation completely band */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner">

              <div>
                <label className="block font-medium mb-1">E-mail address <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">First name <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Your first name"
                  className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Last name <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Your last name"
                  className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Company name <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="company_name"
                  value={form.company_name}
                  onChange={handleChange}
                  placeholder="Your company"
                  className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Password <span className="text-red-600">*</span></label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="6-12 characters"
                  className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Confirm Password <span className="text-red-600">*</span></label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full border bg-white border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Address <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street, Room, Building"
                  className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Country <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Your country"
                  className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Telephone <span className="text-red-600">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition disabled:opacity-50"
                >
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
    </section>
  );
}