"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "../../components/ThemeToggle"; // Adjust path if needed
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const stats = [
    { label: "Days Active", value: "12", icon: "calendar_today" },
    { label: "Points Learned", value: "45", icon: "school" },
    { label: "Saved", value: "8", icon: "bookmark" },
  ];

  const menuItems = [
    { icon: "person", label: "Account Settings", href: "#", badge: "" },
    { icon: "notifications", label: "Notifications", href: "#", toggle: true },
    { icon: "security", label: "Privacy & Security", href: "#", badge: "" },
    { icon: "help", label: "Help & Support", href: "#", badge: "" },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-main dark:text-white font-display pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
        <h1 className="text-xl font-bold">Profile</h1>
        <div className="flex gap-2">
          <ThemeToggle />
          <button className="w-10 h-10 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center pt-8 pb-6 px-6">
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full p-1 bg-white dark:bg-white/10 shadow-sm">
            <img
              src={
                user?.photoURL ||
                "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix"
              }
              alt="Profile"
              className="w-full h-full rounded-full bg-orange-100 dark:bg-orange-500/20"
            />
          </div>
          <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center border-2 border-white dark:border-[#0a1f16] shadow-sm">
            <span className="material-symbols-outlined text-sm">edit</span>
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-1">
          {user?.displayName || "User"}
        </h2>
        <p className="text-text-sub dark:text-gray-400 font-medium">
          {user?.email}
        </p>
      </div>

      {/* Stats Row */}
      <div className="px-6 mb-8">
        <div className="flex justify-between gap-3">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex-1 bg-white dark:bg-white/5 rounded-2xl p-3 flex flex-col items-center gap-1 shadow-sm border border-gray-100 dark:border-white/5"
            >
              <span className="material-symbols-outlined text-primary text-xl mb-1">
                {stat.icon}
              </span>
              <span className="font-bold text-lg leading-none">
                {stat.value}
              </span>
              <span className="text-[10px] text-text-sub dark:text-gray-400 uppercase font-bold tracking-wide text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu List */}
      <div className="px-6 mb-8 flex flex-col gap-3">
        <h3 className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-widest ml-1 mb-1">
          Settings
        </h3>
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-100 dark:border-white/5 whitespace-nowrap overflow-hidden"
          >
            <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/10 flex items-center justify-center text-text-sub dark:text-gray-400">
              <span className="material-symbols-outlined">{item.icon}</span>
            </div>
            <div className="flex-grow font-semibold text-sm">{item.label}</div>

            {item.toggle ? (
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  notificationsEnabled
                    ? "bg-primary"
                    : "bg-gray-200 dark:bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    notificationsEnabled ? "left-6" : "left-1"
                  }`}
                />
              </button>
            ) : (
              <span className="material-symbols-outlined text-gray-300 dark:text-gray-500">
                chevron_right
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-6">
        <button
          onClick={handleLogout}
          className="w-full h-14 rounded-2xl border-2 border-red-100 dark:border-red-900/30 text-red-500 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">logout</span>
          Log Out
        </button>
        <p className="text-xs text-center text-text-sub/50 dark:text-gray-600 mt-6">
          Version 1.0.2 • AcuTherapy Inc.
        </p>
      </div>
    </div>
  );
}
