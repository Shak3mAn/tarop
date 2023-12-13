"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Clock4, Users } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { useTaskStore } from "../../../store/api/tasks-store";
import { useStatusStore } from "../../../store/api/status-store";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils/utils";
import { statuses } from "../../../lib/utils/data";

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

export const StatusModal = () => {
  const [loading, setLoading] = useState(false);

  const { fetchTasks, taskStatus } = useTaskStore();
  const { updateStatus } = useStatusStore();
  const { addNotification } = useNotificationStore();
  const { addEvent } = useEventStore();
  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const fetchTsks = async () => {
    await fetchTasks(); }

    fetchTsks();
  }, []);

  const defaultValues = {
    task: "",
    status: "",
  };

  const form = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    const taskSelected = taskStatus.filter((task) => task.name === data.task);

    const updateData = {
      ...data,
      taskId: taskSelected[0].taskId,
    };

    const notificationData = {
      instigator: user?.fullName ? user.fullName : "User",
      title: "Status",
      action: "Updated",
      description: `Status: ${data.task} has been updated to ${data.status}`,
      task: data.task,
    };

    try {
      setLoading(true);
      updateStatus(updateData);
      addNotification(notificationData);
      addEvent(notificationData);
      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Error updating status", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <button
          className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
        >
          <Clock4 className="absolute h-5 w-5 transition-all" />
        </button>
      </DialogPrimitive.Trigger>

      <DialogContent>
        <DialogHeader className="pt-4 flex flex-row items-center justify-between">
          <div className="flex space-x-2">
            <div className="h-7 w-7 rounded-full border items-center flex justify-center">
              <Clock4 className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <DialogTitle>Status</DialogTitle>
              <DialogDescription>Update a task&apos;s status</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto px-2 scrollbar-hide">
          <div className="space-y-4 py-1 pb-4">
            <div className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="task"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Task</FormLabel>
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
                                placeholder="Select Task"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {taskStatus.map((task) => (
                              <SelectItem key={task.taskId} value={task.name}>
                                {task.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
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
                                placeholder="Select Status"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem key={status.id} value={status.name}>
                                {status.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
  );
};
