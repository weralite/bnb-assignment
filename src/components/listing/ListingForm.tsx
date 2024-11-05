// ListingForm.tsx
import React from "react";
import { ListingData } from "@/types/listing"; // Import the Listing interface
import InputField from "@/components/common/Inputfield"; // Import the InputField component


interface ListingFormProps {
  listing: ListingData | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ listing, onInputChange }) => {
  if (!listing) return null;


  const formatAvailableDate = (date: string | Date): string => {
    if (typeof date === 'string') {
      return date.split('T')[0];
    } else if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return '';
  };

  return (
    <div>
      <InputField
        label="Title"
        type="text"
        name="title"
        value={listing.title}
        onChange={onInputChange}
      />
      <InputField
        label="Description"
        type="text"
        name="description"
        value={listing.description}
        onChange={onInputChange}
      />
      <InputField
        label="Address"
        type="text"
        name="address"
        value={listing.address}
        onChange={onInputChange}
      />
      <InputField
        label="Country"
        type="text"
        name="country"
        value={listing.country}
        onChange={onInputChange}
      />
      <InputField
        label="Image URL"
        type="text"
        name="imageUrl"
        value={listing.imageUrl}
        onChange={onInputChange}
      />
      <InputField
        label="Daily Rate"
        type="number"
        name="dailyRate"
        value={listing.dailyRate.toString()}
        onChange={onInputChange}
      />
      <InputField
        label="Available Beds"
        type="number"
        name="availableBeds"
        value={listing.availableBeds.toString()}
        onChange={onInputChange}
      />
      <InputField
        label="Available From"
        type="date"
        name="availableFrom"
        value={formatAvailableDate(listing.availableFrom)} // Use the formatting function here
        onChange={onInputChange}
      />
      <InputField
        label="Available To"
        type="date"
        name="availableTo"
        value={formatAvailableDate(listing.availableTo)} // Use the formatting function here
        onChange={onInputChange}
      />

    </div>
  );
};

export default ListingForm;
