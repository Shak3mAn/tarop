"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useUser } from "@clerk/nextjs";
import { DoorOpen, FileUp, Users } from "lucide-react";

import PleaseWait from "../../../../public/general/please-wait.jpg";

import { useWelcomeModal } from "../../../store/use-general";
import { useUserStore } from "../../../store/api/user-store";

import {
  NoCloseDialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../ui/landing/dialog";
import { Input } from "../../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils/utils";
import { role } from "../../../lib/utils/data";

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

export const WaitingApprovalModal = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { onUserSubmit } = useWelcomeModal();
  const { addUser } = useUserStore();

  return (
    <>
      <DialogPrimitive.Root defaultOpen>
        <DialogPrimitive.Trigger asChild>
          <Button disabled={loading}>Continue</Button>
        </DialogPrimitive.Trigger>

        <NoCloseDialogContent>
          <div className="flex md:grid md:grid-cols-10">
            <div className="hidden md:flex md:col-span-6">
              <Image
                alt="Please Wait"
                src={PleaseWait}
                className="rounded-tl-lg object-cover h-[660px] rounded-bl-lg overflow-hidden"
              />
            </div>

            <div className="p-8 bg-gradient-to-b from-white to-slate-100 mt-2 rounded-tr-lg rounded-br-lg shadow-md flex flex-col item-center justify-center md:col-span-4">
              <DialogHeader className="pt-4 flex flex-row items-center justify-start">
                <div className="flex space-x-2">
                  <div className="h-15 w-15 mr-2 rounded-lg border-hidden items-center flex justify-center">
                    <FileUp className="h-10 w-10" />
                  </div>
                  <div className="flex flex-col">
                    <DialogTitle className="text-3xl font-extrabold">
                      Submission
                    </DialogTitle>
                    <DialogDescription className="">
                      Waiting for<span className="font-semibold">Approval</span>
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
                      Your request for access has been received and is currently
                      under thoughtful consideration by our diligent team. We deeply appreciate your patience as we
                      meticulously review the details provided.
                      <br />
                      <br />
                      In the meantime, if you have any further inquiries or if
                      there is anything else we can assist you with, please do
                      not hesitate to reach out. We understand the importance of
                      your request, and we assure you that we are working
                      diligently to provide you with a prompt response.
                      <br />
                      <br />
                      Thank you for choosing{" "}
                      <span className="font-semibold text-[#0f172a]">
                        {" "}
                        Tarop
                      </span>
                      . We value your presence, and we look forward to welcoming
                      you as an approved member of our community.
                      <br />
                      <br />
                      Warm regards,
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
        </NoCloseDialogContent>
      </DialogPrimitive.Root>
    </>
  );
};
