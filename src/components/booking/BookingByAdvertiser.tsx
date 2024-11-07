"use client";

import React, { useEffect, useState } from 'react';
import { getBookings } from "@/actions/bookings/getBookings";
import { AdvertiserBooking } from "@/types/booking";
import BookingCard from "./BookingCardAdvertiser";
import { deleteBooking } from "@/actions/bookings/deleteBooking";
import { acceptBooking } from "@/actions/bookings/acceptBooking";
import { rejectBooking } from "@/actions/bookings/rejectBooking";

const BookingByUser: React.FC = () => {
  const [advertiserBookings, setAdvertiserBookings] = useState<AdvertiserBooking[]>([]);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setAdvertiserBookings(data.advertiserBookings);
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

  const handleAccept = async (bookingId: string) => {
    try {
      await acceptBooking(bookingId);
      fetchBookings();
    } catch (error) {
      console.error("Failed to accept booking:", error);
    }
  };

  const handleReject = async (bookingId: string) => {
    try {
      await rejectBooking(bookingId);
      fetchBookings();
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 overflow-y-scroll h-120 relative">
      {advertiserBookings && advertiserBookings.filter((listing) => listing.bookings.length > 0).length > 0 ? (
        advertiserBookings
          .filter((listing) => listing.bookings.length > 0) // Filter out listings with no bookings
          .map((listing) => (
            <div key={listing.id} className="w-full flex flex-col gap-5">
              <div>
                <h4 className="font-semibold text-left pl-5 text-lg underline">
                  {listing.title}
                </h4>
                <div className='flex flex-col gap-6'>
                  {listing.bookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      handleDelete={() => handleDelete(booking.id)}
                      handleAccept={() => handleAccept(booking.id)}
                      handleReject={() => handleReject(booking.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default BookingByUser;
