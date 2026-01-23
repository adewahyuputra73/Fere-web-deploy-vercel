"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl active:scale-95";

    const variants = {
      primary:
        "bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500 shadow-lg shadow-brand-500/20",
      secondary:
        "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500",
      outline:
        "border-2 border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-500",
      ghost:
        "bg-transparent text-slate-600 hover:bg-slate-50 hover:text-brand-600 focus:ring-slate-500",
      destructive:
        "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-lg shadow-rose-500/20",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs gap-2",
      md: "h-11 px-6 text-sm gap-2.5",
      lg: "h-13 px-8 text-base gap-3",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!isLoading && children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
