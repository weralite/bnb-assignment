"use client";

// ListingContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { ListingWithAdvertiser } from "@/types/listing";

interface ListingContextType {
  listings: ListingWithAdvertiser[];
  setListings: React.Dispatch<React.SetStateAction<ListingWithAdvertiser[]>>;
}

const ListingContext = createContext<ListingContextType | undefined>(undefined);

export const ListingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<ListingWithAdvertiser[]>([]);

  return (
    <ListingContext.Provider value={{ listings, setListings }}>
      {children}
    </ListingContext.Provider>
  );
};

export const useListings = () => {
  const context = useContext(ListingContext);
  if (!context) {
    throw new Error("useListings must be used within a ListingProvider");
  }
  return context;
};
