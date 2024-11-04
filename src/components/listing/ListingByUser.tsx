"use client"

import React, { useEffect, useState } from 'react';
import { getUserListings } from "@/actions/getUserListings";
import ListingList from "./ListingList";
import { Listing } from "@/types/listing";
import ListingForm from "./ListingForm";
import { updateListing } from '@/actions/updateListing';
import { deleteListing } from '@/actions/deleteListing'

const ListingByUser: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const fetchListings = async () => {
    const userListing = await getUserListings();
    setListings(userListing);
  };


  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing);
  };

  const handleCloseForm = () => {
    setSelectedListing(null);
  };

  const handleSave = () => {
    if (!selectedListing) return;
    const formData = new FormData();
    Object.entries(selectedListing).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    updateListing(selectedListing.id, formData);
    handleCloseForm();
  };

  const handleDelete = async () => {
    if (selectedListing) {
      const id = selectedListing.id;
      await deleteListing(id); 
      handleCloseForm();
      fetchListings(); 
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="my-auto h-full flex flex-col px-10 pb-10">
      {selectedListing ? (
        <div>
          <div className="p-2 text-lg font-semibold text-center">Edit Listing</div>
          <ListingForm
            listing={selectedListing}
            onInputChange={(e) => {
              const { name, value } = e.target;
              setSelectedListing((prevListing) => prevListing ? { ...prevListing, [name]: value } : null);
            }} />
          <div className='w-full flex flex-row justify-between gap-5 py-5'>
            <button className="bg-green-500 rounded-lg text-white p-2 w-full" onClick={handleSave}>Save</button>
            <button className="bg-green-500 rounded-lg text-white p-2 w-full" onClick={handleDelete}>Delete</button>
            <button className="bg-red-500 rounded-lg text-white p-2 w-full" onClick={handleCloseForm}>Back</button>
          </div>
        </div>
      ) : (
        <div className='h-full'>
          <div className="text-lg font-semibold p-2 text-center">
            Total Listings: {listings.length}
          </div>
          <div className="overflow-y-scroll h-120 relative">
            {listings.map((listing) => (
              <div className="w-full p-2" key={listing.id} onClick={() => handleListingClick(listing)}>
                <ListingList listing={listing} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingByUser;
