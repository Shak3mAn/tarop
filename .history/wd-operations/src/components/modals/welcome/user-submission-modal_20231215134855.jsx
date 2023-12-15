"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useUser } from "@clerk/nextjs";
import { DoorOpen, Users } from "lucide-react";
import { useRouter } from "next/navigation"
import { useMediaQuery } from "react-responsive";

import ComeIn from "../../../../public/general/come-in.jpg";

import { useWelcomeModal } from "../../../store/use-general";
import { useUserStore } from "../../../store/api/user-store";
import { useApprovalsStore } from "../../../store/api/approvals-store";
import { useNotificationStore } from "../../../store/api/notification-store";
import { useEventStore } from "../../../store/api/event-store";

import { WaitingApprovalModal } from "./waiting-approval";
import { CongratulationsApprovalModal } from "./congratulations-approval";
import {
  NoCloseDialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../ui/landing/dialog";
import { DialogContent } from "../../ui/maps/dialog";
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

export const UserSubmissionModal = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });

  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { isUserSubmit, onUserSubmit } = useWelcomeModal();
  const { addUser } = useUserStore();
  const { addApproval } = useApprovalsStore();
  const { addNotification } = useNotificationStore();
  const { addEvent } = useEventStore();
  const router = useRouter()

  const defaultValues = {
    name: user?.fullName ? user.fullName : "",
    email: user.primaryEmailAddress.emailAddress ? user.primaryEmailAddress.emailAddress : "",
    fistName: user.firstName ? user.firstName : "",
    lastName: user?.lastName ? user.lastName : "",
    phoneNo: "",
    role: "",
  };

  const form = useForm({
    defaultValues,
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const userData = {
      ...data,
      isApproved: false,
      isCongratulationOpened: false,
      isAdmin: false,
      isUserSubmit: true,
    }

    const approvalData = {
      user: user?.fullName ? user.fullName : "User",
      title: data.name,
      action: "Approval",
      description: `User: ${data.firstName} seeks Approval`,
      role: data.role,
    };

    const notificationData = {
      instigator: user?.fullName ? user.fullName : "User",
      title: "User",
      action: "Approved",
      description: `User: ${user?.fullName} has submitted form for approval`,
      team: "TBA",
    };

    try {
      setLoading(true);
      addUser(userData);
      addApproval(approvalData);
      addNotification(notificationData);
      addEvent(notificationData);

      const timerId = setTimeout(() => {
        onUserSubmit();
      }, 2500);

      clearTimeout(timerId);
      form.reset();
      router.refresh()
    } catch (error) {
      console.error("Error submitting user!", error);
    } finally {
      setLoading(false);
      onUserSubmit();
    }
  };

  return (
    <>
      <DialogPrimitive.Root defaultOpen>
        <DialogPrimitive.Trigger asChild>
          <button
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
          >
            <Users className="absolute h-4 w-4 transition-all" />
          </button>
        </DialogPrimitive.Trigger>
        <NoCloseDialogContent>
          <div className="flex md:grid md:grid-cols-10">
            <div className="hidden md:flex md:col-span-6">
              <Image
                alt="ComeIn"
                src={ComeIn}
                className="rounded-tl-lg object-cover h-[730px] rounded-bl-lg overflow-hidden"
              />
            </div>

            <div className="p-8 bg-gradient-to-b from-white to-slate-100 mt-2 rounded-tr-lg rounded-br-lg shadow-md flex flex-col item-center justify-center md:col-span-4">
              <DialogHeader className="pt-4 flex flex-row items-center justify-start">
                <div className="flex space-x-2">
                  <div className="h-15 w-15 mr-2 rounded-lg border-hidden items-center flex justify-center">
                    <DoorOpen className="h-10 w-10" />
                  </div>
                  <div className="flex flex-col">
                    <DialogTitle className="text-3xl font-extrabold">
                      Welcome!
                    </DialogTitle>
                    <DialogDescription className="">
                      Please fill in{" "}
                      <span className="font-semibold">User Information </span> &{" "}
                      <span className="font-semibold">Role</span>.
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div>
                <div className="space-y-4 py-1 pb-4">
                  <div className="space-y-4">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  disabled={loading}
                                  placeholder="Name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  disabled={loading}
                                  placeholder="Email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  disabled={loading}
                                  placeholder="Name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  disabled={loading}
                                  placeholder="Name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phoneNo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  disabled={loading}
                                  placeholder="Phone No."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role</FormLabel>
                              <Select
                                disabled={loading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      defaultValue={field.value}
                                      placeholder="Role"
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {role.map((i) => (
                                    <SelectItem key={i.id} value={i.option}>
                                      {i.option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="pt-8 pb-20  sm:pb-0  md:pt-10 space-x-2 flex items-center justify-end w-full">
                          {!isUserSubmit ? (
                            <Button disabled={loading} type="submit">
                              Submit
                            </Button>
                          ) : (
                            <>
                              <WaitingApprovalModal />
                            </>
                          )}
                        </div>
                      </form>
                    </Form>
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
