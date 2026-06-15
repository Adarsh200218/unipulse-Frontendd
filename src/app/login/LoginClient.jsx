"use client";

import { useState, useEffect } from "react";
import { api } from "../apis/apiList";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  setToken,
  setUser,
  removeToken,
  removeUser,
  useUserLoginRedirect,
  getRedirectPath,
  removeRedirectPath,
} from "../../helper/getCommonData";
import Link from "next/link";
import CategorySideBar from "../component/CategorySideBar";
import ContactButtonright from "../component/ContactButtonright";

export default function LoginForm({ categories }) {
  useUserLoginRedirect();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      toast.success("Email verified successfully! You can login now.");
    }
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const form = document.getElementById("login-form");
      if (form) {
        setTimeout(() => {
          const y = form.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100); // thoda wait karo taaki page render ho jaye
      }
    }
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();

    setErrors({ email: "", password: "", general: "" });

    if (!email && !password) {
      setErrors({
        email: "Please enter email",
        password: "Password is required",
        general: "",
      });
      return;
    }

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is Required" }));
      return;
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(api.apiCall.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        let error = data?.error || "Invalid email or password.";

        if (data?.code === "NOT_VERIFIED") {
          error = "Your email is not verified. Please verify your email.";
        } else if (data?.code === "INACTIVE") {
          error = "Your account is inactive. Please contact admin.";
        } else if (data?.code === "INVALID_CREDENTIALS") {
          error = "Invalid email or password.";
        }

        setErrors((prev) => ({ ...prev, general: error }));
        return;
      }

      if (!data?.token) {
        setErrors((prev) => ({
          ...prev,
          general: "Token not received from server.",
        }));
        return;
      }

      removeToken();
      removeUser();

      setToken(data.token);
      if (data?.user) setUser(data.user);

      const redirectPath = getRedirectPath();

      if (redirectPath) {
        removeRedirectPath();
        router.replace(redirectPath);
        return;
      }

      if (data.user.role_id === 1) {
        router.replace("/dashboard/product-inquery");
      } else {
        router.replace("/products-list");
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, general: err.message }));
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <section className="pt-6" >
      <div className="container mx-auto min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2  md:grid-cols-12">

          {/* ================= SIDEBAR ================= */}
          <CategorySideBar categories={categories} />


          {/* ================= LOGIN FORM ================= */}
          <main id="login-form" className="md:col-span-8 lg:col-span-8 xl:col-span-9 space-y-6 p-4 mt-2 xl:mt-16 flex items-center justify-center">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-xl">

              <h2 className="text-2xl font-bold mb-6 text-center  ">
                User Login
              </h2>

              <form onSubmit={handleLogin} className="space-y-4">

                {/* EMAIL */}
                <div>
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    placeholder="********"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                {/* GENERAL ERROR */}
                {errors.general && (
                  <p className="text-red-500 text-sm text-center">
                    {errors.general}
                  </p>
                )}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                {/* REGISTER LINK */}
                <Link
                  href="/register"
                  className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  User Registration
                </Link>

                <p className="text-sm text-center mt-2">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-green-600 hover:underline cursor-pointer"
                  >
                    Sign up
                  </Link>
                </p>

                <p className="text-sm text-center">
                  <Link
                    href="/forgot-password"
                    className="text-green-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </p>

              </form>
            </div>
          </main>
        </div>

      </div>
    </section>

        <ContactButtonright />
  
  
  
  </>
  );
}