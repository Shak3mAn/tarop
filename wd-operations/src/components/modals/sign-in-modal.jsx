"use client";

import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Plus } from "lucide-react";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

import Tanker from "../../../public/general/tarop-tanker.jpg";
import Logo from "../../../public/logo/tar-ops-high-resolution-logo-black-transparent.png";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/landing/dialog";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils/utils";
import { SignUpModal } from "./sign-up-modal";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input text-[#020817] hover:text-[#020817]  focus:text-[#020817] bg-white rounded-full hover:bg-accent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const SignInModal = ({ className }) => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <DialogPrimitive.Root>
        <DialogPrimitive.Trigger asChild>
          <button
            className={cn(
              buttonVariants({ variant: "outline", className: className })
            )}
          >
            Sign In
          </button>
        </DialogPrimitive.Trigger>

        <DialogContent>
          {!isTabletMid ? (
            <div className="flex md:grid md:grid-cols-10">
              <div className="hidden md:flex md:col-span-6">
                <Image
                  alt="Tanker"
                  src={Tanker}
                  className="rounded-tl-lg object-cover h-full rounded-bl-lg overflow-hidden"
                />
              </div>

              <div className="p-8 bg-gradient-to-b from-white to-gray-300 mt-2 rounded-tr-lg rounded-br-lg shadow-md flex flex-col item-center justify-center md:col-span-4">
                <DialogHeader>
                  <div className="items-center flex justify-center mb-3">
                    <Image
                      alt="Logo"
                      src={Logo}
                      width={110}
                      height={110}
                      className="object-cover"
                    />
                  </div>
                </DialogHeader>
                <div className="mb-4">
                  <SignIn redirectUrl="/" signUpUrl={<SignUpModal />} />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="px-4 h-screen bg-gradient-to-b from-white to-gray-300 mt-2 rounded-lg shadow-md flex flex-col item-center justify-center md:col-span-4">
                <DialogHeader>
                  <div className="items-center flex justify-center mb-3">
                    <Image
                      alt="Logo"
                      src={Logo}
                      width={110}
                      height={110}
                      className="object-cover"
                    />
                  </div>
                </DialogHeader>
                <div className="mb-4">
                  <SignIn redirectUrl="/" signUpUrl={<SignUpModal />} />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </DialogPrimitive.Root>
    </>
  );
};
