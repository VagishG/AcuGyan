"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "../components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    // Dynamically import firebase to avoid SSR issues
    const { auth, googleProvider } = await import("@/lib/firebase");
    const { signInWithPopup } = await import("firebase/auth");

    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // Redirect to dashboard or home after successful registration
      window.location.href = "/home";
    } catch (error) {
      console.error("Error signing in with Google", error);
      alert("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white transition-colors duration-200 min-h-screen flex items-center justify-center relative">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="relative flex w-full max-w-sm flex-col px-4 py-8 sm:px-6">
        {/* Background decorative elements */}
        <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none -z-10" />

        {/* Main Content */}
        <div className="flex flex-col gap-8">
          {/* Header & Logo */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex items-center justify-center">
              <div className="flex items-center justify-center h-20 w-20 rounded-3xl bg-input-bg dark:bg-white/5 text-primary shadow-sm">
                {/* Lotus Icon SVG */}
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 stroke-[1.5]"
                >
                  <path
                    d="M12 21C12 21 8 16 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 16 12 21 12 21Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.5 20.8C11.5 20.8 6.5 15.5 6.5 11C6.5 8.5 8 7 10 7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.5 20.8C12.5 20.8 17.5 15.5 17.5 11C17.5 8.5 16 7 14 7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8C9 5 5 5 5 10C5 13 9 17 12 19"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8C15 5 19 5 19 10C19 13 15 17 12 19"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <h1 className="text-3xl font-bold tracking-tight text-center text-text-main dark:text-white">
                Create Account
              </h1>
              <p className="text-text-sub text-base font-normal text-center">
                Join AcuTherapy today
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            className="flex flex-col gap-4 px-1"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-text-main dark:text-gray-200 text-sm font-semibold ml-1"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full h-14 rounded-xl bg-input-bg dark:bg-white/5 border-transparent focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:ring-0 text-text-main dark:text-white placeholder:text-text-sub/50 p-4 text-base transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sub/60 pointer-events-none">
                  <span className="material-symbols-outlined text-[20px]">
                    person
                  </span>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-text-main dark:text-gray-200 text-sm font-semibold ml-1"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full h-14 rounded-xl bg-input-bg dark:bg-white/5 border-transparent focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:ring-0 text-text-main dark:text-white placeholder:text-text-sub/50 p-4 text-base transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sub/60 pointer-events-none">
                  <span className="material-symbols-outlined text-[20px]">
                    mail
                  </span>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-text-main dark:text-gray-200 text-sm font-semibold ml-1"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full h-14 rounded-xl bg-input-bg dark:bg-white/5 border-transparent focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:ring-0 text-text-main dark:text-white placeholder:text-text-sub/50 p-4 pr-12 text-base transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center text-text-sub/60 hover:text-primary transition-colors focus:outline-none"
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            {/* Register Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-14 rounded-xl bg-primary hover:bg-primary-hover active:scale-[0.98] text-white text-lg font-bold tracking-wide shadow-lg shadow-primary/25 transition-all duration-200"
              >
                Sign Up
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-semibold text-text-sub/60 uppercase">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl h-14 px-5 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-200 dark:border-transparent text-text-main dark:text-white text-base font-semibold shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {loading ? "Signing in..." : "Google"}
            </button>
          </form>

          {/* Footer */}
          <div className="flex flex-col items-center pb-6">
            <p className="text-text-sub text-sm text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-bold hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
