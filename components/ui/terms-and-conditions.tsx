import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface TermsAndConditionsProps {
    onAcceptChange: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
    onAcceptChange
}) => {
    return (
        <div className="flex items-center space-x-2 mb-5">
            <Checkbox id="terms" onCheckedChange={onAcceptChange} />
            <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <span>Accept <span className="underline">Terms and Conditions</span></span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-full sm:w-1/2 px-4">
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold">Terms and Conditions</h4>
                            <ol className="list-decimal list-inside text-sm">
                                <li>Accuracy of Information: While we strive to provide accurate crop recommendations based on soil and weather conditions, we do not guarantee the correctness of the information provided by our system.</li>
                                <li>No Liability: We shall not be held liable for any direct, indirect, incidental, consequential, or punitive damages resulting from the use of our recommendations.</li>
                                <li>User Discretion: Recommendations provided by our system may not always be accurate. Users are advised to conduct further research and use their discretion before making decisions based on our recommendations.</li>
                                <li>Changes to Service: We reserve the right to modify or discontinue the service at any time without notice.</li>
                                <li>Acceptance of Risk: By using our service, you acknowledge and accept the risks associated with agricultural planning and decision-making.</li>
                                <li>Contact Information: If you have any questions or concerns about these terms, please contact us at [@brianelijahsilah@gmail.com].</li>
                            </ol>
                            <p className="text-sm">
                                By using our service, you acknowledge that you have read and understood these terms and conditions and agree to be bound by them.
                            </p>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </label>
        </div>
    );
}