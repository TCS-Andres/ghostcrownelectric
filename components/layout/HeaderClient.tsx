"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { CrownMark } from "./CrownMark";

export interface NavLink {
  label: string;
  href: string;
}

interface HeaderClientProps {
  brandName: string;
  phoneDisplay: string;
  phoneTel: string;
  serviceLinks: NavLink[];
  cityLinks: NavLink[];
}

const simpleLinks: NavLink[] = [
  { label: "FAQ", href: routes.faq },
  { label: "Reviews", href: routes.reviews },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
];

export function HeaderClient({
  brandName,
  phoneDisplay,
  phoneTel,
  serviceLinks,
  cityLinks,
}: HeaderClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<null | "services" | "areas">(null);
  const navRef = useRef<HTMLElement>(null);

  const servicesMenu: NavLink[] = [
    ...serviceLinks,
    { label: "View all services", href: routes.services },
  ];
  const areasMenu: NavLink[] = [
    ...cityLinks,
    { label: "View all service areas", href: routes.serviceAreas },
  ];

  // Close dropdowns on Escape and on clicks outside the header.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    function onClick(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur"
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <Link
          href={routes.home}
          className="flex items-center gap-2.5"
          onClick={() => {
            setOpenMenu(null);
            setMobileOpen(false);
          }}
        >
          <CrownMark />
          <span className="font-heading text-lg font-bold tracking-tight text-ink">
            {brandName}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          <Dropdown
            label="Services"
            isOpen={openMenu === "services"}
            onToggle={() =>
              setOpenMenu((prev) => (prev === "services" ? null : "services"))
            }
            items={servicesMenu}
            onNavigate={() => setOpenMenu(null)}
          />
          <Dropdown
            label="Service Areas"
            isOpen={openMenu === "areas"}
            onToggle={() =>
              setOpenMenu((prev) => (prev === "areas" ? null : "areas"))
            }
            items={areasMenu}
            onNavigate={() => setOpenMenu(null)}
          />
          {simpleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-surface-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${phoneTel}`}
            className="text-sm font-semibold text-ink hover:text-accent-hover"
          >
            {phoneDisplay}
          </a>
          <Button href={routes.book} variant="primary" size="sm">
            Book Now
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-surface-2 lg:hidden"
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-border bg-surface lg:hidden"
        >
          <nav
            aria-label="Mobile"
            className="container-page flex flex-col gap-1 py-4"
          >
            <MobileSection title="Services" items={servicesMenu} onNavigate={() => setMobileOpen(false)} />
            <MobileSection title="Service Areas" items={areasMenu} onNavigate={() => setMobileOpen(false)} />
            {simpleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-surface-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4">
              <a
                href={`tel:${phoneTel}`}
                className="px-3 text-base font-semibold text-ink"
              >
                Call {phoneDisplay}
              </a>
              <Button
                href={routes.book}
                variant="primary"
                size="md"
                onClick={() => setMobileOpen(false)}
              >
                Book Now
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function Dropdown({
  label,
  isOpen,
  onToggle,
  items,
  onNavigate,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  items: NavLink[];
  onNavigate: () => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={onToggle}
        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-surface-2"
      >
        {label}
        <Chevron open={isOpen} />
      </button>
      {isOpen ? (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-60 rounded-lg border border-border bg-surface p-2 shadow-[var(--shadow-lift)]">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="block rounded-md px-3 py-2 text-sm text-ink hover:bg-surface-2 hover:text-accent-hover"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function MobileSection({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: NavLink[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-semibold text-ink hover:bg-surface-2"
      >
        {title}
        <Chevron open={open} />
      </button>
      {open ? (
        <ul className="mb-1 flex flex-col border-l border-border pl-3">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="block rounded-md px-3 py-2.5 text-sm text-ink-muted hover:text-accent-hover"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("transition-transform duration-150", open && "rotate-180")}
    >
      <path d="M3 5 L7 9 L11 5" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
    </svg>
  );
}
