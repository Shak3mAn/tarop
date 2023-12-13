"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "../ui/button";
import { SignInModal } from "../modals/sign-in-modal";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold pb-6">
        <h1>OP's Made Easier</h1>
        <div className="text-transparent p-4 bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          <TypewriterComponent
            options={{
              strings: [
                "Logistics",
                "Courier Tracking and Optimization",
                "Operations Content Resource Manager",
                "Intelligent Inventory Management",
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
              cursorChar: "|",
              cursorBlink: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Designed to meet your needs & enhance efficiency.
      </div>
      <div>
        {isSignedIn ? (
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="md:text-lg p-4 rounded-full transition-all ease-in-out duration-300 text-[#020817] hover:text-[#020817]  focus:text-[#020817] hover:bg-white/80 hover:ring-2 hover:ring-offset-white/75 hover:ring-offset-2 hover:scale-125 hover:font-bold active:scale-95 font-semibold"
            >
              Dashboard
            </Button>
          </Link>
        ) : (
          <SignInModal className="md:text-lg p-4 transition-all ease-in-out duration-500 hover:bg-white/80 hover:ring-2 hover:ring-offset-white/75 hover:ring-offset-2 hover:scale-125 hover:font-bold active:scale-95 font-semibold" />
        )}
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal underline underline-offset-2">
        Free Cancelation
      </div>
    </div>
  );
};
