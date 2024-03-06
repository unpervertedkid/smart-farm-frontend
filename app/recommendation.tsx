"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface CropRecommendationPageProps { }

const CropRecommendation: React.FC<CropRecommendationPageProps> = () => {
    const [selectedTab, setSelectedTab] = useState<'plantTime' | 'cropRecommendation'>('plantTime');
    const [location, setLocation] = useState<string>('');
    const [locationError, setLocationError] = useState<string>('');
    const [plantDate, setPlantDate] = useState<Date | undefined>(new Date())
    const [selectedCrop, setSelectedCrop] = useState<string>('');
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

    const crops = ['Wheat', 'Rice', 'Corn', 'Soybeans', 'Cotton'];

    useEffect(() => {
        const handleLocationAccess = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation(`${latitude}, ${longitude}`);
                },
                (error) => {
                    setLocationError('Location access denied');
                }
            );
        };

        handleLocationAccess();
    }, []);

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    };

    const handleCropChange = (value: string) => {
        setSelectedCrop(value);
    };

    const handleTermsAcceptance = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAcceptedTerms(event.target.checked);
    };

    const isFormComplete = () => {
        if (selectedTab === 'plantTime') {
            return location && plantDate && acceptedTerms;
        } else {
            return selectedCrop && location && plantDate && acceptedTerms;
        }
    };

    return (
        <div className="container mx-auto py-10">
            <Tabs defaultValue='plantTime' className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="plantTime">Plant Time Recommendation</TabsTrigger>
                    <TabsTrigger value="cropRecommendation">Crop Recommendation</TabsTrigger>
                </TabsList>
                <TabsContent value="plantTime">
                    <Card>
                        <CardHeader>
                            <CardTitle>Plant Time Recommendation</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <Input
                                type="text"
                                placeholder="Enter your location"
                                value={location}
                                onChange={handleLocationChange}
                            />
                            {locationError && <span className="text-red-500">{locationError}</span>}
                            <Calendar
                                mode="single"
                                selected={plantDate}
                                onSelect={setPlantDate}
                                className='rounded-md border shadow'
                            />
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
                            <Button disabled={!isFormComplete()} variant="default">
                                Get Recommendation
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="cropRecommendation">
                    <Card>
                        <CardHeader>
                            <CardTitle>Crop Recommendation</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <Select onValueChange={handleCropChange}>
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
                            <Input
                                type="text"
                                placeholder="Enter your location"
                                value={location}
                                onChange={handleLocationChange}
                            />
                            {locationError && <span className="text-red-500">{locationError}</span>}
                            <Calendar
                                mode="single"
                                selected={plantDate}
                                onSelect={setPlantDate}
                                className='rounded-md border shadow'
                            />
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
                            <Button disabled={!isFormComplete()} variant="default">
                                Get Recommendation
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CropRecommendation;