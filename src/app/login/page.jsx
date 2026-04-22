"use client";

import { useState } from "react";
import { api } from "../apis/apiList";
import { useRouter } from "next/navigation";
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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

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

      // ❌ LOGIN FAILED
      if (!response.ok) {
        const msg = (data?.message || "").toLowerCase();
        let error = "Invalid login details.";

        if (msg.includes("inactive")) {
          error = "Your account is inactive.";
        } else if (msg.includes("password") && !msg.includes("email")) {
          error = "Wrong password.";
        } else if (msg.includes("email") && !msg.includes("password")) {
          error = "Wrong email.";
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
        router.replace("/dashboard");
      } else {
        router.replace("/");
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, general: err.message }));
    } finally {
      setLoading(false);
    }
  };

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