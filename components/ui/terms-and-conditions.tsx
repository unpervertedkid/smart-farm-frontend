import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea
import { InfoCircledIcon } from "@radix-ui/react-icons";
import React from "react";

interface TermsAndConditionsProps {
    onAcceptChange: () => void;
    areTermsAndConditionsAccepted: boolean;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
    onAcceptChange,
    areTermsAndConditionsAccepted,
}) => {
    return (
        <div className="flex items-center space-x-2 mb-5">
            <Checkbox id="terms" onCheckedChange={onAcceptChange} checked={areTermsAndConditionsAccepted} />
            <label
                htmlFor="terms"
                className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                <span>Accept</span>
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="ml-2 flex items-center">
                            <span className="underline">Terms and Conditions</span>
                            <InfoCircledIcon className="w-4 h-4 text-gray-500" style={{ paddingLeft: '2px' }} />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent side="top" className="h-screen sm:h-auto sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Terms and Conditions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-72 w-full overflow-auto">
                                    <ol className="list-decimal list-inside text-sm">
                                        <li>Accuracy of Information: While we strive to provide accurate crop recommendations based on soil and weather conditions, we do not guarantee the correctness of the information provided by our system.</li>
                                        <li>No Liability: We shall not be held liable for any direct, indirect, incidental, consequential, or punitive damages resulting from the use of our recommendations.</li>
                                        <li>User Discretion: Recommendations provided by our system may not always be accurate. Users are advised to conduct further research and use their discretion before making decisions based on our recommendations.</li>
                                        <li>Changes to Service: We reserve the right to modify or discontinue the service at any time without notice.</li>
                                        <li>Acceptance of Risk: By using our service, you acknowledge and accept the risks associated with agricultural planning and decision-making.</li>
                                        <li>Contact Information: If you have any questions or concerns about these terms, please contact us at <a href="mailto:brianelijahsilah@gmail.com" className="underline">brianelijahsilah@gmail.com</a></li>
                                    </ol>
                                </ScrollArea>

                            </CardContent>
                            <CardFooter>
                                <p className="text-sm">
                                    By using our service, you acknowledge that you have read and understood these terms and conditions and agree to be bound by them.
                                </p>
                            </CardFooter>
                        </Card>
                    </PopoverContent>
                </Popover>
            </label>
        </div>
    );
}