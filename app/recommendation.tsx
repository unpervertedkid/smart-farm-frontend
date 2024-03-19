"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import React, { useEffect } from "react"

import { CropRecommendationFormCard, CropRecommendationResultCard, PlantTimeRecommendationFormCard, PlantTimeRecommendationResultCard } from "@/components/ui/crop-recommendation"
import { getCropRecommendation, getPlantTimeRecommendation, CropRecommendationRequestInterface, PlantTimeRecommendationRequestInterface } from "@/api/recommendationAPI"
import { getCrops, CropsResponseInterface } from "@/api/cropAPI";

interface LocationData {
    longitude: number;
    latitude: number;
}

export default function CropRecommendation() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [location, setLocation] = React.useState<LocationData | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [areTermsAndConditionsAccepted, setTermsAndConditions] = React.useState(false);
    const [locationStatus, setLocationStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
    const [crops, setCrops] = React.useState<string[]>([]);
    const [selectedCrop, setSelectedCrop] = React.useState<string | null>(null);
    const [areCropResultsReady, setAreCropResultsReady] = React.useState(false);
    const [recommendedCrops, setRecommendedCrops] = React.useState<string[]>([]);
    const [arePlantTimeResultsReady, setArePlantTimeResultsReady] = React.useState(false);
    const [recommendedPlantTime, setRecommendedPlantTime] = React.useState<{ startDate: Date; endDate: Date }[] | null>(null);

    const [isLoading, setIsLoading] = React.useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const response: CropsResponseInterface = await getCrops();
                if (response.status === 200) {
                    setCrops(response.crops);
                } else {
                    console.error(`Error: ${response.status}, Message: ${response.errorMessage}`);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchCrops();
    }, []);

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

        const request: CropRecommendationRequestInterface = {
            location: {
                latitude: location?.latitude || 0,
                longitude: location?.longitude || 0,
            },
            plantingDate: date || new Date(),
        };

        const response = await getCropRecommendation(request);

        if (response.status === 200) {
            const recommendedCrops = response.crops.map(crop => crop.crop);
            setRecommendedCrops(recommendedCrops);
            setAreCropResultsReady(true);
        } else {
            const errorMessage = response.errorMessage;
            toast(
                {
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: errorMessage || "An error occurred while fetching crop recommendations",
                }
            )
            console.error(`Error: ${response.status}`);
        }

        setIsLoading(false);
    };

    const handleGetPlantTimeRecommendation = async () => {
        setIsLoading(true);

        const request: PlantTimeRecommendationRequestInterface = {
            location: {
                latitude: location?.latitude || 0,
                longitude: location?.longitude || 0,
            },
            crop: selectedCrop || "",
        };

        try {
            const response = await getPlantTimeRecommendation(request);

            if (response.status === 200) {
                setRecommendedPlantTime(response.dateRanges);
                setArePlantTimeResultsReady(true);
            } else {
                const errorMessage = response.errorMessage;
                toast(
                    {
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: errorMessage || "An error occurred while fetching planting schedule",
                    }
                )
                console.error(`Error: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="pt-4 px-4 md:px-8 lg:px-16">
            <Tabs defaultValue="crop-recommendation" className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
                    <TabsTrigger value="crop-recommendation">Crop Recommendation</TabsTrigger>
                    <TabsTrigger value="plant-time">Planting Schedule</TabsTrigger>
                </TabsList>
                <TabsContent value="crop-recommendation">
                    {
                        areCropResultsReady ? (
                            <CropRecommendationResultCard recommendedCrops={recommendedCrops} resetRecommendation={() => setAreCropResultsReady(false)} />
                        ) : (<CropRecommendationFormCard date={date} setDate={setDate} locationStatus={locationStatus} handleLocationAccess={handleLocationAccess} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} setLocationStatus={setLocationStatus} handleGetRecommendation={handleGetCropRecommendation} isLoading={isLoading} onTermsAcceptChange={() => setTermsAndConditions(!areTermsAndConditionsAccepted)} />)
                    }
                </TabsContent>
                <TabsContent value="plant-time">
                    {
                        arePlantTimeResultsReady ?
                            (<PlantTimeRecommendationResultCard recommendedPlantTime={recommendedPlantTime} resetRecommendation={() => setArePlantTimeResultsReady(false)} />) :
                            (<PlantTimeRecommendationFormCard locationStatus={locationStatus} handleLocationAccess={handleLocationAccess} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} setLocationStatus={setLocationStatus} handleGetRecommendation={handleGetPlantTimeRecommendation} isLoading={isLoading} crops={crops} setSelectedCrop={setSelectedCrop} onTermsAcceptChange={() => setTermsAndConditions(!areTermsAndConditionsAccepted)} />)
                    }
                </TabsContent>
            </Tabs>
        </div>
    )
}
