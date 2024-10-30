import { ListingData } from "@/types/listing";


type ListingCardProps = {
    listing: ListingData
}

export default function ListingCard({ listing }:ListingCardProps) {
  return (
<div className="max-w-sm rounded overflow-hidden shadow-lg">
<img className="w-full h-50" src={listing.imageUrl || "https://via.placeholder.com/150"} alt="Sunset in the mountains" />
  <div className="px-6 py-4  flex flex-col gap-5">
    <div className="font-bold text-xl mb-25 truncate">{listing.title}</div>
    <p className="text-gray-700 text-base truncate">
      {listing.description}
    </p> 
    <p>
      {listing.dailyRate} USD/night
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{listing.country}</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{listing.availableBeds} beds</span>
  </div>
</div>
  );
}
