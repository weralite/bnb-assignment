import { getListings } from "@/actions/getListings";
import ListingCard from "./ListingCard";
import Link from "next/link";



export default async function ListingGrid() {
    const listings = await getListings();
console.log(listings)
    return (
        <div className="w-full grid 1-md:grid-cols-2 1-lg:grid-cols-3 1-xl:grid-cols-4 gap-5">
            {listings.map((listing) => (
                <Link key={listing.id} href={`/${listing.id}`}>
                    <ListingCard listing={listing} />
                </Link>
            ))}

        </div>
    )
}

