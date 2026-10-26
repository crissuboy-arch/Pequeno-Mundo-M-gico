"use client";

import Link from "next/link";
import { useState } from "react";

type Item = { href: string; label: string };

export function MobileNav({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blush"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#2D2F5B" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu principal"
          className="absolute left-0 right-0 top-full z-30 flex flex-col gap-1 bg-cream px-5 pb-6 pt-2 shadow-soft"
        >
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-lg font-extrabold hover:bg-sky"
            >
              {i.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
