"use client";

import React, { FormEvent } from "react";
import { createListing } from "@/actions/createListing"; // Adjust the import path accordingly
import InputField from "@/components/common/Inputfield"; // Import the InputField component
import { useForm } from "@/hooks/useForm"; // Import the useForm hook

interface AddListingFormProps {
    onClose: () => void;
}

interface ListingFormValues {
    title: string;
    description: string;
    address: string;
    country: string;
    dailyRate: string;
    imageUrl: string;
    availableBeds: string;
    availableFrom: string;
    availableTo: string;
}

const initialFormValues: ListingFormValues = {
    title: "Hejsan",
    description: "Tjena",
    address: "Husvagen",
    country: "Swevirige",
    dailyRate: "150",
    availableBeds: "2",
    imageUrl: "",
    availableFrom: "2024-11-01T00:00:00Z",
    availableTo: "2024-12-31T00:00:00Z",
};

const ListingForm: React.FC<AddListingFormProps> = ({ onClose }) => {
    const { formValues, handleChange, resetForm } = useForm<ListingFormValues>(initialFormValues);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const listingData = new FormData();
        Object.entries(formValues).forEach(([key, value]) => {
            listingData.append(key, value);
        });

        await createListing(listingData);
        resetForm(initialFormValues); // Reset to initial values
        onClose();
    };

    return (
        <div className="my-auto flex flex-col px-10 pb-10">
            <h2 className="py-4 text-lg font-semibold text-center">Create Listing</h2>
            <form className="flex flex-col w-full max-w-lg mx-auto gap-5" onSubmit={handleSubmit}>
                <div className="border border-gray-300 rounded-lg">
                    {Object.entries(formValues).map(([key, value]) => (
                        <InputField
                            key={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            name={key}
                            value={value}
                            type={key.includes("date") ? "date" : key === "dailyRate" || key === "availableBeds" ? "number" : "text"}
                            onChange={handleChange}
                        />
                    ))}
                </div>
                <button className="bg-[#ff5a5f] text-white rounded-md py-3" type="submit">Create Listing</button>
            </form>
        </div>
    );
};

export default ListingForm;
