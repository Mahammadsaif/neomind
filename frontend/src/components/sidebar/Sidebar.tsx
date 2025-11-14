// src/components/sidebar/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SquaresFour,
  ChatCircleDots,
  BracketsCurly,
  GearSix,
  UserCircle,
} from "phosphor-react";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();

  const items = [
    { label: "Chat", icon: ChatCircleDots, href: "/chat" },
    { label: "Memory", icon: BracketsCurly, href: "/memory" },
    { label: "Settings", icon: GearSix, href: "/settings" },
  ];

  return (
    <>
      {/* MINI SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-[60px]
          flex flex-col items-center py-6
          bg-surface-2 border-r border-token
          transition-opacity duration-250 z-40
          ${open ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        {/* Toggle */}
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md text-muted hover:text-white hover:bg-white/5 transition"
          aria-label="Open sidebar"
        >
          <SquaresFour size={26} weight="duotone" />
        </button>

        {/* NAV ICONS */}
        <nav className="mt-12 flex flex-col gap-10">
          {items.map((item, idx) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={idx}
                href={item.href}
                className={`
                  p-2 rounded-md transition transform-gpu hover:scale-105
                  ${active ? "text-white bg-white/10" : "text-muted hover:text-white hover:bg-white/5"}
                `}
                title={item.label}
              >
                <Icon size={22} weight="duotone" />
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* Avatar mini */}
        <button
          className="
            mb-5 p-2 rounded-full text-muted 
            hover:text-white hover:bg-white/5 transition
          "
          aria-label="Account"
        >
          <UserCircle size={26} weight="duotone" />
        </button>
      </aside>

      {/* FULL SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-[200px]
          z-50 glass bg-surface border-r border-token
          p-5 pt-8 flex flex-col
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 p-2 rounded-md text-muted hover:text-white hover:bg-white/5 transition"
          aria-label="Close sidebar"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="mb-7 mt-2">
          <h1 className="text-lg font-semibold text-white tracking-tight">
            NeoMind
          </h1>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-6 mt-4">
          {items.map((item, idx) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={idx}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md transition
                  ${active 
                    ? "bg-white/10 text-white" 
                    : "text-muted hover:text-white hover:bg-white/5"}
                `}
              >
                <Icon size={20} weight="duotone" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mt-7 h-[1px] bg-white/10" />

        <div className="flex-1" />

        {/* Profile */}
        <div className="pb-2 flex items-center gap-3">
          <UserCircle size={26} weight="duotone" className="text-muted" />
          <div>
            <p className="text-sm font-medium text-white/90">User</p>
            <p className="text-xs text-muted">user@neomind.io</p>
          </div>
        </div>
      </aside>
    </>
  );
}

"""/Users/saifshaik/Documents/neomind/frontend/src/components/sidebar/Sidebar.tsx"""