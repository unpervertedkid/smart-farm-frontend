"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import React from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import DatePickerWithPresets from "@/components/ui/datepicker"
import LocationDrawer from "@/components/ui/location-drawer"

interface LocationData {
    longitude: number;
    latitude: number;
}

export default function CropRecommendation() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [location, setLocation] = React.useState<LocationData | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [locationStatus, setLocationStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
    const crops = ['Wheat', 'Rice', 'Corn', 'Soybeans', 'Cotton'];

    const { toast } = useToast();

    const handleLocationAccess = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                });
                setIsDrawerOpen(false);
                setLocationStatus('success');
                toast({
                    description: "Location acquired successfully",
                });
            },
            (error) => {
                setIsDrawerOpen(false);
                setLocationStatus('error');
                console.error(error);
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "We could not access your location. Kindly allow location access on your browser to continue.",
                    action: <ToastAction onClick={handleLocationAccess} altText="Try again">Try again</ToastAction>,
                });
            }
        );
    };

    return (
        <div className="pt-4 px-4 md:px-8 lg:px-16">
            <Tabs defaultValue="crop-recommendation" className="w-full md:w-1/2 lg:w-1/3 mx-auto">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="crop-recommendation">Crop Recommendation</TabsTrigger>
                    <TabsTrigger value="plant-time">Planting Schedule</TabsTrigger>
                </TabsList>
                <TabsContent value="crop-recommendation">
                    <Card>
                        <CardHeader>
                            <CardTitle>Crop Recommendation</CardTitle>
                            <CardDescription>
                                Get recommendations on what crops to plant given your locations weather and soil conditions.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="location">Location</Label>
                            </div>
                            <div className="space-y-1">
                                <LocationDrawer locationStatus={locationStatus} handleLocationAccess={handleLocationAccess} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} setLocationStatus={setLocationStatus} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="plant-date">Plant Date</Label>
                                <div className="flex">
                                    <DatePickerWithPresets date={date} setDate={setDate} />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Accept Terms and Conditions
                                </label>
                            </div>
                            <Button variant="default">
                                Get Recommendation
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="plant-time">
                    <Card>
                        <CardHeader>
                            <CardTitle>Plant Time Recommendation</CardTitle>
                            <CardDescription>
                                Get a prediction of the best time to plant a certain crop based on past trends.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="location">Location</Label>
                            </div>
                            <div className="space-y-1">
                                <LocationDrawer locationStatus={locationStatus} handleLocationAccess={handleLocationAccess} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} setLocationStatus={setLocationStatus} />
                            </div>
                            <div className="space-y-1">
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a crop" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {crops.map((crop) => (
                                            <SelectItem key={crop} value={crop}>
                                                {crop}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Accept Terms and Conditions
                                </label>
                            </div>
                            <Button variant="default">
                                Get Recommendation
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
