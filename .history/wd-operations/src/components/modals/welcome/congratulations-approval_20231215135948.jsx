"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useUser } from "@clerk/nextjs";
import { PartyPopper } from "lucide-react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import WelcomeImg from "../../../../public/general/welcome-image.jpg";

import { useWelcomeModal } from "../../../store/use-general";
import { useUserStore } from "../../../store/api/user-store";
import { useTempUserStore } from "../../../store/api/temp-user-store";

import {
  WelcomeDialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../ui/landing/dialog";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
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

export const CongratulationsApprovalModal = () => {
  const { user } = useUser();
  const { onCongratulationOpened } = useWelcomeModal();
  const { height } = useWindowSize();
  const { fetchUser, person, updateUserCongratulation } = useUserStore();
  const { fetchTempUser, tempUser, deleteTempUser } = useTempUserStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchUsrsTempUsrs = async () => {
        await fetchUser({ email: user.primaryEmailAddress.emailAddress });
        onCongratulationOpened();
    
        await fetchTempUser({ email: user.primaryEmailAddress.emailAddress });
    
      }

      fetchUsrsTempUsrs();

    deleteTempUser(tempUser?._id);
    }, 2200)

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onCongrats();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const onCongrats = async () => {
    const userData = {
      isCongratulationOpened: true,
    };

    try {
      updateUserCongratulation(person._id, userData);
    } catch (error) {
      console.error("Error updating congratulation:", error);
    }
  };

  return (
    <>
      <DialogPrimitive.Root defaultOpen>
        <DialogPrimitive.Trigger asChild>
          <button
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
          >
            <PartyPopper className="absolute h-4 w-4 transition-all" />
          </button>
        </DialogPrimitive.Trigger>

        <WelcomeDialogContent>
          <Confetti
            width={1200}
            height={"auto"}
            gravity={0.075}
            tweenDuration={5000}
          />
          <div className="flex md:grid md:grid-cols-10">
            <div className="hidden md:flex md:col-span-6">
              <Image
                alt="WelcomeImg"
                src={WelcomeImg}
                className="rounded-tl-lg object-cover h-[660px] rounded-bl-lg overflow-hidden"
              />
            </div>

            <div className="p-8 bg-gradient-to-b from-white to-slate-100 mt-2 rounded-tr-lg rounded-br-lg shadow-md flex flex-col item-center justify-center md:col-span-4">
              <DialogHeader className="pt-4 flex flex-row items-center justify-start">
                <div className="flex space-x-2">
                  <div className="h-15 w-15 mr-2 rounded-lg border-hidden items-center flex justify-center">
                    <PartyPopper className="h-10 w-10" />
                  </div>
                  <div className="flex flex-col">
                    <DialogTitle className="text-3xl font-extrabold">
                      Congratulations!!
                    </DialogTitle>
                    <DialogDescription className="">
                      Approval <span className="font-semibold">Successful</span>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div>
                <div className="space-y-4 py-1 pt-4 pb-20 md:pb-4">
                  <div className="space-y-4">
                    <DialogDescription>
                      <br />
                      Dear{" "}
                      <span className="font-semibold text-[#0f172a]">
                        {user?.firstName}
                      </span>
                      ,
                      <br />
                      <br />
                      Heartfelt congratulations! We are delighted to inform you
                      that your approval submission has been successful, and you
                      are now officially welcomed into the{" "}
                      <span className="font-semibold text-[#0f172a]">
                        Tarop
                      </span>{" "}
                      community.
                      <br />
                      <br />
                      Your presence enriches our community, and we are thrilled
                      to have you on board. As you step into this dynamic realm
                      of operations, rest assured that our platform is designed
                      to empower your operations and enhance your experience.
                      <br />
                      <br />
                      Feel free to navigate through the comprehensive features
                      of our CRM system, tailored to meet the intricate demands
                      of the Operations & Logistics industry. Should you have
                      any inquiries or require guidance, our support team is
                      readily available to assist you
                      <br />
                      <br />
                      Welcome aboard!
                      <br />
                      <br />
                      Best Regards,
                      <br />
                      <br />
                      <span className="font-semibold text-[#0f172a]">
                        Tarop
                      </span>
                      <br />
                      <br />
                    </DialogDescription>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WelcomeDialogContent>
      </DialogPrimitive.Root>
    </>
  );
};
