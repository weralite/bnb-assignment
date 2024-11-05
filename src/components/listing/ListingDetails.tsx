"use client"

import { ListingWithAdvertiser } from "@/types/listing";
import BookingRegister from "../booking/BookingRegister";



export default function ListingDetails({ listing }: { listing: ListingWithAdvertiser }) {

  const formatAvailableDate = (date: string | Date): string => {
    if (typeof date === 'string') {
      return date.split('T')[0];
    } else if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return '';
  };

  const availableFromString = formatAvailableDate(listing.availableFrom);
  const availableToString = formatAvailableDate(listing.availableTo);


  return (
    <div className="md:container mx-auto px-4 py-10 space-y-8">

      <div>
        <img
          className="w-full h-96 object-cover rounded-lg shadow-lg"
          src={listing.imageUrl || "https://via.placeholder.com/800x600"}
          alt={listing.title}
        />
      </div>

      <div className="md:flex md:justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">{listing.title}</h1>
          <p className="text-gray-600">{listing.country} · {listing.availableBeds} Beds</p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-2xl font-semibold text-red-500">{listing.dailyRate} USD/night</p>
        </div>
      </div>


      <div className="flex flex-col gap-5 md:flex md:flex-row">

        <div className="md:w-2/3 space-y-6">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">About this place</h2>
            <p className="text-gray-500 leading-relaxed">{listing.description}</p>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Hosted by {listing.advertiser.firstName} {listing.advertiser.lastName}</h2>
            <p className="text-gray-400 leading-relaxed">Superhost</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <span className="text-gray-600">Free Wi-Fi</span>
              <span className="text-gray-600">Air Conditioning</span>
              <span className="text-gray-600">Kitchen</span>
              <span className="text-gray-600">Parking</span>
              <span className="text-gray-600">Pets Allowed</span>
              <span className="text-gray-600">TV</span>

            </div>
          </div>
        </div>
        <BookingRegister
          listing={listing}
          availableFrom={availableFromString}
          availableTo={availableToString}
          onSubmitSuccess={() => { }}
         />

      </div>


      <div className="mt-8 space-y-3">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <div className="space-y-6">
          <div className="border-b pb-4">
            <p className="font-semibold">John Doe</p>
            <p className="text-gray-600 text-sm">October 2024</p>
            <p className="text-gray-700">Had a wonderful stay! The place was clean and comfortable.</p>
          </div>

        </div>
      </div>
    </div>
  );
}