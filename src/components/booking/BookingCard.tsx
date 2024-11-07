import { BookingWithListingAndGuest } from "@/types/booking";
import Link from "next/link";


type BookingCardProps = {
    booking: BookingWithListingAndGuest
    handleDelete: () => void
}
export default function ListingCard({ booking, handleDelete }: BookingCardProps) {
    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(booking.checkOutDate);

    return (
        <div className="w-full flex flex-row justify-evenly rounded shadow-md transition-all duration-150">
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

            <button onClick={handleDelete} className="flex flex-col justify-center items-center bg-red-800 hover:bg-gray-700 ">
                    <p className=" text-white font-bold py-2 px-4 rounded-full">
                        Delete
                    </p>
            </button>
        </div>
    );
}