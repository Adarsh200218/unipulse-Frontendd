"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the values
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (

    <section>
         <div className=" mx-auto min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">User Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
     

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
          
            <div className=" text-center w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition" >
              <Link href="/register" > User Registration</Link>
             
            </div>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Don't have an account? <a href="" className="text-green-600 hover:underline">Sign up</a>
        </p>
        
      </div>
    </div>
    </section>
 
  );
}