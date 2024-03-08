"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import React from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

import { CropRecommendationFormCard, CropRecommendationResultCard, PlantTimeRecommendationFormCard, PlantTimeRecommendationResultCard } from "@/components/ui/crop-recommendation"

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
    const [areCropResultsReady, setAreCropResultsReady] = React.useState(false);
    const [recommendedCrops, setRecommendedCrops] = React.useState<string[]>([]);
    const [arePlantTimeResultsReady, setArePlantTimeResultsReady] = React.useState(false);
    const [recommendedPlantTime, setRecommendedPlantTime] = React.useState<{ startDate: Date, endDate: Date } | null>(null);

    const [isLoading, setIsLoading] = React.useState(false);
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

    const handleGetCropRecommendation = async () => {
        setIsLoading(true);
        // TODO: Make API call to get recommendation
        // In the mean time we can simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Some fake data to test
        const recommendedCrops = ['Wheat', 'Rice', 'Corn', 'Soybeans', 'Cotton'];
        setRecommendedCrops(recommendedCrops);
        setAreCropResultsReady(true);
        setIsLoading(false);
    }

    const handleGetPlantTimeRecommendation = async () => {
        setIsLoading(true);
        // TODO: Make API call to get recommendation
        // In the mean time we can simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Some fake data to test
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 30);
        const recommendedPlantTime = {
            startDate,
            endDate,
        };

        setRecommendedPlantTime(recommendedPlantTime);
        setArePlantTimeResultsReady(true);
        setIsLoading(false);
    }

    return (
        <div className="pt-4 px-4 md:px-8 lg:px-16">
            <Tabs defaultValue="crop-recommendation" className="w-full md:w-1/2 lg:w-1/3 mx-auto">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="crop-recommendation">Crop Recommendation</TabsTrigger>
                    <TabsTrigger value="plant-time">Planting Schedule</TabsTrigger>
                </TabsList>
                <TabsContent value="crop-recommendation">
                    {
                        areCropResultsReady ? (
                            <CropRecommendationResultCard recommendedCrops={recommendedCrops} resetRecommendation={() => setAreCropResultsReady(false)} />
                        ) : (<CropRecommendationFormCard date={date} setDate={setDate} locationStatus={locationStatus} handleLocationAccess={handleLocationAccess} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} setLocationStatus={setLocationStatus} handleGetRecommendation={handleGetCropRecommendation} isLoading={isLoading} />)
                    }
                </TabsContent>
                <TabsContent value="plant-time">
                    {
                        arePlantTimeResultsReady ?
                            (<PlantTimeRecommendationResultCard recommendedPlantTime={recommendedPlantTime} resetRecommendation={() => setArePlantTimeResultsReady(false)} />) :
                            (<PlantTimeRecommendationFormCard locationStatus={locationStatus} handleLocationAccess={handleLocationAccess} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} setLocationStatus={setLocationStatus} handleGetRecommendation={handleGetPlantTimeRecommendation} isLoading={isLoading} crops={crops} />)
                    }
                </TabsContent>
            </Tabs>
        </div>
    )
}
