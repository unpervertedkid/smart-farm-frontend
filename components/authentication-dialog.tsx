import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { SignInForm, SignUpForm } from "@/components/authentication";
import { useState } from "react";

interface AuthenticationDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

type AuthenticationState = 'signin' | 'signup';

export function AuthenticationDialog({ open, setOpen }: AuthenticationDialogProps) {
    const [authenticationState, setAuthenticationState] = useState<AuthenticationState>('signin');

    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogDescription>
                        {authenticationState === 'signin' ?
                            <SignInForm setAuthenticationState={setAuthenticationState}/> :
                            <SignUpForm setAuthenticationState={setAuthenticationState} />
                        }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button className="w-full p-4" variant="destructive" onClick={() => setOpen(false)}>Cancel</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
