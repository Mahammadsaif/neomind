import React from "react";
import clsx from "clsx";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Card({ className, children }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl bg-neo-surface p-4 shadow-soft border border-white/5",
        className
      )}
    >
      {children}
    </div>
  );
}