"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Asidebar from "./componants/Asidebar";
import Header from "./componants/Header";
import "@/app/(user)/globals.css";

// Pages that don't need the admin shell (no sidebar/header)
const AUTH_PATHS = ["/admin2/login", "/admin2/register"];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const isAuthPage = AUTH_PATHS.includes(pathname);

  useEffect(() => {
    // Skip auth check on login/register pages
    if (isAuthPage) {
      setAuthChecked(true);
      return;
    }

    try {
      const stored = localStorage.getItem("admin");
      if (!stored) {
        router.replace("/admin2/login");
        return;
      }
      const admin = JSON.parse(stored);
      if (admin?.role !== "admin") {
        localStorage.removeItem("admin");
        router.replace("/admin2/login");
        return;
      }
    } catch (_) {
      router.replace("/admin2/login");
      return;
    }

    setAuthChecked(true);
  }, [pathname, isAuthPage, router]);

  // Auth pages — render without any shell
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Still verifying session — show spinner
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-9 h-9 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Full admin shell
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Asidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Right side */}
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-5">
          {children}
        </main>
      </div>

    </div>
  );
}
