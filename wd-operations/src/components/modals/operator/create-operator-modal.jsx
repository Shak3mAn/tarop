"use client";

import * as z from "zod"
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { HardHat } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { useOperatorStore } from "../../../store/api/operator-store";
import { useNotificationStore } from "../../../store/api/notification-store";
import { useEventStore } from "../../../store/api/event-store";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
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
          "border border-input border-hidden bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const CreateOperatorModal = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {user} = useUser();
  const {addOperator } = useOperatorStore();
  const { addNotification } = useNotificationStore();
  const { addEvent } = useEventStore();

  const defaultValues = {
    fullName: "",
    firstName: "",
    lastName: "",
    phoneNo: null,
    email: "",
  };

  const form = useForm({
    defaultValues
  });

  const onSubmit = async (data) => {

    const notificationData = {
      instigator : user?.fullName ? user.fullName : "User",
      title: "Operator",
      action: "Created",
      description: `Operator: ${data.fullName} has been created`,
    }

    try {
      setLoading(true);
      addOperator(data);
      addNotification(notificationData);
      addEvent(notificationData);
      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Error creating operator:", error)
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <DialogPrimitive.Root>
        <DialogPrimitive.Trigger asChild>
          <button
            className={cn(
              buttonVariants({ variant: "default", size: "default" })
            )}
          >
            <HardHat className="h-4 w-4" />
          </button>
        </DialogPrimitive.Trigger>

      <DialogContent>
        <DialogHeader className="pt-4 flex flex-row items-center justify-start">
          <div className="flex space-x-2">
            <div className="h-7 w-7 rounded-full border items-center flex justify-center">
              <HardHat className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <DialogTitle>Operation Coordinator</DialogTitle>
              <DialogDescription>Add New Operation Coordinator</DialogDescription>
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
                      name="fullName"
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
                          <Input
                              disabled={loading}
                              placeholder="Name"
                              {...field}
                            />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone No.</FormLabel>
                          <Input
                              disabled={loading}
                              placeholder="Phone No"
                              {...field}
                            />
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
                          <Input
                              disabled={loading}
                              placeholder="Email"
                              {...field}
                            />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-10 space-x-2 flex items-center justify-end w-full">
                      <DialogPrimitive.Close asChild>
                        <Button disabled={loading} variant="outline">
                          Cancel
                        </Button>
                      </DialogPrimitive.Close>

                        <Button disabled={loading} type="submit">
                          Continue
                        </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
        </div>
      </DialogContent>
      </DialogPrimitive.Root>
    </>
  );
};
