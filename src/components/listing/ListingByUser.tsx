import React, { useEffect, useState } from 'react';
import { getUserListings } from "@/actions/getUserListings";
import ListingList from "./ListingList";
import { Listing } from "@/types/listing"; // Import the Listing interface

const ListingByUser: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]); // Use the Listing interface

  useEffect(() => {
    const fetchListings = async () => {
      const userListing = await getUserListings();
      setListings(userListing);
    };

    fetchListings();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="w-full flex flex-col items-center p-4">
           <div className="text-lg font-semibold mb-4">
        Total Listings: {listings.length}
      </div>
      {listings.map((listing) => (
        <ListingList key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default ListingByUser;