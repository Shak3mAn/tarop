"use client";

import { useMediaQuery } from "react-responsive";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { SignInModal } from "../modals/sign-in-modal";
import { Button } from "../ui/button";
import Logo from "../../../public/logo/tar-ops-no-slogan-transparent.png";
import LogoIcon from "../../../public/logo/Tarop-icon.png";
import { SignUpModal } from "../modals/sign-up-modal";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <nav className="pl-8 pr-8 py-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex pt-1 items-center">
        {isTabletMid ? (
          <Image
            alt="Logo"
            src={LogoIcon}
            width={60}
            height={60}
            className="item-center justify-center flex"
          />
        ) : (
          <Image
            alt="Logo"
            src={Logo}
            width={125}
            height={125}
            className="item-center justify-center flex"
          />
        )}
      </Link>
      <div className="flex items-center gap-x-2">
        {isSignedIn ? (
          <Link href={"/dashboard"}>
            <Button
              variant="outline"
              className="transition-all ease-in-out duration-300 hover:bg-white/90 hover:ring-2 hover:ring-offset-white/75 hover:font-semibold hover:ring-offset-2 hover:scale-110 active:scale-95 rounded-full"
            >
              Dashboard
            </Button>
          </Link>
        ) : (
          <div className="mr-2 flex hover:space-x-4 space-x-2">
            <SignInModal className="transition-all ease-in-out hidden md:flex duration-300 hover:bg-white/90 hover:ring-2 hover:ring-offset-white/75 hover:font-semibold hover:ring-offset-2 hover:scale-110 active:scale-95" />
            <SignUpModal className="transition-all ease-in-out duration-300 hover:bg-white/90 hover:ring-2 hover:font-semibold hover:ring-offset-white/75 hover:ring-offset-2 hover:scale-110 active:scale-95" />
          </div>
        )}
      </div>
    </nav>
  );
};
