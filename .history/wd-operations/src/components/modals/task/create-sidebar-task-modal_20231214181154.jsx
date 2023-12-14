"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Tabs from "@radix-ui/react-tabs";
import { FileSpreadsheet, Plus, Pencil } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { useToggleTaskTab } from "../../../store/use-toggle-task-tab";
import {
  useLatLngPicker,
  useTimePicker,
  useDistance,
} from "../../../store/maps/use-location-picker";
import { useTaskStore } from "../../../store/api/tasks-store";
import { useDriverStore } from "../../../store/api/driver-store";
import { useNotificationStore } from "../../../store/api/notification-store";
import { useEventStore } from "../../../store/api/event-store";
import {
  useTeamsMapMeta,
  useDriversMapMeta,
  useTasksMapMeta,
} from "../../../store/api/map-meta-store";
import { useTeamStore } from "../../../store/api/team-store";

import { LocationPicker } from "../../location/location-picker";
import { DateTimePicker } from "../../date-time/date-time-picker";
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
import { TabsContent } from "../../ui/tab";
import { TesterSeparator } from "../../ui/misc/tester-separator";
import { Button } from "../../ui/button";
import { Editor } from "../../editor/editor";
import { WarningModal } from "../alert/warning-modal";
import { cn } from "../../../lib/utils/utils";

import { statuses } from "../../../lib/utils/data";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input rounded-full bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 w-full",
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

export const CreateTaskModal = () => {
  const isToggleTab = useToggleTaskTab();
  const [loading, setLoading] = useState(false);

  const { isTimePicker } = useTimePicker();
  const { isFrom, isTo } = useLatLngPicker();
  const { isDistance, isSourceGeoInfo, isDestinationGeoInfo, isEta } =
    useDistance();

  const { fetchDrivers, driversInfo } = useDriverStore();
  const { fetchTeams, teamsName, teamsLocation } = useTeamStore();

  const { addTask, taskMapMeta, teamMapMeta, driverMapMeta } = useTaskStore();
  const { addNotification } = useNotificationStore();
  const { addEvent } = useEventStore();
  const { user } = useUser();
  const { addNewTaskMeta } = useTasksMapMeta();
  const { addNewTeamMeta } = useTeamsMapMeta();
  const { addNewDriverMeta } = useDriversMapMeta();

  const router = useRouter();

  const defaultValues = {
    name: "",
    shortDescription: "",
    longDescription: "",
    team: "",
    startTime: "",
    endTime: "",
    status: "",
  };

  const form = useForm({
    defaultValues,
  });

  useEffect(() => {
    const fetchTmsDrvs = async () => {
      await fetchTeams();
      await fetchDrivers();
    };

    fetchTmsDrvs();
  }, []);

  const onSubmit = async (data) => {
    const teamInfo = teamsLocation.filter((team) => team.team == data.team);

    const driverLocation = driversInfo.filter(
      (driver) => driver.driver == teamInfo[0].driver
    );

    const newData = {
      ...data,
      startDate: isTimePicker.startDate,
      startTime: isTimePicker.startTime,
      endTime: isTimePicker.endTime,
      source: {
        sourceLat: isFrom?.lat,
        sourceLng: isFrom?.lng,
        sourceName: isFrom?.name,
        sourceLabel: isFrom?.label,
        sourceAddress: isSourceGeoInfo?.address,
        sourceCity: isSourceGeoInfo?.city,
        sourceState: isSourceGeoInfo?.state,
        sourceCountry: isSourceGeoInfo?.country,
      },
      destination: {
        destinationLat: isTo?.lat,
        destinationLng: isTo?.lng,
        destinationName: isTo?.name,
        destinationLabel: isTo?.label,
        destinationAddress: isDestinationGeoInfo?.address,
        destinationCity: isDestinationGeoInfo?.city,
        destinationState: isDestinationGeoInfo?.state,
        destinationCountry: isDestinationGeoInfo?.country,
      },
      duration: isDistance?.duration,
      distance: isDistance?.distance,
      eta: isEta?.eta,
    };

    const notificationData = {
      instigator: user?.fullName ? user.fullName : "User",
      title: "Task",
      action: "Created",
      description: `Task: ${data.name} has been created`,
      team: data.team,
    };

    try {
      setLoading(true);
      await addTask(newData, teamInfo[0], driverLocation[0]);
      await addNotification(notificationData);
      await addEvent(notificationData);
      await addNewTaskMeta(taskMapMeta);
      await addNewDriverMeta(driverMapMeta);
      await addNewTeamMeta(teamMapMeta);
      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Error creating task", error);
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
            <Plus className="h-4 w-4" />
          </button>
        </DialogPrimitive.Trigger>

        <DialogContent>
          <DialogHeader className="pt-4 flex flex-row items-center justify-between">
            <div className="flex space-x-3">
              <div className="h-7 w-7 rounded-full border items-center flex justify-center">
                <FileSpreadsheet className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <DialogTitle>Task</DialogTitle>
                <DialogDescription>Create new task</DialogDescription>
              </div>
            </div>

            <WarningModal
              title={"Warning!"}
              description={
                "If you plan on creating the `Task`, kindly ensure that you have updated the source's & destination's location, and `startTime`, `startDate` & `endTime` fields accordingly before submission. Your attention to this matter is appreciated."
              }
            />
          </DialogHeader>

          <div className="px-6 flex h-auto w-full">
            <Tabs.Root className="flex flex-col w-full" defaultValue="tab1">
              <Tabs.List
                className="grid grid-cols-2 gap-x-4"
                aria-label="Manage tasks"
              >
                <div onClick={isToggleTab.onDetails}>
                  <Tabs.Trigger value="tab1" asChild>
                    <div
                      className={cn(
                        "flex flex-col space-y-1 items-start justify-left  text-muted-foreground/60 text-sm hover:text-accent-foreground data-[state=active]:text-primary data-[state=active]:focus:relative data-[state=active]:focus:font-semibold"
                      )}
                    >
                      <TesterSeparator
                        className={cn(
                          "h-1 rounded-full",
                          isToggleTab.isDetails === "tab1" && `bg-primary`
                        )}
                      />
                      <span className="cursor-pointer tracking-tighter ml-2">
                        Details
                      </span>
                    </div>
                  </Tabs.Trigger>
                </div>
                <div onClick={isToggleTab.onDates}>
                  <Tabs.Trigger value="tab2" asChild>
                    <div
                      className={cn(
                        "flex flex-col space-y-1 items-start justify-start text-sm text-muted-foreground/60 hover:text-accent-foreground data-[state=active]:text-primary data-[state=active]:focus:relative data-[state=active]:focus:font-semibold"
                      )}
                    >
                      <TesterSeparator
                        className={cn(
                          "h-1 rounded-full",
                          isToggleTab.isDetails === "tab2" && `bg-primary`
                        )}
                      />
                      <span className="cursor-pointer tracking-tighter ml-2">
                        Date & Locations
                      </span>
                    </div>
                  </Tabs.Trigger>
                </div>
              </Tabs.List>
              <TabsContent value="tab1">
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
                                    placeholder="Task"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="shortDescription"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Short Description</FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={loading}
                                    placeholder="Description"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="longDescription"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Long Description</FormLabel>
                                <FormControl>
                                  <Editor {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="team"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Team</FormLabel>
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
                                        placeholder="Select Team"
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {teamsName.map((team) => (
                                      <SelectItem
                                        key={team.id}
                                        value={team.name}
                                      >
                                        {team.name}
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
                                      <SelectItem
                                        key={status.id}
                                        value={status.name}
                                      >
                                        {status.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="pt-6 pb-20 space-x-2 flex items-center justify-end w-full">
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
              </TabsContent>

              <TabsContent value="tab2">
                <div>
                  <div className="py-1 pb-4">
                    <div className="space-y-4">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                          <FormField
                            control={form.control}
                            name="dateTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date & Time</FormLabel>
                                <FormControl>
                                  <DateTimePicker {...field} />
                                </FormControl>
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
                                  <LocationPicker {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="pt-10 pb-14  sm:pb-0 space-x-2 flex items-center justify-end w-full">
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
              </TabsContent>
            </Tabs.Root>
          </div>
        </DialogContent>
      </DialogPrimitive.Root>
    </>
  );
};
