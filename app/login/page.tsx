"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation"


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  redirect("/dashboard")
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f7f5] relative">
      <div className="absolute inset-0 bg-gradient-radial from-green-200/60 via-transparent to-transparent"></div>

      <div className="relative z-10 text-center mb-10">
        <div className="mx-auto h-12 w-12 bg-green-600 rounded-xl flex items-center justify-center text-white text-2xl">
          🌱
        </div>
        <p className="text-xl font-semibold mt-2">AcuFlow</p>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome back</h1>
        <p className="text-center text-gray-600 mb-8">
          Log in to access your protocols.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold">
            Log In
          </button>
        </form>

        <p className="text-center text-gray-700 text-sm mt-6">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-green-600 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
