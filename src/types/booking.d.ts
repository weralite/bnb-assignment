import { Booking } from "@prisma/client";


type BookingData = Omit<Booking, "id">;

type BookingWithListingAndGuest = Booking & {
    listing: {
        id: number;
        title: string;
        imageUrl: string;
        advertiserId: number;
    };
    guest: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    };
};

type BookingResponse = {
    guestBookings: BookingWithListingAndGuest[];
    advertiserBookings: {
        listingId: number;
        title: string;
        imageUrl: string;
        bookings: BookingWithListingAndGuest[];
    }[];
};