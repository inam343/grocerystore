"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const NAV_LINKS = [
  { href: "/",              label: "Home"      },
  { href: "/fruits",        label: "Fruits"    },
  { href: "/counter",       label: "Meats"     },
  { href: "/breakfast",     label: "Dairy"     },
  { href: "/productListing",label: "Shop"      },
];

const MORE_LINKS = [
  { href: "/fruits",    label: "Fruits"    },
  { href: "/counter",   label: "Meats"     },
  { href: "/breakfast", label: "Dairy"     },
  { href: "/breads",    label: "Bakery"    },
  { href: "/beverages", label: "Beverages" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <nav className="bg-white border-t border-slate-100">
      <div className="flex items-center justify-center flex-wrap gap-1 px-4 sm:px-6 min-h-[44px]">
        {NAV_LINKS.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative px-4 py-2 text-[13px] font-semibold rounded-full transition-all duration-200 ${
                active
                  ? "text-green-700 bg-green-50"
                  : "text-slate-600 hover:text-green-700 hover:bg-green-50"
              }`}
            >
              {label}
              {active && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full" />
              )}
            </Link>
          );
        })}

        {/* More dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setMoreOpen(true)}
          onMouseLeave={() => setMoreOpen(false)}
        >
          <button className="flex items-center gap-1 px-4 py-2 text-[13px] font-semibold text-slate-600 hover:text-green-700 hover:bg-green-50 rounded-full transition-all duration-200">
            More
            <FaAngleDown
              size={11}
              className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
            />
          </button>

          {moreOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white shadow-xl rounded-xl border border-slate-100 z-50 w-[160px] py-1.5 animate-fadeIn">
              {MORE_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="block px-4 py-2 text-[13px] font-medium text-slate-600 hover:bg-green-50 hover:text-green-700 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
