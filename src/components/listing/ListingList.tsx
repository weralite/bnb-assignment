import { ListingData } from "@/types/listing";


type ListingListProps = {
  listing: ListingData
}

export default function ListingList({ listing }: ListingListProps) {
  return (
    <div className="w-full flex flex-row rounded shadow-md transition-all duration-150 scale-100 hover:scale-90 hover:cursor-pointer">
      <div>
        <img className="hidden sm:block w-24 h-24 object-cover" src={listing.imageUrl} alt={listing.title} />
      </div>
      <div className="px-6 py-4">
        <h4 className="font-semibold text-sm mb-2 1-sm:text-md">{listing.title}</h4>
        <p className="text-gray-700 text-base truncate">{listing.address}</p>
      </div>


    </div>
  );
}
