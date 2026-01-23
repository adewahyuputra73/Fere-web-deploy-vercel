"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Store,
  Tag,
  Wallet,
  X,
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: "Products",
    href: "/products",
    icon: <Package className="h-5 w-5" />,
  },
  {
    label: "Categories",
    href: "/categories",
    icon: <Tag className="h-5 w-5" />,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    label: "Customers",
    href: "/customers",
    icon: <Users className="h-5 w-5" />,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    label: "Payments",
    href: "/payments",
    icon: <Wallet className="h-5 w-5" />,
  },
];

const bottomNavItems: NavItem[] = [
  {
    label: "Store Settings",
    href: "/store",
    icon: <Store className="h-5 w-5" />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, sidebarMobileOpen, toggleSidebar, setSidebarMobileOpen } =
    useUIStore();

  const isActive = (href: string) => {
    if (href === "/") return pathname === href || pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const NavLink = ({ item }: { item: NavItem }) => (
    <Link
      href={item.href}
      onClick={() => setSidebarMobileOpen(false)}
      className={cn(
        "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 mb-1",
        isActive(item.href)
          ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
          : "text-slate-400 hover:text-white hover:bg-slate-800",
        sidebarCollapsed && "justify-center px-2"
      )}
    >
      <div className={cn(
        "transition-transform duration-200 group-hover:scale-110",
        sidebarCollapsed ? "" : "min-w-[20px]"
      )}>
        {item.icon}
      </div>
      {!sidebarCollapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
    </Link>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-6">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center px-6 mb-10 transition-layout",
          sidebarCollapsed ? "justify-center px-0" : "gap-3"
        )}
      >
        <div className="h-10 w-10 flex-shrink-0 rounded-2xl bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
          <Store className="h-6 w-6 text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white leading-tight">{APP_NAME}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Admin Panel</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        <p className={cn(
          "text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-4",
          sidebarCollapsed && "hidden"
        )}>Main Menu</p>
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-4 mt-auto">
        <p className={cn(
          "text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-4",
          sidebarCollapsed && "hidden"
        )}>Configuration</p>
        {bottomNavItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </div>

      {/* Collapse Button (Desktop) */}
      <button
        onClick={toggleSidebar}
        className="hidden lg:flex absolute -right-3 top-24 h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-400 hover:text-brand-600 hover:border-brand-200 transition-all z-50 focus:outline-none"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-40",
          "bg-slate-950 border-r border-slate-900 transition-layout",
          sidebarCollapsed ? "lg:w-20" : "lg:w-64"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 lg:hidden shadow-2xl",
          "transform transition-transform duration-300 ease-in-out",
          sidebarMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button */}
        <button
          onClick={() => setSidebarMobileOpen(false)}
          className="absolute right-4 top-6 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
        >
          <X className="h-5 w-5" />
        </button>
        <SidebarContent />
      </aside>
    </>
  );
}
