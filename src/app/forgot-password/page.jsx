"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "../apis/apiList";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ email: "", general: "" });

    const searchParams = useSearchParams();
    const token = searchParams.get("restToken"); // ✅ same naming
    const router = useRouter();

    // ================= SEND RESET LINK =================
    const handleSendResetLink = async (e) => {
        e.preventDefault();

        setErrors({ email: "", general: "" });

        if (!email) {
            setErrors({ email: "Please enter email" });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(api.apiCall.sendResetLink, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors((prev) => ({
                    ...prev,
                    general: data?.message || "Something went wrong",
                }));
                return;
            }

            toast.success(data?.message || "Reset link sent to your email");

        } catch (err) {
            setErrors((prev) => ({
                ...prev,
                general: err.message,
            }));
        } finally {
            setLoading(false);
        }
    };

    // ================= RESET PASSWORD =================
    const handleResetPassword = async (e) => {
        e.preventDefault();

        setErrors({ general: "" });

        if (!password) {
            setErrors({ general: "Please enter password" });
            return;
        }

        if (password !== confirmPassword) {
            setErrors({ general: "Passwords do not match" });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(api.apiCall.resetPassword, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    token: token,
                    password: password,
                    password_confirmation: confirmPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors((prev) => ({
                    ...prev,
                    general: data?.message || "Something went wrong",
                }));
                return;
            }

            toast.success(data?.message || "Password reset successful");

            setTimeout(() => {
                router.push("/login");
            }, 1500);

        } catch (err) {
            setErrors((prev) => ({
                ...prev,
                general: err.message,
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                {/* Heading */}
                <h2 className="text-2xl font-bold text-center mb-6">
                    {token ? "Reset Password" : "Forgot Password"}
                </h2>

                {/* ================= EMAIL FORM ================= */}
                {!token && (
                    <form onSubmit={handleSendResetLink} className="space-y-4">

                        <div>
                            <label className="block mb-1 text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors((prev) => ({ ...prev, email: "" }));
                                }}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {errors.general && (
                            <p className="text-red-500 text-sm">{errors.general}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>

                    </form>
                )}

                {/* ================= RESET FORM ================= */}
                {token && (
                    <form onSubmit={handleResetPassword} className="space-y-4">

                        <div>
                            <label className="block mb-1 text-gray-700">New Password</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {errors.general && (
                            <p className="text-red-500 text-sm">{errors.general}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            {loading ? "Updating..." : "Update Password"}
                        </button>

                    </form>
                )}

            </div>
        </section>
    );
}