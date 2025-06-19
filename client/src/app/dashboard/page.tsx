/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../context/auth-context";
import { toast } from "react-hot-toast";
import ntl from "@/../public/ntl_logo.jpg";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f2fe] via-[#d8b4fe] to-[#f0abfc] px-6 py-10">
      <div className="w-full max-w-4xl rounded-2xl shadow-2xl bg-white/20 backdrop-blur-lg px-10 py-8 text-center">
        {/* Branding Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <img
            src={ntl.src}
            alt="DocCraft Logo"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-3xl font-bold text-gray-900">DocCraft Dashboard</h1>
        </div>

        <p className="text-gray-700 mb-8">
          Welcome <span className="font-semibold">{user?.email}</span> 🎉<br />
          You are now logged in to your DocCraft workspace.
        </p>

        <button
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
