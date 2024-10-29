import { getAllListings } from "@/actions/getAllListing";
import ListingCard from "./ListingCard";



export default async function getListings() {
    const listings = await getAllListings();

    return (
        <div className="w-full grid 1-sm:grid-cols-2 1-lg:grid-cols-3 1-xl:grid-cols-4 gap-5">
            {listings.map((listing) => (

                <ListingCard key={listing.id} listing={listing} />
            ))}

        </div>
    )
}

