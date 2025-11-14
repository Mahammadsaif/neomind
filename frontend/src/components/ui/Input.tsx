"use client";

import React from "react";
import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        "w-full px-3 py-2 rounded-xl bg-neo-surface text-neo-on text-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-neo-primary shadow-subtle",
        className
      )}
      {...props}
    />
  );
}