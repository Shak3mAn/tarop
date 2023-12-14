"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter} from "next/navigation";
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Edit, Car } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { useDriverStore } from "../../../store/api/driver-store";
import { useNotificationStore } from "../../../store/api/notification-store";
import { useEventStore } from "../../../store/api/event-store";
import {
  useTeamsMapMeta,
  useDriversMapMeta,
  useTasksMapMeta,
} from "../../../store/api/map-meta-store";
import {
  useDistance,
  useLatLngPicker,
} from "../../../store/maps/use-location-picker";

import { DriverLocationPicker } from "../../location/map-select/driver-location-picker";
import { DriverMapModal } from "./driver-map-modal";
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
import { WarningModal } from "../alert/warning-modal";
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

export const EditDriverModal = ({
  initialData,
  team,
  vehicle,
  make,
  className,
}) => {
  const [loading, setLoading] = useState(false);

  const { isDriver } = useLatLngPicker();
  const { isDriverGeoInfo } = useDistance();

  const { updateDriver, driverMapMeta, taskMapMeta, teamMapMeta } =
    useDriverStore();
  const { addNotification } = useNotificationStore();
  const { addEvent } = useEventStore();
  const { updateNewDriverMeta } = useDriversMapMeta();
  const { updateNewTaskMeta } = useTasksMapMeta();
  const { updateNewTeamMeta } = useTeamsMapMeta();
  const { user } = useUser();

  const router = useRouter();

  const defaultValues = initialData
    ? { ...initialData }
    : {
        driver: "",
        phoneNo: null,
        vehicle: "",
        vehicleMake: "",
      };

  const form = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    const notificationData = {
      instigator: user?.fullName ? user.fullName : "Coordinator",
      title: "Driver",
      action: "Updated",
      description: `Driver: ${data.driver} has been updated`,
      team: data.team,
    };

    const updateData = {
      ...data,
      cachedLocation: {
        lat: isDriver?.lat,
        lng: isDriver?.lng,
        address: !isDriver?.label ? isDriverGeoInfo?.address : isDriver?.label,
      },
      setLocation: {
        lat: isDriver?.lat,
        lng: isDriver?.lng,
        address: !isDriver?.label ? isDriverGeoInfo?.address : isDriver?.label,
      },
    };

    try {
      setLoading(true);
      updateDriver(data.id, updateData);
      addNotification(notificationData);
      addEvent(notificationData);
      updateNewDriverMeta(driverMapMeta);
      updateNewTeamMeta(teamMapMeta);
      updateNewTaskMeta(taskMapMeta);
      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Error updating driver:", error);
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
              buttonVariants({
                variant: "outline",
                size: "icon",
                className: className,
              })
            )}
          >
            <Edit className="h-4 w-4" />
          </button>
        </DialogPrimitive.Trigger>

        <DialogContent>
          <DialogHeader className="pt-4 flex flex-row items-center justify-between">
            <div className="flex space-x-2">
              <div className="h-7 w-7 rounded-full border items-center flex justify-center">
                <Car className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <DialogTitle>Driver</DialogTitle>
                <DialogDescription>Edit existing driver</DialogDescription>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <DriverMapModal />
              <WarningModal
              title={"Warning!"}
              description={
                "If you plan on modifying the `Driver`, kindly ensure that you have updated the drivers location fields accordingly before submission. Your attention to this matter is appreciated."
              }
            />
            </div>
          </DialogHeader>

          <div>
            <div className="space-y-4 py-1 pb-4">
              <div className="space-y-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="driver"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Driver</FormLabel>
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
                          <FormLabel>Phone No.</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Phone No"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vehicle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Car Reg.</FormLabel>
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
                                  placeholder="Select Registration"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {vehicle.map((coord) => (
                                <SelectItem key={coord.id} value={coord.name}>
                                  {coord.name}
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
                      name="vehicleMake"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Make</FormLabel>
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
                                  placeholder="Select Make"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {make.map((coord) => (
                                <SelectItem key={coord.id} value={coord.name}>
                                  {coord.name}
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
                      name="locationPicker"
                      render={({ field }) => (
                        <FormItem className="pt-3">
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <DriverLocationPicker {...field} />
                          </FormControl>
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
