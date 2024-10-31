import React, { useEffect, useState } from 'react';
import { getUserListings } from "@/actions/getUserListings";
import ListingList from "./ListingList";
import { Listing } from "@/types/listing"; // Import the Listing interface
import ListingForm from "./ListingForm"; // Import the new ListingForm component
import { updateListing } from '@/actions/updateListing';

const ListingByUser: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      const userListing = await getUserListings();
      setListings(userListing);
    };
    fetchListings();
  }, []);

  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing);
  };

  const handleCloseForm = () => {
    setSelectedListing(null); // Close the edit form
  };

  return (
    <div className="w-full flex flex-col items-center p-4">
      {selectedListing ? (
        <div>
          <button onClick={handleCloseForm} className="mb-4">
            Back to Listings
          </button>
          <ListingForm
            listing={selectedListing} // Pass selected listing for editing
            onInputChange={(e) => {
              const { name, value } = e.target;
              setSelectedListing((prevListing) => prevListing ? { ...prevListing, [name]: value } : null);
            }}
            onSave={() => {
              const formData = new FormData();
              Object.entries(selectedListing).forEach(([key, value]) => {
                formData.append(key, value.toString()); // Convert value to string as needed
              });
              updateListing(selectedListing.id, formData); // Send the FormData to update
              handleCloseForm();
            }}
          />
        </div>
      ) : (
        <>
          <div className="text-lg font-semibold mb-4">
            Total Listings: {listings.length}
          </div>
          {listings.map((listing) => (
            <div className="w-full p-2" key={listing.id} onClick={() => handleListingClick(listing)}>
              <ListingList listing={listing} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ListingByUser;
