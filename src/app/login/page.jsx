"use client";

import { useState } from "react";
import { api } from "../apis/apiList";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
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

export default function LoginForm() {
  useUserLoginRedirect();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showResend, setShowResend] = useState(false);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  // const [resendLoading, setResendLoading] = useState(false);
  // const [resendSuccess, setResendSuccess] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      toast.success("Email verified successfully! You can login now.");
    }
  }, []);

  // ✅ Yeh rakho
  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      toast.success("Email verified successfully! You can login now.");
    }
  }, []);

  // useEffect(() => {
  //   if (searchParams.get("error") === "expired") {
  //     toast.error("Verification link expired. Please request a new one.");
  //   }
  // }, []);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrors({ email: "", password: "", general: "" });

    // 🔴 VALIDATION
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
          // setShowResend(true);
          error = "Your email is not verified. Please verify your email.";
        }
        else if (data?.code === "INACTIVE") {
          error = "Your account is inactive. Please contact admin.";
        }
        else if (data?.code === "INVALID_CREDENTIALS") {
          error = "Invalid email or password.";
        }

        setErrors((prev) => ({ ...prev, general: error }));
        return;
      }

      // ❌ TOKEN MISSING
      if (!data?.token) {
        setErrors((prev) => ({
          ...prev,
          general: "Token not received from server.",
        }));
        return;
      }

      // 🔥 CLEAR OLD DATA
      removeToken();
      removeUser();

      // 🔥 SAVE NEW
      setToken(data.token);
      if (data?.user) setUser(data.user);

      // 🔥 REDIRECT LOGIC
      const redirectPath = getRedirectPath();

      if (redirectPath) {
        removeRedirectPath();
        router.replace(redirectPath);
        return;
      }

      // 🔴 ADMIN
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

  // const handleResend = async () => {
  //   if (!email) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       general: "Enter your email first",
  //     }));
  //     return;
  //   }

  //   setResendLoading(true);  // ✅ loader start
  //   setResendSuccess(false);

  //   const res = await fetch(api.apiCall.resendVerficationEmail, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email }),
  //   });

  //   const data = await res.json();
  //   setResendLoading(false);  // ✅ loader stop

  //   if (!res.ok) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       general: data.message,
  //     }));
  //     return;
  //   }

  //   setResendSuccess(true);   // ✅ success state
  //   toast.success("Verification email sent again! Please check your inbox.");
  //   setShowResend(false);
  // };

  return (
    <section>
      <div className="mx-auto min-h-screen flex items-center justify-center bg-gray-100">
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* GENERAL ERROR */}
            {errors.general && (
              <p className="text-red-500 text-sm text-center">
                {errors.general}
              </p>
            )}

            {/* {showResend && (
              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="text-blue-600 underline text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendLoading ? (
                    <span className="flex items-center gap-1 justify-center">
                      <svg
                        className="animate-spin h-4 w-4 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12" cy="12" r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Resend Verification Email"
                  )}
                </button>

                {resendSuccess && (
                  <p className="text-green-600 text-xs mt-1">
                    ✅ Email sent! Please check your inbox.
                  </p>
                )}
              </div>
            )} */}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* REGISTER */}
            <Link
              href="/register"
              className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              User Registration
            </Link>

            {/*  NEW LINE ADD */}
            <p className="text-sm text-center mt-2">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-green-600 hover:underline cursor-pointer"
              >
                Sign up
              </Link>
            </p>

            {/* FORGOT PASSWORD */}
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
      </div>
    </section>
  );
}