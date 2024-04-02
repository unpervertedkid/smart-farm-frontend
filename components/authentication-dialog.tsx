import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { SignInForm, SignUpForm } from "@/components/authentication";
import { useState } from "react";

interface AuthenticationDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

type AuthenticationState = 'signin' | 'signup';

export function AuthenticationDialog({ open, setOpen, isLoggedIn, setIsLoggedIn }: AuthenticationDialogProps) {
    const [authenticationState, setAuthenticationState] = useState<AuthenticationState>('signin');

    return (
        <AlertDialog open={open}>
            {!isLoggedIn ? (
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogDescription>
                            {authenticationState === 'signin' ?
                                <SignInForm setAuthenticationState={setAuthenticationState} /> :
                                <SignUpForm setAuthenticationState={setAuthenticationState} />
                            }
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button className="w-full p-4" variant="destructive" onClick={() => setOpen(false)}>Cancel</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            ): (
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will log you out of your account.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => setOpen(false)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
            )
                }
            
        </AlertDialog>
    )
}
