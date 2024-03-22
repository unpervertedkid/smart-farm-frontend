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

import { CropsResponseInterface, getCrops } from "@/api/cropAPI"
import {
    CropRecommendationRequestInterface,
    PlantTimeRecommendationRequestInterface,
    getCropRecommendation,
    getPlantTimeRecommendation
} from "@/api/recommendationAPI"
import {
    CropRecommendationFormCard,
    CropRecommendationResultCard,
    PlantTimeRecommendationFormCard,
    PlantTimeRecommendationResultCard
} from "@/components/ui/crop-recommendation"

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
    const [recommendedCrops, setRecommendedCrops] = React.useState<string[]>([]);
    const [recommendedPlantTime, setRecommendedPlantTime] = React.useState<{ startDate: Date; endDate: Date }[] | null>(null);
    const [cropRecommendationStatus, setCropRecommendationStatus] = React.useState<'idle' | 'pending' | 'success' | 'unsuported' | 'error'>('idle');
    const [plantTimeRecommendationStatus, setPlantTimeRecommendationStatus] = React.useState<'idle' | 'pending' | 'success' | 'unsuported' | 'error'>('idle');

    const { toast } = useToast();
    const warning = useWarning();

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
        if (!location) {
            warning("location", "Location is required to get crop recommendations", "Grant location access", handleLocationAccess);
            return;
        }

        if (!date) {
            warning("date", "Planting date is required to get crop recommendations", "Select crop", () => setDate(new Date()));
            return;
        }

        if (!areTermsAndConditionsAccepted) {
            warning("terms", "You must accept the terms and conditions to get crop recommendations", "Accept terms", () => setTermsAndConditions(true));
            return;
        }

        setCropRecommendationStatus('pending');

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
            setCropRecommendationStatus('success');
        } else if (response.status === 404) {
            setCropRecommendationStatus('unsuported');
        } else {
            const errorMessage = response.errorMessage;
            toast(
                {
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: errorMessage || "An error occurred while fetching crop recommendations",
                    action: <ToastAction onClick={() => handleGetCropRecommendation()} altText="Try again">Try again</ToastAction>,
                }
            )
            console.error(`Error: ${response.status}`);
            setCropRecommendationStatus('error');
        }
    };

    const handleGetPlantTimeRecommendation = async () => {
        if (!location) {
            warning("location", "Location is required to get planting schedule", "Grant location access", handleLocationAccess);
            return;
        }

        if (!selectedCrop) {
            warning("crop", "Crop is required to get planting schedule", "Select crop", () => setSelectedCrop(crops[0]));
            return;
        }

        if (!areTermsAndConditionsAccepted) {
            warning("terms", "You must accept the terms and conditions to get crop recommendations", "Accept terms", () => setTermsAndConditions(true));
            return;
        }

        setPlantTimeRecommendationStatus('pending');

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
                setPlantTimeRecommendationStatus('success');
            } else if (response.status === 404) {
                setPlantTimeRecommendationStatus('unsuported');
            } else {
                const errorMessage = response.errorMessage;
                toast(
                    {
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: errorMessage || "An error occurred while fetching planting schedule",
                        action: <ToastAction onClick={() => handleGetPlantTimeRecommendation()} altText="Try again">Try again</ToastAction>,
                    }
                )
                console.error(`Error: ${response.status}`);
                setPlantTimeRecommendationStatus('error');
            }
        } catch (error) {
            console.error(error);
            setPlantTimeRecommendationStatus('error');
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
                        cropRecommendationStatus == 'success' ? (
                            <CropRecommendationResultCard
                                recommendedCrops={recommendedCrops}
                                resetRecommendation={() => setCropRecommendationStatus('idle')}
                            />
                        ) : (<CropRecommendationFormCard
                            date={date} setDate={setDate}
                            locationStatus={locationStatus}
                            handleLocationAccess={handleLocationAccess}
                            isDrawerOpen={isDrawerOpen}
                            setIsDrawerOpen={setIsDrawerOpen}
                            setLocationStatus={setLocationStatus}
                            handleGetRecommendation={handleGetCropRecommendation}
                            recommendationStatus={cropRecommendationStatus}
                            onTermsAcceptChange={() => setTermsAndConditions(!areTermsAndConditionsAccepted)}
                            areTermsAndConditionsAccepted={areTermsAndConditionsAccepted}
                        />)
                    }
                </TabsContent>
                <TabsContent value="plant-time">
                    {
                        plantTimeRecommendationStatus == 'success' ?
                            (<PlantTimeRecommendationResultCard
                                recommendedPlantTime={recommendedPlantTime}
                                resetRecommendation={() => setPlantTimeRecommendationStatus('idle')}
                            />) :
                            (<PlantTimeRecommendationFormCard
                                locationStatus={locationStatus}
                                handleLocationAccess={handleLocationAccess}
                                isDrawerOpen={isDrawerOpen}
                                setIsDrawerOpen={setIsDrawerOpen}
                                setLocationStatus={setLocationStatus}
                                handleGetRecommendation={handleGetPlantTimeRecommendation}
                                recommendationStatus={plantTimeRecommendationStatus}
                                crops={crops}
                                setSelectedCrop={setSelectedCrop}
                                onTermsAcceptChange={() => setTermsAndConditions(!areTermsAndConditionsAccepted)}
                                areTermsAndConditionsAccepted={areTermsAndConditionsAccepted}
                            />)
                    }
                </TabsContent>
            </Tabs>
        </div>
    )
}

function useWarning() {
    const { toast } = useToast();

    return (field: string, message: string, actionMessage: string, action: () => void) => {
        return (
            toast({
                variant: "destructive",
                title: `${toTitleCase(field)} is required`,
                description: message,
                action: <ToastAction onClick={action} altText="Try again">{actionMessage}</ToastAction>,
            })
        )
    }
}

function toTitleCase(input: string): string {
    return input[0].toUpperCase() + input.slice(1);
}
