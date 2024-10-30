"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { createListing } from "@/actions/createListing"; // Adjust the import path accordingly

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

const ListingForm: React.FC<AddListingFormProps> = ({ onClose }) => {
    // State for form fields
    const [formValues, setFormValues] = useState<ListingFormValues>({
        title: "Hejsan",
        description: "Tjena",
        address: "Husvagen",
        country: "Swevirige",
        dailyRate: "150",
        availableBeds: "2",
        imageUrl: "",
        availableFrom: "2024-11-01T00:00:00Z",
        availableTo: "2024-12-31T00:00:00Z",
    });

    // Handle input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const listingData = new FormData();
        Object.keys(formValues).forEach((key) => {
            listingData.append(key, formValues[key as keyof ListingFormValues]);
        });

        await createListing(listingData);

        // Reset the form
        setFormValues({
            title: "",
            description: "",
            address: "",
            country: "",
            dailyRate: "",
            imageUrl: "",
            availableBeds: "",
            availableFrom: "",
            availableTo: "",
        });
        onClose();
    };

    return (
        <div className="my-auto flex flex-col px-10 pb-10">
            <h2 className="py-4 text-lg font-semibold text-center">Create Listing</h2>
            <form className="flex flex-col w-full max-w-lg mx-auto gap-5" onSubmit={handleSubmit}>
                <div className="border border-gray-300 rounded-lg">
                    {Object.keys(formValues).map((key) => {
                        const id = key; // Use the key as the id for the input
                        return (
                            <div className="p-4 flex flex-row gap-4 border-b" key={key}>
                                <p className="text-gray-500">
                                    <label htmlFor={id}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                </p>
                                <input
                                    id={id} // Set the id attribute
                                    className="focus:outline-none"
                                    type={key.includes("date") ? "date" : key === "dailyRate" || key === "availableBeds" ? "number" : "text"}
                                    name={key}
                                    value={formValues[key as keyof ListingFormValues]} // Type assertion
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        );
                    })}
                </div>
                <button className="bg-[#ff5a5f] text-white rounded-md py-3" type="submit">Create Listing</button>
            </form>
        </div>
    );
};

export default ListingForm;
