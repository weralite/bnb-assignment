import { ListingWithAdvertiser } from "@/types/listing";
import Link from "next/link";


type ListingCardProps = {
    listing: ListingWithAdvertiser
}

export default function ListingCard({ listing }:ListingCardProps) {
  console.log("hej", listing);
  return (
<div className="rounded overflow-hidden shadow-lg">
<Link className="w-full" href={`/${listing.id}`}>
<img className="w-full h-50 object-cover" src={listing.imageUrl || "https://via.placeholder.com/150"} alt="Sunset in the mountains" />

  <div className="px-6 py-4  flex flex-col gap-5">
    <h4 className="font-semibold text-md mb-25 truncate">{listing.title}</h4>

    
    <p>
      {listing.dailyRate} USD/night
    </p>
  </div>
  </Link>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{listing.country}</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{listing.availableBeds} beds</span>
  </div>
</div>
  );
}
