"use client";

import { useClerk } from "@clerk/clerk-react";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
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
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";

import { useUserStore } from "../../store/api/user-store";
import { useTaskStore } from "../../store/api/tasks-store";
import { TooltipContent } from "../ui/tooltip";
import { SideSeparator } from "../ui/sidebar/sideseparator";
import { CreateTaskModal } from "../modals/task/create-sidebar-task-modal";
import { cn } from "../../lib/utils/utils";
import Logo from "../../../public/logo/tar-ops-no-slogan-transparent.png";
import LogoIcon from "../../../public/logo/tarop-icon-removebg.png";
import { useSidebarToggle } from "../../store/use-sidebar-toggle";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

const helperRoutes = [
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
];

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
];

//TODO: Alter the Logo to be more appealing
//TODO: Alter `Button` to push to new schedule
//TODO: Make `SidebarCard` more aesthetically pleasing
//TODO: Change typography accordingly

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const sidebarRef = useRef();
  const pathname = usePathname();
  const sidebarToggle = useSidebarToggle();
  const { fetchTasks, tasks } = useTaskStore();
  const { fetchUser, person } = useUserStore();

  const { user } = useUser();
  const { isLoaded } = useAuth();

  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    const fetchTsks = async () => {
      await fetchTasks();
    };

    const fetchUsrData = async () => {
      if (isLoaded) {
        const userData = { email: user?.primaryEmailAddress.emailAddress };

        await fetchUser(userData);
      }
    };

    fetchUsrData();
    fetchTsks();
  }, []);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  return isLoaded ? (
    <>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{
          x: isTabletMid ? -250 : 0,
          transitionDelay: 2,
        }}
        animate={sidebarToggle.isOpen ? "open" : "closed"}
        className="space-y-4 pt-3 hidden md:flex md:flex-col h-screen fixed z-[99] bg-[#020817] text-white border-r border-white/20 overflow-hidden"
      >
        {sidebarToggle.isOpen ? (
          <>
            {/* SIDEBAR OPENED */}
            <div className="px-3 pb-1 pt-2 flex-1">
              {/* Logo */}
              <div className="">
                <Link
                  href="/dashboard"
                  className="justify-center flex items-center pl-3 pb-2 mb-1"
                >
                  <Image
                    alt="Logo"
                    src={Logo}
                    width={125}
                    height={125}
                    className="item-center object-cover justify-center flex transition-all ease-in-out duration-300"
                  />
                </Link>
              </div>
              <SideSeparator />

              {/* Links */}
              <div className="text-sm -pt-1 tracking-tight pb-1 ml-1 text-white/90 opacity-70 justify-start items-center flex">
                Overview
              </div>

              <div className="space-y-1">
                {person?.role === "Admin" && (
                  <>
                    {adminRoutes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                          "text-sm group flex px-3 py-2 w-full justify-start font-normal cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all ease-in-out duration-300",
                          pathname === route.href
                            ? "text-white bg-white/10"
                            : "text-zinc-400"
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
                {person?.role === "Driver" && (
                  <>
                    {driverRoutes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                          "text-sm group flex px-3 py-2 w-full justify-start font-normal cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all ease-in-out duration-300",
                          pathname === route.href
                            ? "text-white bg-white/10"
                            : "text-zinc-400"
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
                {(person?.role === "Operation Coordinator" ||
                  person?.role === "Support Coordinator") && (
                  <>
                    {generalRoutes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                          "text-sm group flex px-3 py-2 w-full justify-start font-normal cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all ease-in-out duration-300",
                          pathname === route.href
                            ? "text-white bg-white/10"
                            : "text-zinc-400"
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
                {person?.role !== "Driver" && (
                  <>
                    <SideSeparator />

                    {/* New Project Card */}
                    <div className="text-sm -pt-1 tracking-tight ml-1 text-white/90 opacity-70 pb-2 justify-start items-center flex">
                      Schedule
                    </div>

                    <div className="mx-2">
                      <div className="h-[180px] bg-gradient-to-br from-[#010615] to-[#402a1d]  bg-opacity-80 border-white/30 border border-opacity-40 overflow-y-auto scrollbar-hide rounded-lg my-2">
                        <ul className="spacing-y-1.5 px-3 text-white/90 opacity-95">
                          {tasks.map((task, i) => (
                            <li
                              key={task._id}
                              className="ml-2 flex py-[6px] text-sm"
                            >
                              {/* <div className="h-1 items-end justify-center flex w-1 rounded-full bg-white/90 opacity-70" />{" "} */}{" "}
                              •
                              <span className="ml-2 items-center flex justify-center">
                                {task.name}{" "}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex pt-4 items-center justify-center px-1">
                        <CreateTaskModal />
                      </div>
                    </div>

                    {/* <SideCard /> */}
                  </>
                )}
              </div>
            </div>

            {/* Help and Logout*/}
            <div className="px-3 -mt-1 py-1 flex-col-reverse pb-6 scrollbar-thin scrollbar-thumb-zinc-500 scrollbar-track-slate-800 overflow-y-scroll">
              <SideSeparator />

              <div>
                <div className="text-sm -pt-1 tracking-tight pb-1 ml-1 text-white/90 opacity-70 justify-start items-center flex">
                  Account
                </div>
                <div className="flex-col-reverse">
                  {helperRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "text-sm group flex px-3 py-2 w-full justify-start font-normal cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all ease-in-out duration-300",
                        pathname === route.href
                          ? "text-white bg-white/10"
                          : "text-zinc-400"
                      )}
                    >
                      <div className="flex items-center flex-1">
                        <route.icon
                          className={cn("h-5 w-5 mr-3", route.color)}
                        />
                        {route.label}
                      </div>
                    </Link>
                  ))}
                  <button
                    onClick={() => signOut(() => router.push("/"))}
                    className={cn(
                      "text-sm group flex px-3 py-2 w-full justify-start font-normal cursor-pointer hover:text-white hover:bg-white/10 rounded-lg text-zinc-400 transition-all ease-in-out duration-300"
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
          </>
        ) : (
          <>
            {/* SIDEBAR CLOSED */}
            <div className="px-3 pb-4 pt-2 flex-1">
              {/* Logo */}
              <div className="">
                <Link
                  href="/dashboard"
                  className="justify-center flex items-center pl-3 pb-2 mb-1"
                >
                  <Image
                    alt="Logo"
                    src={LogoIcon}
                    width={100}
                    height={100}
                    className="item-center object-cover justify-center flex transition-all ease-in-out duration-300"
                  />
                </Link>
              </div>
              <SideSeparator />

              {/* Links */}
              <div className="space-y-1">
                {person?.role === "Admin" && (
                  <>
                    {adminRoutes.map((route) => (
                      <Tooltip.Root key={route.href}>
                        <Tooltip.Trigger asChild>
                          <Link
                            href={route.href}
                            className={cn(
                              "text-sm group flex px-3 py-2 w-full justify-start font-normal cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all ease-in-out duration-300",
                              pathname === route.href
                                ? "text-white bg-white/10"
                                : "text-zinc-400"
                            )}
                          >
                            <div className="flex items-center flex-1">
                              <route.icon
                                className={cn(
                                  "h-5 w-5 mr-3 font-medium",
                                  route.color
                                )}
                              />
                            </div>
                          </Link>
                        </Tooltip.Trigger>
                        <TooltipContent>{route.label}</TooltipContent>
                      </Tooltip.Root>
                    ))}
                  </>
                )}
                {person?.role === "Driver" && (
                  <>
                    {driverRoutes.map((route) => (
                      <Tooltip.Root key={route.href}>
                        <Tooltip.Trigger asChild>
                          <Link
                            href={route.href}
                            className={cn(
                              "text-sm group flex px-3 py-2 w-full justify-start font-normal cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all ease-in-out duration-300",
                              pathname === route.href
                                ? "text-white bg-white/10"
                                : "text-zinc-400"
                            )}
                          >
                            <div className="flex items-center flex-1">
                              <route.icon
                                className={cn(
                                  "h-5 w-5 mr-3 font-medium",
                                  route.color
                                )}
                              />
                            </div>
                          </Link>
                        </Tooltip.Trigger>
                        <TooltipContent>{route.label}</TooltipContent>
                      </Tooltip.Root>
                    ))}
                  </>
                )}
                {(person?.role === "Operation Coordinator" ||
                  person?.role === "Support Coordinator") && (
                  <>
                    {generalRoutes.map((route) => (
                      <Tooltip.Root key={route.href}>
                        <Tooltip.Trigger asChild>
                          <Link
                            href={route.href}
                            className={cn(
                              "text-sm group flex px-3 py-2 w-full justify-start font-normal cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all ease-in-out duration-300",
                              pathname === route.href
                                ? "text-white bg-white/10"
                                : "text-zinc-400"
                            )}
                          >
                            <div className="flex items-center flex-1">
                              <route.icon
                                className={cn(
                                  "h-5 w-5 mr-3 font-medium",
                                  route.color
                                )}
                              />
                            </div>
                          </Link>
                        </Tooltip.Trigger>
                        <TooltipContent>{route.label}</TooltipContent>
                      </Tooltip.Root>
                    ))}
                  </>
                )}
                {!person?.role === "Driver" && <SideSeparator />}
              </div>
            </div>

            {/* Help and Logout*/}
            <div className="px-3 py-2 flex-col-reverse pb-6 scrollbar-thin scrollbar-thumb-zinc-500 scrollbar-track-slate-800 overflow-hidden">
              <SideSeparator />

              <div>
                <div className="flex-col-reverse">
                  {helperRoutes.map((route) => (
                    <Tooltip.Root key={route.href}>
                      <Tooltip.Trigger asChild>
                        <Link
                          href={route.href}
                          className={cn(
                            "text-sm group flex px-3 py-2 w-full justify-start font-normal cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all ease-in-out duration-300",
                            pathname === route.href
                              ? "text-white bg-white/10"
                              : "text-zinc-400"
                          )}
                        >
                          <div className="flex items-center flex-1">
                            <route.icon
                              className={cn("h-5 w-5 mr-3", route.color)}
                            />
                          </div>
                        </Link>
                      </Tooltip.Trigger>
                      <TooltipContent>{route.label}</TooltipContent>
                    </Tooltip.Root>
                  ))}
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        onClick={() => signOut(() => router.push("/"))}
                        className={cn(
                          "text-sm group flex px-3 py-2 w-full justify-start font-normal cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all ease-in-out duration-300 text-zinc-400 "
                        )}
                      >
                        <div className="flex items-center flex-1">
                          <LogOut className={cn("h-5 w-5 mr-3")} />
                        </div>
                      </button>
                    </Tooltip.Trigger>
                    <TooltipContent>Logout</TooltipContent>
                  </Tooltip.Root>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </>
  ) : (
    <>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{
          x: isTabletMid ? -250 : 0,
          transitionDelay: 2,
        }}
        animate={sidebarToggle.isOpen ? "open" : "closed"}
        className="space-y-4 pt-3 hidden md:flex md:flex-col h-screen fixed z-[99] bg-[#020817] opacity-70 blur-lg text-white border-r border-white/20 overflow-hidden"
      ></motion.div>
    </>
  );
};

export default Sidebar;
