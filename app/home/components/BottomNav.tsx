"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNav = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#0a1f16] border-t border-gray-100 dark:border-white/5 flex items-center justify-between px-8 py-4 z-40 pb-safe">
      <Link
        href="/home"
        className={`flex flex-col items-center gap-1 ${
          pathname === "/home"
            ? "text-primary"
            : "text-text-sub dark:text-gray-400 hover:text-primary"
        } transition-colors`}
      >
        <div
          className={`w-12 h-8 rounded-full ${
            pathname === "/home" ? "bg-green-100 dark:bg-green-500/20" : ""
          } flex items-center justify-center`}
        >
          <span className="material-symbols-outlined text-2xl">home</span>
        </div>
        <span className="text-[10px] font-bold">Home</span>
      </Link>

      <Link
        href="/home/search"
        className={`flex flex-col items-center gap-1 ${
          isActive("/home/search")
            ? "text-primary"
            : "text-text-sub dark:text-gray-400 hover:text-primary"
        } transition-colors`}
      >
        <div
          className={`w-12 h-8 rounded-full ${
            isActive("/home/search") ? "bg-green-100 dark:bg-green-500/20" : ""
          } flex items-center justify-center`}
        >
          <span className="material-symbols-outlined text-2xl">search</span>
        </div>
        <span className="text-[10px] font-medium">Search</span>
      </Link>

      <Link
        href="/home/library"
        className={`flex flex-col items-center gap-1 ${
          isActive("/home/library")
            ? "text-primary"
            : "text-text-sub dark:text-gray-400 hover:text-primary"
        } transition-colors`}
      >
        <div
          className={`w-12 h-8 rounded-full ${
            isActive("/home/library") ? "bg-green-100 dark:bg-green-500/20" : ""
          } flex items-center justify-center`}
        >
          <span className="material-symbols-outlined text-2xl">
            library_books
          </span>
        </div>
        <span className="text-[10px] font-medium">Library</span>
      </Link>

      <Link
        href="/home/profile"
        className={`flex flex-col items-center gap-1 ${
          isActive("/home/profile")
            ? "text-primary"
            : "text-text-sub dark:text-gray-400 hover:text-primary"
        } transition-colors`}
      >
        <div
          className={`w-12 h-8 rounded-full ${
            isActive("/home/profile") ? "bg-green-100 dark:bg-green-500/20" : ""
          } flex items-center justify-center`}
        >
          <span className="material-symbols-outlined text-2xl">person</span>
        </div>
        <span className="text-[10px] font-medium">Profile</span>
      </Link>
    </div>
  );
};
