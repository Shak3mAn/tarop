"use client";

import { useState } from "react";

import { Mail, PlusCircle } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  id: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1),
});

export const AccountForm = ({ initialData }) => {
  const [loading, setLoading] = useState(false);

  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
      };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = () => {
    console.log("onSubmit");
  };

  return (
    <>
      <div className="flex items-center justify-left">
        <Heading
          title="Account"
          description="Personal information about the user."
        />
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <div className="flex flex-row items-center pt-2 text-lg font-semibold leading-none tracking-tight">
            Full Name
          </div>
          <div className="pb-8 pt-2 flex flex-col md:grid md:grid-cols-2 gap-x-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="LastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <Separator /> */}
          <div className="flex flex-row items-center pt-4 text-lg font-semibold leading-none tracking-tight">
            Contact Email
          </div>
          <div className="flex flex-row items-center -pt-2 text-sm text-muted-foreground">
            Manage your accounts email address
          </div>
          <div className="flex md:grid md:grid-cols-1 pt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-16">
            <Button disabled={loading} className="ml-auto" type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
