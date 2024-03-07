"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { startOfWeek, addWeeks, addMonths } from "date-fns";


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
interface DatePickerWithPresetsProps {
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export const DatePickerWithPresets: React.FC<DatePickerWithPresetsProps> = ({ date, setDate }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="flex w-auto flex-col space-y-2 p-2"
            >
                <Select
                    onValueChange={(value) => {
                        switch (value) {
                            case "0":
                                setDate(new Date());
                                break;
                            case "1":
                                setDate(startOfWeek(addWeeks(new Date(), 1)));
                                break;
                            case "2":
                                setDate(startOfWeek(addWeeks(new Date(), 2)));
                                break;
                            case "3":
                                setDate(startOfWeek(addMonths(new Date(), 1)));
                                break;
                            default:
                                break;
                        }
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="0">Today</SelectItem>
                        <SelectItem value="1">Next Week</SelectItem>
                        <SelectItem value="2">In Two Weeks</SelectItem>
                        <SelectItem value="3">Next Month</SelectItem>
                    </SelectContent>
                </Select>
                <div className="rounded-md border">
                    <Calendar mode="single" selected={date} onSelect={setDate} />
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default DatePickerWithPresets;