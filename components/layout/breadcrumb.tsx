"use client";
import { usePathname } from "next/navigation";

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  return <p className="text-sm text-slate-500">{segments.length ? segments.join(" / ") : "dashboard"}</p>;
}
