import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CropCarousel from "@/components/ui/crop-carousel";
import DateDisplay from "@/components/ui/date-display";
import DatePickerWithPresets from "@/components/ui/datepicker";
import { RecommendationErrorAlert } from "@/components/ui/errors";
import InfoPopover from "@/components/ui/info-popover";
import { Label } from "@/components/ui/label";
import LocationDrawer from "@/components/ui/location-drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TermsAndConditions } from "@/components/ui/terms-and-conditions";
import { toTitleCase } from "@/lib/utils";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import React from "react";

interface CropRecommendationProps {
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    locationStatus: 'idle' | 'success' | 'error';
    handleLocationAccess: () => Promise<boolean>;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isOpen: boolean) => void;
    setLocationStatus: (status: 'idle' | 'success' | 'error') => void;
    handleGetRecommendation: () => void;
    recommendationStatus: 'idle' | 'pending' | 'success' | 'unsuported' | 'error';
    areTermsAndConditionsAccepted: boolean;
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
    recommendationStatus,
    areTermsAndConditionsAccepted,
    onTermsAcceptChange,
}) => {
    return (
        <div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Crop Recommendation</CardTitle>
                        <CardDescription>
                            Get recommendations on what crops to plant given your locations weather and soil conditions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1 flex items-center">
                            <Label htmlFor="location">Location</Label>
                            <InfoPopover
                                message="We use your location to get the weather and soil information to make the best crop recommendation for you."
                                popoverContentClass="p-2 text-sm text-gray-500"
                                side="top"
                            />
                        </div>
                        <div className="space-y-1">
                            <LocationDrawer locationStatus={locationStatus} handleLocationAccess={handleLocationAccess} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} setLocationStatus={setLocationStatus} />
                        </div>
                        <div className="space-y-1 flex items-center">
                            <Label htmlFor="plant-date">Plant Date</Label>
                            <InfoPopover
                                message="The date you plan to plant the crop. We use this to get the best crop recommendation for you."
                                popoverContentClass="p-2 text-sm text-gray-500"
                                side="top"
                            />
                        </div>
                        <div className="space-y-1">
                            <DatePickerWithPresets date={date} setDate={setDate} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start space-y-2">
                        <TermsAndConditions onAcceptChange={onTermsAcceptChange} areTermsAndConditionsAccepted={areTermsAndConditionsAccepted} />
                        <div className="w-full">
                            {
                                recommendationStatus === "pending" ? (
                                    <Button disabled className="w-full px-5 py-3 mt-5">
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : recommendationStatus === "idle" ? (
                                    <Button variant="default" className="w-full px-5 py-3 mt-5" onClick={handleGetRecommendation}>
                                        Get Recommendation
                                    </Button>
                                ) : recommendationStatus === "unsuported" ? (
                                    <Button disabled className="w-full px-5 py-3 mt-5">
                                        Location not supported
                                    </Button>
                                ) : recommendationStatus === "error" ? (
                                    <Button variant="destructive" className="w-full px-5 py-3 mt-5" onClick={handleGetRecommendation}>
                                        Retry Getting Recommendation
                                    </Button>
                                ) : null
                            }
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <div>
                {
                    recommendationStatus == "unsuported" ? (
                        <RecommendationErrorAlert
                            show={recommendationStatus == "unsuported"}
                            title="Location not supported"
                            description="We currently do not support crop recommendation for your location.
                                        If you would like to see this feature in the future, please let us know."
                        />
                    ) : null
                }
            </div>
        </div>

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
                    Based on your location&apos;s weather and soil information, below are the recommended crops.
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
    handleLocationAccess: () => Promise<boolean>;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isOpen: boolean) => void;
    setLocationStatus: (status: 'idle' | 'success' | 'error') => void;
    handleGetRecommendation: () => void;
    recommendationStatus: 'idle' | 'pending' | 'success' | 'unsuported' | 'error';
    crops: string[];
    setSelectedCrop: React.Dispatch<React.SetStateAction<string | null>>;
    areTermsAndConditionsAccepted: boolean;
    onTermsAcceptChange: () => void;
}

export const PlantTimeRecommendationFormCard: React.FC<PlantTimeRecommendationProps> = ({
    locationStatus,
    handleLocationAccess,
    isDrawerOpen,
    setIsDrawerOpen,
    setLocationStatus,
    handleGetRecommendation,
    recommendationStatus,
    crops,
    setSelectedCrop,
    areTermsAndConditionsAccepted,
    onTermsAcceptChange,
}) => {
    return (
        <div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Plant Time Recommendation</CardTitle>
                        <CardDescription>
                            Get a prediction of the best time to plant a certain crop based on past trends.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1 flex items-center">
                            <Label htmlFor="location">Location</Label>
                            <InfoPopover
                                message="We use your location to get the weather and soil information to make the best crop recommendation for you."
                                popoverContentClass="p-2 text-sm text-gray-500"
                                side="top"
                            />
                        </div>
                        <div className="space-y-1">
                            <LocationDrawer locationStatus={locationStatus} handleLocationAccess={handleLocationAccess} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} setLocationStatus={setLocationStatus} />
                        </div>
                        <div className="space-y-1">
                            <div className="space-y-1 flex items-center">
                                <Label htmlFor="crop">Crop</Label>
                                <InfoPopover
                                    message="The crop for which you want to get the best time to plant."
                                    popoverContentClass="p-2 text-sm text-gray-500"
                                    side="top"
                                />
                            </div>
                            <Select onValueChange={value => setSelectedCrop(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a crop" />
                                </SelectTrigger>
                                <SelectContent>
                                    {crops.map((crop) => (
                                        <SelectItem key={crop} value={crop}>
                                            {toTitleCase(crop)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start space-y-2">
                        <TermsAndConditions onAcceptChange={onTermsAcceptChange} areTermsAndConditionsAccepted={areTermsAndConditionsAccepted} />
                        <div className="w-full">
                            {
                                recommendationStatus === "pending" ? (
                                    <Button disabled className="w-full px-5 py-3 mt-5">
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : recommendationStatus === "idle" ? (
                                    <Button variant="default" className="w-full px-5 py-3 mt-5" onClick={handleGetRecommendation}>
                                        Get Recommendation
                                    </Button>
                                ) : recommendationStatus === "unsuported" ? (
                                    <Button disabled className="w-full px-5 py-3 mt-5">
                                        Location not supported
                                    </Button>
                                ) : recommendationStatus === "error" ? (
                                    <Button variant="destructive" className="w-full px-5 py-3 mt-5" onClick={handleGetRecommendation}>
                                        Retry Getting Recommendation
                                    </Button>
                                ) : null
                            }
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <div>
                {
                    recommendationStatus == "unsuported" ? (
                        <RecommendationErrorAlert
                            show={recommendationStatus == "unsuported"}
                            title="Location not supported"
                            description="We currently do not support plant time recommendation for your location.
                                        If you would like to see this feature in the future, please let us know."
                        />
                    ) : null
                }
            </div>
        </div>

    );
};

interface PlantTimeRecommendationResultsProps {
    crop: string | null;
    recommendedPlantTime: { startDate: Date; endDate: Date }[] | null;
    resetRecommendation: () => void;
}

export const PlantTimeRecommendationResultCard: React.FC<PlantTimeRecommendationResultsProps> = ({
    crop,
    recommendedPlantTime,
    resetRecommendation,
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{crop ? `${toTitleCase(crop)} Plant Time Recommendation` : 'Plant Time Recommendation'}</CardTitle>
                <CardDescription>
                    {crop
                        ? `Here are the optimal planting times for ${toTitleCase(crop)}, tailored specifically to your location.`
                        : "Here are the optimal planting times for your selected crop, tailored specifically to your location."
                    }
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    {
                        recommendedPlantTime?.map((dateRange, index) => (
                            <DateDisplay key={index} from={dateRange.startDate} to={dateRange.endDate} />
                        ))
                    }
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
            <AlertTitle>Caution</AlertTitle>
            <AlertDescription>
                Please note that AI recommendations can sometimes be incorrect. We strongly advise conducting further research before using these recommendations.
            </AlertDescription>
        </Alert>
    )
}
