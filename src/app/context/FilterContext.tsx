"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextProps {
    selectedCountry: string | null;
    setSelectedCountry: (value: string | null) => void;
    selectedCheckIn: Date | null;
    setSelectedCheckIn: (value: Date | null) => void;
    selectedCheckOut: Date | null;
    setSelectedCheckOut: (value: Date | null) => void;

}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedCheckIn, setSelectedCheckIn] = useState<Date | null>(null);
    const [selectedCheckOut, setSelectedCheckOut] = useState<Date | null>(null);

    return (
        <FilterContext.Provider value={{
            selectedCountry, setSelectedCountry,
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