import { Booking, Listing } from "@prisma/client";


type BookingData = Omit<Booking, "id"> & {
    id: string;
    guest: {
      id: string;
      isAdmin: boolean;
    };
    listing: {
      advertiser: {
        id: string;
        isAdmin: boolean;
      };
    };
  };

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

type AdvertiserBooking = Listing & {
  bookings: BookingWithListingAndGuest[];
};


type BookingResponse = {
    guestBookings: BookingWithListingAndGuest[];
    advertiserBookings: AdvertiserBooking[];
};