"use client";

import { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker"; // Corrected type import

export default function Calender() {
    const [selectedCheckOut, setSelectedCheckOut] = useState<Date | null>(null);
    const [value, setValue] = useState<DateValueType>({
        startDate: null,
        endDate: null
    });



    const handleDateChange = (newValue: DateValueType) => {
        setValue(newValue); 
        if (newValue && typeof newValue === 'object' && 'startDate' in newValue) {
            setSelectedCheckOut(newValue.endDate ? new Date(newValue.endDate) : null);
        }
    };



    return (
        <div className="flex flex-col items-left justify-start border-l border-custom-grey pl-6 pr-6">
            <b>Check Out</b>
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