"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-main dark:text-white pb-24 font-display transition-colors duration-200">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-8 pb-4">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-input-bg dark:bg-white/10 rounded-xl flex items-center justify-center text-primary">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <path
                d="M12 21C12 21 8 16 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 16 12 21 12 21Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.5 20.8C11.5 20.8 6.5 15.5 6.5 11C6.5 8.5 8 7 10 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.5 20.8C12.5 20.8 17.5 15.5 17.5 11C17.5 8.5 16 7 14 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">TherapyHub</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/home/profile"
            className="h-10 w-10 rounded-full bg-orange-200 overflow-hidden border border-white dark:border-white/10 shadow-sm cursor-pointer"
          >
            {/* Avatar Placeholder */}
            <img
              src={
                user?.photoURL ||
                "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix"
              }
              alt="User Profile"
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
      </header>

      {/* Hero Text */}
      <div className="px-6 py-4">
        <h1 className="text-3xl font-bold mb-1">Find your balance</h1>
        <p className="text-text-sub dark:text-gray-400 font-medium">
          What feels off today?
        </p>
      </div>

      {/* Search Bar */}
      <Link href="/home/search" className="block px-6 mb-8 cursor-pointer">
        <div className="relative pointer-events-none">
          <input
            type="text"
            readOnly
            placeholder="Search protocol, symptom, or condition..."
            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white dark:bg-white/5 border border-transparent focus:border-primary focus:ring-0 shadow-sm text-sm placeholder:text-text-sub/50 dark:placeholder:text-gray-500 text-text-main dark:text-white transition-all pointer-events-none"
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl">
            search
          </span>
        </div>
      </Link>

      {/* Quick Actions */}
      <div className="px-6 mb-10 flex gap-4 justify-between">
        <div className="flex-1 h-32 bg-white dark:bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-primary/20">
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <span className="text-xs font-bold text-center">Read Books</span>
        </div>

        <div className="flex-1 h-32 bg-white dark:bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-primary/20">
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center">
            <span className="material-symbols-outlined">bookmark</span>
          </div>
          <span className="text-xs font-bold text-center">Saved</span>
        </div>

        <div className="flex-1 h-32 bg-white dark:bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-primary/20">
          <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined">add</span>
          </div>
          <span className="text-xs font-bold text-center">Add Protocol</span>
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="mb-10">
        <div className="px-6 flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recently Viewed</h2>
          <a
            href="#"
            className="text-primary text-sm font-bold hover:underline"
          >
            See All
          </a>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="overflow-x-auto flex gap-4 px-6 pb-4 scrollbar-hide snap-x">
          {/* Card 1 */}
          <div className="min-w-[280px] snap-center bg-white dark:bg-white/5 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-lg transition-transform hover:-translate-y-1">
            <div className="h-40 bg-gray-200 dark:bg-white/10 relative">
              <span className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">
                Acupressure
              </span>
              <div className="w-full h-full flex items-center justify-center bg-[#4a6e5d] text-white/20">
                {/* Placeholder Image Representation */}
                <svg
                  className="w-20 h-20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold mb-1">Neck Tension Relief</h3>
              <div className="flex items-center justify-between mt-3 text-sm text-text-sub dark:text-gray-400 font-medium">
                <span>Beginner</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    schedule
                  </span>
                  <span>5 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="min-w-[280px] snap-center bg-white dark:bg-white/5 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-lg transition-transform hover:-translate-y-1">
            <div className="h-40 bg-gray-200 dark:bg-white/10 relative">
              <span className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-green-700">
                Reflexology
              </span>
              <div className="w-full h-full flex items-center justify-center bg-[#7aa38d] text-white/20">
                <svg
                  className="w-20 h-20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2zm0-10h2v8h-2z" />
                </svg>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold mb-1">Sleep Aid</h3>
              <div className="flex items-center justify-between mt-3 text-sm text-text-sub dark:text-gray-400 font-medium">
                <span>Intermediate</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    schedule
                  </span>
                  <span>15 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted & Popular */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold mb-4">Trusted & Popular</h2>
        <div className="flex flex-col gap-4">
          {/* List Item 1 */}
          <div className="bg-white dark:bg-white/5 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
            <div className="h-16 w-16 bg-orange-100 dark:bg-orange-500/20 rounded-xl flex-shrink-0 flex items-center justify-center">
              <span className="text-2xl">💆‍♀️</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[10px]">
                    verified
                  </span>{" "}
                  USER
                </span>
                <span className="text-[10px] text-text-sub dark:text-gray-400 font-medium">
                  • 15k users
                </span>
              </div>
              <h3 className="text-base font-bold">Migraine Protocol</h3>
              <p className="text-xs text-text-sub dark:text-gray-400 mt-0.5">
                LI4 & GB20 • Instant Relief
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-text-sub dark:text-gray-300">
              <span className="material-symbols-outlined text-lg">
                chevron_right
              </span>
            </div>
          </div>

          {/* List Item 2 */}
          <div className="bg-white dark:bg-white/5 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
            <div className="h-16 w-16 bg-yellow-100 dark:bg-yellow-500/20 rounded-xl flex-shrink-0 flex items-center justify-center">
              <span className="text-2xl">🧘</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[10px]">
                    verified
                  </span>{" "}
                  VERIFIED
                </span>
                <span className="text-[10px] text-text-sub dark:text-gray-400 font-medium">
                  • 8k users
                </span>
              </div>
              <h3 className="text-base font-bold">Digestive Health</h3>
              <p className="text-xs text-text-sub dark:text-gray-400 mt-0.5">
                Stomach meridian flow
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-text-sub dark:text-gray-300">
              <span className="material-symbols-outlined text-lg">
                chevron_right
              </span>
            </div>
          </div>

          {/* List Item 3 */}
          <div className="bg-white dark:bg-white/5 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
            <div className="h-16 w-16 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
              {/* Image Placeholder */}
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-500">
                  spa
                </span>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-200 dark:bg-white/10 text-text-sub dark:text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  COMMUNITY
                </span>
              </div>
              <h3 className="text-base font-bold">Lower Back Pain</h3>
              <p className="text-xs text-text-sub dark:text-gray-400 mt-0.5">
                Bladder meridian points
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-text-sub dark:text-gray-300">
              <span className="material-symbols-outlined text-lg">
                chevron_right
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
