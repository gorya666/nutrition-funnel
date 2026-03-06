"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/welcome", label: "Prototype" },
  { href: "/components", label: "Components" },
];

export default function PreviewTabs() {
  const pathname = usePathname();

  return (
    <nav className="preview-tabs" aria-label="View switcher">
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;
        const className = isActive ? "preview-tab preview-tab-active" : "preview-tab";

        return (
          <Link key={tab.href} href={tab.href} className={className}>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
