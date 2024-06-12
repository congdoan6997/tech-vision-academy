"use client";

import { cn } from "@/lib/utils";
import { BarChart4, MonitorPlay } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";

const sidebarRoutes = [
  { icon: <MonitorPlay />, label: "Courses", path: "/instructor/courses" },
  {
    icon: <BarChart4 />,
    label: "Performance",
    path: "/instructor/performance",
  },
];
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="max-sm:hidden flex flex-col w-64 border-r shadow-md px-3 my-4 gap-4 text-sm font-medium">
      {sidebarRoutes.map((route) => (
        <Link
          href={route.path}
          key={route.path}
          className={cn(
            "flex items-center gap-4 p-3 rounded-md hover:opacity-80",
            pathname === route.path && "text-background bg-primary"
          )}
        >
          {route.icon} {route.label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
