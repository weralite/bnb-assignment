
import { Listing, User } from "@prisma/client";
import { ListingWithAdvertiser } from "@/types/listing";


export function isWithAdvertiser(listing: Listing | ListingWithAdvertiser): listing is ListingWithAdvertiser {
    return typeof listing.advertiserId !== "string";
}

export function includeAdvertiser(
    listing: Listing | ListingWithAdvertiser,
    users: User[]
): Listing | ListingWithAdvertiser {
    const advertiser = users.find((user) => user.id === listing.advertiserId);
    if (advertiser) {
        return {
            ...listing,
            advertiser,
        } as ListingWithAdvertiser;
    }
    return listing;
}
