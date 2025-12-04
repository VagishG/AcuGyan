"use client";
import { redirect } from "next/navigation"
import Link from "next/link";
import React,{useState} from "react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
    redirect("/dashboard")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        <div className="p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-6 w-6 bg-green-600 rounded-full"></div>
            <span className="text-lg font-semibold">Acupoint</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">Find Your Balance</h1>

          <p className="text-gray-600 mb-8">
            Unlock your body's natural healing potential, one point at a time.
          </p>

          <div className="w-full h-72 bg-[url('/placeholder.jpg')] bg-cover bg-center rounded-xl" />
        </div>

        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
          <p className="text-gray-600 mb-8">Start your wellness journey today.</p>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="8+ characters"
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

            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold">
              Create Account
            </button>

            <button
              type="button"
              className="w-full border py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <img src="/google.svg" className="w-5 h-5" />
              Continue with Google
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            By creating an account, you agree to our{" "}
            <span className="text-black font-medium">Terms of Service</span>.
          </p>

          <p className="text-center mt-2 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-black font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>


  );
}
