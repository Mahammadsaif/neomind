// src/components/layout/AppLayout.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Topbar from "./Topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-bg text-text overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main (shifts to account for sidebar width) */}
      <div
        className={`
          flex flex-col flex-1 transition-all duration-300
          ${open ? "ml-[220px]" : "ml-[60px]"}
        `}
      >
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}