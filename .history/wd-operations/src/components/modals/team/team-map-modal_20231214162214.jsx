"use client";

import * as z from "zod";
import { MapPin, Map, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { addHours, addMinutes, format } from "date-fns";
import { useMediaQuery } from "react-responsive";

import { MapView } from "../../maps/modals/team-map";
import { TeamLocationPicker } from "../../location/map-select/team-location-picker";

import {
  useDistance,
  useLatLngPicker,
  useMobileMapToggle,
} from "../../../store/maps/use-location-picker";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../ui/maps/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

import { cn } from "../../../lib/utils/utils";

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
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const TeamMapModal = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });

  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({
    label: "Label",
    address: "Address",
    city: "City",
    state: "State",
    country: "Country",
  });

  const mobileMapToggle = useMobileMapToggle();
  const { isTeamGeoInfo } = useDistance();
  const { isTeam } = useLatLngPicker();

  const defaultValues = {
    locationPicker: "",
  };

  const form = useForm({
    defaultValues,
  });

  const onSubmit = () => {
  };

  useEffect(() => {
    if (isTeam !== null || isTeamGeoInfo !== null) {
      setMeta({
        ...meta,
        label: isTeam?.label,
        address: isTeamGeoInfo?.address,
        city: isTeamGeoInfo?.city,
        state: isTeamGeoInfo?.state,
        country: isTeamGeoInfo?.country,
      });
    }
  }, [isTeamGeoInfo, isTeam]);

  return (
    <>
      <DialogPrimitive.Root>
        <DialogPrimitive.Trigger asChild>
          <button
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
          >
            <MapPin className="h-5 w-5" />
          </button>
        </DialogPrimitive.Trigger>

        <DialogContent>
          <div className="flex md:grid md:grid-cols-10">
            {!isTabletMid ? (
              <>
                <div className="hidden md:flex md:col-span-6">
                  <MapView />
                </div>

                <div className="z-[120] p-8 ml-6 bg-card rounded-tr-lg rounded-br-lg shadow-md flex flex-col md:col-span-4">
                  <DialogHeader className="flex pt-2 flex-row items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="h-7 w-7 rounded-full border items-center flex justify-center">
                        <Map className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <DialogTitle>Map</DialogTitle>
                        <DialogDescription>Select Map</DialogDescription>
                      </div>
                    </div>
                    {/* <div className="flex items-center justify-center">
                      <button
                        onClick={mobileMapToggle.onToggle}
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            size: "icon",
                          })
                        )}
                      >
                        <Smartphone className="h-5 w-5" />
                      </button>
                    </div> */}
                  </DialogHeader>
                  <div className="">
                    <div className="space-y-4 py-1 pb-4">
                      <div className="space-y-4">
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                              control={form.control}
                              name="locationPicker"
                              render={({ field }) => (
                                <FormItem className="pt-2">
                                  <FormLabel className="font-semibold text-sm">
                                    Location
                                  </FormLabel>
                                  <FormControl>
                                    <TeamLocationPicker {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {meta.address != "Address" ? (
                              <>
                                {/* <Separator className={"h-[2px]"} /> */}
                                <div className="ml-2 mt-6 pb-10">
                                  <div className="flex pb-3 pt-0 items-center justify-between">
                                    <div className="font-semibold text-sm">
                                      Meta Data
                                    </div>
                                    <div className="text-sm font-medium tracking-tight text-primary/50 mr-5">
                                      {" "}
                                    </div>
                                  </div>
                                  <div className="border-border border rounded-md">
                                    <div className="flex flex-col pl-4 space-y-0 pb-2 pt-2">
                                      <label className="text-primary text-sm font-medium">
                                        Address :
                                      </label>
                                      <p className="ml-4 text-sm text-primary/80 ">
                                        -{" "}
                                        {meta.label ? meta.label : meta.address}
                                      </p>
                                    </div>
                                    <div className="flex flex-col pl-4 space-y-0 pb-2">
                                      <label className="text-primary font-medium text-sm">
                                        City :
                                      </label>
                                      <p className="ml-4 text-sm text-primary/80 ">
                                        - {meta.city}
                                      </p>
                                    </div>
                                    <div className="flex flex-col pl-4 space-y-0 pb-2">
                                      <label className="text-primary text-sm font-medium">
                                        State :
                                      </label>
                                      <p className="ml-4 text-sm text-primary/80 ">
                                        - {meta.state}
                                      </p>
                                    </div>
                                    <div className="flex flex-col pl-4 space-y-0 pb-2">
                                      <label className="text-primary text-sm font-medium">
                                        Country :
                                      </label>
                                      <p className="ml-4 text-sm text-primary/80 font-semibold w-fit px-2 py-1 rounded-lg ">
                                        - {meta.city}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="h-[450px]"></div>
                            )}

                            <div className="pt-10 absolute space-x-2 flex items-end justify-end w-full bottom-6 right-8">
                              <DialogPrimitive.Close asChild>
                                <Button disabled={loading} variant="outline">
                                  Cancel
                                </Button>
                              </DialogPrimitive.Close>

                              <DialogPrimitive.Close asChild>
                                <Button disabled={loading} type="submit">
                                  Continue
                                </Button>
                              </DialogPrimitive.Close>
                            </div>
                          </form>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {mobileMapToggle.isOpen ? (
                  <div className="flex md:hidden md:col-span-6">
                    <MapView />
                  </div>
                ) : (
                  <>
                    <div className="relative w-full  flex flex-col md:col-span-4">
                      <div className="z-[120] h-[100vh] p-8 bg-card rounded-lg shadow-md">
                        <DialogHeader className="flex pt-2 flex-row items-center justify-between">
                          <div className="flex space-x-2">
                            <div className="h-7 w-7 rounded-full border items-center flex justify-center">
                              <Map className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col">
                              <DialogTitle>Map</DialogTitle>
                              <DialogDescription>Select Map</DialogDescription>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <button
                              onClick={mobileMapToggle.onToggle}
                              className={cn(
                                buttonVariants({
                                  variant: "outline",
                                  size: "icon",
                                })
                              )}
                            >
                              <Smartphone className="h-5 w-5" />
                            </button>
                          </div>
                        </DialogHeader>
                        <div className="">
                          <div className="space-y-4 py-1 pb-4">
                            <div className="space-y-4">
                              <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                  <FormField
                                    control={form.control}
                                    name="locationPicker"
                                    render={({ field }) => (
                                      <FormItem className="pt-2">
                                        <FormLabel className="font-semibold text-sm">
                                          Location
                                        </FormLabel>
                                        <FormControl>
                                          <TeamLocationPicker {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  {meta.address != "Address" ? (
                                    <>
                                      {/* <Separator className={"h-[2px]"} /> */}
                                      <div className="ml-2 mt-6 pb-10">
                                        <div className="flex pb-3 pt-0 items-center justify-between">
                                          <div className="font-semibold text-sm">
                                            Meta Data
                                          </div>
                                          <div className="text-sm font-medium tracking-tight text-primary/50 mr-5">
                                            {" "}
                                          </div>
                                        </div>
                                        <div className="border-border border rounded-md">
                                          <div className="flex flex-col pl-4 space-y-0 pb-2 pt-2">
                                            <label className="text-primary text-sm font-medium">
                                              Address :
                                            </label>
                                            <p className="ml-4 text-sm text-primary/80 ">
                                              -{" "}
                                              {meta.label
                                                ? meta.label
                                                : meta.address}
                                            </p>
                                          </div>
                                          <div className="flex flex-col pl-4 space-y-0 pb-2">
                                            <label className="text-primary font-medium text-sm">
                                              City :
                                            </label>
                                            <p className="ml-4 text-sm text-primary/80 ">
                                              - {meta.city}
                                            </p>
                                          </div>
                                          <div className="flex flex-col pl-4 space-y-0 pb-2">
                                            <label className="text-primary text-sm font-medium">
                                              State :
                                            </label>
                                            <p className="ml-4 text-sm text-primary/80 ">
                                              - {meta.state}
                                            </p>
                                          </div>
                                          <div className="flex flex-col pl-4 space-y-0 pb-2">
                                            <label className="text-primary text-sm font-medium">
                                              Country :
                                            </label>
                                            <p className="ml-4 text-sm text-primary/80 font-semibold w-fit px-2 py-1 rounded-lg ">
                                              - {meta.city}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="h-[450px]"></div>
                                  )}

                                  <div className="pt-4 -mt-2 space-x-2 right-10 absolute bottom-18 flex items-end justify-end w-full ">
                                    <DialogPrimitive.Close asChild>
                                      <Button
                                        disabled={loading}
                                        variant="outline"
                                      >
                                        Cancel
                                      </Button>
                                    </DialogPrimitive.Close>

                                    <DialogPrimitive.Close asChild>
                                      <Button disabled={loading} type="submit">
                                        Continue
                                      </Button>
                                    </DialogPrimitive.Close>
                                  </div>
                                </form>
                              </Form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </DialogPrimitive.Root>
    </>
  );
};
