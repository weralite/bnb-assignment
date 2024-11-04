"use client";
import { Listing }from "@/types/listing"

import { createContext, useContext, useState, ReactNode } from "react";

interface ListingContextProps {
  listings: Listing[] | null;
  setListings: (value: Listing[] | null) => void;
}

const ListingContext = createContext<ListingContextProps | undefined>(undefined);

export const ListingProvider = ({ children }: { children: ReactNode }) => {
  const [listings, setListings] = useState<Listing[] | null>(null); 

  return (
    <ListingContext.Provider value={{ listings, setListings }}>
      {children}
    </ListingContext.Provider>
  );
};

export const useListings = () => {
  const context = useContext(ListingContext);
  if (!context) {
    throw new Error("useListings must be used within a FilterProvider");
  }
  return context;
};
