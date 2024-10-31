import { getListings } from "@/actions/getListings";
import ListingCard from "./ListingCard";
import Link from "next/link";

export default async function ListingGrid() {
    const listings = await getListings();

    return (
        <div className="grid 1-sm:grid-cols-2 1-md:grid-cols-3 1-lg:grid-cols-4 1-xl:grid-cols-5 gap-5 justify-center">
            {listings.map((listing) => (

                    <ListingCard listing={listing} />
        
            ))}

        </div>
    )
}

