import React, { useEffect, useState } from 'react';
import { getUserBookings } from "@/actions/getUserBookings";
import { Booking } from "@/types/booking";
import BookingCard from "./BookingCard";

const BookingByUser: React.FC = () => {
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  const fetchBookings = async () => {
    try {
      const data = await getUserBookings();
      setUserBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {userBookings.map((booking) => (
        <BookingCard booking={booking} key={booking.id} />
      ))}
    </div>
  );
};