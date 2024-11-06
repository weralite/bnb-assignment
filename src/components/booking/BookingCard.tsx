import { BookingWithListingAndGuest } from "@/types/booking";
import Link from "next/link";


type BookingCardProps = {
    booking: BookingWithListingAndGuest
}
export default function ListingCard({ booking }: BookingCardProps) {
    // Ensure check-in and check-out dates are valid Date objects
    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(booking.checkOutDate);

    return (
        <div className="w-full flex flex-row rounded shadow-md transition-all duration-150 scale-100 hover:scale-90">
            <div>
                <img 
                    className="hidden sm:block w-24 h-24 object-cover" 
                    src={booking.listing.imageUrl} 
                    alt={booking.listing.title} 
                />
            </div>

            <div className="px-6 py-4">
                <h4 className="font-semibold text-sm 1-sm:text-md">{booking.listing.title}</h4>
                <p className="text-gray-700 text-base truncate">
                    {checkInDate.toDateString()} - {checkOutDate.toDateString()}
                </p>
                <p className="text-gray-400 text-sm truncate">
                    {booking.status}
                </p>
            </div>

            <div className="flex flex-col justify-center items-center">
                <Link href={`/listing/${booking.listing.id}`}>
                    <p className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
                        Edit
                    </p>
                </Link>
            </div>
        </div>
    );
}