"use client";

import { BookingWithListingAndGuest } from "@/types/booking";
import Link from "next/link";


type BookingCardProps = {
    booking: BookingWithListingAndGuest
    handleDelete: () => void;
}
export default function ListingCard({ booking, handleDelete }: BookingCardProps) {
    // Ensure check-in and check-out dates are valid Date objects
    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(booking.checkOutDate);
    

    return (
        <div className="w-full flex flex-row justify-between rounded shadow-md transition-all duration-150">


            <div className="px-6 py-4">
                <h4 className="font-semibold text-sm 1-sm:text-md">{booking.guest.firstName} {booking.guest.lastName}</h4>
                <p className="text-gray-700 text-base truncate">
                    {checkInDate.toDateString()} - {checkOutDate.toDateString()}
                </p>
                <p className="text-gray-400 text-sm truncate">
                    {booking.status}
                </p>
            </div>
            <div className="flex flex-col">
                <button className="flex flex-col justify-center items-center  text-white font-bold h-full px-10 bg-green-600 hover:bg-gray-700 ">
                    Accept
                </button>
                <button onClick={handleDelete} className="flex flex-col justify-center items-center  text-white font-bold h-full bg-red-800 hover:bg-gray-700 ">
                    Reject
                </button>
            </div>
        </div>
    );
}