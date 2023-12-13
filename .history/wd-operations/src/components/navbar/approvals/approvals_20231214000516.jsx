"use client";

import * as React from "react";
import { UserCircle } from "lucide-react";
import { cva } from "class-variance-authority";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { cn } from "../../../lib/utils/utils";
import { MenuSeparator } from "../../ui/misc/MenuSeparator";

import { useNotificationStore } from "../../../store/api/notification-store";
import { useEventStore } from "../../../store/api/event-store";
import { useApprovalsStore } from "../../../store/api/approvals-store";
import { useOperatorStore } from "../../../store/api/operator-store";
import { useSupportStore } from "../../../store/api/support-store";
import { useDriverStore } from "../../../store/api/driver-store";
import { useUserStore } from "../../../store/api/user-store";

import { AlertModal } from "../../modals/alert-modal";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuNotificationItem,
  DropdownMenuLabel,
} from "../../ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Checkbox } from "../../ui/checkbox";

//TODO: Build the Notifications Dialog and introduce various segments or partitions for different notification components

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

const Approvals = () => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [approved, setApproved] = React.useState(false);

  const { fetchApprovals, approvals, deleteApprovals } = useApprovalsStore();
  const { fetchUsers, updateUserAdmin, updateUserApproval, users } =
    useUserStore();
  const { addDriver } = useDriverStore();
  const { addOperator } = useOperatorStore();
  const { addSupport } = useSupportStore();
  const { addNotification } = useNotificationStore();
  const { addEvent } = useEventStore();
  const { user } = useUser();

  React.useEffect(() => {
    const fetchAppUser = async () => {
      await fetchApprovals();
      await fetchUsers();
    };
    fetchAppUser();
  }, []);

  const router = useRouter();

  const defaultValues = {
    isAdmin: false,
    isApproved: false,
  };

  const form = useForm({
    defaultValues,
  });

  const approvalAdmin = ({ userApprovalData }) => {
    users.map((person) => {
      if (!person.isApproved) {
        approvals.map((approval) => {
          if (approval.title == person.name) {
            if (person?.role == "Driver") {
              const driverData = {
                driver: person.name,
                phoneNo: person.phoneNo,
              };
              const notificationDriver = {
                instigator: user?.fullName ? user.fullName : "User",
                title: "Driver",
                action: "Created",
                description: `Driver: ${person.name} request as driver has been approved and created`,
                team: "TBA",
              };

              try {
                addDriver(driverData);
                addNotification(notificationDriver);
                addEvent(notificationDriver);
                updateUserApproval(person._id, userApprovalData);
              } catch (error) {
                console.error("Error creating driver:", error);
              }
            } else if (person?.role == "Support Coordinator") {
              const supportData = {
                fullName: person.name,
                firstName: person.first,
                lastName: person.last,
                phoneNo: person.phoneNo,
                email: person.email,
              };

              const notificationSupport = {
                instigator: user?.fullName ? user.fullName : "User",
                title: "Support Coordinator",
                action: "Created",
                description: `Support Coordinator: ${person.name} request as support has been approved and created`,
                team: "TBA",
              };

              try {
                addSupport(supportData);
                addNotification(notificationSupport);
                addEvent(notificationSupport);
                updateUserApproval(person._id, userApprovalData);
              } catch (error) {
                console.error("Error creating support:", error);
              }
            } else if (person?.role == "Operation Coordinator") {
              const operatorData = {
                fullName: person?.name ? person?.name : "T.B.C",
                firstName: person.first,
                lastName: person.last,
                phoneNo: person.phoneNo,
                email: person.email,
              };

              const notificationOperator = {
                instigator: user?.fullName ? user.fullName : "User",
                title: "Operator Coordinator",
                action: "Created",
                description: `Operator Coordinator: ${person.name} request as operator has been approved and created`,
                team: "TBA",
              };

              try {
                addOperator(operatorData);
                addNotification(notificationOperator);
                addEvent(notificationOperator);
                updateUserApproval(person._id, userApprovalData);
              } catch (error) {
                console.error("Error creating operator:", error);
              }
            } else {
              const adminData = {
                fullName: person?.name ? person?.name : "T.B.C",
                firstName: person.first,
                lastName: person.last,
                phoneNo: person.phoneNo,
                email: person.email,
              };
              const adminStatus = {
                isAdmin: true,
              };

              const notificationAdmin = {
                instigator: user?.fullName ? user.fullName : "User",
                title: "Admin",
                action: "Created",
                description: `Admin: ${person.name} request as admin has been approved and created`,
                team: "TBA",
              };

              try {
                addOperator(adminData);
                updateUserAdmin(person._id, adminStatus);
                addNotification(notificationAdmin);
                addEvent(notificationAdmin);
                updateUserApproval(person._id, userApprovalData);
              } catch (error) {
                console.error("Error creating admin:", error);
              }
            }
          }
        });
      }
    });

    deleteApprovals();
  };

  const onSubmit = () => {
    setLoading(true);
    const userApprovalData = {
      isApproved: true,
    };

    const timer = setTimeout(approvalAdmin({ userApprovalData }), 4000);

    clearTimeout(timer);

    form.reset();
    setLoading(false);
    router.refresh();
  };

  return (
    <>
      <Dropdown.Root>
        <Dropdown.Trigger>
          <div className="">
            {approvals?.length > 0 && (
              <>
                <div className="absolute animate-ping ml-8 -mt-1 z-20 h-3 w-3 rounded-full bg-red-800 opacity-90" />
                <div className="absolute ml-8 -mt-1 z-20 h-3 w-3 rounded-full bg-red-800 opacity-90" />
              </>
            )}
            <button
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                })
              )}
            >
              <UserCircle className="h-5 w-5" />
            </button>
          </div>
        </Dropdown.Trigger>

        <DropdownMenuContent
          className="w-[420px] h-auto max-h-[500px]"
          align="end"
        >
          <div className="flex justify-between items-center">
            <DropdownMenuLabel className="pl-4 text-md font-bold">
              Approvals
            </DropdownMenuLabel>

            <DropdownMenuLabel className="pr-4 flex items-center text-sm font-semibold">
              <span className="font-semibold mr-3 text-primary tracking-tight">
                Approve:
              </span>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="isApproved"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            type="submit"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </DropdownMenuLabel>
          </div>
          <DropdownMenuNotificationItem className="mb-3">
            <ScrollArea.Root className="w-[400px] h-auto max-h-[280px] overflow-hidden overflow-y-auto scrollbar-hide rounded-lg border px-1 py-1">
              <ScrollArea.Viewport className="w-full h-full rounded-md">
                {approvals ? (
                  <div>
                    {approvals?.map((data) => (
                      <div className="px-2 py-2" key={data.id}>
                        <div className="flex flex-row items-center justify-between space-y-0 pb-1">
                          <div className="text-md font-bold tracking-tight">
                            {data.user}
                          </div>
                        </div>
                        <MenuSeparator />
                        <div className="pt-1 pb-4">
                          <div className="text-primary/90 tracking-tight font-semibold pb-2">
                            {data.action}
                          </div>
                          <p className="text-sm tracking-tight">
                            {/* Seeks approval for {data.role} */}
                            {data.description}
                          </p>
                        </div>
                        {/* Menu Separator */}
                        <MenuSeparator />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="items-center h-auto md:h-[100px] justify-center flex text-sm text-primary text-opacity-70 font-semibold">
                    No Approvals
                  </div>
                )}
              </ScrollArea.Viewport>
              <ScrollArea.Corner />
            </ScrollArea.Root>
          </DropdownMenuNotificationItem>
        </DropdownMenuContent>
      </Dropdown.Root>
    </>
  );
};

export default Approvals;
