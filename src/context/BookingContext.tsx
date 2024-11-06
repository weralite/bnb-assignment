"use client";

import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import { BookingWithListingAndGuest } from '@/types/booking';

type BookingContextType = {
  guestBookings: BookingWithListingAndGuest[];
  advertiserBookings: BookingWithListingAndGuest[];
  setGuestBookings: Dispatch<SetStateAction<BookingWithListingAndGuest[]>>;
  setAdvertiserBookings: Dispatch<SetStateAction<BookingWithListingAndGuest[]>>;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
  children: React.ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [guestBookings, setGuestBookings] = useState<BookingWithListingAndGuest[]>([]);
  const [advertiserBookings, setAdvertiserBookings] = useState<BookingWithListingAndGuest[]>([]);

  return (
    <BookingContext.Provider value={{ guestBookings, advertiserBookings, setGuestBookings, setAdvertiserBookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
