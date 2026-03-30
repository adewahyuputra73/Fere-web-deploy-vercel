"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, Header } from "@/components/layout";
import { useUIStore, useAuthStore } from "@/stores";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarCollapsed } = useUIStore();
  const { isAuthenticated, token } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!isAuthenticated || !token) {
      router.replace("/login");
    }
  }, [mounted, isAuthenticated, token, router]);

  // Tampilkan blank screen saat cek auth (hindari flash konten)
  if (!mounted || !isAuthenticated || !token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div
        className={cn(
          "transition-layout min-h-screen flex flex-col",
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        )}
      >
        <Header />

        <main className="flex-1 mt-16 p-4 lg:p-8 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
