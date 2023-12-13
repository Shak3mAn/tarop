"use client";

import * as React from "react";
import {
  Car,
  Check,
  ChevronsUpDown,
  FileSpreadsheet,
  PlusCircle,
  ScrollText,
  Users,
  Users2,
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
import { useMainMapSwitcher } from "../../store/use-general";

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

export default function MainMapSwitcher({ items = [] }) {
  const [open, setOpen] = React.useState(false);
  const [currentList, setCurrentList] = React.useState("");
  const [formattedTeams, setFormattedTeams] = React.useState([]);
  const [formattedTasks, setFormattedTasks] = React.useState([]);
  const [formattedDrivers, setFormattedDrivers] = React.useState([]);

  React.useEffect(() => {
    if (items != []) {
      setFormattedDrivers([]);
      setFormattedTasks([]);
      setFormattedTeams([]);
      items.tasks?.map((item) => {
        setFormattedTasks((state) => [
          ...state,
          {
            value: item.id,
            label: item.name,
          },
        ]);
      });
      items.teams?.map((item) => {
        setFormattedTeams((state) => [
          ...state,
          {
            value: item.id,
            label: item.name,
          },
        ]);
      });
      items.drivers?.map((item) => {
        setFormattedDrivers((state) => [
          ...state,
          {
            value: item.id,
            label: item.name,
          },
        ]);
      });
    }
  }, [items]);

  const { isMainMap, addMainMap } = useMainMapSwitcher();

  const onListSelect = (list) => {
    setOpen(false);
    setCurrentList(list);
    addMainMap(list);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "icon",
              className: "w-[225px] sm:w-[250px] md:w-[250px] justify-between",
            })
          )}
        >
          <Users2 className="ml-1 mr-2 h-4 w-4" />
          {currentList?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </button>
      </Popover.Trigger>
      <PopoverContent className="w-[225px] sm:w-[250px] md:w-[250px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search..." />
            <CommandEmpty>Not found</CommandEmpty>

            {/* Teams */}
            <CommandGroup heading="Teams">
              {formattedTeams?.map((list) => (
                <CommandItem
                  key={list?.value}
                  onSelect={() => onListSelect(list)}
                  className="text-sm"
                >
                  <Users className="mr-2 h-4 w-4" />
                  {list?.label}
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

            {/* Drivers */}
            <CommandGroup heading="Drivers">
              {formattedDrivers?.map((list) => (
                <CommandItem
                  key={list?.value}
                  onSelect={() => onListSelect(list)}
                  className="text-sm"
                >
                  <Car className="mr-2 h-4 w-4" />
                  {list?.label}
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

            {/* Tasks */}
            <CommandGroup heading="Tasks">
              {formattedTasks?.map((list) => (
                <CommandItem
                  key={list?.value}
                  onSelect={() => onListSelect(list)}
                  className="text-sm"
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  {list?.label}
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
        </Command>
      </PopoverContent>
    </Popover.Root>
  );
}
