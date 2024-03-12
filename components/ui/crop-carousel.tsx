import * as React from "react";
import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem, CarouselNext,
    CarouselPrevious,
    CarouselApi
} from "@/components/ui/carousel";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { InfoCircledIcon } from "@radix-ui/react-icons";


export default function CropCarousel({ crops }: { crops: string[] }) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className="flex flex-col items-center pt-5">
            <Carousel setApi={setApi} className="w-full max-w-xs">
                <CarouselContent>
                    {crops.map((crop, index) => {
                        // Generate a random confidence level between 50 and 100
                        const confidence = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

                        return (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <span className="text-4xl font-semibold">{crop}</span>
                                        </CardContent>
                                        <CardFooter className="flex justify-center">
                                            <div className="">
                                                <ConfidenceLevel confidence={confidence} />
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
                Recommendation {current} of {count}
            </div>
        </div>
    );
}

interface ConfidenceLevelProps {
    confidence: number;
}

function ConfidenceLevel({ confidence }: ConfidenceLevelProps) {
    return (
        <div className="flex items-center">
            <span className="text-sm text-gray-500">Confidence: {confidence}%</span>
            <Popover>
                <PopoverTrigger asChild>
                    <button className="ml-2">
                        <InfoCircledIcon className="w-4 h-4 text-gray-500" />
                    </button>
                </PopoverTrigger>
                <PopoverContent sideOffset={5} alignOffset={5}>
                    <div className="p-2 text-sm text-gray-500">
                        Confidence refers to the probability that the crop recommendation is accurate.
                        It is calculated based on historical data and the current conditions.
                        A higher confidence level indicates a higher probability of accuracy.
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}