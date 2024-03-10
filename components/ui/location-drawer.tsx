import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

interface LocationDrawerProps {
    locationStatus: 'idle' | 'success' | 'error';
    handleLocationAccess: () => void;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isOpen: boolean) => void;
    setLocationStatus: (status: 'idle' | 'success' | 'error') => void;
}

const LocationDrawer: React.FC<LocationDrawerProps> = ({ locationStatus, handleLocationAccess, isDrawerOpen, setIsDrawerOpen, setLocationStatus }) => (
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
                    <DrawerTitle>Grant Location access</DrawerTitle>
                    <DrawerDescription>Location access is required by our systems to provide you with relevant results tailored to the specific weather and soil conditions of your location. Your data is not stored or shared with anyone.</DrawerDescription>
                </DrawerHeader>
            </div>
            <DrawerFooter>
                <Button variant="default" onClick={() => {
                    handleLocationAccess();
                }}>Grant Access</Button>
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
);

export default LocationDrawer;