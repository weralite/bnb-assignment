"use client";

import React, { useEffect, useState } from 'react';
import { getBookings } from "@/actions/bookings/getBookings";
import { AdvertiserBooking } from "@/types/booking";
import BookingCard from "./BookingCardAdvertiser";
import { deleteBooking } from "@/actions/bookings/deleteBooking";

const BookingByUser: React.FC = () => {
  const [advertiserBookings, setAdvertiserBookings] = useState<AdvertiserBooking[]>([]);

  console.log("Advertiser Bookings:", advertiserBookings);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setAdvertiserBookings(data.advertiserBookings);
      console.log("Fetched bookings:", data.advertiserBookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const handleDelete = async (bookingId: string) => {
    try {
      await deleteBooking(bookingId);
      fetchBookings();
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 overflow-y-scroll h-120 relative">
  {advertiserBookings && advertiserBookings.filter((listing) => listing.bookings.length > 0).length > 0 ? (
    advertiserBookings
      .filter((listing) => listing.bookings.length > 0) // Only include listings with bookings
      .map((listing) => (
        <div key={listing.id} className="w-full flex flex-col gap-5">
          <div>
            <h4 className="font-semibold text-left pl-5 text-lg underline">
              {listing.title}
            </h4>
            {listing.bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                handleDelete={() => handleDelete(booking.id)} // Pass the booking.id here
              />
            ))}
          </div>
        </div>
      ))
  ) : (
    <p>No bookings found.</p> // Message when no listings with bookings exist
  )}
</div>
  );
};

export default BookingByUser;
