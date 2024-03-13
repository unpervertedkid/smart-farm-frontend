import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem, CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import InfoPopover from "@/components/ui/info-popover";
import * as React from "react";


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
            <InfoPopover
                message="The confidence level is a measure of how confident the model is in its recommendation. 
            A higher confidence level indicates a higher likelihood that the recommendation is accurate."
                popoverContentClass="p-2 text-sm text-gray-500"
            />
        </div>
    );
}