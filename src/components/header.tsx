"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/config/site";

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    nav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function pointerdown(event: PointerEvent) {
      if (
        !nav.current?.contains(event.target as Node) &&
        !toggle.current?.contains(event.target as Node)
      )
        setOpen(false);
    }
    document.addEventListener("keydown", keydown);
    document.addEventListener("pointerdown", pointerdown);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("pointerdown", pointerdown);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          aria-label="WebHet — úvodní stránka"
          className="logo"
          onClick={() => setOpen(false)}
        >
          webhet<span>.</span>
        </Link>
        <nav
          ref={nav}
          id="main-navigation"
          aria-label="Hlavní navigace"
          className={open ? "navigation is-open" : "navigation"}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                path === item.href || path.startsWith(item.href + "/")
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="button button-primary nav-mobile-cta"
            onClick={() => setOpen(false)}
          >
            Chci nezávaznou nabídku
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
        <Link href="/kontakt" className="button button-primary header-cta">
          Chci nezávaznou nabídku
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <button
          type="button"
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
