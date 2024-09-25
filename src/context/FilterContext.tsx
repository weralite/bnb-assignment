"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextProps {
    selectedCountry: string | null;
    setSelectedCountry: (value: string | null) => void;
    selectedGuests: number | null;
    setSelectedGuests: (value: number | null) => void;
    selectedCheckIn: Date | null;
    setSelectedCheckIn: React.Dispatch<React.SetStateAction<Date | null>>;
    selectedCheckOut: Date | null;
    setSelectedCheckOut: React.Dispatch<React.SetStateAction<Date | null>>;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedGuests, setSelectedGuests] = useState<number | null>(null);
    const [selectedCheckIn, setSelectedCheckIn] = useState<Date | null>(null);
    const [selectedCheckOut, setSelectedCheckOut] = useState<Date | null>(null);

    return (
        <FilterContext.Provider value={{
            selectedCountry, setSelectedCountry,
            selectedGuests, setSelectedGuests,
            selectedCheckIn, setSelectedCheckIn,
            selectedCheckOut, setSelectedCheckOut
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
};