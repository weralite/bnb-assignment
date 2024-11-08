"use client";

import { useState } from "react";
import { useFilter } from "@/context/FilterContext";
import dynamic from "next/dynamic";
import type { DateValueType } from "react-tailwindcss-datepicker";

const Datepicker = dynamic(() => import("react-tailwindcss-datepicker"), { 
    ssr: false, 
    loading: () => null // fallback to prevent SSR rendering
});



export default function Calender() {
    const { selectedCheckIn, setSelectedCheckIn } = useFilter();
    const [value, setValue] = useState<DateValueType>({
        startDate: null,
        endDate: null
    });

const handleDateChange = (newValue: DateValueType) => {
    setValue(newValue); 
    if (newValue && typeof newValue === 'object' && 'startDate' in newValue) {
        const startDate = newValue.startDate ? new Date(newValue.startDate) : null;

        setSelectedCheckIn(startDate);
    } else {
        setSelectedCheckIn(null);
    }
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