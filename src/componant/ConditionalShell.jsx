"use client";

import { usePathname } from "next/navigation";
import Header from "@/componant/header";
import Footer from "@/componant/Footer";

// Pages where header and footer should NOT appear
const HIDE_SHELL_PATHS = ["/login", "/register"];

export default function ConditionalShell({ children }) {
  const pathname = usePathname();
  const hideShell = HIDE_SHELL_PATHS.includes(pathname);

  return (
    <>
      {!hideShell && <Header />}
      {children}
      {!hideShell && <Footer />}
    </>
  );
}
