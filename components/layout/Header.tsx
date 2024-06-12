"use client";

import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

const topRoutes = [
  { label: "Instructor", path: "/instructor/courses" },
  { label: "Learning", path: "/learning" },
];

const sidebarRoutes = [
  { label: "Courses", path: "/instructor/courses" },
  {
    label: "Performance",
    path: "/instructor/performance",
  },
];

const Header = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-between p-4 ">
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </Link>
      <div className="hidden md:flex w-[400px] rounded-full">
        <Input placeholder="Search..." className="rounded-l-full" />
        <Button className="rounded-r-full">
          <Search className="size-6" />
        </Button>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-6">
          {topRoutes.map((route) => (
            <Link
              href={route.path}
              key={route.path}
              className="text-sm font-medium hover:text-primary"
            >
              {route.label}
            </Link>
          ))}
        </div>

        <div className="sm:hidden z-20">
          <Sheet>
            <SheetTrigger>
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {topRoutes.map((route) => (
                  <Link
                    href={route.path}
                    key={route.path}
                    className="text-sm font-medium hover:text-primary"
                  >
                    {route.label}
                  </Link>
                ))}
              </div>

              {pathname.startsWith("/instructor") && (
                <div className="flex flex-col gap-4">
                  {sidebarRoutes.map((route) => (
                    <Link
                      href={route.path}
                      key={route.path}
                      className="text-sm font-medium hover:text-primary"
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
