import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil, Plus } from "lucide-react";
import { Textarea } from "../../ui/textarea";


import { toast } from "react-toastify";
import { Designation } from "@prisma/client";
import { DesignationFormData } from "@/types/form";
import { createDesignationSchema } from "@/lib/validations";
import { updateDesignation } from "@/actions/designation.action";

const EditDesignation = ({ designation }: {
    designation: Designation
}) => {
    const [open, setOpen] = useState<boolean>(false);


    const designationForm = useForm<z.infer<typeof createDesignationSchema>>({
        resolver: zodResolver(createDesignationSchema),
        defaultValues: {
            name: designation.designationName,
            description: designation.designationDescription ??  undefined
        }
    })

    const onSubmit = async (values: z.infer<typeof createDesignationSchema>) => {
        try {
            const result = await updateDesignation(values,designation.designationId);
            if (result?.error) {
                toast.error(result.error)
            } else {
                toast.success("Designation updated successfully!");
                setOpen(false);
            }
        } catch (e) {
            toast.error("Something went wrong. Please try again.");
            console.error(e);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="flex items-center justify-center bg-secondary-default text-white rounded-lg h-12 px-4"
                    onClick={() => setOpen(true)}
                >
                    <Pencil className="h-4 w-4 text-white"  />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[350px] bg-white rounded-lg max-w-[350px]  ">
                <DialogHeader className="flex items-center justify-center pb-5 border-b border-b-grey-50">
                    <DialogTitle>Edit Designation</DialogTitle>
                </DialogHeader>

                <Form {...designationForm} >
                    <form onSubmit={designationForm.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <FormField
                            control={designationForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Username</FormLabel> */}
                                    <FormControl>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Enter Designation Name"
                                            className="col-span-4 rounded-lg h-12"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={designationForm.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Username</FormLabel> */}
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter Designation Description"
                                            className="col-span-4 rounded-lg h-24"
                                            id="description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />




                        <DialogFooter className="flex flex-col">
                            <div className="w-full h-full flex flex-1 items-center justify-center gap-5">
                                <Button
                                    type="submit"
                                    className="bg-primary-default text-white rounded-lg"
                                    size="lg"
                                >
                                    Edit
                                </Button>
                                <Button
                                    className="bg-secondary-default text-white rounded-lg"
                                    size="lg"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>


                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDesignation;
