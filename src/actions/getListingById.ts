
import { ListingWithAdvertiser } from "@/types/listing";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function getListingById(id: string): Promise<ListingWithAdvertiser | boolean> {
    const url = new URL(`${BASE_URL}/api/listings/${id}`);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch listing");
        }

        const listing: ListingWithAdvertiser = await response.json();

        return listing;
    } catch (error: any) {
        console.warn("Error fetching listing (action)", error);
        return false;
    }
}