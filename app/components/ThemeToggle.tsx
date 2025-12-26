"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9" /> // Placeholder to prevent layout shift
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Toggle Theme"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <span className="material-symbols-outlined text-[20px] leading-none flex items-center justify-center">
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
