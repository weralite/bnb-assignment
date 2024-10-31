// ListingForm.tsx
import React from "react";
import { Listing } from "@/types/listing"; // Import the Listing interface
import InputField from "@/components/common/Inputfield"; // Import the InputField component

interface ListingFormProps {
  listing: Listing | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ listing, onInputChange, onSave }) => {
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
        value={listing.availableFrom.toString()}
        onChange={onInputChange}
      />
      <InputField
        label="Available To"
        type="date"
        name="availableTo"
        value={listing.availableTo.toString()}
        onChange={onInputChange}
      />

      {/* Add additional fields as needed */}
      <button onClick={onSave} className="bg-blue-500 text-white p-2 mt-4">
        Save Changes
      </button>
    </div>
  );
};

export default ListingForm;
