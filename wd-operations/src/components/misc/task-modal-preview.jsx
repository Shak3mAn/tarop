"use client";
import { cva } from "class-variance-authority";
import { useState, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";

import { useToggleTaskTab } from "../../store/use-toggle-task-tab";
import { useEditTask } from "../../store/use-edit-task";

import { TabsContent } from "../ui/tab";
import { TesterSeparator } from "../ui/misc/tester-separator";
import { Button } from "../ui/button";
import { Preview } from "../editor/preview";

import { cn } from "../../lib/utils/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

export const PreviewTaskOption = ({ initialData }) => {
  const isToggleTab = useToggleTaskTab();
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState({})

  const { isEditData } = useEditTask();

  useEffect(() => {
    if (initialData) {
      setPreviewData(initialData);
    }
  }, [])

  useEffect(() => {
    if (isEditData) {
      setPreviewData(isEditData);
    }
  }, [isEditData])
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
                <div className="space-y-4 my-2">
                  {/* Preview Data */}
                  <div>
                    <div className="space-y-2 mt-2">
                      <div className={cn(labelVariants(), "")}>Name</div>
                      <p className="flex rounded-md bg-transparent px-3 text-sm text-primary/50">
                        Pick-Up
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="space-y-2 mt-2">
                      <div className={cn(labelVariants(), "")}>
                        Short Description
                      </div>
                      <p className="flex rounded-md bg-transparent px-3 text-sm text-primary/50">
                        Pick-Up
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="space-y-2 mt-2">
                      <div className={cn(labelVariants(), "")}>
                        Long Description
                      </div>
                      {/* <p className="flex rounded-md bg-transparent px-3 text-sm text-primary/50">
                      Preview Space
                      </p> */}
                      <Preview />
                    </div>
                  </div>

                  <div>
                    <div className="space-y-2 mt-2">
                      <div className={cn(labelVariants(), "")}>Team</div>
                      <p className="flex rounded-md bg-transparent px-3 text-sm text-primary/50">
                        Avengers
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 space-x-2 flex items-center justify-end w-full">
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
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tab2">
            <div>
              <div className="py-1 pb-4">
                <div className="space-y-9 my-2 h-[400px]">
                  {/* Preview Data */}
                  <div>
                    <div className="space-y-2 mt-2">
                      <div className={cn(labelVariants(), "")}>Date & Time</div>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                        <div className="col-span-2">
                          <p className="flex rounded-md bg-transparent px-3 text-sm text-primary/50">
                            21st October 1963
                          </p>
                        </div>
                        <div className="flex flex-col col-span-1">
                          <span className="text-muted-foreground text-sm">
                            From:
                          </span>
                          <p className="flex rounded-md bg-transparent px-3 text-sm text-primary/50">
                            10:10 AM
                          </p>
                        </div>
                        <div className="flex flex-col col-span-1">
                          <span className="text-muted-foreground text-sm">
                            To:
                          </span>
                          <p className="flex rounded-md bg-transparent px-3 text-sm text-primary/50">
                            12: 45 PM
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="space-y-2 mt-8">
                        <div className={cn(labelVariants(), "")}>Location</div>
                        <div className="space-y-3">
                          <div className="flex flex-col space-y-1 space-x-1">
                            <span className="text-muted-foreground text-sm">
                              From:
                            </span>
                            <div className="flex flex-row items-center justify-between">
                              <p className="flex rounded-md bg-transparent px-3 text-sm text-primary/50">
                                Narnia
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-1 space-x-1">
                            <span className="text-muted-foreground text-sm">
                              To:
                            </span>
                            <div className="flex flex-row items-center justify-between">
                              <p className="flex rounded-md bg-transparent px-3 text-sm text-primary/50">
                                Hogwarts
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-10 right-7 space-x-2 flex items-center justify-end w-full">
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
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs.Root>
      </div>
    </>
  );
};
