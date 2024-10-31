import { ListingData } from "@/types/listing";


type ListingListProps = {
  listing: ListingData
}

export default function ListingList({ listing }: ListingListProps) {
  return (
    <div className="w-full flex flex-row rounded overflow-hidden shadow-md transition-all duration-150 hover:scale-110">
<div>
        <img className="w-24 h-24" src={listing.imageUrl} alt={listing.title} />
</div>
      <div className="px-6 py-4">
        <h4 className="font-semibold text-sm mb-2 1-sm:text-md">{listing.title}</h4>
        <p className="text-gray-700 text-base truncate">{listing.address}</p>
      </div>


    </div>
  );
}