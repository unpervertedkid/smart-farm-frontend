import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";

interface RecommendationErrorAlertProps {
    show: boolean;
    title: string;
    description: string;
}

export const RecommendationErrorAlert: React.FC<RecommendationErrorAlertProps> = ({ show, title, description }) => {
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        if (show) {
            setOpen(true);
        }
    }, [show]);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleClose}>I understand</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

