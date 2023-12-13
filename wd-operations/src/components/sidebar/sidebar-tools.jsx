"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import { useSidebarToggle } from "../../store/use-sidebar-toggle";

const SidebarTools = () => {
  const sidebarRef = useRef();
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const sidebarToggle = useSidebarToggle();

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

  return (
    <>
      {/* Used to ensure initialization matches */}
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{
          x: isTabletMid ? -250 : 0,
          transitionDelay: 2,
        }}
        animate={sidebarToggle.isOpen ? "open" : "closed"}
        transition={{
          duration: 1.5,
          ease: "easeIn",
        }}
        className=" hidden md:flex md:flex-col h-screen bg-transparent border-r border-white/20 overflow-hidden"
      >
        {sidebarToggle.isOpen ? (
          <div className="py-2 pl-20 pr-4 flex-1 px-9">
            <div className="text-sm group flex px-3 py-2 w-full justify-start font-normal cursor-pointer text-transparent rounded-lg transition">
              Add to Schedule
            </div>
          </div>
        ) : (
          <></>
        )}
      </motion.div>
    </>
  );
};

export default SidebarTools;
