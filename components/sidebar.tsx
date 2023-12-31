"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  const [mounted, isMounted] = useState(false);

  useEffect(() => {
    isMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="border h-full flex flex-col overflow-y-auto bg-white dark:bg-[#020817] shadow-sm">
      <div className="flex items-center justify-start h-[80px] px-6 border-b shadow-sm">
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
