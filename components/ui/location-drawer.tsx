import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import { ReloadIcon } from "@radix-ui/react-icons";
import React from "react";

interface LocationDrawerProps {
    locationStatus: 'idle' | 'success' | 'error';
    handleLocationAccess: () => Promise<boolean>;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isOpen: boolean) => void;
    setLocationStatus: (status: 'idle' | 'success' | 'error') => void;
}

const LocationDrawer: React.FC<LocationDrawerProps> = ({ locationStatus, handleLocationAccess, isDrawerOpen, setIsDrawerOpen, setLocationStatus }) => {

    const [drawerStatus, setDrawerStatus] = React.useState<'idle' | 'loading' | 'error' | 'success'>('idle');

    return (
        <Drawer open={isDrawerOpen}>
            <DrawerTrigger asChild>
                <Button
                    variant={locationStatus === 'error' ? 'destructive' : 'outline'}
                    onClick={() => {
                        setIsDrawerOpen(true);
                    }}
                    disabled={locationStatus === 'success'}
                >
                    {locationStatus === 'idle' ? 'Grant Location Access' : locationStatus === 'success' ? 'Location Data Acquired' : 'Retry Granting Location Access'}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>
                            {drawerStatus === 'error' ? 'Retry Granting Location Access' : 'Grant Location Access'}
                        </DrawerTitle>
                        <DrawerDescription>
                            {drawerStatus === 'error'
                                ? 'An error occurred and we could not obtain your location. Please ensure that you have allowed location access in your browser settings, then click the "Retry Granting Access" button below.'
                                : 'Location access is required by our systems to provide you with relevant results tailored to the specific weather and soil conditions of your location. Your data is not stored or shared with anyone.'
                            }
                        </DrawerDescription>
                    </DrawerHeader>
                </div>
                <DrawerFooter>
                    {
                        drawerStatus === 'idle' ? (
                            <Button variant="default" onClick={async () => {
                                setDrawerStatus('loading')
                                let locationObtained = await handleLocationAccess();
                                setDrawerStatus(
                                    locationObtained ? 'success' : 'error'
                                );
                            }}>Grant Access</Button>
                        ) : drawerStatus === 'loading' ? (
                            <Button disabled className="w-full px-5 py-3 mt-5">
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : drawerStatus === 'error' ? (
                            <Button variant="destructive" onClick={async () => {
                                setDrawerStatus('loading')
                                let locationObtained = await handleLocationAccess();
                                setDrawerStatus(
                                    locationObtained ? 'success' : 'error'
                                );
                            }}>Retry Granting Access</Button>
                        ) : drawerStatus === 'success' ? (
                            <Button variant="default" onClick={() => {
                                setIsDrawerOpen(false);
                                setLocationStatus('success');
                            }}>Location Obtained</Button>
                        ) : null
                    }

                    <DrawerClose asChild>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                setIsDrawerOpen(false);
                                setLocationStatus('error');
                            }}
                        >Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )

}

export default LocationDrawer;