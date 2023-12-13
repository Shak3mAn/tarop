"use client"

import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"

import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import { Separator } from "../../ui/separator"
import { Heading } from "../../ui/heading"
import { AlertModal } from "../../modals/alert-modal"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../../ui/select';
import { Checkbox } from "../../ui/checkbox"

//TODO: check on the ID and add more color options.
//TODO: on the value addition of the selected option, check on whether figure out what's rendering and whether the exact value is the value specified.

const formSchema = z.object({
    id: z.string().min(1),
    team: z.string().min(1),
    teamColorId: z.string().min(1),
    operationCoordinatorId: z.string().min(1),
    supportCoordinatorId: z.string().min(1),
    driverId: z.string().min(1),
    statusId: z.string().min(1),
})

export const TeamForm = ({
    initialData,
    teamColor,
    operationCoordinators,
    supportCoordinators,
    drivers,
    statuses
}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? 'Edit team' : 'Create team';
    const subDescription = initialData ? 'Edit team description' : 'Add team description';
    const toastMessage = initialData ? 'Team updated' : 'Team created';
    const action = initialData ? 'Save changes' : 'Create';

    const defaultValues = initialData ? {
        ...initialData
    } : {
        id: '',
        team: '',
        teamColorId: '',
        operationCoordinatorId: '',
        supportCoordinatorId: '',
        driverId: '',
        statusId: '',
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const onSubmit = () => {
    }

    const onDelete = () => {
    }

    return (
        <>
            {/* <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            /> */}

            <div className="flex items-center justify-between">
                <Heading title={title} description={subDescription} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="team"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Team name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="colorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team Color</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select Color" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {teamColor.map((color) => (
                                                <SelectItem key={color.id} value={color.id}>
                                                    {color.name}
                                                    <div
                                                        className="h-6 w-6 rounded-full border"
                                                        style={{ backgroundColor: color.name }}
                                                    />
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
                            name="operationCoordinatorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Operation Coordinator</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select Coordinator" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {operationCoordinators.map((coord) => (
                                                <SelectItem key={coord.id} value={coord.id}>{coord.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="supportCoordinatorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Supporting Coordinator</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select Coordinator" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {supportCoordinators.map((support) => (
                                                <SelectItem key={support.id} value={support.id}>{support.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="driverId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Driver</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select Driver" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {drivers.map((team) => (
                                                <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="statusId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select Status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {statuses.map((status) => (
                                                <SelectItem key={status.id} value={status.id}>{status.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}