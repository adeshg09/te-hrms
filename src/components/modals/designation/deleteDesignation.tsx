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
import { Pencil, Plus, Trash } from "lucide-react";
import { Textarea } from "../../ui/textarea";

import { toast } from "react-toastify";
import { Designation } from "@prisma/client";
import { deleteDesignation } from "@/actions/designation.action";

const DeleteDesignation = ({ designation }: {
    designation: Designation
}) => {
    const [open, setOpen] = useState<boolean>(false);




    const handleDelete = async () => {
        try {
            const result = await deleteDesignation(designation.designationId);
            if (result?.error) {
                toast.error(result.error)
            } else {
                toast.success("Designation deleted successfully!");
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
                    className="flex items-center justify-center bg-primary-default text-white rounded-lg h-12 px-4"
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4 text-white" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[350px] bg-white rounded-lg max-w-[350px]  ">
                <DialogHeader className="flex items-center justify-center pb-5 border-b border-b-grey-50">
                    <DialogTitle>Delete Designation</DialogTitle>
                </DialogHeader>

                <div className="py-4 text-center">
                    <p>Are you sure you want to delete this designation?</p>
                </div>

                <DialogFooter className="flex flex-col">
                    <div className="w-full h-full flex flex-1 items-center justify-center gap-5">
                        <Button onClick={handleDelete} className="bg-primary-default text-white rounded-lg" size="lg">
                            Delete
                        </Button>
                        <Button onClick={() => setOpen(false)} className="bg-secondary-default text-white rounded-lg" size="lg">
                            Cancel
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDesignation;
