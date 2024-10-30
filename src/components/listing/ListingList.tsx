import { ListingData } from "@/types/listing";


type ListingListProps = {
  listing: ListingData
}

export default function ListingList({ listing }: ListingListProps) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg transition-all duration-300 hover:scale-110">

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{listing.title}</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>

    </div>
  );
}
