"use client";

import React, { useEffect } from "react";
import { ListingWithAdvertiser } from "@/types/listing";
import { useListings } from "@/context/ListingContext";
import ListingCard from "./ListingCard";
import { getListings } from "@/actions/getListings";

const ListingGrid: React.FC = () => {
  const { listings, setListings } = useListings();

  // Function to fetch listings from the API
  const fetchListings = async () => {
    try {
      const data = await getListings();
      setListings(data); // Update the listings in context
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    }
  };

  // Fetch listings on component mount
  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 justify-center">
      {listings?.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default ListingGrid;
