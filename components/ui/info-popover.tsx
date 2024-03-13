import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface InfoPopoverProps {
    message: String,
    popoverContentClass: string,
    side?: "top" | "right" | "bottom" | "left",
}

export default function InfoPopover({message, popoverContentClass, side = "bottom" }: InfoPopoverProps) {
    return(
        <Popover>
            <PopoverTrigger asChild>
                <button className="ml-2">
                    <InfoCircledIcon className="w-4 h-4 text-gray-500" />
                </button>
            </PopoverTrigger>
            <PopoverContent sideOffset={5} alignOffset={5} avoidCollisions={true} side={side}>
                <div className={popoverContentClass}>
                    {message}
                </div>
            </PopoverContent>
        </Popover>
    );
    
}