"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "../apis/apiList";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [message, setMessage] = useState("Verifying your email...");
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            setMessage("Invalid verification link.");
            setStatus("error");
            return;
        }

        const verifyEmail = async () => {
            try {
                const res = await fetch(`${api.apiCall.verifyEmail}?token=${token}`);
                const data = await res.json();

                if (data.code === "VERIFIED") {
                    setMessage("Email verified successfully!");
                    setStatus("success");
                    toast.success("Email verified! Please login...");
                    setTimeout(() => router.push("/login"), 2000);
                } else if (data.code === "ALREADY_VERIFIED") {
                    setMessage("Your account is already verified.");
                    setStatus("error");
                    toast.info("Already verified! Please to login...");
                    setTimeout(() => router.push("/login"), 3000);
                } else {
                    setMessage("Verification failed. Please try again.");
                    setStatus("error");
                }
            } catch (err) {
                setMessage("Something went wrong. Please try again.");
                setStatus("error");
            }
        };

        verifyEmail();
    }, []);

    return (
        <section>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md">

                    {status === "loading" && (
                        <div className="flex flex-col items-center gap-4">
                            <svg className="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            <p className="text-gray-600">{message}</p>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-green-500 text-6xl">✅</div>
                            <h2 className="text-xl font-bold text-green-600">{message}</h2>
                            <p className="text-gray-500 text-sm">Redirecting to login</p>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-red-500 text-6xl"></div>
                            <h2 className="text-xl font-bold text-red-600">{message}</h2>
                            {/* <p className="text-gray-500 text-sm">You can Login Now</p> */}
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}