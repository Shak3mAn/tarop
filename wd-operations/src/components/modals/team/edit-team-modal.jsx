"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter} from "next/navigation" 
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Edit, Users } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { useTeamStore } from "../../../store/api/team-store";
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

import { TeamLocationPicker } from "../../location/map-select/team-location-picker";
import { TeamMapModal } from "./team-map-modal";
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

export const EditTeamModal = ({
  initialData,
  operationCoordinators,
  supportCoordinators,
  drivers,
  driversInfo,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isTeam } = useLatLngPicker();
  const { isTeamGeoInfo } = useDistance();

  const { updateTeam, teamMapMeta, driverMapMeta, taskMapMeta } =
    useTeamStore();
  const { addNotification } = useNotificationStore();
  const { addEvent } = useEventStore();
  const { user } = useUser();
  const { updateNewTeamMeta } = useTeamsMapMeta();
  const { updateNewDriverMeta } = useDriversMapMeta();
  const { updateNewTaskMeta } = useTasksMapMeta();

  const router = useRouter();

  const defaultValues = initialData
    ? { ...initialData }
    : {
        team: "",
        teamColor: "",
        operationCoordinator: "",
        supportCoordinator: "",
        driver: "",
      };

  const form = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {

    const driverLocation = driversInfo.filter(
      (driver) => driver.driver === data.driver
    );

    const updateData = {
      ...data,
      driverId: driverLocation[0].driverId,
      cachedLocation: {
        lat: isTeam?.lat,
        lng: isTeam?.lng,
        address: !isTeam?.label ? isTeamGeoInfo?.address : isTeam?.label,
      },
      setLocation: {
        lat: isTeam?.lat,
        lng: isTeam?.lng,
        address: !isTeam?.label ? isTeamGeoInfo?.address : isTeam?.label,
      },
      driverLocation: driverLocation[0]
    };

    const notificationData = {
      instigator: user?.fullName ? user.fullName : "User",
      title: "Team",
      action: "Updated",
      description: `Team: ${data.team} has been updated`,
      team: data.team,
    };

    try {
      setLoading(true);
      updateTeam(data.id, updateData);
      addNotification(notificationData);
      addEvent(notificationData);
      updateNewTeamMeta(teamMapMeta);
      updateNewDriverMeta(driverMapMeta);
      updateNewTaskMeta(taskMapMeta);
      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Error editing team", error);
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
                <Users className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <DialogTitle>Team</DialogTitle>
                <DialogDescription>Manage Existing Team</DialogDescription>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <TeamMapModal />
              <WarningModal
              title={"Warning!"}
              description={
                "If you plan on modifying the `Team`, kindly ensure that you have updated the teams location fields accordingly before submission. Your attention to this matter is appreciated."
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
                      name="team"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Team"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="teamColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Color</FormLabel>
                          <FormControl>
                            <Input
                              type={"color"}
                              disabled={loading}
                              placeholder="Team Color"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="operationCoordinator"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Operation Coordinator</FormLabel>
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
                                  placeholder="Select Coordinator"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {operationCoordinators.map((coord) => (
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
                      name="supportCoordinator"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Supporting Coordinator</FormLabel>
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
                                  placeholder="Select Coordinator"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {supportCoordinators.map((support) => (
                                <SelectItem
                                  key={support.id}
                                  value={support.name}
                                >
                                  {support.name}
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
                      name="driver"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Driver</FormLabel>
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
                                  placeholder="Select Driver"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {drivers.map((driver) => (
                                <SelectItem key={driver.id} value={driver.name}>
                                  {driver.name}
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
                            <TeamLocationPicker />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-10 pb-14 space-x-2 flex items-center justify-end w-full">
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
