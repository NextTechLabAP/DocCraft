"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle, LayoutGrid } from "lucide-react";

export default function FloatingNavbar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Create Form",
      href: "/dashboard/create",
      icon: <PlusCircle className="w-5 h-5" />,
    },
    {
      name: "Your Forms",
      href: "/dashboard/your-forms",
      icon: <LayoutGrid className="w-5 h-5" />,
    },
  ];

  return (
    <div className="fixed top-5 right-5 z-50 flex">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-md rounded-xl px-4 py-2 flex gap-3 items-start">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-2 text-sm font-semibold transition ${
                isActive
                  ? "text-black"
                  : "text-black/70 hover:text-black"
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
