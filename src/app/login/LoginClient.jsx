"use client";

import { useState, useEffect } from "react";
import { api } from "../apis/apiList";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ChevronsRight } from "lucide-react";
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

        {/* ================= LOGIN FORM ================= */}
        <main className="flex-1 flex items-center justify-center p-4 bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">

            <h2 className="text-2xl font-bold mb-6 text-center">
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
    </section>
  );
}