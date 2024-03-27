import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
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
                        <Contact />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleClose}>I understand</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function Contact() {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="contact">
                <AccordionTrigger>Need further help?</AccordionTrigger>
                <AccordionContent>
                    <Button onClick={() => window.location.href = "mailto:brianelijahsilah@gmail.com"} className="w-full">
                        <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Contact us through email
                    </Button>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

