"use client";

import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "px-6 py-2.5 rounded-2xl font-medium text-sm transition-all active:scale-95";

  const styles = {
    primary:
      "bg-neo-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:brightness-110",
    secondary:
      "bg-neo-accent text-black hover:brightness-110",
    outline:
      "border border-white/20 text-neo-on hover:bg-white/10",
  };

  return (
    <button className={clsx(base, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}