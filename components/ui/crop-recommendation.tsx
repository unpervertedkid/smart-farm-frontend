import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DatePickerWithPresets from "@/components/ui/datepicker";
import LocationDrawer from "@/components/ui/location-drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CropCarousel from "@/components/ui/crop-carousel"
import DateDisplay from "@/components/ui/date-display"
import { TermsAndConditions } from "@/components/ui/terms-and-conditions"

interface CropRecommendationProps {
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    locationStatus: 'idle' | 'success' | 'error';
    handleLocationAccess: () => void;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isOpen: boolean) => void;
    setLocationStatus: (status: 'idle' | 'success' | 'error') => void;
    handleGetRecommendation: () => void;
    isLoading: boolean;
    onTermsAcceptChange: () => void;
}

export const CropRecommendationFormCard: React.FC<CropRecommendationProps> = ({
    date,
    setDate,
    locationStatus,
    handleLocationAccess,
    isDrawerOpen,
    setIsDrawerOpen,
    setLocationStatus,
    handleGetRecommendation,
    isLoading,
    onTermsAcceptChange,
}) => {
    return (
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
            <CardFooter className="flex flex-col items-start space-y-2">
                <TermsAndConditions onAcceptChange={onTermsAcceptChange} />
                <div className="w-full">
                    {isLoading ? (
                        <Button disabled className="w-full px-5 py-3 mt-5">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button variant="default" className="w-full px-5 py-3 mt-5" onClick={handleGetRecommendation}>
                            Get Recommendation
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

interface CropRecommendationResultsProps {
    recommendedCrops: string[];
    resetRecommendation: () => void;
}

export const CropRecommendationResultCard: React.FC<CropRecommendationResultsProps> = ({
    recommendedCrops,
    resetRecommendation,
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Crop Recommendation</CardTitle>
                <CardDescription>
                    Crop recommendation results based on your location and plant date.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <CropCarousel crops={recommendedCrops} />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2">
                <div className="flex flex-col items-center space-x-2 mb-5 w-full">
                    <Caution />
                    <Button variant="default" className="w-full px-5 py-3 mt-5" onClick={resetRecommendation}>
                        Reset
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

interface PlantTimeRecommendationProps {
    locationStatus: 'idle' | 'success' | 'error';
    handleLocationAccess: () => void;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isOpen: boolean) => void;
    setLocationStatus: (status: 'idle' | 'success' | 'error') => void;
    handleGetRecommendation: () => void;
    isLoading: boolean;
    crops: string[];
    onTermsAcceptChange: () => void;
}

export const PlantTimeRecommendationFormCard: React.FC<PlantTimeRecommendationProps> = ({
    locationStatus,
    handleLocationAccess,
    isDrawerOpen,
    setIsDrawerOpen,
    setLocationStatus,
    handleGetRecommendation,
    isLoading,
    crops,
    onTermsAcceptChange,
}) => {
    return (
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
                    <div className="space-y-1">
                        <Label htmlFor="crop">Crop</Label>
                    </div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
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
            <CardFooter className="flex flex-col items-start space-y-2">
                <TermsAndConditions onAcceptChange={onTermsAcceptChange} />
                <div className="w-full">
                    {isLoading ? (
                        <Button disabled className="w-full px-5 py-3 mt-5">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button variant="default" className="w-full px-5 py-3 mt-5" onClick={handleGetRecommendation}>
                            Get Recommendation
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

interface PlantTimeRecommendationResultsProps {
    recommendedPlantTime: { startDate: Date; endDate: Date } | null;
    resetRecommendation: () => void;
}

export const PlantTimeRecommendationResultCard: React.FC<PlantTimeRecommendationResultsProps> = ({
    recommendedPlantTime,
    resetRecommendation,
}) => {
    let startDate, endDate;

    if (recommendedPlantTime) {
        startDate = recommendedPlantTime.startDate;
        endDate = recommendedPlantTime.endDate;
    } else {
        // Default to today's date and end date to today's date plus three months
        startDate = new Date();
        endDate = new Date();
        endDate.setMonth(startDate.getMonth() + 3);
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Plant Time Recommendation</CardTitle>
                <CardDescription>
                    Plant time recommendation results based on your location and crop selection.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <DateDisplay from={startDate} to={endDate} />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2">
                <div className="flex flex-col items-center space-x-2 mb-5 w-full">
                    <Caution />
                    <Button variant="default" className="w-full px-5 py-3 mt-5" onClick={resetRecommendation}>
                        Reset
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}


export function Caution() {
    return (
        <Alert>
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Caution!</AlertTitle>
            <AlertDescription>
                Please note that AI recommendations can sometimes be incorrect. We strongly advise conducting further research before using these recommendations.
            </AlertDescription>
        </Alert>
    )
}
