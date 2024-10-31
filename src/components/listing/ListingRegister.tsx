"use client";

import React, { useState } from "react";
import { createListing } from "@/actions/createListing"; 
import ListingForm from "./ListingForm"; 
import { ListingData } from "@/types/listing";

interface AddListingFormProps {
    onClose: () => void;
}

const initialListingValues: ListingData = {
    title: "Stockholm Apartment",
    description: "Wonderful apartment in the heart of Stockholm",
    address: "Olsogatan 1",
    country: "Sweden",
    dailyRate: 150,
    availableBeds: 2,
    imageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    availableFrom: new Date("2024-11-01"),
    availableTo: new Date("2024-12-31"),
    createdAt: new Date(),
    updatedAt: new Date(),
};

const AddListingForm: React.FC<AddListingFormProps> = ({ onClose }) => {
    const [listing, setListing] = useState<ListingData>(initialListingValues);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setListing(prevListing => ({
            ...prevListing,
            [name]: name === "dailyRate" || name === "availableBeds" ? Number(value) : value,
        }));
    };


    const handleSave = async () => {
        const listingData = new FormData();
        
        Object.entries(listing).forEach(([key, value]) => {
            listingData.append(key, value.toString());
        });

        await createListing(listingData);
        onClose();
    };

    return (
        <div className="my-auto flex flex-col px-10 pb-10">
            <h2 className="py-4 text-lg font-semibold text-center">Create Listing</h2>
            <ListingForm
                listing={listing}
                onInputChange={handleInputChange}
                onSave={handleSave}
            />
        </div>
    );
};

export default AddListingForm;