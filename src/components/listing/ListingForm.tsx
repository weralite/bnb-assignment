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
        value={new Date(listing.availableFrom).toISOString().slice(0, 10)}
        onChange={onInputChange}
      />
      <InputField
        label="Available To"
        type="date"
        name="availableTo"
        value={new Date(listing.availableTo).toISOString().slice(0, 10)}
        onChange={onInputChange}
      />
      
    </div>
  );
};

export default ListingForm;
