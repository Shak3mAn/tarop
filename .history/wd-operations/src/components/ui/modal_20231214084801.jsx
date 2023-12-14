"use client"

import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    AlertDialogContent
} from "./dialog";
import { Button } from "./button";

export const Modal = ({
    title,
    description,
    isOpen,
    onClose,
    children
}) => {
    const onChange = (open) => {
        if (!open) {
            onClose();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <AlertDialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </AlertDialogContent>
        </Dialog>
    )
}