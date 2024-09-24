"use client";

import { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker"; // Corrected type import

export default function Calender() {
    const [value, setValue] = useState<DateValueType>({
        startDate: null,
        endDate: null
    });

    console.log(value);

    // Handle Datepicker change
    const handleDateChange = (newValue: DateValueType) => {
        setValue(newValue); // Update state with new date values
    };

    return (
        <div className="flex flex-col items-left justify-start border-l border-custom-grey pl-6 pr-6">
            <b>Check In</b>
            <Datepicker
                placeholder="Add dates"
                primaryColor={"red"}
                useRange={false}
                asSingle={true}
                value={value}
                onChange={handleDateChange}
                inputClassName="text-ellipsis whitespace-nowrap overflow-hidden max-w-30"
            />
        </div>
    );
}
