"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/*
  The three step plan appears on every page. The home page renders its own copy
  inline (between the emergency strip and the FAQ), so this gate hides the
  layout-level copy on "/" to avoid showing it twice. Every other route renders
  it before the footer.
*/
export function PlanGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <>{children}</>;
}
