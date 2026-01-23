"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthStore, useUIStore } from "@/stores";
import { Avatar, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Menu,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Search,
  Command,
} from "lucide-react";
import Link from "next/link";

export function Header() {
  const { user, logout } = useAuthStore();
  const { setSidebarMobileOpen, sidebarCollapsed } = useUIStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-layout",
        sidebarCollapsed ? "lg:left-20" : "lg:left-64",
        "left-0"
      )}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setSidebarMobileOpen(true)}
            className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Elegant Search bar */}
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 bg-slate-50 border border-slate-100 rounded-xl group focus-within:ring-2 focus-within:ring-brand-500/10 focus-within:border-brand-500 transition-all">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-brand-600" />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent border-none outline-none text-sm w-40 lg:w-64 placeholder:text-slate-400 text-slate-600 font-medium"
            />
            <div className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-400 font-bold">
              <Command className="h-2.5 w-2.5" />
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative group rounded-xl hover:bg-slate-50">
            <Bell className="h-5 w-5 text-slate-500 group-hover:text-brand-600 transition-colors" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500/20" />
          </Button>

          <div className="h-8 w-[1px] bg-slate-100 mx-2" />

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="group flex items-center gap-3 p-1 pr-2 hover:bg-slate-50 rounded-xl transition-all"
            >
              <Avatar
                src={user?.avatar}
                alt={user?.name}
                fallback={user?.name}
                size="sm"
                className="ring-2 ring-transparent group-hover:ring-brand-500/20 transition-all"
              />
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-none">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-wider">
                  {user?.role || "Global Admin"}
                </p>
              </div>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-slate-400 transition-transform duration-200",
                  dropdownOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2.5 z-50 animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 mb-1 border-b border-slate-50">
                  <p className="text-sm font-bold text-slate-900 leading-none">
                    {user?.name || "Admin User"}
                  </p>
                  <p className="text-xs text-slate-400 font-medium mt-1.5">{user?.email || "admin@ferepos.com"}</p>
                </div>

                <div className="px-2 space-y-0.5">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-lg transition-all"
                  >
                    <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center">
                      <User className="h-4 w-4 text-brand-600" />
                    </div>
                    <span className="font-medium">My Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-lg transition-all"
                  >
                    <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center">
                      <Settings className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="font-medium">Settings</span>
                  </Link>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-50 px-2">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg w-full transition-all"
                  >
                    <div className="h-8 w-8 rounded-lg bg-red-50 flex items-center justify-center">
                      <LogOut className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="font-bold">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
