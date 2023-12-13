"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import {
  BadgeHelp,
  CalendarCheck,
  ChevronRightSquare,
  LayoutDashboard,
  LogOut,
  Map,
  Settings,
  UserCog2,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/clerk-react";
import { useUser, useAuth } from "@clerk/nextjs";

import { useUserStore } from "../../store/api/user-store";
import { SideSeparator } from "../ui/sidebar/sideseparator";
import { Button } from "../ui/button";
import { SheetContent } from "../ui/sheet";
import Logo from "../../../public/logo/tar-ops-high-resolution-logo-transparent.png";
import { cn } from "../../lib/utils/utils";

const generalRoutes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Schedule",
    icon: CalendarCheck,
    href: "/dashboard/schedule",
  },
  {
    label: "Maps",
    icon: Map,
    href: "/dashboard/maps",
  },
  {
    label: "Teams",
    icon: Users,
    href: "/dashboard/teams",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    label: "Help",
    icon: BadgeHelp,
    href: "/dashboard/help",
  },
];

const adminRoutes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Schedule",
    icon: CalendarCheck,
    href: "/dashboard/schedule",
  },
  {
    label: "Maps",
    icon: Map,
    href: "/dashboard/maps",
  },
  {
    label: "Teams",
    icon: Users,
    href: "/dashboard/teams",
  },
  {
    label: "Admin",
    icon: UserCog2,
    href: "/dashboard/admin",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    label: "Help",
    icon: BadgeHelp,
    href: "/dashboard/help",
  },
];

const driverRoutes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
];

const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  const pathname = usePathname();

  const { user } = useUser();
  const { isLoaded } = useAuth();

  const { fetchUser, getUserIsAdmin, person } = useUserStore();

  const isAdmin = getUserIsAdmin();

  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    const fetchUsrData = async () => {
      if (isLoaded) {
        const userData = { email: user?.primaryEmailAddress.emailAddress };

        await fetchUser(userData);
      }
    };

    fetchUsrData();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <SheetPrimitive.Root>
      <SheetPrimitive.Trigger>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetPrimitive.Trigger>
      <SheetContent side="left" className="px-0">
        {/* <Sidebar /> */}
        <div className="space-y-4 py-4 flex flex-col h-screen bg-card text-primary overflow-hidden">
          <div className="px-3 pb-1 pt-2 flex-1 flex flex-col justify-between">
            <div>
              {/* Logo */}
              <div className="bg-[#020817] -mt-2 rounded-lg pt-4 pb-1">
                <Link
                  href="/dashboard"
                  className="justify-center flex items-center px-24 pb-2 mb-1"
                >
                  <Image
                    alt="Logo"
                    src={Logo}
                    width={140}
                    height={140}
                    className="item-center object-cover justify-center flex transition-all ease-in-out duration-300"
                  />
                </Link>
              </div>
              <SideSeparator className={"bg-primary"} />
              <div className="space-y-3">
                {person.role === "Admin" && (
                  <>
                    {adminRoutes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                          "text-md group flex px-3 py-2 w-full justify-start font-normal cursor-pointer active:text-primary active:bg-card/30 rounded-lg transition-all ease-in-out duration-300",
                          pathname === route.href
                            ? "text-primary bg-card/50"
                            : "text-primary text-opacity-60"
                        )}
                      >
                        <div className="flex items-center flex-1">
                          <route.icon
                            className={cn(
                              "h-5 w-5 mr-3 font-medium",
                              route.color
                            )}
                          />
                          {route.label}
                        </div>
                      </Link>
                    ))}
                  </>
                )}
                {person.role === "Driver" && (
                  <>
                    {driverRoutes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                          "text-md group flex px-3 py-2 w-full justify-start font-normal cursor-pointer active:text-primary active:bg-card/30 rounded-lg transition-all ease-in-out duration-300",
                          pathname === route.href
                            ? "text-primary bg-card/50"
                            : "text-primary text-opacity-60"
                        )}
                      >
                        <div className="flex items-center flex-1">
                          <route.icon
                            className={cn(
                              "h-5 w-5 mr-3 font-medium",
                              route.color
                            )}
                          />
                          {route.label}
                        </div>
                      </Link>
                    ))}
                  </>
                )}
                {(person.role === "Operation Coordinator" ||
                  person.role === "Support Coordinator") && (
                  <>
                    {generalRoutes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                          "text-md group flex px-3 py-2 w-full justify-start font-normal cursor-pointer active:text-primary active:bg-card/30 rounded-lg transition-all ease-in-out duration-300",
                          pathname === route.href
                            ? "text-primary bg-card/50"
                            : "text-primary text-opacity-60"
                        )}
                      >
                        <div className="flex items-center flex-1">
                          <route.icon
                            className={cn(
                              "h-5 w-5 mr-3 font-medium",
                              route.color
                            )}
                          />
                          {route.label}
                        </div>
                      </Link>
                    ))}
                  </>
                )}
                {/* <SideSeparator /> */}
              </div>
            </div>
            {/* Help and Logout*/}
            <div className="px-3 py-1 pb-6 scrollbar-hidden flex-col-reverse">
              <SideSeparator className={"bg-primary"} />
              <button
                onClick={() => signOut(() => router.push("/"))}
                className={cn(
                  "text-md group flex px-3 w-full justify-start font-normal cursor-pointer hover:text-white hover:bg-card/30 rounded-lg text-primary transition-all ease-in-out duration-300"
                )}
              >
                <div className="flex items-center flex-1">
                  <LogOut className={cn("h-5 w-5 mr-3")} />
                  Logout
                </div>
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </SheetPrimitive.Root>
  );
};

export default MobileSidebar;
