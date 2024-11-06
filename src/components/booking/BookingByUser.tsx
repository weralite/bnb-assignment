"use client"

import React, { useEffect, useState } from 'react';
import { getBookings } from "@/actions/bookings/getBookings";
import { BookingWithListingAndGuest } from "@/types/booking";
import BookingCard from "./BookingCard";

const BookingByUser: React.FC = () => {
  const [guestBookings, setGuestBookings] = useState<BookingWithListingAndGuest[]>([]);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setGuestBookings(data.guestBookings); // Only set guestBookings here
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 overflow-y-scroll h-120 relative">
      {guestBookings && guestBookings.length > 0 ? (
        guestBookings.map((booking) => (
          <BookingCard booking={booking} key={booking.id} />
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default BookingByUser;
