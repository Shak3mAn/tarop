"use client";

import * as React from "react";
import {
  Car,
  Check,
  ChevronsUpDown,
  PlusCircle,
  ScrollText,
  Users,
  Users2,
  FileSpreadsheet,
} from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { useTDListSwitcher } from "../../store/use-general";

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

export default function TDListSwitcher({ className, items = [] }) {
  const { addTDList, isTDList } = useTDListSwitcher();

  const formattedItems = items.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // const currentList = formattedItems.find(
  //   (item) => item.value === params.listId
  // );

  const [open, setOpen] = React.useState(false);
  const [currentList, setCurrentList] = React.useState("");

  const onListSelect = (list) => {
    setOpen(false);
    setCurrentList(list);
    addTDList(list);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "icon",
              className: "w-full sm:w-full md:w-[250px] justify-between",
            })
          )}
        >
          <Users2 className="ml-1 mr-2 h-4 w-4" />
          {currentList?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </button>
      </Popover.Trigger>
      <PopoverContent className="w-[300px] sm:w-[500px] md:w-[250px] p-0">
        <Command>
          <CommandList>
            {/* <CommandInput placeholder="Search Store..." /> */}
            <CommandEmpty>Not found</CommandEmpty>
            <CommandGroup heading="Options">
              {formattedItems.map((list) => (
                <CommandItem
                  key={list.value}
                  onSelect={() => onListSelect(list)}
                  className="text-sm"
                >
                  {list.label == "Teams" && <Users className="mr-2 h-4 w-4" />}
                  {list.label == "Drivers" && <Car className="mr-2 h-4 w-4" />}
                  {list.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentList?.value === list.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          {/* <CommandList>
            <CommandGroup>
              <CommandItem onSelect={() => onCreateListSelect()}>
                <PlusCircle className="mr-2 h-5 w-5" />
                Create
              </CommandItem>
            </CommandGroup>
          </CommandList> */}
        </Command>
      </PopoverContent>
    </Popover.Root>
  );
}
