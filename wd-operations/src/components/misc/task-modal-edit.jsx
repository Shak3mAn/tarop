"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Tabs from "@radix-ui/react-tabs";
import { FileSpreadsheet, MoreHorizontal, Pencil } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { useToggleTaskTab } from "../../store/use-toggle-task-tab";
import {
  useLatLngPicker,
  useTimePicker,
  useDistance,
} from "../../store/maps/use-location-picker";
import { useTaskStore } from "../../store/api/tasks-store";
import { useDriverStore } from "../../store/api/driver-store";
import { useNotificationStore } from "../../store/api/notification-store";
import { useEventStore } from "../../store/api/event-store";
import {
  useDriversMapMeta,
  useTasksMapMeta,
  useTeamsMapMeta,
} from "../../store/api/map-meta-store";
import { useTeamStore } from "../../store/api/team-store";

import { LocationPicker } from "../location/location-picker";
import { DateTimePicker } from "../date-time/date-time-picker";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TabsContent } from "../ui/tab";
import { TesterSeparator } from "../ui/misc/tester-separator";
import { Button } from "../ui/button";
import { Editor } from "../editor/editor";

import { cn } from "../../lib/utils/utils";

import { statuses } from "../../lib/utils/data";

export const EditTaskOption = ({ initialData }) => {
  const isToggleTab = useToggleTaskTab();
  const [loading, setLoading] = useState(false);

  const { isTimePicker } = useTimePicker();
  const { isFrom, isTo } = useLatLngPicker();
  const { isDistance, isSourceGeoInfo, isDestinationGeoInfo, isEta } =
    useDistance();

  const { fetchDrivers, driversInfo } = useDriverStore();
  const { fetchTeams, teamsLocation, teamsName } = useTeamStore();

  const { updateTask, taskMapMeta, teamMapMeta, driverMapMeta } =
    useTaskStore();
  const { addNotification } = useNotificationStore();
  const { addEvent } = useEventStore();
  const { user } = useUser();
  const { updateNewTaskMeta } = useTasksMapMeta();
  const { updateNewTeamMeta } = useTeamsMapMeta();
  const { updateNewDriverMeta } = useDriversMapMeta();

  const router = useRouter();

  const defaultValues = initialData
    ? { ...initialData }
    : {
        name: "",
        shortDescription: "",
        longDescription: "",
        team: "",
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

    const editData = {
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
      action: "Updated",
      description: `Task: ${data.name} has been updated`,
      team: data.team,
    };

    try {
      setLoading(true);
      await updateTask(data.id, editData, teamInfo[0], driverLocation[0]);
      await addNotification(notificationData);
      await addEvent(notificationData);
      await updateNewTaskMeta(taskMapMeta);
      await updateNewTeamMeta(teamMapMeta);
      await updateNewDriverMeta(driverMapMeta);
      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Error editing task", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                                  <SelectItem key={team.id} value={team.name}>
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

                      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
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
          </TabsContent>
        </Tabs.Root>
      </div>
    </>
  );
};
