import { useRouter } from "next/router";
import { getListingById } from "@/actions/getListingById"; // Replace with your actual function

export default async function ListingPage({ params }: { params: { id: string } }) {
  const listing = await getListingById(params.id); // Assuming you have a function to fetch a single listing by ID

  if (!listing) return <p>Listing not found</p>;

  return (
<div className="container mx-auto px-4 py-10 space-y-8">

  <div className="relative">
    <img
      className="w-full h-96 object-cover rounded-lg shadow-lg"
      src={listing.imageUrl || "https://via.placeholder.com/800x600"}
      alt={listing.title}
    />
  </div>

  <div className="md:flex md:justify-between items-center mb-8">
    <div>
      <h1 className="text-3xl font-bold">{listing.title}</h1>
      <p className="text-gray-600">{listing.country} · {listing.availableBeds} Beds</p>
    </div>
    <div className="mt-4 md:mt-0">
      <p className="text-2xl font-semibold text-red-500">{listing.dailyRate} USD/night</p>
    </div>
  </div>


  <div className="md:flex md:space-x-8">
  
    <div className="md:w-2/3 space-y-6">
      <h2 className="text-2xl font-semibold">About this place</h2>
      <p className="text-gray-700 leading-relaxed">{listing.description}</p>

  
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


    <div className="md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">{listing.dailyRate} USD</p>
        <p className="text-gray-600">per night</p>
      </div>

      <div className="border-t border-b py-4 space-y-2">
        <div className="flex justify-between">
          <label className="text-gray-600">Check-in</label>
          <input type="date" className="border rounded px-3 py-1 w-1/2" />
        </div>
        <div className="flex justify-between">
          <label className="text-gray-600">Check-out</label>
          <input type="date" className="border rounded px-3 py-1 w-1/2" />
        </div>
      </div>

      <button className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg">
        Reserve
      </button>

      <p className="text-gray-500 text-center">You won’t be charged yet</p>
    </div>
  </div>

 
  <div className="mt-8">
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
